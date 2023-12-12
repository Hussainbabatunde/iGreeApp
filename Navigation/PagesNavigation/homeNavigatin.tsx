import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Homepage from './homepage';
// import ListingsScreen from './AppNav/ListingsScreen';


const Stack = createStackNavigator();



const HomeNavigation = () => {

//   const navigation = useNavigation();
//   const {logindata} = useSelector((state)=> state?.LoginSlice)

  return (
    // <NavigationContainer
    // //  linking={linking}
    // //   theme={navigationTheme}
    //   >
    <Stack.Navigator>
    <Stack.Screen name="dashboard" component={Homepage}  options={{headerShown: false}} />    
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default HomeNavigation