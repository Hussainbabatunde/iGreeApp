import { Ionicons } from "@expo/vector-icons";
// import { Link, router } from "expo-router";
import React, {useState, useEffect} from "react";
import { Alert, Pressable, ActivityIndicator, Text, View, ScrollView, KeyboardAvoidingView,TextInput, TouchableOpacity, Platform, Modal } from "react-native";
import { IUsersList, SetupData, SetupUserAuthApi } from "../../slice/Auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import { reset as resetAuthSlice } from "../../slice/Auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { LoginState } from "../../slice/LoginSlice";

export default function Personalinfo (){

    type Statesym= {
        AuthSlice: IUsersList,
        LoginSlice: LoginState
      }


    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [modalVisibleDone, setModalVisibledone] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const verifyUserId = useSelector<Statesym>((state)=> state?.AuthSlice?.verifyUserData?.data?.id)
    const LoggedInUserId = useSelector<Statesym>((state)=> state?.LoginSlice?.logindata?.data?.id)
    const userProfileStatus = useSelector<Statesym>((state)=> state?.AuthSlice?.setupUserData?.message)
    const navigation = useNavigation<StackNavigationProp<any>>()
    // console.log(userProfileStatus)

    const handleSubmit = async() =>{        
        setLoading(true) 
        const data = {
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber
        }

        const setupData: SetupData = {
            data: data,
            verifyUserId: verifyUserId || LoggedInUserId, // Replace with the actual value or variable
          };
        if(phonenumber?.length < 11 || phonenumber == ''){
            Alert.alert('Phone number is not correct')
        }
        else if(firstname == '' || lastname == ''){
            Alert.alert('Please fill in your Information')
        }
        else{
            console.log(data, verifyUserId)
            await dispatch(SetupUserAuthApi(setupData))
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(userProfileStatus == 'Profile setup completed!'){
            setModalVisibledone(true)
        }
    },[userProfileStatus])

    const handleOtpScreen = async() =>{
        // await dispatch(resetAuthSlice())
        navigation.navigate('PermittedNavigation',{
          screen: 'acceptScreen'
        })
        // navigation.navigate('personalinfo')
        setModalVisibledone(false)
    }

    useEffect(()=>{
        if(phonenumber && firstname && lastname){
            setNext(true)
        }
        else{
            setNext(false)
        }
    },[phonenumber, firstname, lastname])

    return(
        <KeyboardAvoidingView style={{flex: 1, paddingVertical: 30, backgroundColor:'#121212',}}>
    <ScrollView style={{flex: 1, backgroundColor:'#121212',}}>
        <View style={{width:'94%', marginLeft:'3%'}}>
            <TouchableOpacity   onPress={()=> navigation.navigate('signin')}>
            <Ionicons name="chevron-back" size={35} color="white" />
            </TouchableOpacity>
            <Text style={{color:'white', fontSize: 30, marginTop: 80}}>Personal Information</Text>
            <Text style={{color:'#AAAAAb', marginTop: 10}}>Please enter the following Information</Text>
            <Text style={{color:'white', marginTop: 50}}>First Name</Text>
            <TextInput onChangeText={setFirstname} style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            <Text style={{color:'white', marginTop: 30}}>Last Name</Text>
            <TextInput onChangeText={setLastname} style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            <Text style={{color:'white', marginTop: 30}}>Phone Number</Text>
            <TextInput onChangeText={setPhonenumber} keyboardType="numeric" style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />

            {next? 
            <Pressable onPress={handleSubmit} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 50}}>
            {loading ? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 18}}>Next</Text>}
            </Pressable>
            :
            <Pressable style={{backgroundColor:'#3C2562', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 50}}>
                <Text style={{color:'#AAAAAB', fontSize: 18}}>Continue</Text>
                </Pressable>}
            </View>

            <View style={{ justifyContent: "center" }}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisibleDone}
                  onRequestClose={() => {
                    setModalVisibledone(!modalVisibleDone);
                  }}
                >
                  <BlurView
                    intensity={30}
                    style={{
                      position: "absolute",
                      borderRadius: 25,
                      overflow: "hidden",
                      // backgroundColor: "green",
                      padding: 20,
                      width: "100%",
                      height: "100%",
                      // flex: 1,
                      alignSelf: "center",
                      // marginTop: 250,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                      // overflow: "hidden",

                      justifyContent: "center",
                      zIndex: 1000,
                      // flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 25,
                        padding: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      
                      <View
                        style={{
                          paddingVertical: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View>
                        <LottieView
                          autoPlay
                          loop={true}
                          source={require("../../assets/animations/successful.json")}
                          style={{
                            width: 150,
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                        />
                      </View>
                      <Text style={{color:'black', fontWeight: 'bold'}}>User Verified Successfully</Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            borderRadius: 30,
                            width: Platform.OS === "android" ? "30%" : "30%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop:20
                          }}
                          onPress={handleOtpScreen}
                        >
                          
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Ok
                            </Text>
                        </TouchableOpacity>
                        
                      </View>
                    </View>
                  </BlurView>
                </Modal>
              </View>
    </ScrollView>
    </KeyboardAvoidingView>
    )
}

 