import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Signin from './AuthNavigation/signin';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Signup from './AuthNavigation/signup';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IUsersList } from '../slice/Auth';
import { LoginState } from '../slice/LoginSlice';
import PermittedNavigation from './AppNavigation';

const Stack = createStackNavigator();

function MyStack() {

  type Statesym= {
    LoginSlice: LoginState,
  }
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { logindata } = useSelector<Statesym, LoginState>((state) => state?.LoginSlice);
  useEffect(() => {
    if (logindata?.message == 'You need to setup your profile') {
      navigation.navigate("PermittedNavigation", {
        screen: "personalinfo",
      });
    }
    else if(logindata?.message == 'Login successfull!'){
      navigation.navigate('PermittedNavigation',{
          screen: 'appNavigation',
          params:{
              screen:'HomeNavigation'
          }
      })
  }
  }, [logindata]);

  // console.log('logindata ', logindata)


  return (
    <Stack.Navigator>
    {logindata ?<Stack.Screen
          name="PermittedNavigation"
          component={PermittedNavigation}
          options={{
            headerShown: false,
            gestureEnabled: false,
            // headerBackTitle: false,
            headerBackTitleVisible: true,
            // headerTitle: true,
            headerTransparent: true,
            headerTintColor: "black",
          }}
        />
        :
    <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />}
    </Stack.Navigator>
  );
}

export default MyStack;