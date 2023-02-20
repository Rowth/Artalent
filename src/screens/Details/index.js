import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidName} from '@config';
import {Text, TextInput, DropdownInput} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Axios, URL} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const Details = props => {
  const {navigation, route} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({label: 'Country', key: 0});
  const [states, setStates] = useState({label: 'State', key: 0});
  const [city, setCity] = useState({label: 'City', key: 0});
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const userinfo = useSelector(state => state?.Profile);
  const dispatch = useDispatch();
  let index = 0;
  const data = [
    {key: index++, section: true, label: 'Fruits'},
    {key: index++, label: 'Red Apples'},
    {key: index++, label: 'Cherries'},
    {
      key: index++,
      label: 'Cranberries',
      accessibilityLabel: 'Tap here for cranberries',
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    {key: index++, label: 'Vegetable', customKey: 'Not a fruit'},
  ];
  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(data);
      if (data !== null) {
        setStateData(
          data.state.map(item => ({
            key: parseInt(item.id),
            label: item.states_name,
            countryId: parseInt(item.country_id),
          })),
        );
        setCountryData(
          data.country.map(item => ({
            key: parseInt(item.id),
            label: item.country,
          })),
        );
        setDistrictData(
          data.district.map(item => ({
            key: parseInt(item.id),
            label: item.district_name,
            countryId: parseInt(item.country_id),
            stateId: parseInt(item.state_id),
          })),
        );
      }
    } catch (e) {
      // error reading value
    }
  };
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
  const onSubmit = async () => {
    let validateStatus = true;
    let errorMsg = '';
    if (firstName === '') {
      validateStatus = false;
      errorMsg = errorMsg + 'First Name ,';
    }
    if (lastName === '') {
      validateStatus = false;
      errorMsg = errorMsg + 'Last Name ,';
    }
    if (email === '') {
      validateStatus = false;
      errorMsg = errorMsg + 'Email ,';
    }
    if (username === '') {
      validateStatus = false;
      errorMsg = errorMsg + 'Username ,';
    }
    if (country.key === 0) {
      validateStatus = false;
      errorMsg = errorMsg + 'country ,';
    }
    if (states.key === 0) {
      validateStatus = false;
      errorMsg = errorMsg + 'State ,';
    }
    if (city.key === 0) {
      validateStatus = false;
      errorMsg = errorMsg + 'City ,';
    }
    if (validateStatus) {
      let body = new FormData();
      body.append('first_name', firstName);
      body.append('last_name', lastName);
      body.append('username', username);
      body.append('email', email);
      body.append('country', country.key);
      body.append('state', states.key);
      body.append('district', city.key);
      const res = await Axios({
        method: 'post',
        url: URL.ADD_USER_DETAILS,
        data: body,
      });
      console.log(res, 'xcxc');
      if (res?.data?.status === 200) {
        const rest = await AsyncStorage.mergeItem(
          'Auth',
          JSON.stringify({user_data: res.data.user_details}),
        );
        console.log('first');

        console.log('first2');

        dispatch({
          type: 'SET_PROFILE',
          data: {...userinfo, user_data: res.data.user_details},
        });
        navigation.replace('SelectInterest');
      } else if (res?.data?.status === 401) {
        navigation.replace('Login');
      } else {
        Alert.alert(res.data.message);
      }
    } else {
      Alert.alert(errorMsg + ' is Required! ');
    }
  };
  useEffect(() => {
    getData('Auth');
  }, []);
  // console.log(country, states, city);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{backgroundColor: '#1A1A1A', flexGrow: 1}}>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: hp(1),
              marginBottom: hp(3),
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
              elevation: 1,
            }}>
            <Text style={{marginBottom: hp(2), color: '#BDBDBD'}}>
              Add details
            </Text>
            <View style={{marginBottom: hp(2)}}>
              <Image
                style={{height: wp(25), width: wp(25), borderRadius: wp(12.5)}}
                resizeMode={'contain'}
                source={require('../../assets/Images/DetailsScreen/userImg.png')}
              />
            </View>
            <Text style={{fontSize: hp(1.5), color: '#828282'}}>
              Select profile picture
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginTop: hp(5)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: hp(2),
                  paddingHorizontal: wp(5),
                }}>
                <View style={{marginRight: wp(2)}}>
                  <Image
                    style={{width: wp(8), height: wp(8), resizeMode: 'contain'}}
                    source={require('../../assets/Images/DetailsScreen/Stroke.png')}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Neomorph
                    inner
                    lightShadowColor="#000"
                    style={[styles.NeomorphContainer, {borderRadius: 10}]}>
                    <Neomorph
                      inner
                      swapShadows
                      style={[styles.NeomorphStyle, {borderRadius: 10}]}>
                      <TextInput2
                        value={firstName}
                        onChangeText={text => {
                          setFirstName(text.trim());
                        }}
                        placeholderTextColor={'#BDBDBD'}
                        placeholder="First name"
                        style={{color: 'white', width: '100%'}}></TextInput2>
                    </Neomorph>
                  </Neomorph>
                  <Neomorph
                    inner
                    lightShadowColor="#000"
                    style={[styles.NeomorphContainer, {borderRadius: 10}]}>
                    <Neomorph
                      inner
                      swapShadows
                      style={[styles.NeomorphStyle, {borderRadius: 10}]}>
                      <TextInput2
                        style={{color: 'white', width: '100%'}}
                        value={lastName}
                        onChangeText={text => {
                          setLastName(text.trim());
                        }}
                        placeholderTextColor={'#BDBDBD'}
                        placeholder="Last Name"></TextInput2>
                    </Neomorph>
                  </Neomorph>
                </View>
              </View>
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginRight: wp(2)}}>
                  <Image
                    style={{width: wp(7), height: wp(7), resizeMode: 'contain'}}
                    source={require('../../assets/Images/DetailsScreen/hash.png')}
                  />
                </View>
                <View style={{}}>
                  <TextInput
                    value={username}
                    onChangeText={text => {
                      setUsername(text.trim());
                    }}
                    placeholder="Username"
                    width={80}
                    height={6}
                    borderRadius={10}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></TextInput>
                </View>
              </View>
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginRight: wp(3)}}>
                  <Image
                    style={{
                      width: wp(6),
                      height: wp(6),
                      resizeMode: 'contain',
                      tintColor: '#EB5757',
                    }}
                    source={require('../../assets/Images/DetailsScreen/message.png')}
                  />
                </View>
                <View style={{}}>
                  <TextInput
                    value={email}
                    onChangeText={text => {
                      setEmail(text.trim());
                    }}
                    placeholder="Email"
                    width={80}
                    height={6}
                    borderRadius={10}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></TextInput>
                </View>
              </View>
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginRight: wp(2)}}>
                  <Image
                    style={{width: wp(8), height: wp(8), resizeMode: 'contain'}}
                    source={require('../../assets/Images/DetailsScreen/flag.png')}
                  />
                </View>
                <View style={{}}>
                  <DropdownInput
                    onChange={text => {
                      setCountry(text);
                    }}
                    data={countryData}
                    placeholder={country.label}
                    width={80}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></DropdownInput>
                </View>
              </View>
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginRight: wp(2)}}>
                  <Image
                    style={{width: wp(8), height: wp(8), resizeMode: 'contain'}}
                    source={require('../../assets/Images/DetailsScreen/train.png')}
                  />
                </View>
                <View style={{}}>
                  <DropdownInput
                    onChange={text => {
                      setStates(text);
                    }}
                    data={
                      country.key !== 0
                        ? stateData.filter(
                            item => item.countryId === country.key,
                          )
                        : stateData
                    }
                    placeholder={states.label}
                    width={80}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></DropdownInput>
                </View>
              </View>
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginRight: wp(2)}}>
                  <Image
                    style={{width: wp(8), height: wp(8), resizeMode: 'contain'}}
                    source={require('../../assets/Images/DetailsScreen/location.png')}
                  />
                </View>

                <View style={{}}>
                  <DropdownInput
                    onChange={text => {
                      setCity(text);
                    }}
                    data={getDistrictData()}
                    placeholder={city.label}
                    width={80}
                    TextInputStyle={{
                      width: '100%',
                      color: 'white',
                    }}></DropdownInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: hp(5),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <TouchableOpacity onPress={() => onSubmit()}>
                    <Image
                      style={{
                        width: wp(60),
                        height: hp(9),
                        resizeMode: 'stretch',
                        marginTop: wp(-7),
                      }}
                      source={require('../../assets/Images/Button/buttonSubmitDetail.png')}></Image>

                    {/* <NeomorphFlex
                      darkShadowColor="#FFFFFF" // <- set this
                      lightShadowColor="#000000" // <- this
                      style={{
                        shadowOffset: {width: -5, height: -5},
                        shadowOpacity: 0.1, // <- and this or yours opacity
                        shadowRadius: 5,
                        borderRadius: 10,
                        backgroundColor: '#AB0404',
                        width: wp(60),
                        height: hp(6),
                      }}>
                      <NeomorphFlex
                        darkShadowColor="#000000" // <- set this
                        lightShadowColor="#000000" // <- this
                        style={{
                          shadowOffset: {width: 5, height: 5},
                          shadowOpacity: 0.1, // <- and this or yours opacity
                          shadowRadius: 5,
                          borderRadius: 10,
                          backgroundColor: '#AB0404',
                          width: wp(60),
                          height: hp(6),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          color="#F2F2F2"
                          title="Log In"
                          borderwidth="1"
                          width="100%"
                          padding="5"
                          borderColor="red"
                          textAlign="center"
                          height="6"
                          style={{
                            color: 'white',
                            justifyContent: 'center',
                          }}>
                          Submit
                        </Text>
                      </NeomorphFlex>
                    </NeomorphFlex> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Details;
