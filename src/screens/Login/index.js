import React, {useState, useEffect} from 'react';
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
import {isValidPhone} from '../../config/inputValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios, URL, rawData} from '@config';
import {Text, TextInput, InputText} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const Login = props => {
  // console.log(props, isValidPhone('7859632588888888888'));
  const [auth, setAuth] = useState(false);
  const {navigation, route} = props;
  const [phone, setPhone] = useState('');
  const [referalCode, setReferalCode] = useState('');
  const [disBtn, setDisableBtn] = useState(false);

  const onLogin = async () => {
    setDisableBtn(true);
    let validateStatus = true;
    let errorMsg = '';
    if (!isValidPhone(phone)) {
      validateStatus = false;
      if (phone === '') {
        errorMsg = errorMsg + 'Phone Number is Required!\n';
      } else if (phone.length !== 10) {
        errorMsg = errorMsg + 'Phone Number must be  10 Digit!\n';
      } else {
        errorMsg = errorMsg + 'Phone Number is Wrong!\n';
      }
    }
    if (validateStatus) {
      let body = new FormData();
      body.append('contact', phone);
      body.append('referral_code', referalCode);
      const res = await Axios({
        method: 'post',
        url: URL.LOGIN_URL,
        data: body,
      });
      if (res?.data?.status === 200) {
        setDisableBtn(false);
        navigation.navigate('Verification', {
          phone,
          encrypted_otp: res.data.encrypted_otp,
          referC: referalCode,
        });
      } else if (res?.data?.status === 202) {
        Alert.alert('Invalid referral code');
        setDisableBtn(false);
      } else {
        Alert.alert(
          res?.data?.message
            ? res.data.message
            : rawData.SERVER_DEFAULT_MESSAGE,
        );
        setDisableBtn(false);
      }
    } else {
      setDisableBtn(false);
      Alert.alert(errorMsg);
    }
  };

  return (
    <View style={styles.containerLogin}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView>
          <View style={styles.textContainer}>
            <Image
              style={[
                styles.logoContainer,
                {
                  resizeMode: 'contain',
                  width: wp(35),
                  height: wp(35),
                  marginBottom: hp(4),
                },
              ]}
              source={require('../../assets/Images/Login/appLogo.png')}
            />
            <Image
              style={styles.welcomeText}
              source={require('../../assets/Images/Home/ARTalent-text.png')}
            />
          </View>
          <View style={{marginTop: hp('5'), marginBottom: hp(3)}}>
            <Text style={styles.beginingTv}>A beginning to your destiny</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: hp(4),
              flexDirection: 'row',
              // backgroundColor: 'yellow',
              paddingHorizontal: wp(4),
            }}>
            <Image
              style={{
                width: wp(6),
                height: wp(6),
                resizeMode: 'contain',
                marginRight: wp(1),
              }}
              source={require('../../assets/Images/Login/phone.png')}></Image>
            <InputText
              value={phone}
              keyboardType="numeric"
              onChangeText={text => {
                setPhone(text.replace(/[^0-9]/g, ''));
              }}
              inputTextStyle={{paddingLeft: wp(5)}}
              placeholder="Phone"
              placeholderTextColor="#828282"
              width={'85%'}
              height={'7%'}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: hp(4),
              flexDirection: 'row',
              // backgroundColor: 'yellow',
              paddingHorizontal: wp(4),
            }}>
            <Image
              style={{
                width: wp(6),
                height: wp(6),
                resizeMode: 'contain',
                marginRight: wp(1),
              }}
              source={require('../../assets/Images/Login/accessibility-human.png')}></Image>
            <InputText
              inputTextStyle={{paddingLeft: wp(5)}}
              value={referalCode}
              onChangeText={text => {
                setReferalCode(text);
              }}
              placeholder="referral (Optional)"
              // source={require('../../assets/Images/Login/accessibility-human.png')}
              placeholderTextColor="#828282"
              width={'85%'}
              height={'7%'}
            />
          </View>
          <View>
            <Text style={styles.optText}>You will recieve a OTP</Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: wp('15%'),
            }}
            disabled={disBtn}
            onPress={() => {
              onLogin();
            }}>
            <View
              style={{
                alignItems: 'center',
                padding: 10,
              }}>
              <Image
                style={{
                  width: wp(60),
                  height: hp(9),
                  resizeMode: 'stretch',
                  marginTop: wp(-10),
                }}
                source={require('../../assets/Images/Button/buttonLogin.png')}></Image>
              {/* <View
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
                    width: wp(70),
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
                      title="Log In"
                      borderwidth="1"
                      width="100%"
                      padding="5"
                      borderColor="red"
                      textAlign="center"
                      height="6"
                      style={{color: 'white', justifyContent: 'center'}}>
                      Login
                    </Text>
                  </View>
                </NeomorphFlex>
              </View> */}
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;
