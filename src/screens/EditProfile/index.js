import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {TextInput, DropdownInput, Loader} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {tokenInvalid, Axios, URL, Helper} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
const EditProfile = props => {
  const {navigation, route} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [mytalent, setMytalent] = useState('');
  const [state, setState] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [cityDist, setCityDist] = useState('');
  const [country, setCountry] = useState({label: 'Country', key: 0});
  const [states, setStates] = useState({label: 'State', key: 0});
  const [city, setCity] = useState({label: 'City', key: 0});
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const getNotificationCount = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_NOTIFICATION_COUNT,
    });
    if (res?.data?.status === 200) {
      setNotificationCount(res.data.count);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcv');
    if (res !== null) {
      // setUserId(res.user_data.id);
      const userData = res.user_data;
      setUserDetails(userData);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setUsername(userData.username);
      setMytalent(userData.about_me !== null ? userData.about_me : '');
      setImageUri(userData.image ? userData.image : null);
      setStateData(
        res.state.map(item => ({
          key: parseInt(item.id),
          label: item.states_name,
          countryId: parseInt(item.country_id),
        })),
      );
      setCountryData(
        res.country.map(item => ({
          key: parseInt(item.id),
          label: item.country,
        })),
      );
      setDistrictData(
        res.district.map(item => ({
          key: parseInt(item.id),
          label: item.district_name,
          countryId: parseInt(item.country_id),
          stateId: parseInt(item.state_id),
        })),
      );
      setCountry(oldState => {
        const prev = res.country.find(
          item => item.id === parseInt(userData.country),
        );
        return {key: parseInt(prev?.id), label: prev?.country};
      });
      setStates(oldState => {
        const prev = res.state.find(
          item => item.id === parseInt(userData.state),
        );
        return {
          key: parseInt(prev?.id),
          label: prev?.states_name,
          countryId: parseInt(prev?.country_id),
        };
      });
      setCity(oldState => {
        const prev = res.district.find(
          item => item.id === parseInt(userData.district),
        );
        return {
          key: parseInt(prev.id),
          label: prev.district_name,
          countryId: parseInt(prev.country_id),
          stateId: parseInt(prev.state_id),
        };
      });
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
    setIsLoading(true);
    let imgAwsUrl = '';
    console.log(firstName, lastName, username, mytalent, country, states, city);
    if (imageData !== null) {
      const awsRes = await Helper.sendAwsBucket(imageData, 'image');
      if (awsRes.status === 201) {
        imgAwsUrl = awsRes.body.postResponse.location;
      }
    }
    console.log(imgAwsUrl);
    let errMsg = '';
    let checkStatus = true;
    if (firstName.length === 0 || firstName === '') {
      errMsg = errMsg + ' Firstname ';
      checkStatus = false;
    }
    if (lastName.length === 0 || lastName === '') {
      errMsg = errMsg + ' Lastname ';
      checkStatus = false;
    }
    if (username.length === 0 || username === '') {
      errMsg = errMsg + ' Username ';
      checkStatus = false;
    }
    if (checkStatus === true) {
      let body = new FormData();
      body.append('first_name', firstName);
      body.append('last_name', lastName);
      body.append('username', username);
      body.append('my_talent', mytalent);
      body.append('country', country.key);
      body.append('states', states.key);
      body.append('city', city.key);
      body.append('image', imgAwsUrl !== '' ? imgAwsUrl : userDetails.image);
      const res = await Axios({
        method: 'post',
        url: URL.UPDATE_PROFILE,
        data: body,
      });
      if (res?.data?.status === 200) {
        const rest = await AsyncStorage.mergeItem(
          'Auth',
          JSON.stringify({
            user_data: {
              ...userDetails,
              first_name: firstName,
              last_name: lastName,
              username: username,
              about_me: mytalent,
              country: country.key,
              state: states.key,
              district: city.key,
              image: imgAwsUrl !== '' ? imgAwsUrl : userDetails.image,
            },
          }),
        );
        dispatch({
          type: 'SET_PROFILE',
          data: {
            ...store.Profile,
            user_data: {
              ...userDetails,
              first_name: firstName,
              last_name: lastName,
              username: username,
              about_me: mytalent,
              country: country.key,
              state: states.key,
              district: city.key,
              image: imgAwsUrl !== '' ? imgAwsUrl : userDetails.image,
            },
          },
        });
        Alert.alert('Profile Updated Successfully!');
        route.params.getUserDetails();
      } else if (res?.data?.status === 204) {
        Alert.alert('Already Updated');
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      }
      setIsLoading(false);
    } else {
      Alert.alert('Please Enter ' + errMsg);
      setIsLoading(false);
    }
  };
  const getimgFromGallery = async () => {
    const imageRes = await launchImageLibrary({
      mediaType: 'mixed',
      videoQuality: 'high',
      quality: 1,
      durationLimit: 1000,
      height: 400,
      width: 400,
    });
    console.log(imageRes);
    if (imageRes.didCancel) {
      console.log('User cancelled image picker');
    } else {
      setImageData(imageRes.assets[0]);
      setImageUri(imageRes.assets[0].uri);
      console.log(imageRes);
    }
  };
  console.log(store.Profile);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      {isLoading && <Loader />}
      <View>
        {/* HEADER START */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp(1),
            paddingHorizontal: wp(5),
            // backgroundColor: 'green',
          }}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            activeOpacity={0.5}
            style={{
              padding: 5,
            }}>
            <View>
              <Image
                style={{width: wp(8), height: wp(8)}}
                source={require('../../assets/Images/Home/List.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1,
            }}>
            <Image
              style={{width: wp(35), height: wp(8)}}
              source={require('../../assets/Images/Home/ARTalent-text.png')}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                <Image
                  resizeMode={'contain'}
                  style={{width: wp(7), height: wp(7), marginLeft: wp(2)}}
                  source={
                    notificationCount === 0
                      ? require('../../assets/Images/Star/simpleBell.png')
                      : require('../../assets/Images/Star/notification.png')
                  }
                  // {require('../../assets/Images/Star/notification.png')}
                />
                {notificationCount !== 0 ? (
                  <View
                    style={{
                      height: wp(3),
                      width: wp(3),
                      borderRadius: 100,
                      borderEndWidth: 0.5,
                      borderColor: 'red',
                      backgroundColor: '#AB0404',
                      position: 'absolute',
                      alignItems: 'center',
                      top: 0,
                      right: 0,
                      left: 15.5,
                      bottom: 0,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: wp(2),
                      }}>
                      {notificationCount}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Header END */}
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: wp(5)}}>
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{height: wp(5), height: wp(5), marginTop: hp(3)}}
                  source={require('../../assets/Images/EditProfile/back.png')}
                />
              </TouchableOpacity>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => getimgFromGallery()}>
                  <NeomorphFlex
                    darkShadowColor="#FFFFFF" // <- set this
                    lightShadowColor="#000000" // <- this
                    style={{
                      shadowOffset: {width: 1, height: 2},
                      shadowOpacity: 0.2, // <- and this or yours opacity
                      shadowRadius: 5,
                      backgroundColor: '#1A1A1A',
                      shadowColor: 'grey',
                      padding: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp(100),

                      // borderRadius: 10,
                    }}>
                    <Image
                      style={{
                        height: wp(30),
                        width: wp(30),
                        borderRadius: wp(100),
                      }}
                      source={{
                        uri:
                          imageUri !== null
                            ? imageUri
                            : 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                      }}
                    />
                  </NeomorphFlex>
                </TouchableOpacity>

                <Text
                  style={{
                    color: '#F1F1F1',
                    fontSize: wp(5),
                    marginTop: hp(2),
                    fontWeight: 'bold',
                  }}>
                  Edit Profile
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: '#F2F2F2',
                  marginLeft: wp(3),
                  marginTop: hp(2),
                }}>
                First Name
              </Text>
              <View style={{marginTop: hp(1)}}>
                <TextInput
                  value={firstName}
                  onChangeText={text => {
                    setFirstName(text);
                  }}
                  placeholder=""
                  width={90}
                  height={6}
                  borderRadius={10}
                  TextInputStyle={{
                    width: '100%',
                    color: '#BDBDBD',
                  }}></TextInput>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: '#F2F2F2',
                  marginLeft: wp(3),
                  marginTop: hp(2),
                }}>
                Last Name
              </Text>
              <View style={{marginTop: hp(1)}}>
                <TextInput
                  value={lastName}
                  onChangeText={text => {
                    setLastName(text);
                  }}
                  placeholder=""
                  width={90}
                  height={6}
                  borderRadius={10}
                  TextInputStyle={{
                    width: '100%',
                    color: '#BDBDBD',
                  }}></TextInput>
              </View>
              <View>
                <Text
                  style={{
                    color: '#F2F2F2',
                    marginLeft: wp(3),
                    marginTop: hp(2),
                  }}>
                  Username
                </Text>
                <View style={{marginTop: hp(1)}}>
                  <TextInput
                    value={username}
                    onChangeText={text => {
                      setUsername(text);
                    }}
                    placeholder=""
                    width={90}
                    height={6}
                    borderRadius={10}
                    TextInputStyle={{
                      width: '100%',
                      color: '#BDBDBD',
                    }}></TextInput>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: '#F2F2F2',
                    marginLeft: wp(3),
                    marginTop: hp(2),
                  }}>
                  My Talent
                </Text>
                <View style={{marginTop: hp(1)}}>
                  <TextInput
                    value={mytalent}
                    onChangeText={text => {
                      setMytalent(text);
                    }}
                    placeholder="My Talent"
                    width={90}
                    height={6}
                    borderRadius={10}
                    TextInputStyle={{
                      width: '100%',
                      color: '#BDBDBD',
                    }}></TextInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#F2F2F2',
                      marginLeft: wp(3),
                      marginTop: hp(2),
                    }}>
                    Country
                  </Text>
                  <View style={{marginTop: hp(1)}}>
                    <DropdownInput
                      onChange={text => {
                        setCountry(text);
                        setStates({label: 'State', key: 0});
                        setCity({label: 'City', key: 0});

                        // {label: 'City', key: 0}
                      }}
                      data={countryData}
                      placeholder={country.label}
                      width={40}
                      TextInputStyle={{
                        width: '100%',
                        color: '#BDBDBD',
                      }}></DropdownInput>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#F2F2F2',
                      marginLeft: wp(3),
                      marginTop: hp(2),
                    }}>
                    State
                  </Text>
                  <View style={{marginTop: hp(1)}}>
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
                      width={40}
                      TextInputStyle={{
                        width: '100%',
                        color: '#BDBDBD',
                      }}></DropdownInput>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: '#F2F2F2',
                    marginLeft: wp(3),
                    marginTop: hp(2),
                  }}>
                  City/District
                </Text>
                <View style={{marginTop: hp(1)}}>
                  <DropdownInput
                    onChange={text => {
                      setCity(text);
                    }}
                    data={getDistrictData()}
                    placeholder={city.label}
                    width={90}
                    TextInputStyle={{
                      width: '100%',
                      color: '#BDBDBD',
                    }}></DropdownInput>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: hp(4),
                    marginBottom: hp(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      onSubmit();
                    }}>
                    {/* <NeomorphFlex
                      darkShadowColor="#FFFFFF" // <- set this
                      lightShadowColor="#000000" // <- this
                      style={{
                        shadowOffset: {width: -5, height: -5},
                        shadowOpacity: 0.1, // <- and this or yours opacity
                        shadowRadius: 5,
                        borderRadius: 10,
                        backgroundColor: '#AB0404',
                        width: wp(55),
                        height: hp(5),
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
                          width: wp(55),
                          height: hp(5),
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
                          Save Changes
                        </Text>
                      </NeomorphFlex>
                    </NeomorphFlex> */}

                    <Image
                      style={{
                        width: wp(50),
                        height: wp(18),
                        resizeMode: 'stretch',
                      }}
                      source={require('../../assets/Images/Button/savechanges.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default EditProfile;
