import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, DropdownInput, SmallColorButton, Loader} from '@components';
import {Neomorph} from 'react-native-neomorph-shadows';
import RazorpayCheckout from 'react-native-razorpay';
import {NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import styles from './styles';
import {set} from 'react-native-reanimated';
const ViewSpecialContest = props => {
  const {navigation, route} = props;
  console.log(route.params);
  const [userData, setUserData] = useState(null);
  const [apiLoadingStatus, setApiLoadingStatus] = useState(true);
  const [balance, setBalance] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState({label: 'Select Country', key: 0});
  const [states, setStates] = useState({label: 'Select State', key: 0});
  const [city, setCity] = useState({label: 'Select City', key: 0});
  const [balanceStatus, setBalStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [rfStatus, setRfStatus] = useState(false);
  const [date, setDate] = useState('');
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [sContestData, setScontestData] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState(false);
  const [transactionIdDetails, setTransactionDetails] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [fullTax, setFullTax] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [modalValues, setModelValues] = useState([]);
  const [amountTax, setAmountTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fakeTransId, setFakeTransId] = useState(0);
  const [fakePayId, setFakePayId] = useState(0);
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();

    const paymentId = 'pay_' + Math.random().toString().slice(2, 17);

    setFakePayId(paymentId);
    console.log(paymentId);
  };
  const freeTrans = async () => {
    console.log('free trans');
    let body = new FormData();
    body.append('contest_id', route.params.special_id);
    body.append('country_id', country.key);
    body.append('state_id', states.key);
    body.append('district_id', city.key);
    body.append(
      'payment_gateway_amount',
      modalValues.razorpay_status === true ? modalValues.amount : 0,
    );
    body.append(
      'referral_amount',
      rfStatus ? sContestData.referral_deduction_amount : 0,
    );
    body.append('wallet_amount', balanceStatus ? sContestData.balance : 0);
    const res = await Axios({
      method: 'post',
      url: URL.INITIATE_TRANSACTION,
      data: body,
    });
    if (res?.data?.status === 200) {
      setFakeTransId(res?.data?.transaction_details?.transaction_id);
      checkToken();
      console.log('fake_trans_Started');
      freeTransDone(res?.data?.transaction_details?.transaction_id);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const freeTransDone = async transid => {
    let body = new FormData();
    body.append('transaction_id', transid);
    body.append('payment_id', 'pay_' + Math.random().toString().slice(2, 17));
    const res = await Axios({
      method: 'post',
      url: URL.COMPLETE_TRANSACTION,
      data: body,
    });
    if (res?.data?.status === 200) {
      getContestData();
      console.log('Fake_completed');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else if (res?.data?.status === 403) {
      console.log('payment failed');
    } else {
      console.log('server error');
    }
  };
  const initiateTrans = async () => {
    console.log('Paid Trans');
    //less then 10 check
    let walletXAmount = sContestData.balance;
    let totalWaltAmount = 10;
    let finalWalAmmount = 0;
    if (modalValues.razorpay_status == true) {
      console.log('here in first', walletXAmount);
      walletXAmount = modalValues.entry_fee - walletXAmount;
      console.log('here in first1', walletXAmount);
      finalWalAmmount = 10 - walletXAmount;
      console.log('here in first2', finalWalAmmount);
      totalWaltAmount = sContestData.balance - finalWalAmmount;
      console.log('here in first3', totalWaltAmount);
    } else if (balanceStatus === false) {
      totalWaltAmount = 0;
      console.log('here in second');
    } else {
      totalWaltAmount = sContestData.balance;
      console.log('here in third');
    }
    const walletAmount = checkStatus ? sContestData.wallet_deduction_amount : 0;
    const paymentGatewayAmount = checkStatus
      ? sContestData.payment_gateway_amount
      : sContestData.payment_gateway_amount +
        sContestData.wallet_deduction_amount;
    let body = new FormData();
    console.log(countryData + ' ' + stateData + ' ' + districtData);
    if (country.key === 0 || states.key === 0 || city.key === 0) {
      Alert.alert('All fields are required ');
    } else {
      body.append('contest_id', route.params.special_id);
      body.append('country_id', country.key);
      body.append('state_id', states.key);
      body.append('district_id', city.key);
      body.append(
        'payment_gateway_amount',
        modalValues.razorpay_status === true ? modalValues.amount : 0,
      );
      body.append(
        'referral_amount',
        rfStatus ? sContestData.referral_deduction_amount : 0,
      );
      body.append('wallet_amount', totalWaltAmount);
      const res = await Axios({
        method: 'post',
        url: URL.INITIATE_TRANSACTION,
        data: body,
      });
      if (res?.data?.status === 200) {
        openRazorpay(res.data.transaction_details);
        setTransactionDetails(res.data.transaction_details);
        console.log('trans_Started');
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      } else {
        Alert.alert('Servor Error');
      }
    }
  };
  const payForContest = async () => {
    let body = new FormData();
    body.append('balance', balanceStatus ? sContestData.balance : 0);
    body.append('contest_id', route.params.special_id);
    body.append(
      'referearn',
      rfStatus ? sContestData.referral_deduction_amount : 0,
    );
    const res = await Axios({
      method: 'post',
      url: URL.payContestFee,
      data: body,
    });
    if (res?.data?.status === 200) {
      setModelValues(res?.data?.contest_details);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('Servor Error');
    }
  };
  const toggleModal = key => {
    payForContest();
    setModalVisible(!isModalVisible);
    console.log(gstAmount + fullTax);
    setAmountTax(gstAmount + fullTax);

    setTotalAmount(sContestData.entry_fee + amountTax);
  };

  const openRazorpay = transactionDetails => {
    var options = {
      currency: 'INR',
      key: KEY.RAZORPAY_KEY, // Your api key
      amount: parseInt(modalValues.total * 100),
      name: `${userData.first_name} ${userData.last_name}`,
      prefill: {
        email: `${userData.email}`,
        contact: `${userData.contact}`,
        name: `${userData.first_name} ${userData.last_name}`,
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log(data);
        if (data.razorpay_payment_id) {
          // alert(`Success: ${data.razorpay_payment_id}`);
          transactionDone(
            data.razorpay_payment_id,
            transactionDetails.transaction_id,
          );
        } else {
          Alert.alert('Payment Cancelled!');
        }
      })
      .catch(error => {
        // handle failure
        console.log(error);
        Alert.alert('Payment Cancelled!');
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  const transactionDone = async (payId, transactionId) => {
    let body = new FormData();
    console.log(transactionId + 'transaction id of user');
    body.append('transaction_id', transactionId);
    body.append('payment_id', payId);
    const res = await Axios({
      method: 'post',
      url: URL.COMPLETE_TRANSACTION,
      data: body,
    });
    if (res?.data?.status === 200) {
      console.log('completed');
      getContestData();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else if (res?.data?.status === 403) {
      console.log('payment failed');
    } else {
      Alert.alert('Payment Cancelled!');
    }
  };
  const getContestData = async () => {
    setApiLoadingStatus(true);
    let body = new FormData();
    body.append('contest_id', route.params.special_id);
    const res = await Axios({
      method: 'post',
      url: URL.GET_ALL_CONTEST_DETAILS,
      data: body,
    });
    if (res?.data?.status === 200) {
      setScontestData(res?.data?.contest_details);
      setRegistrationLimit(res?.data?.contest_details.participate_status);
      setRegistrationLimit(res?.data?.contest_details.participate_status);
      setFullTax((res?.data?.contest_details.entry_fee / 100) * 2);
      setGstAmount((fullTax / 100) * 18);
      var dates = new Date(res?.data?.contest_details.end_date);
      const dateArr = dates.toString().split(' ');
      setDate(dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3]);
      console.log(date);
      setCountryData(
        res?.data?.contest_details.country_name.map(item => ({
          key: parseInt(item.id),
          label: item.country,
        })),
      );
      setStateData(
        res?.data?.contest_details.state_names.map(item => ({
          key: parseInt(item.id),
          label: item.states_name,
          countryId: parseInt(item.country_id),
        })),
      );
      setDistrictData(
        res?.data?.contest_details.district_names.map(item => ({
          key: parseInt(item.id),
          label: item.district_name,
          countryId: parseInt(item.country_id),
          stateId: parseInt(item.state_id),
        })),
      );
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
    setApiLoadingStatus(false);
  };
  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(data);
      if (data !== null) {
        setUserData(data?.user_data);
        //  setStateData(
        //    data.state.map(item => ({
        //      key: parseInt(item.id),
        //      label: item.states_name,
        //      countryId: parseInt(item.country_id),
        //    })),
        //  );
        //  setCountryData(
        //    data.country.map(item => ({
        //      key: parseInt(item.id),
        //      label: item.country,
        //    })),
        //  );
        //  setDistrictData(
        //    data.district.map(item => ({
        //      key: parseInt(item.id),
        //      label: item.district_name,
        //      countryId: parseInt(item.country_id),
        //      stateId: parseInt(item.state_id),
        //    })),
        //  );
      }
    } catch (e) {
      // error reading value
    }
  };
  // const getData = async key => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(key);
  //     const data = jsonValue != null ? JSON.parse(jsonValue) : null;
  //     console.log(data);
  //     if (data !== null) {
  //       setUserData(data.user_data);
  //       setStateData(
  //         data.state.map(item => ({
  //           key: parseInt(item.id),
  //           label: item.states_name,
  //           countryId: parseInt(item.country_id),
  //         })),
  //       );
  //       setCountryData(
  //         data.country.map(item => ({
  //           key: parseInt(item.id),
  //           label: item.country,
  //         })),
  //       );
  //       setDistrictData(
  //         data.district.map(item => ({
  //           key: parseInt(item.id),
  //           label: item.district_name,
  //           countryId: parseInt(item.country_id),
  //           stateId: parseInt(item.state_id),
  //         })),
  //       );
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };
  const getDistrictData = () => {
    if (country.key === 0 && states.key === 0) {
      return districtData;
    } else if (country.key !== 0 && states.key === 0) {
      return districtData.filter(item => item.countryId === country.key);
    } else if (country.key === 0 && states.key !== 0) {
      return districtData.filter(item => item.stateId === states.key);
    } else if (country.key !== 0 && states.key !== 0) {
      return districtData.filter(
        item => item.stateId === states.key && item.countryId === country.key,
      );
    }
  };
  useEffect(() => {
    getData('Auth');
    getContestData();
  }, []);

  return apiLoadingStatus ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.bodyStyle}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Special Contest'}
      />
      <ScrollView style={{flexGrow: 1}}>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: wp(2),
            marginTop: hp(1),
          }}>
          <ImageBackground
            imageStyle={{borderRadius: wp(0)}}
            style={{height: wp(70), width: wp(90)}}
            source={{
              uri:
                sContestData.image === null
                  ? 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
                  : sContestData.image,
            }}></ImageBackground>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: wp(2.5),
                flex: 1,
                marginTop: hp(2),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRightWidth: wp(0.1),
                  borderRightColor: 'white',
                  paddingHorizontal: wp(1),
                }}>
                <Image
                  style={{width: wp(5), height: wp(5)}}
                  source={require('../../assets/Images/RegularContest/mapPin.png')}
                />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {sContestData.city}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRightWidth: wp(0.1),
                  borderRightColor: 'white',
                  paddingHorizontal: wp(1),
                }}>
                <Image
                  style={{width: wp(4), height: wp(4)}}
                  source={require('../../assets/Images/RegularContest/person.png')}
                />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Members
                </Text>
                <Text
                  style={{
                    color: '#EB5757',
                    marginHorizontal: 2,
                  }}>
                  {sContestData.member}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  borderRightWidth: wp(0.1),
                  borderRightColor: 'white',
                  paddingHorizontal: wp(1),
                }}>
                <Text
                  style={{
                    color: '#828282',
                    fontSize: wp(3),
                  }}>
                  Start Date
                </Text>
                <Text
                  style={{
                    color: 'white',

                    fontSize: wp(3),
                  }}>
                  {sContestData.start_date}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  borderRightWidth: wp(0.1),
                  borderRightColor: 'white',
                  paddingHorizontal: wp(1),
                }}>
                <Text
                  style={{
                    color: '#828282',

                    fontSize: wp(3),
                  }}>
                  End Date
                </Text>
                <Text
                  style={{
                    color: 'white',

                    fontSize: wp(3),
                  }}>
                  {sContestData.end_date}
                </Text>
              </View>
            </View>
            {/* **Card Details** */}
            <View
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
                paddingVertical: wp(3),
                marginBottom: hp(1),
                justifyContent: 'center',
              }}>
              <NeomorphFlex
                darkShadowColor="white" // <- set this
                lightShadowColor="black" // <- this
                style={{
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.2,
                  shadowColor: 'black',
                  shadowRadius: 2,
                  borderRadius: 1,
                  padding: 10,
                  elevation: 10,
                  backgroundColor: '#1A1A1A',
                  width: '100%',
                }}>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1}}>
                      <Text style={{color: 'white', opacity: 0.5}}>Title</Text>
                    </View>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: '#EB5757'}}>
                        {sContestData.title}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        Description
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text numberOfLines={1} style={{color: 'white'}}>
                        {sContestData.description}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        Reg. Fee
                      </Text>
                    </View>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white'}}>
                        {'₹' + sContestData.entry_fee}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        Reg. End Date
                      </Text>
                    </View>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: '#EB5757'}}>
                        {sContestData.end_date}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        Contest Start Date
                      </Text>
                    </View>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white'}}>
                        {sContestData.start_date}
                      </Text>
                    </View>
                  </View>
                  {sContestData?.prize?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1, marginVertical: wp(1)}}>
                        <Text style={{color: 'white', opacity: 0.5}}>
                          {item.winner.trim()}
                        </Text>
                      </View>
                      <View style={{flex: 1, marginVertical: wp(1)}}>
                        <Text style={{color: '#6FCF97'}}>
                          {'₹' + item.prize}
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, marginVertical: wp(1)}}>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        Participants
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{color: 'white'}}>
                        {`${sContestData.participants} Participants`}
                      </Text>
                    </View>
                  </View>
                </View>
              </NeomorphFlex>
            </View>
            <View style={{alignItems: 'center', marginTop: 5}}>
              <View style={{marginTop: hp(2)}}>
                <DropdownInput
                  onChange={text => {
                    console.log(text);
                    setCountry(text);
                  }}
                  data={countryData}
                  placeholder={country.label}
                  width={90}
                  TextInputStyle={{
                    width: '100%',
                    color: 'white',
                  }}></DropdownInput>
              </View>
              <View style={{marginTop: hp(2)}}>
                <DropdownInput
                  onChange={text => {
                    setStates(text);
                  }}
                  data={
                    country.key !== 0
                      ? stateData.filter(item => item.countryId === country.key)
                      : stateData
                  }
                  placeholder={states.label}
                  width={90}
                  TextInputStyle={{
                    width: '100%',
                    color: 'white',
                  }}></DropdownInput>
              </View>
              <View style={{marginTop: hp(2)}}>
                <DropdownInput
                  onChange={text => {
                    setCity(text);
                  }}
                  data={getDistrictData()}
                  placeholder={city.label}
                  width={90}
                  TextInputStyle={{
                    width: '100%',
                    color: 'white',
                  }}></DropdownInput>
              </View>
            </View>
            <View style={{marginTop: hp(3)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp(3),
                  marginVertical: hp(1),
                }}>
                <View
                  style={{
                    width: wp(2),
                    height: wp(2),
                    backgroundColor: '#BDBDBD',
                    borderRadius: wp(100),
                    marginHorizontal: wp(2),
                  }}></View>
                <Text style={{color: '#BDBDBD', fontSize: wp(2.5)}}>
                  This Contest will disappear on the end date midnight
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp(3),
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                  marginTop: hp(2),
                }}>
                <Text style={{color: '#F2C94C'}}>Balance</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#F2C94C'}}>
                    {'₹ ' + sContestData.balance}
                  </Text>
                  <CheckBox
                    disabled={sContestData.payment_status}
                    isChecked={balanceStatus}
                    checkedCheckBoxColor={'#F2C94C'}
                    style={{marginEnd: wp(1)}}
                    onClick={() => {
                      setBalStatus(!balanceStatus);
                    }}
                    checkBoxColor="white"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                  marginTop: hp(2),
                }}>
                <Text style={{color: '#F2C94C'}}>Refer & Earn Bonus</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#F2C94C'}}>
                    {'₹ ' + sContestData.referral_deduction_amount}
                  </Text>
                  <CheckBox
                    disabled={sContestData.payment_status}
                    isChecked={rfStatus}
                    checkedCheckBoxColor={'#F2C94C'}
                    style={{marginEnd: wp(1)}}
                    onClick={() => {
                      setRfStatus(!rfStatus);
                    }}
                    checkBoxColor="white"
                  />
                </View>
              </View>
            </View>
            {/* {sContestData.wallet_status && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                  marginTop: hp(2),
                }}>
                <Text style={{color: '#F2C94C'}}>Wallet amount deduction</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#F2C94C'}}>
                    {`₹ ${sContestData.wallet_deduction_amount}`}
                  </Text>
                  <CheckBox
                    disabled={sContestData.payment_status}
                    isChecked={checkStatus}
                    checkedCheckBoxColor={'#F2C94C'}
                    style={{marginEnd: wp(1)}}
                    onClick={() => {
                      setCheckStatus(!checkStatus);
                    }}
                    checkBoxColor="white"
                  />
                </View>
                
              </View>
            )} */}
            <View
              style={{
                alignItems: 'center',
                marginTop: hp(2.5),
                marginBottom: hp(3),
              }}>
              {sContestData.payment_status ? (
                <View>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                      bottom: 0,
                      top: 0,
                      zIndex: 1000,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      registrationLimit === false
                        ? country.key === 0 ||
                          states.key === 0 ||
                          city.key === 0
                          ? Alert.alert('All fields are required ')
                          : toggleModal()
                        : Alert.alert('Registration Full');
                    }}>
                    <Image
                      resizeMode="stretch"
                      style={{width: wp(35), height: wp(20)}}
                      source={require('../../assets/Images/RegularContest/PaidB.png')}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                // <SmallColorButton
                //   buttonColor={'#219653'}
                //   buttonText={
                //     contestData.payment_status === true ? 'Paid' : 'Pay'
                //   }
                //   onPress={() => {

                //   }}
                // />
                <TouchableOpacity
                  onPress={() => {
                    if (sContestData.payment_status === false) {
                      registrationLimit === false
                        ? country.key === 0 ||
                          states.key === 0 ||
                          city.key === 0
                          ? Alert.alert('All fields are required ')
                          : toggleModal()
                        : Alert.alert('Registration Full');
                    }
                  }}>
                  {sContestData.payment_status === false ? (
                    <Image
                      resizeMode="stretch"
                      style={{width: wp(35), height: wp(20)}}
                      source={require('../../assets/Images/RegularContest/PayB.png')}
                    />
                  ) : (
                    <Image
                      resizeMode="stretch"
                      style={{width: wp(35), height: wp(20)}}
                      source={require('../../assets/Images/RegularContest/PaidB.png')}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        backdropOpacity={0.5}
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          toggleModal();
        }}>
        <View
          style={{
            height: wp(50),
            backgroundColor: '#1A1A1A',
            borderRadius: wp(5),
          }}>
          <View style={{flex: 1, padding: wp(2), paddingHorizontal: wp(2)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{justifyContent: 'space-between'}}>
                <Text style={{color: 'white'}}>Title</Text>
                <Text style={{color: 'white'}}>Amount</Text>
                <Text style={{color: 'white'}}>Tax</Text>
                <Text style={{color: 'white'}}>Total</Text>
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Text style={{color: 'white'}}>{sContestData.title}</Text>
                <Text style={{color: 'white'}}>{modalValues.amount}</Text>
                <Text style={{color: 'white'}}>{modalValues.tax}</Text>
                <Text style={{color: 'white'}}>{modalValues.total}</Text>
              </View>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: wp(2),
                alignContent: 'center',
                paddingHorizontal: wp(2),
                marginTop: wp(1),
              }}>
              {modalValues.note ? 'Note :' + modalValues.note : ' '}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: hp(0.5),
              marginBottom: wp(0.5),
            }}>
            {sContestData.payment_status ? (
              <View>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 0,
                    zIndex: 1000,
                  }}></View>
                <TouchableOpacity
                  onPress={() => {
                    registrationLimit === false
                      ? sContestData.entry_fee === 0
                        ? freeTrans()
                        : initiateTrans()
                      : Alert.alert('Registration Full');
                  }}>
                  <Image
                    resizeMode="stretch"
                    style={{width: wp(35), height: wp(20)}}
                    source={require('../../assets/Images/RegularContest/PaidB.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              // <SmallColorButton
              //   buttonColor={'#219653'}
              //   buttonText={
              //     contestData.payment_status === true ? 'Paid' : 'Pay'
              //   }
              //   onPress={() => {

              //   }}
              // />
              <TouchableOpacity
                onPress={() => {
                  if (sContestData.payment_status === false) {
                    if (registrationLimit === false) {
                      console.log(
                        'here in reg limit' + modalValues.razorpay_status,
                      );
                      if (modalValues.razorpay_status === false) {
                        console.log('here in if free');
                        freeTrans();
                      } else {
                        console.log('here in if paid');
                        initiateTrans();
                      }
                    } else {
                      Alert.alert('Registration Full');
                    }
                  }
                }}>
                {sContestData.payment_status === false ? (
                  <Image
                    resizeMode="stretch"
                    style={{width: wp(35), height: wp(20)}}
                    source={require('../../assets/Images/RegularContest/PayB.png')}
                  />
                ) : (
                  <Image
                    resizeMode="stretch"
                    style={{width: wp(35), height: wp(20)}}
                    source={require('../../assets/Images/RegularContest/PaidB.png')}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ViewSpecialContest;
