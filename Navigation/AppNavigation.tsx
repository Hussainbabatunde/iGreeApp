import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, useColorScheme } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homepage from './PagesNavigation/homepage';
import { Platform } from 'react-native';
import Wallet from './PagesNavigation/wallet';
import HomeNavigation from './PagesNavigation/homeNavigatin';
import { createStackNavigator } from '@react-navigation/stack';
import Personalinfo from './AuthNavigation/personalinfo';
import AcceptScreen from './AuthNavigation/acceptScreen';
import WalletNavigation from './PagesNavigation/walletNavigation';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


const Tab = createBottomTabNavigator();


 function AppNavigation() {
  const colorScheme = useColorScheme();
  

  return (
    <Tab.Navigator
    screenOptions={{ tabBarHideOnKeyboard: Platform.OS !== "ios",
    tabBarStyle:{
      backgroundColor: '#272727'
    } }}
      >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarActiveTintColor: "#9058EA",
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons
          name="home"
          color={focused ? "#9058EA" : "#AAAAAB"}
          size={32}
        />,
        }}
      />
      <Tab.Screen
        name="walletNavigation"
        component={WalletNavigation}
        options={{
          title: 'Tab Two',
          headerShown: false,
          tabBarActiveTintColor: "#9058EA",
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons
          name="wallet"
          color={focused ? "#9058EA" : "#AAAAAB"}
          size={32}
        />,
        }}
      />
    </Tab.Navigator>
  );
}



const Stack = createStackNavigator();



const PermittedNavigation = () => {

//   const navigation = useNavigation();
//   const {logindata} = useSelector((state)=> state?.LoginSlice)

  return (
    // <NavigationContainer
    // //  linking={linking}
    // //   theme={navigationTheme}
    //   >
    <Stack.Navigator>
    <Stack.Screen name="personalinfo" component={Personalinfo}  options={{headerShown: false}} /> 
    <Stack.Screen name="acceptScreen" component={AcceptScreen}  options={{headerShown: false}} /> 
    <Stack.Screen name="appNavigation" component={AppNavigation}  options={{headerShown: false, gestureEnabled: false}} />        
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default PermittedNavigation