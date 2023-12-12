import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './Navigation/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <NavigationContainer>
        <MyStack />
        </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
