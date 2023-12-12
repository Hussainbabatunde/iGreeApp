import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, TextInput, View, Modal, TouchableOpacity, Platform, Alert } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { IUsersList, RegisterAuthApi, reset } from "../../slice/Auth";
import { AppDispatch } from "../../store";
// import { Link, router, useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { reset as resetAuthSlice } from "../../slice/Auth";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";



export default function Signup(){

  const navigation = useNavigation<StackNavigationProp<any>>()
    type Statesym= {
        AuthSlice: IUsersList,
      }


    const [show, setShow] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const [password, setPassword] = useState('')
    const minLength = 9
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(false)
    const [modalVisibleDone, setModalVisibledone] = useState(false)
    const registerData = useSelector<Statesym>((state)=> state?.AuthSlice?.registerdata?.message)
    // console.log('registerData ', registerData)
    type Data = {
        email: string,
        password: string
    }
    let data: Data= {
        email: email,
        password: password
    }
    const handleSubmit = async() =>{        
        setLoading(true) 
        if(password?.length >= minLength){
        await dispatch(RegisterAuthApi(data))
        }
        else{
            Alert.alert('Password must be more than 9 characters')
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(email && password){
            setNext(true)
        }
        else{
            setNext(false)
        }
    },[email, password])

    useEffect(()=>{
        if(registerData == 'Check your email for OTP'){
            setModalVisibledone(true)
        }
    },[registerData])

    const handleOtpScreen = async() =>{
        // await dispatch(resetAuthSlice())
        navigation.navigate('AuthNavigation',{ screen: 'otpscreen'})
        await AsyncStorage.setItem('email', email)
        // navigation.navigate('otpscreen')
        setModalVisibledone(false)
    }

    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'#121212', justifyContent:'space-between'}}>
            
            <View style={{width:'94%', marginLeft:'3%'}}>
            <TouchableOpacity onPress={()=> navigation.navigate('AuthNavigation',{ screen: 'signin'})} >
            <Ionicons name="chevron-back" size={35} color="white" />
            </TouchableOpacity>
            <Text style={{color:'white', fontSize: 30, marginTop: 80}}>Sign up with Email</Text>
            <Text style={{color:'#AAAAAb', marginTop: 10}}>Enter your Email Address</Text>
            <Text style={{color:'white', marginTop: 50}}>Email</Text>
            <TextInput placeholder="abc@mail.com" onChangeText={setEmail} style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            <Text style={{color:'white', marginTop: 30}}>Password</Text>
            <View style={{flexDirection:'row', backgroundColor:'#272727', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}}>
                <TextInput secureTextEntry={show} onChangeText={setPassword} placeholder="Password" style={{flex: 1, color:'white'}} />
                {show ? <Entypo onPress={()=> setShow(!show)} name="eye" size={24} color="white" />: <Entypo onPress={()=> setShow(!show)} name="eye-with-line" size={24} color="white" /> }
            </View>
            {next? 
            <Pressable onPress={handleSubmit} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 30}}>
            {loading ? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 18}}>Next</Text>}
            </Pressable>
            :
            <Pressable style={{backgroundColor:'#3C2562', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 30}}>
                <Text style={{color:'#AAAAAB', fontSize: 18}}>Continue</Text>
                </Pressable>}

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
                      <Text style={{color:'black', fontWeight: 'bold'}}>Registration Successful</Text>
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
            </View>
            <View style={{marginVertical: 20, justifyContent:'center', flexDirection:'row'}}>
                    <Text style={{color:'#AAAAAb'}}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('signin')}>
                        <Text style={{color:'#9058EA', fontWeight:'bold', marginLeft: 5}}>Sign in</Text>
                    </TouchableOpacity>
                </View>


                
        </SafeAreaView>
    )
}