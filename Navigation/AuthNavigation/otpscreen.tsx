import React from 'react';
import { Alert, SafeAreaView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Modal, Platform, Keyboard, TouchableOpacity, ImageBackground, ActivityIndicator, Image } from 'react-native'
import HiddenTextInput from '../../components/HiddenTextInput'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
// import { Link, router, useNavigation } from 'expo-router';
import { IUsersList, VerifyUserAuthApi } from '../../slice/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FINGERAPP } from "@env";
import { reset as resetAuthSlice } from "../../slice/Auth";
import { useRoute } from '@react-navigation/native';
import { AppDispatch } from '../../store';
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import LottieView from "lottie-react-native";
import { StackNavigationProp } from '@react-navigation/stack';


export type sentEmail = string | null

export default function OTPScreen(){

    type Statesym= {
        AuthSlice: IUsersList,
      }

      const route = useRoute()
      
    const navigation = useNavigation<StackNavigationProp<any>>()

    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(30);
    const MAX_CODE_LENGTH = 4;
    const textInputRef = useRef<TextInput | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)
    const [resentOtp, setResentOtp] = useState<string | null>(null)
    const [gottenEmail, setGottenEmail] = useState<string | null>('')
    const [modalVisibleDone, setModalVisibledone] = useState(false)
    const registerData = useSelector<Statesym>((state)=> state?.AuthSlice?.registerdata?.data?.otp)
    const verifyStatus = useSelector<Statesym>((state)=> state?.AuthSlice?.verifyUserData?.message)
    // const VerifyStatus = useSelector((state)=> state?.LoginSlice?.verifyData?.message)

    // useEffect(()=>{
    //     dispatch(reset())
    // },[])
    // console.log(registerData)

    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

      const resendOTP = async() => {
        setMinutes(1);
        setSeconds(30);
        await fetch(`${FINGERAPP}auth/otp/${gottenEmail}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Accept: "*/*",
                }
              }
        )
        .then((res)=> res.json())
        .then((response)=>{
            // console.log('resend ',response.data)
            setResentOtp(response?.data?.otp)
            Alert.alert('Check your Email to view OTP')
        })
      };



  
    const [inputFocused, setInputFocused] = useState(false)
    const handleOnBlur= () =>{
        setInputFocused(false)
    }

    const handleOnPress= () =>{
        setInputFocused(true);
        textInputRef?.current?.focus();
    }

    useEffect(()=>{
        if(verifyStatus == 'User verified successfully!'){
            setModalVisibledone(true)
        }
    },[verifyStatus])

    const handleOtpScreen = async() =>{
        // await dispatch(resetAuthSlice())
        navigation.navigate('AuthNavigation',{ screen: 'personalinfo'})
        // navigation.navigate('personalinfo')
        setModalVisibledone(false)
    }

    const handleSubmit = async() =>{
        // data.code = code
        // data.phone_number = phone
        const SentEmail: sentEmail = gottenEmail
        setLoading(true)
        // await dispatch(VerifyAuth(data))
        if(code == registerData){
            await dispatch(VerifyUserAuthApi(SentEmail))
        }
        else if(code == resentOtp){
            await dispatch(VerifyUserAuthApi(SentEmail))
        }
        else{
            Alert.alert('OTP code is incorrect')
        }
        setLoading(false)
        // console.log('submitted code ', code)
    }

    const codeDigitsArray = new Array(MAX_CODE_LENGTH).fill(0)

    useEffect(()=>{
        setPinReady(code.length === MAX_CODE_LENGTH);
        return ()=> setPinReady(false)
    }, [code])

    useEffect(()=>{
        const work= async() =>{
            const passedEmail = await AsyncStorage.getItem('email')
            setGottenEmail(passedEmail)
            // await dispatch(resetAuthSlice())
            console.log(passedEmail)
        }
        work()
    },[])


    const toCodeDigitInput = (value: number, index: number) =>{
        const exptyInputChar = ' ';
        const digit = code[index] || exptyInputChar

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === MAX_CODE_LENGTH - 1;
        const isCodeFull = code.length === MAX_CODE_LENGTH ;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

        const StyledOTPInput = inputFocused && isDigitFocused ? styles.OTPInputFocused : styles.OTPInput

        return (
            <View key={index} style={StyledOTPInput}>
                <Text style={styles.OTPInputText}>{digit}</Text>
            </View>
        )
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#121212', justifyContent:'space-between'}}>
            
            <View style={{width:'94%', marginLeft:'3%'}}>
            <TouchableOpacity onPress={()=> navigation.navigate('signin')}>
            <Ionicons name="chevron-back" size={35} color="white" />
            </TouchableOpacity>
            <Text style={{color:'white', fontSize: 30, marginTop: 80}}>Let's verify it's you</Text>
            <Text style={{color:'#AAAAAb', marginTop: 10, marginBottom: 30}}>We've sent a code to deniel*********</Text>
        <View style={styles.OTPInputSection}>
        <Pressable style={styles.InputContainer} onPress={handleOnPress} >
            {/* <View style={styles.OTPInput}>
                <Text style={styles.OTPInputText}>try</Text>
            </View> */}
            {codeDigitsArray.map(toCodeDigitInput)}
        </Pressable>
            <HiddenTextInput setPinReady={setPinReady} 
            code={code} 
            setCode={setCode} 
            maxLength={MAX_CODE_LENGTH} 
            textInputRef={textInputRef}
            handleOnBlur={handleOnBlur} />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 30, marginTop: 10}}>
            <Text style={{color:'#9058EA'}}>Didn't receive a code? </Text>
            
            {seconds > 0 || minutes > 0 ? (<Text style={{color:'white'}}>{minutes < 10 ? `0${minutes}` : minutes}: {seconds < 10 ? `0${seconds}` : seconds}</Text>)
            : (
            <Pressable onPress={resendOTP}>
                <Text style={{color:'white', textDecorationLine:'underline'}}>Resend</Text>
            </Pressable>)}
            </View>
        <TouchableOpacity disabled={!pinReady} 
        style={{backgroundColor:!pinReady ? '#3C2562' : '#9058EA', 
         paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 30}}
        onPress={handleSubmit}>
            {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color: !pinReady ?'#AAAAAB': 'white'}}>Continue</Text>}
        </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
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
    </SafeAreaView>
    )
}


const styles= StyleSheet.create({
    text:{
        fontSize: 15,
        color: 'white'
    },
    OTPInputSection:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 30
    },
    InputContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    OTPInputFocused:{
        // borderColor:'gray',
        minWidth: '12%', 
        borderWidth: 2,
        borderRadius: 5,
        padding: 6,
        // borderColor: "#4FE75E",
        backgroundColor:'#272727'
    },
    child:{
        // width: "100%",
        // height: "55%"
        flex: 1
    },
    coverchild: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: "100%",
    height: "100%", 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center', 
    padding: 15
    },
    OTPInput:{
        // borderColor:'gray',
        backgroundColor: '#272727',
        minWidth: '12%', 
        borderWidth: 2,
        borderRadius: 5,
        padding: 6
    },
    OTPInputText:{
        fontSize: 22,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'white'
    }
 })