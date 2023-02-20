import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput, InputText, HeadWrapper, Header} from '@components';
import styles from './styles';
import {Helper, Axios, URL, tokenInvalid} from '@config';

const ReferAndEarn = props => {
  const {navigation, route} = props;
  const [searchText, setSearchText] = useState('');
  const [names, setnames] = useState([
    {
      key: '1',
      name: 'Akrati gupta',
    },
    {
      key: '2',
      name: 'Aditya soni',
    },
    {
      key: '3',
      name: 'Blackmilk media',
    },

    {
      key: '4',
      name: 'Fusionik store',
    },
    {
      key: '5',
      name: 'Artalent',
    },
    {
      key: '6',
      name: 'Akrati gupta',
    },
    {
      key: '7',
      name: 'Aditya soni',
    },
    {
      key: '8',
      name: 'Blackmilk media',
    },

    {
      key: '9',
      name: 'Fusionik store',
    },
    {
      key: '10',
      name: 'Artalent',
    },
  ]);
  const [referCode, setReferalCode] = useState('');
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcv');
    if (res !== null) {
      setReferalCode(res.user_data.referral_code);
    }
  };
  const sendReferalCode = async (number, message) => {
    const body = new FormData();
    body.append('contact', number);
    body.append('message', message);
    const res = await Axios({
      method: 'post',
      url: URL.SEND_REFERAL_CODE_BY_TRELLO,
      data: body,
    });
    if (res?.data?.status === 200) {
      Alert.alert('Successfully Sent!');
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  useEffect(() => {
    getUserData();
    try {
      request(PERMISSIONS.ANDROID.READ_CONTACTS)
        .then(result => {
          console.log(result);
          if (result === 'granted') {
            Contacts.getAll()
              .then(contacts => {
                // work with contacts
                setContacts(contacts);
                setAllContacts(contacts);
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  // console.log(contacts);
  return (
    <View style={styles.body}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Refer & Earn'}
        centerTextStyle={{paddingLeft: wp(2)}}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <Neomorph lightShadowColor="#1A1A1A" style={styles.NeomorphContainer}>
          <Neomorph inner darkShadowColor="black" style={styles.NeomorphStyle}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={styles.childContainerStyle}>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    marginTop: wp(3),
                    fontSize: wp(4),
                  }}>
                  Share Referral Code
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Helper.ShareSocial({
                      title: 'ARTALENT',
                      subject: 'Download Artalent',
                      message: `Download Artalent with referal code : ${referCode}`,
                      url: 'https://ARTALENT.com/',
                    });
                  }}>
                  <Image
                    style={{height: wp(8), width: wp(8)}}
                    source={require('../../assets/Images/ReferAndEarn/share-android.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}></View>
              <View style={styles.childContainerStyle}>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    marginTop: wp(3),
                    fontSize: wp(4),
                  }}>
                  {referCode}
                </Text>
                <TouchableOpacity
                  onPress={() => Helper.copyToClipboard(referCode)}>
                  <Image
                    style={{height: wp(8), width: wp(8), marginTop: wp(2)}}
                    source={require('../../assets/Images/ReferAndEarn/copy.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Neomorph>
        </Neomorph>
      </View>
      <View style={{backgroundColor: '#1A1A1A', flex: 1, marginTop: 10}}>
        <Text style={styles.headerTextStyle}>
          Earn ₹ 10 on a successful referral
        </Text>
        <Text style={styles.headerTwoStyle}>
          Just share your referral code with friends and family.
        </Text>

        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            elevation: wp(10),
            marginTop: hp(4),
          }}>
          <InputText
            value={searchText}
            onChangeText={txt => {
              setSearchText(txt);
              setContacts(prev => {
                return txt === ''
                  ? allContacts
                  : txt.length > 3
                  ? allContacts.filter((item, index) =>
                      item.displayName.includes(txt),
                    )
                  : allContacts;
              });
            }}
            height="6"
            width="90%"
            borderRadius={10}
            inputTextStyle={{paddingLeft: wp(4)}}
            placeholder={'Search your friends on whatsapp'}
            placeholderTextColor="rgba(189,189,189,0.2)"
            endSource={require('../../assets/Images/MusicLibrary/search.png')}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={contacts}
          style={{
            width: wp('100%'),
            backgroundColor: 'rgba(0,0,0,0.4)',

            flex: 1,
          }}
          keyExtractor={item => item.key}
          renderItem={({item}) =>
            item?.phoneNumbers?.length > 0 ? (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.thumbnailPath === '' ? (
                      <View
                        style={{
                          width: wp(12),
                          height: wp(12),
                          borderRadius: wp(100),
                          backgroundColor: 'pink',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: '500',
                            color: 'white',
                          }}>
                          {`${item.displayName[0]}${item.displayName[1]}`.toUpperCase()}
                        </Text>
                      </View>
                    ) : (
                      <Image
                        style={{
                          width: wp(12),
                          height: wp(12),
                          borderRadius: wp(100),
                        }}
                        source={{
                          uri: item.thumbnailPath,
                        }}
                      />
                    )}
                    <Text style={styles.styleTv}>{item.displayName}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.phoneNumbers.length > 0) {
                        sendReferalCode(
                          item.phoneNumbers[0].number
                            .replace('+91', '')
                            .trim()
                            .replace(' ', ''),
                          `https://ARTALENT.com/ Download Artalent with referal code : ${referCode}`,
                        );
                      }
                      // sendReferalCode()
                    }}>
                    <Image
                      resizeMode="stretch"
                      style={{
                        width: wp(32),
                        height: wp(20),
                        marginRight: wp(-7),
                      }}
                      source={require('../../assets/Images/ReferAndEarn/sendBtn.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp('0.2%'),
                    backgroundColor: '#000000',
                  }}></View>
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default ReferAndEarn;
