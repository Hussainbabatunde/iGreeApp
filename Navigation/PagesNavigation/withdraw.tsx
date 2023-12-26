import { AntDesign, Ionicons } from "@expo/vector-icons";
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
import { reset as resetLoginSlice } from "../../slice/LoginSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { LoginState } from "../../slice/LoginSlice";

export default function WithdrawScreen (){

    type Statesym= {
        AuthSlice: IUsersList,
        LoginSlice: LoginState
      }

      const [accNumber, setAccNumber] = useState('')
      const [amt, setAmt] = useState('')
      const [firstname, setFirstname] = useState('')
      const [loading, setLoading] = useState(false)
      const [next, setNext] = useState(false)
      const [chosenBank, setChosenBank] = useState('Gtbank')
      const [modalVisibleDone, setModalVisibledone] = useState(false)


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
            await dispatch(SetupUserAuthApi(setupData))
        }
        setLoading(false)
    }



    return(
        <KeyboardAvoidingView style={{flex: 1, paddingVertical: 30, backgroundColor:'#121212',}}>
    <ScrollView style={{flex: 1, backgroundColor:'#121212',}}>
        <View style={{width:'94%', marginLeft:'3%', flex: 1}}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity   onPress={()=> {navigation.navigate('walletNavigation', {screen : 'wallet'})}}>
            <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ color:'white', fontSize: 23}}>Withdraw</Text>
            </View>
            </View>

        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
            <Text style={{color:'white', marginTop: 50}}>Select a Bank</Text>
            <Pressable onPress={()=> setModalVisibledone(true)}  style={{backgroundColor:'#272727', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10, flexDirection:'row'}} >
                <Text style={{color:'white', flex: 1}}>{chosenBank}</Text>
            <AntDesign name="down" size={15} color="white" />
            </Pressable>
            <Text style={{color:'white', marginTop: 30}}>Account Number</Text>
            <TextInput onChangeText={setAccNumber} style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            <Text style={{color:'white', marginTop: 30}}>Amount</Text>
            <TextInput onChangeText={setAmt} keyboardType="numeric" style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            </View>

            {next? 
            <Pressable onPress={handleSubmit} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 50}}>
            {loading ? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 18}}>Next</Text>}
            </Pressable>
            :
            <Pressable style={{backgroundColor:'#3C2562', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 50}}>
                <Text style={{color:'#AAAAAB', fontSize: 18}}>Continue</Text>
                </Pressable>}
            </View>
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
                        maxHeight: 350
                      }}
                    >
                      
                      <View
                        style={{
                          paddingVertical: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ScrollView>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank1');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank1</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank2');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank2</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank3');
                                setModalVisibledone(false)
                            }}><Text>Ecobank3</Text></Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank4');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank4</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank5');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank5</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank6');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank6</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank7');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank7</Text>
                                </Pressable>
                            <Pressable onPress={()=>{
                                setChosenBank('EcoBank8');
                                setModalVisibledone(false)
                            }}>
                                <Text>Ecobank8</Text>
                            </Pressable>
                      </ScrollView>
                        {/* <TouchableOpacity
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
                          onPress={()=> setModalVisibledone(false)}
                        >
                          
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Ok
                            </Text>
                        </TouchableOpacity> */}
                        
                      </View>
                    </View>
                  </BlurView>
                </Modal>
              </View>
    </ScrollView>
    </KeyboardAvoidingView>
    )
}

 