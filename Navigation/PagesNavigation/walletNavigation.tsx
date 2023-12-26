import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Homepage from './homepage';
import Wallet from './wallet';
import WithdrawScreen from './withdraw';
// import ListingsScreen from './AppNav/ListingsScreen';


const Stack = createStackNavigator();



const WalletNavigation = () => {

//   const navigation = useNavigation();
//   const {logindata} = useSelector((state)=> state?.LoginSlice)

  return (
    // <NavigationContainer
    // //  linking={linking}
    // //   theme={navigationTheme}
    //   >
    <Stack.Navigator>
    <Stack.Screen name="wallet" component={Wallet}  options={{headerShown: false}} />   
    <Stack.Screen name="WithdrawScreen" component={WithdrawScreen}  options={{headerShown: false}} />    
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default WalletNavigation