import React, {useState, useEffect} from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { IUsersList } from "../../slice/Auth";
import { AppDispatch } from "../../store";
// import { Link, router } from "expo-router";
import { useSelector } from "react-redux";
import { reset as resetAuthSlice } from "../../slice/Auth";
import { LoginAuthApi } from "../../slice/LoginSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';




export default function Signin(){

    type Statesym= {
        AuthSlice: IUsersList,
      }

    const [show, setShow] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const loginData = useSelector<Statesym>((state)=> state?.AuthSlice?.logindata?.message)
    type Data = {
        email: string,
        password: string
    }
    let data: Data= {
        email: email,
        password: password
    }

    const navigation = useNavigation<StackNavigationProp<any>>()

    useEffect(()=>{
            if(loginData == 'You need to setup your profile'){
                // router.replace('/personalinfo')
                navigation.navigate('AppNavigation',{
                    screen: 'HomeNavigation',
                    params:{
                        screen:'dashboard'
                    }
                })
            }
    },[loginData])

    useEffect(()=>{  
        const work = async() =>{      
        await dispatch(resetAuthSlice())
        }
        work()
    },[])


    const handleSubmit = async() =>{        
        setLoading(true)
        await dispatch(LoginAuthApi(data))
        setLoading(false)
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'#121212', justifyContent:'space-between'}}>
            <View style={{width:'94%', marginLeft:'3%', marginTop: 80}}>
            <Text style={{color:'white', fontSize: 30}}>Sign in with Email</Text>
            <Text style={{color:'#AAAAAb', marginTop: 10}}>Enter your credentials</Text>
            <Text style={{color:'white', marginTop: 50}}>Email</Text>
            <TextInput placeholder="abc@mail.com" onChangeText={setEmail} style={{backgroundColor:'#272727', color: 'white', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}} />
            <Text style={{color:'white', marginTop: 30}}>Password</Text>
            <View style={{flexDirection:'row', backgroundColor:'#272727', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, marginTop: 10}}>
                <TextInput secureTextEntry={show} onChangeText={setPassword} placeholder="Password" style={{flex: 1, color:'white'}} />
                {show ? <Entypo onPress={()=> setShow(!show)} name="eye" size={24} color="white" />: <Entypo onPress={()=> setShow(!show)} name="eye-with-line" size={24} color="white" /> }
            </View>
            <View style={{marginVertical: 20, justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{color:'#9058EA'}}>Forgot password?</Text>
            </View>
            <Pressable onPress={handleSubmit} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30}}>
                {loading ? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 18}}>Sign in</Text>}
                </Pressable>

                
            </View>
            <View style={{marginVertical: 20, justifyContent:'center', flexDirection:'row'}}>
                    <Text style={{color:'#AAAAAb'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('AuthNavigation',{
                        screen:'signup'
                    })}} >
                        <Text style={{color:'#9058EA', fontWeight:'bold', marginLeft: 5}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}