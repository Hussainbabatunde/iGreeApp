import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const AcceptScreen = () =>{

    const [isChecked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(false)
    const navigation = useNavigation<StackNavigationProp<any>>()

    const handleSubmit = async() =>{        
        setLoading(true) 
        navigation.navigate('PermittedNavigation',{
            screen: 'appNavigation',
            params:{
                screen: 'HomeNavigation'
            }
          })
        setLoading(false)
    }

    useEffect(()=>{
        if(isChecked){
            setNext(true)
        }
        else{
            setNext(false)
        }
    }, [isChecked])


    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#121212', justifyContent:'space-between'}}>
            
        <View style={{width:'94%', marginLeft:'3%'}}>
        <TouchableOpacity onPress={()=> navigation.navigate('PermittedNavigation',{
          screen: 'personalinfo'
        })}>
        <Ionicons name="chevron-back" size={35} color="white" />
        </TouchableOpacity>
        <Text style={{color:'white', fontSize: 30, marginTop: 80}}>Accept iGree terms &</Text>
        <Text style={{color:'white', fontSize: 30, marginTop: 10}}>Review Privacy Policy</Text>
        <View style={{ marginTop: 60, flexDirection:'row', flexWrap:'wrap'}}>
        <Text style={{color:'white', fontSize: 18}}>By selecting “I Agree” below I have reviewed and agree to the 
        <Text style={{color:'#9058EA'}}> Terms of Use </Text>and acknowledge the <Text style={{color:'#9058EA'}}>Privacy Notice.</Text></Text>

        <View style={{marginTop: 30, flexDirection: 'row'}}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#9058EA' : undefined}
        />
        <Text style={{marginLeft: 10, color:'white'}}>I agree</Text>
        </View>
        
        </View>
        </View>
        
        {next? 
            <Pressable onPress={handleSubmit} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 30, width:'100%'}}>
            {loading ? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 18}}>Submit</Text>}
            </Pressable>
            :
            <Pressable style={{backgroundColor:'#3C2562', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 30, width:'100%'}}>
                <Text style={{color:'#AAAAAB', fontSize: 18}}>Continue</Text>
                </Pressable>}
        </SafeAreaView>
    )
}

export default AcceptScreen;