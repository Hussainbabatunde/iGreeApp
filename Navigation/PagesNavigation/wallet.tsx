import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, Pressable, TextInput, ActivityIndicator } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import CustomModal from '../../components/CustomModal';
import { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { TopupWalletApi, WalletState } from '../../slice/WalletSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import { LoginState } from '../../slice/LoginSlice';
import {reset as resetWalletSlice} from '../../slice/WalletSlice'


const { width, height } = Dimensions.get("window");

export type TopupType = {
  amount: string
}

export default function Wallet() {
  
  type Statesym = {
    WalletSlice: WalletState
  }
  const [freemodalVisible, setFreeModalVisible] = useState(false);
  const [amt, setAmt] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [isModalVisible, setIsModalVisible] = useState(false);

  let Topupdata: TopupType = {
    amount: amt
  }

  const callback_url = 'https://standard.paystack.co/close';

  const payUrl = useSelector<Statesym>((state)=> state?.WalletSlice?.topupdata?.data)
  // console.log('wallet pay url ',payUrl)

    const onNavigationStateChange = (state: any) => {
   
      const { url } = state;
  
      if (!url) return;
  
      if (url === callback_url) {
              // get transaction reference from url and verify transaction, then redirect
        // const redirectTo = 'window.location = "' + callback_url + '"';
        // this.webview.injectJavaScript(redirectTo);        
        // dispatch(resetPaymentSlice())
        setIsModalVisible(false)
      }
          
          if(url === 'https://standard.paystack.co/close') {
        // handle webview removal
        // You can either unmount the component, or
        // Use a navigator to pop off the viewdispatch(resetPaymentSlice())
                
        // dispatch(resetPaymentSlice())
        setIsModalVisible(false)
      }
    };

  const TopupWallet = async() =>{
    setLoading(true)
    await dispatch(TopupWalletApi(Topupdata))
    setFreeModalVisible(false)
    setIsModalVisible(true)
    setLoading(false)
  }

  const handleClosePayment = async() =>{
    await dispatch(resetWalletSlice())
    setIsModalVisible(false)
    setAmt('')
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#121212'}}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{ color:'white', fontSize: 20}}>Wallet</Text>
        <Text style={{fontSize: 20, marginTop: 100, color:'white'}}>Wallet Balance</Text>
        <Text style={{fontSize: 35, color:'white', marginTop: 10}}>₦0.00</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 80, paddingHorizontal: 15}}>
          <TouchableOpacity onPress={()=> setFreeModalVisible(true)} style={{padding: 20, backgroundColor:'#9058EA', width:'46%', borderRadius: 40}}>
            <Text style={{color:'white', fontSize: 20, textAlign:'center'}}>Top up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('walletNavigation',{screen: 'WithdrawScreen'}) } style={{padding: 20, backgroundColor:'#272727', width:'46%', borderRadius: 40}}>
            <Text style={{color:'white', fontSize: 20, textAlign:'center'}}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <Text style={{color:'white', fontSize: 20, marginVertical: 25}}>Recent Activities</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../../assets/images/plus.png')} style={{width: 50, height: 50, marginRight: 15}} />
              <View>
                <Text style={{color:'white', fontSize: 20}}>Top up</Text>
                <Text style={{color: '#9E9E9E'}}>08 May, 01:45</Text>
              </View>
            </View>

            <Text style={{color:'#4FBE7E', fontSize: 20}}>+₦2000</Text>
          </View>
        </View>

                    <CustomModal
                        visible={freemodalVisible}
                        tint="dark"
                        onRequestClose={() => setFreeModalVisible(false)}
                        newHeight={height * 0.75}
                        content={
                          <View style={{position: 'relative', width: '100%'}}>
                          <Text style={{color:'white', fontSize: 30, textAlign:'center'}}>Top up your wallet</Text>
                          <Pressable onPress={()=> setFreeModalVisible(false)} style={{position: 'absolute', top: 0, right: 0}}>
                                <MaterialIcons name="cancel" size={24} color="white" />
                          </Pressable>

                          <Text style={{color:'white', fontSize: 20, marginTop: 40}}>Enter an Amount</Text>
                          <TextInput onChangeText={setAmt} keyboardType='numeric' returnKeyType='done' style={{padding: 15, fontSize: 22, borderRadius: 15, backgroundColor:'#272727', color:'white', marginTop: 15}} />
                          <Text style={{color:'white', fontSize: 20, marginTop: 30, marginBottom: 20}}>Payment method</Text>
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{padding: 15, backgroundColor:'#F4EEFD', borderWidth: 5, borderColor:'#9058EA', borderRadius: 15, justifyContent:'center', alignItems:'center', position:'relative', marginRight: 15 }}>
                            <Ionicons name="ios-card" size={30} color="#9058EA" />
                            <Text style={{color: "#9058EA", marginTop: 15, fontWeight:'bold', fontSize: 17}}>Debit Card</Text>
                            <Text style={{color: "#9058EA", marginTop: 15, fontSize: 17}}>**** 5678</Text>
                            <Ionicons style={{position:'absolute', top: -10, left: -5}} name="checkmark-circle" size={30} color="#9058EA" />
                            </TouchableOpacity>

                            <TouchableOpacity style={{paddingVertical: 15, paddingHorizontal: 25, backgroundColor:'#F4EEFD',  borderRadius: 15, justifyContent:'center', alignItems:'center', position:'relative', marginRight: 15 }}>
                            <Text style={{fontSize: 35, color:'#4FBE7E'}}>+</Text>
                            <Text style={{color: "#4FBE7E", marginTop: 12, fontWeight:'bold', fontSize: 17}}>Add Card</Text>
                            </TouchableOpacity>
                          </View>

                          <Pressable onPress={TopupWallet} style={{backgroundColor:'#9058EA', paddingVertical:20, justifyContent:'center', flexDirection:'row', borderRadius: 30, marginTop: 40}}>
                                {loading? <ActivityIndicator size='small' color='black' />:<Text style={{color:'white', fontSize: 18}}>Continue</Text>}
                          </Pressable>
                          </View>
                        }
                      />

<Modal isVisible={isModalVisible}>
                <WebView 
                    source={{ uri: payUrl }}
                    style={{ marginTop: 40 }}                    
      onNavigationStateChange={onNavigationStateChange }
                />
                <TouchableOpacity style={styles.loginbutton}
            //  onPress={()=> paystackWebViewRef.current.startTransaction()}
             onPress={handleClosePayment}
             >
                <Text style={{color:'black', fontSize: 15}}>Close</Text>
             </TouchableOpacity>
                </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginbutton:{
    width:'90%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: '5%'
}
});
