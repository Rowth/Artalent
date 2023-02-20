import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {Neomorph} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {TextInput, InputText, HeadWrapper, Header} from '@components';
import styles from './styles';

const AddBalance = props => {
  const {navigation, route} = props;
  const [stateCheck, setStateCheck] = useState('upi');
  const [amount, setAmount] = useState('');
  const [userData, setUserData] = useState(null);
  const [transactionId, setTransactionId] = useState();
  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (data !== null) {
        setUserData(data?.user_data);
        console.log(data?.user_data);
      }
    } catch (e) {
      // error reading value
    }
  };

  const startWalletTransaction = async () => {
    if (amount.length > 0) {
      if (parseInt(amount) < 100 || parseInt(amount) > 1000) {
        Alert.alert('Enter Valid Amount (100-1000)');
      } else {
        let body = new FormData();
        body.append('add_amount', amount);
        const res = await Axios({
          method: 'post',
          url: URL.WALLET_TRANSACTION_START,
          data: body,
        });
        if (res?.data?.status === 200) {
          startRazorPay(res.data.data.transaction_id);
        } else if (res?.data?.status === 401) {
          tokenInvalid({navigation});
        } else {
          console.log('server error');
        }
      }
    }
  };
  const doneWallettransaction = async (payId, transaction_id) => {
    let body = new FormData();
    body.append('transaction_id', transaction_id);
    body.append('payment_id', payId);
    const res = await Axios({
      method: 'post',
      url: URL.WALLET_TRANSACTION_DONE,
      data: body,
    });
    if (res?.data?.status === 200) {
      console.log('complet transaction');
      Alert.alert('payment done successfully');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const startRazorPay = transaction_id => {
    var options = {
      // description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: KEY.RAZORPAY_KEY,
      // key: 'rzp_test_pEatVnNv1CVnsI',
      amount: amount * 100,
      name: `${userData.first_name}${userData.last_name}`,
      prefill: {
        email: userData.email,
        contact: userData.contact,
        name: 'ArtTalent',
      },
      // theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success

        if (data.razorpay_payment_id) {
          console.log(data);

          doneWallettransaction(data.razorpay_payment_id, transaction_id);
          setAmount('');
        } else {
          Alert.alert('Payment Cancelled!');
        }
      })
      .catch(error => {
        // handle failure
        console.log(error);

        Alert.alert('Payment Cancelled!');
      });
  };
  const getView = () => {
    if (stateCheck === 'upi') {
      return (
        <View key={'#jkdk85sh85285'}>
          <View style={{marginTop: hp(-10)}}>
            <InputText
              key={'#jkdksh'}
              placeholder={'Amount (INR)'}
              placeholderTextColor={'#828282'}
              inputTextStyle={{textAlign: 'center', width: '100%'}}
              width={'90%'}
              height={'6%'}
              keyboardType={'numeric'}
              onChangeText={txt => {
                if (txt.in) {
                  console.log('Enter Valid Amount');
                } else {
                  setAmount(txt.trim());
                }
              }}
              value={amount}
            />
          </View>
          {/* <View style={{marginBottom: hp(4)}}>
            <InputText
              key={'#jkdksh852'}
              placeholder={'Email address'}
              placeholderTextColor={'#828282'}
              inputTextStyle={{textAlign: 'center', width: '100%'}}
              width={'90%'}
              height={'6%'}
            />
          </View>
          <View style={{marginBottom: hp(4)}}>
            <InputText
              key={'#jkdk874sh'}
              placeholder={'UPI ID'}
              placeholderTextColor={'#828282'}
              inputTextStyle={{textAlign: 'center', width: '100%'}}
              width={'90%'}
              height={'6%'}
            />
          </View> */}
        </View>
      );
    }
    // if (stateCheck === 'card') {
    //   return (
    //     <View key={'#jkdksh85kk2'}>
    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           placeholder={'Amount (INR)'}
    //           placeholderTextColor={'#828282'}
    //           style={{textAlign: 'center'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>

    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           placeholder={'Email address'}
    //           placeholderTextColor={'#828282'}
    //           style={{textAlign: 'center'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>

    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           placeholder={'Card Number'}
    //           placeholderTextColor={'#828282'}
    //           style={{textAlign: 'center'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>
    //       <View
    //         style={{
    //           marginBottom: hp(4),
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //         }}>
    //         <View style={{}}>
    //           <InputText
    //             inputTextStyle={{textAlign: 'center', width: '100%'}}
    //             placeholder={'Expiry Date'}
    //             placeholderTextColor={'#828282'}
    //             style={{textAlign: 'center'}}
    //             width={'43%'}
    //             height={'6%'}
    //           />
    //         </View>
    //         <View style={{alignItems: 'flex-end'}}>
    //           <InputText
    //             inputTextStyle={{textAlign: 'center', width: '100%'}}
    //             placeholder={'CVV'}
    //             placeholderTextColor={'#828282'}
    //             // style={{textAlign: 'center'}}
    //             width={'43%'}
    //             height={'6%'}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //   );
    // }

    // if (stateCheck === 'bank') {
    //   return (
    //     <View key={'#jkdksh8574852'}>
    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           placeholder={'Amount (INR)'}
    //           placeholderTextColor={'#828282'}
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>
    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           placeholder={'Email address'}
    //           placeholderTextColor={'#828282'}
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>
    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           placeholder={'ifsc code'}
    //           placeholderTextColor={'#828282'}
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>
    //       <View style={{marginBottom: hp(4)}}>
    //         <InputText
    //           placeholder={'bank account number'}
    //           placeholderTextColor={'#828282'}
    //           inputTextStyle={{textAlign: 'center', width: '100%'}}
    //           width={'90%'}
    //           height={'6%'}
    //         />
    //       </View>
    //     </View>
    //   );
    // }
  };
  useEffect(() => {
    getData('Auth');
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header
            leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
            onClickLeftIcon={() => navigation.goBack()}
            centerText={'Add Balance'}
            centerTextStyle={{paddingLeft: wp(1), fontWeight: '500'}}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp(5),
              marginTop: hp(3),
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.textStyleH3}>Select payment method</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.textStyle}>₹ 600</Text>
              <Text style={styles.textStyleH2}>Balance</Text>
            </View>
          </View> */}

          {/* *******************************************neomorph Tab Layout*************************************************************************** */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Neomorph
              // inner
              swapShadows
              lightShadowColor="#BDBDBD"
              darkShadowColor="black"
              style={[styles.NeomorphContainer, {marginBottom: hp(15)}]}>
              <Text style={{color: 'white'}}>Add Money To Wallet</Text>
            </Neomorph>
            <View style={{marginBottom: hp(4)}}>{getView()}</View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: wp(10),
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (amount && !isNaN(amount)) {
                    startWalletTransaction();
                  } else {
                    Alert.alert('Enter Valid Amount!');
                  }
                }}>
                <View>
                  {/* <Neomorph
                    lightShadowColor="#FFFFFF"
                    darkShadowColor="#000000"
                    swapShadows
                    style={styles.NeomorphButtonContainer}>
                    <Neomorph
                      lightShadowColor="#FFFFFF"
                      darkShadowColor="#000000"
                      inner
                      style={[
                        styles.NeomorphButtonStyle,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                        }}>
                        Withdraw
                      </Text>
                    </Neomorph>
                  </Neomorph> */}
                  <Image
                    resizeMode="contain"
                    style={{
                      height: wp(23),
                      width: wp(50),
                      marginTop: wp(-10),
                    }}
                    source={require('../../assets/Images/About/withdrawBtn.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBalance;
