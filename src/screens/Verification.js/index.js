import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import {Text, TextInput, InputText, CustomButton} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {onLogin, onLogout} from '@config';
import {Axios, URL} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
const Verification = props => {
  const {navigation, route} = props;
  var [input1, setInput1] = useState(React.createRef());
  var [input2, setInput2] = useState(React.createRef());
  var [input3, setInput3] = useState(React.createRef());
  var [input4, setInput4] = useState(React.createRef());
  const [deviceId, setDeviceId] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [fourthValue, setFourthValue] = useState('');
  const [unMatchedOtp, setUnmatchedOtp] = useState('');
  const [autoOtp, setAutoOtp] = useState('');
  const validpass = route.params.otp;
  const dispatch = useDispatch();
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    }
  };

  const autoOtpVerify = () => {
    let opt = firstValue + secondValue + thirdValue + fourthValue;
    if (opt.length === 4 && otp !== '') {
      console.log('reday');
    }
  };
  const Auth = async otp => {
    const fcmToken = await messaging().getToken();

    if (otp.length === 4 && otp !== '') {
      let body = new FormData();
      body.append('contact', route.params.phone);
      body.append('referral_code', route.params.referC);
      body.append('otp', otp);
      body.append('device_token', fcmToken);
      body.append('encrypted_otp', route.params.encrypted_otp);
      const res = await Axios({
        method: 'post',
        url: URL.OTP_VERIFY_URL,
        data: body,
      });
      if (res.data.status === 200) {
        onLogin(res.data);
        console.log('resssssssss' + res.data);

        dispatch({type: 'SET_PROFILE', data: {isLogin: true, ...res.data}});

        if (res.data.user_data === null) {
          navigation.replace('Details');
        } else if (res.data.user_interest === null) {
          navigation.replace('SelectInterest');
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'DrawerNavigation'}],
          });
          // navigation.replace('DrawerNavigation');
        }
      } else {
        Alert.alert(
          res?.data?.message ? res?.data?.message : 'invalid Otp Server',
        );
      }
    } else {
      Alert.alert('Invalid OTP!');
    }

    // if (otp === '1234') {
    // try {
    //   onLogin();
    //   navigation.replace('Details');
    // } catch (e) {
    //   // saving error
    //   Alert.alert('Error get in AsyncStorage');
    // }
    // }
  };
  const checkValidation = text => {
    if (
      text.length === 1 &&
      text !== ' ' &&
      text !== '-' &&
      text !== ',' &&
      text !== '.'
    ) {
      return true;
    } else {
      false;
    }
  };
  const otpHandler = message => {
    const otp = /(\d{4})/g.exec(message)[1];
    RNOtpVerify.removeListener();
    // checkToken();
    setAutoOtp(otp);
    Auth(otp);
    console.log('here at 118 ' + otp);
  };
  useEffect(() => {
    // checkToken();
    console.log(input1);
    input1.current;
    RNOtpVerify.getHash().then(console.log).catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));
  }, []);
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>Verification code</Text>
          <Text style={styles.textStyle2}>
            {`Please enter the code sent to - ${route?.params?.phone}`}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <InputText
            keyboardType={'numeric'}
            value={firstValue}
            setRef={setInput1}
            autoFocus={true}
            onChangeText={text => {
              if (firstValue.length === 0) {
                if (checkValidation(text)) {
                  setFirstValue(text.trim());
                  input2.current ?? input2.focus();
                }
              }
              if (firstValue.length === 1) {
                if (text.length === 0) {
                  setFirstValue('');
                }
                if (text.length > 1) {
                  input2.current ?? input2.focus();
                }
              }
            }}
            width={'12%'}
            height={'6%'}
            NeomorphContainer={{borderRadius: 15}}
            NeomorphStyle={{borderRadius: 15}}
            inputTextStyle={{
              textAlign: 'center',
              width: '100%',
              paddingLeft: 0,
            }}
          />
          <InputText
            keyboardType={'numeric'}
            value={secondValue}
            onChangeText={text => {
              if (secondValue.length === 0) {
                if (checkValidation(text)) {
                  setSecondValue(text.trim());
                  input3.current ?? input3.focus();
                }
              }
              if (secondValue.length === 1) {
                if (text.length === 0) {
                  setSecondValue('');
                  input1.current ?? input1.focus();
                }
                if (text.length > 1) {
                  input3.current ?? input3.focus();
                }
              }
            }}
            setRef={setInput2}
            width={'12%'}
            height={'6%'}
            NeomorphContainer={{borderRadius: 15}}
            NeomorphStyle={{borderRadius: 15}}
            inputTextStyle={{
              textAlign: 'center',
              width: '100%',
              paddingLeft: 0,
            }}
          />
          <InputText
            keyboardType={'numeric'}
            value={thirdValue}
            onChangeText={text => {
              if (thirdValue.length === 0) {
                if (checkValidation(text)) {
                  setThirdValue(text.trim());
                  input4.current ?? input4.focus();
                }
              }
              if (thirdValue.length === 1) {
                if (text.length === 0) {
                  setThirdValue('');
                  input2.current ?? input2.focus();
                }
                if (text.length > 1) {
                  input4.current ?? input4.focus();
                }
              }
            }}
            setRef={setInput3}
            width={'12%'}
            height={'6%'}
            NeomorphContainer={{borderRadius: 15}}
            NeomorphStyle={{borderRadius: 15}}
            inputTextStyle={{
              textAlign: 'center',
              width: '100%',
              paddingLeft: 0,
            }}
          />
          <InputText
            keyboardType={'numeric'}
            value={fourthValue}
            onChangeText={text => {
              console.log(text);
              if (fourthValue.length === 0) {
                if (checkValidation(text)) {
                  setFourthValue(text.trim());
                  let myOtp = firstValue + secondValue + thirdValue + text;
                  console.log('here' + myOtp);
                  if (myOtp.length === 4 && myOtp !== '') {
                    setUnmatchedOtp(myOtp);
                    console.log('here2' + myOtp);
                    if (validpass === unMatchedOtp) {
                      Auth(firstValue + secondValue + thirdValue + fourthValue);
                    } else {
                      console.log('unmatched at line 231');
                    }
                  }
                }
              }
              if (fourthValue.length === 1) {
                if (text.length === 0) {
                  setFourthValue('');
                  input3.current ?? input3.focus();
                }
              }
            }}
            setRef={setInput4}
            width={'12%'}
            height={'6%'}
            NeomorphContainer={{borderRadius: 15}}
            NeomorphStyle={{borderRadius: 15}}
            inputTextStyle={{
              textAlign: 'center',
              width: '100%',
              paddingLeft: 0,
            }}
          />
        </View>
        <TouchableOpacity
          style={{marginTop: wp('25%')}}
          onPress={() => {
            console.log(firstValue + secondValue + thirdValue + fourthValue);
            Auth(firstValue + secondValue + thirdValue + fourthValue);
          }}>
          <View
            style={{
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: '#4F4F4F',
              borderRadius: 20,
            }}>
            <NeomorphFlex
              inner
              lightShadowColor="#ffffff"
              darkShadowColor="#000000"
              style={{
                shadowOffset: {width: -1, height: -15},
                shadowRadius: 8,
                shadowOpacity: 0.2,
                borderRadius: 18,
                backgroundColor: '#1A1A1A',
                width: wp(60),
                height: hp(6),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    justifyContent: 'center',
                    color: '#F2F2F2',
                  }}>
                  Submit
                </Text>
              </View>
            </NeomorphFlex>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Verification;
