import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Signup from './AuthNavigation/signup';
import Signin from './AuthNavigation/signin';
import Personalinfo from './AuthNavigation/personalinfo';
import AcceptScreen from './AuthNavigation/acceptScreen';
import OTPScreen from './AuthNavigation/otpscreen';
// import ListingsScreen from './AppNav/ListingsScreen';


const Stack = createStackNavigator();



const AuthNavigation = () => {

//   const navigation = useNavigation();
//   const {logindata} = useSelector((state)=> state?.LoginSlice)

  return (
    // <NavigationContainer
    // //  linking={linking}
    // //   theme={navigationTheme}
    //   >
    <Stack.Navigator>
    <Stack.Screen name="signin" component={Signin}  options={{headerShown: false}} />
    <Stack.Screen name="signup" component={Signup}  options={{headerShown: false}} /> 
    {/* <Stack.Screen name="personalinfo" component={Personalinfo}  options={{headerShown: false}} /> 
    <Stack.Screen name="acceptScreen" component={AcceptScreen}  options={{headerShown: false}} />   */}
    <Stack.Screen name="otpscreen" component={OTPScreen}  options={{headerShown: false}} />      
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default AuthNavigation