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
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TextInput,
  InputText,
  HeadWrapper,
  DropdownInput,
  Header,
} from '@components';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import styles from './styles';

const Withdraw = props => {
  const {navigation, route} = props;
  const [selectBank, setSelectBank] = useState('');
  const [amount, setAmount] = useState('');
  const [holderName, setHolderName] = useState('');
  const [walletBal, setWallBal] = useState(0);
  const [accNumber, setAccNumber] = useState('');
  const pattren = '^[A-Za-z][A-Za-z0-9_]{7,29}$';
  const [validCheck, setValidCheck] = useState(false);
  const [ifsc_code, setIfsc_code] = useState('');
  const [bankList, setBankList] = useState([]);
  const getWalletData = async () => {
    const res = await Axios({
      method: 'post',
      url: URL.GET_WALLET_DATA,
    });
    if (res?.data?.status === 200) {
      setWallBal(res.data.transaction_details.total_balance);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };

  const checkVal = () => {
    if (selectBank === '') {
      return false;
    } else if (amount.trim() === '') {
      return false;
    } else if (holderName.trim() === '') {
      return false;
    } else if (accNumber.trim() === '') {
      return false;
    } else if (ifsc_code.trim() === '') {
      return false;
    } else {
      return true;
    }
  };
  const getBankList = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_BANK_LIST,
    });
    if (res?.data?.status === 200) {
      console.log(res?.data?.bank_list[0].name);
      setBankList(
        res?.data.bank_list.map(item => ({
          key: item.code,
          label: item.name,
        })),
      );
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const withdrawRequest = async user_id => {
    if (checkVal() === true) {
      const res = await Axios({
        method: 'post',
        url: URL.WITHDRAW_BALANCE,
        data: {
          amount: amount,
          account_holder_name: holderName,
          account_number: accNumber,
          ifsc_code: ifsc_code,
          bank_name: selectBank,
        },
      });
      if (res?.data?.status === 200) {
        Alert.alert('Request Sent');
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      } else if (res?.data?.status === 202) {
        Alert.alert('Withdraw Request Already Pending');
      } else {
        console.log('server not responding', res);
      }
    } else {
      Alert.alert('Enter Valid Data');
    }
  };
  useEffect(() => {
    getBankList();
    getWalletData();
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header
            leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
            centerIcon={require('../../assets/Images/Withdraw/wallet.png')}
            onClickLeftIcon={() => navigation.goBack()}
            centerText={'Withdraw'}
            centerTextStyle={{paddingLeft: wp(1), fontWeight: '400'}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp(5),
              marginVertical: hp(3),
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.textStyleH3}>Available Balance</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.textStyle}>{'₹' + walletBal}</Text>
              {/* <Text style={styles.textStyleH2}>Balance</Text> */}
            </View>
          </View>

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
              style={[styles.NeomorphContainer, {marginBottom: hp(5)}]}>
              <Neomorph
                inner
                lightShadowColor="#444444"
                darkShadowColor="#1A1A1A"
                style={styles.NeomorphStyle}>
                <View style={[styles.tabButtonContainer, {}]}>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{height: '100%'}}>
                      <Text
                        style={[
                          {
                            color: '#6FCF97',
                          },
                          styles.textStylesTab,
                        ]}>
                        BANK ACCOUNT DETAILS
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Neomorph>
            </Neomorph>
            <View style={{marginBottom: hp(4)}}>
              <View key={'#jkdksh8574852'}>
                <View style={{marginBottom: hp(4)}}>
                  <InputText
                    placeholder={'Amount (INR)'}
                    placeholderTextColor={'#828282'}
                    keyboardType={'numeric'}
                    inputTextStyle={{textAlign: 'center', width: '100%'}}
                    onChangeText={text => {
                      if (amount.length > 4) {
                        Alert.alert('Enter Valid Amount');
                        setAmount('');
                      } else {
                        setAmount(text);
                      }
                    }}
                    width={'90%'}
                    height={'6%'}
                  />
                </View>
                <View style={{marginBottom: hp(4)}}>
                  <InputText
                    placeholder={'Account Holder Name'}
                    placeholderTextColor={'#828282'}
                    inputTextStyle={{textAlign: 'center', width: '100%'}}
                    onChangeText={text => {
                      //set name vaidation plase
                      const condition = new RegExp(pattren, 'g');
                      if (condition.test(holderName)) {
                        Alert.alert('Enter Valid Name ');
                        setHolderName('');
                      } else {
                        setHolderName(text);
                      }
                    }}
                    width={'90%'}
                    height={'6%'}
                  />
                </View>
                <View style={{marginBottom: hp(4)}}>
                  <InputText
                    placeholder={'Account Number'}
                    placeholderTextColor={'#828282'}
                    inputTextStyle={{textAlign: 'center', width: '100%'}}
                    keyboardType={'numeric'}
                    onChangeText={text => {
                      if (accNumber.length > 15) {
                        Alert.alert('Enter Valid Account Number');
                        setAccNumber('');
                      } else {
                        setAccNumber(text);
                      }
                    }}
                    width={'90%'}
                    height={'6%'}
                  />
                </View>
                <View style={{marginBottom: hp(4)}}>
                  <InputText
                    placeholder={'IFSC Code'}
                    placeholderTextColor={'#828282'}
                    inputTextStyle={{textAlign: 'center', width: '100%'}}
                    // keyboardType={}
                    onChangeText={text => {
                      setIfsc_code(text);
                    }}
                    width={'90%'}
                    height={'6%'}
                  />
                </View>
                <View style={{marginBottom: hp(4), alignItems: 'center'}}>
                  <DropdownInput
                    onChange={text => {
                      setSelectBank(text.label);
                      console.log(text.label);
                    }}
                    data={bankList}
                    placeholder={selectBank === '' ? 'select Bank' : selectBank}
                    width={90}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></DropdownInput>
                  {/* <DropdownInput
                    onChange={text => {
                      console.log(text);
                      setSelectBank(text.data);
                    }}
                    data={bankList}
                    placeholder={selectBank.data}
                    width={90}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></DropdownInput> */}
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (amount >= 100) {
                    withdrawRequest();
                  } else {
                    Alert.alert('Minimum Amount Withdraw 100 Rupees');
                  }
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: wp(55),
                    height: wp(30),
                  }}
                  source={require('../../assets/Images/Withdraw/WithdrawBtn.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdraw;
