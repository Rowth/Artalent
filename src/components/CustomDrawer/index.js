import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {onLogout, tokenInvalid, Axios, URL} from '@config';
import {useSelector} from 'react-redux';
import color from '../../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  // const [userDetails, setUserDetails] = useState([]);
  const userDetails = useSelector(state => state?.Profile?.user_data);
  // console.log(profile, 'DRAWER');
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcvdrawer');
    if (res !== null) {
      // setUserId(res.user_data.id);
      const userData = res?.user_data;
      setUserDetails(userData);
      console.log(res, 'my userDetails log');
    }
  };
  console.log(
    'szdxfcgvhbjnkzdxfcgvhbj',
    useSelector(state => state?.Profile),
  );
  const iconData = {
    Home: {
      name: 'Home',
      image: require('../../assets/Images/Drawer/people.png'),
    },
    Rateus: {
      name: 'Rate Us',
      image: require('../../assets/Images/Drawer/rateus.png'),
    },
    ReferAndEarn: {
      name: 'Refer & Earn',
      image: require('../../assets/Images/Drawer/refer&ern.png'),
    },
    ManagesCountries: {
      name: 'Manage Country',
      image: require('../../assets/Images/Drawer/chart.png'),
    },
    ManageStates: {
      name: 'Manage State',
      image: require('../../assets/Images/Drawer/wallpaper.png'),
    },
    ManageCities: {
      name: 'Manage City',
      image: require('../../assets/Images/Drawer/happy-face.png'),
    },
    Wallet: {
      name: 'My Wallet',
      image: require('../../assets/Images/Wallet/walletWhite.png'),
    },
    Withdraw: {
      name: 'Withdraw',
      image: require('../../assets/Images/Drawer/dolar.png'),
    },
    ManageInterest: {
      name: 'Manage Interest',
      image: require('../../assets/Images/Drawer/wallpaper.png'),
    },
    Logout: {
      name: 'Logout',
      image: require('../../assets/Images/Login/logout.png'),
    },
    EditInterest: {
      name: 'Edit Interest',
      image: require('../../assets/Images/Drawer/wallpaper.png'),
    },
    Transaction: {
      name: 'Transaction',
      image: require('../../assets/Images/Drawer/news.png'),
    },
    About: {
      name: 'About',
      image: require('../../assets/Images/Drawer/info.png'),
    },
    MusicLibrary: {
      name: 'Music Library',
      image: require('../../assets/Images/Drawer/music.png'),
    },
    AddMusic: {
      name: 'Add Music',
      image: require('../../assets/Images/Drawer/music.png'),
    },
    Likes: {
      name: 'Likes',
      image: require('../../assets/Images/Likes/thumb-up.png'),
    },
    Comments: {
      name: 'Comments',
      image: require('../../assets/Images/Comments/chat-alt.png'),
    },
    RegisterContest: {
      name: 'My Contest',
      image: require('../../assets/Images/Drawer/favorites.png'),
    },
    Notification: {
      name: 'Notification',
      image: require('../../assets/Images/Comments/chat-alt.png'),
    },
    Following: {
      name: 'Following',
      image: require('../../assets/Images/Drawer/happy-face.png'),
    },
    Followers: {
      name: 'Followers',
      image: require('../../assets/Images/Drawer/happy-face.png'),
    },
    Information: {
      name: 'Information',
      image: require('../../assets/Images/Drawer/news.png'),
    },
    Winners: {
      name: 'Winners',
      image: require('../../assets/Images/Winners/cup.png'),
    },
    Setting: {
      name: 'Settings',
      image: require('../../assets/Images/Drawer/gear.png'),
    },
    OwnStory: {
      name: 'Own Story',
      image: require('../../assets/Images/Drawer/people.png'),
    },
    OtherStory: {
      name: 'Other Story',
      image: require('../../assets/Images/Drawer/people.png'),
    },
    ViewerList: {
      name: 'Viewer List',
      image: require('../../assets/Images/ViewerList/Eye.png'),
    },
    ManageSubAdmin: {
      name: 'Manage Sub Admin',
      image: require('../../assets/Images/ManageSubAdmin/UserCircleGear.png'),
    },
    BlockList: {
      name: 'BlockList',
      image: require('../../assets/Images/BlockList/Prohibit.png'),
    },
    SubAdminDetails: {
      name: 'Sub Admin Details',
      image: require('../../assets/Images/ManageSubAdmin/UserCircleGear.png'),
    },
    FilterInterest: {
      name: 'Filter Interest',
      image: require('../../assets/Images/Drawer/info.png'),
    },
    FeedCamera: {
      name: 'Feed Camera',
      image: require('../../assets/Images/Drawer/info.png'),
    },
    Drafts: {
      name: 'Drafts',
      image: require('../../assets/Images/Drawer/drafts.png'),
    },
    EditProfile: {
      name: 'Drafts',
      image: require('../../assets/Images/Drawer/drafts.png'),
    },
  };

  const userLogout = async () => {
    const res = await Axios({
      method: 'post',
      url: URL.LOG_OUT,
      // data: body,
    });
    if (res?.data?.status === 200) {
      Alert.alert('logout successfully');
      onLogout();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const itemList = itemData => {
    // console.log(itemData);
    return (
      <View style={{borderBottomColor: '#BDBDBD', borderBottomWidth: 0.7}}>
        <TouchableOpacity
          onPress={() =>
            itemData.name === 'Rateus'
              ? Linking.openURL('market://details?id=<com.artalent>')
              : props.navigation.navigate(itemData.name)
          }
          style={{
            paddingVertical: hp(1.8),
            paddingLeft: wp(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{width: wp(7), height: wp(7), resizeMode: 'contain'}}
              source={iconData[itemData.name].image}></Image>
            <Text
              numberOfLines={1}
              style={{
                color: '#F2F2F2',
                marginLeft: wp(5),
                fontWeight: '400',
                fontSize: wp(4.2),
              }}>
              {iconData[itemData.name].name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const hideTab = item => {
    const tabData = ['EditProfile', 'Home', 'CameraEditor'];
    // console.log(item, tabData.indexOf(item.name) != -1);
    return tabData.indexOf(item.name) != -1;
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
        }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            marginTop: 0,
            paddingTop: 0,
            backgroundColor: 'transparent',
          }}>
          <ImageBackground
            style={{
              padding: wp(8),
              backgroundColor: 'transparent',
              borderBottomColor: '#BDBDBD',
              borderBottomWidth: 0.7,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={{
                    uri: userDetails?.image
                      ? userDetails?.image
                      : 'https://images.unsplash.com/photo-1639317393027-2e5308248ea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                  }}
                  style={{
                    height: hp(10),
                    width: hp(10),
                    borderRadius: hp(5),
                    marginBottom: hp(1),
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#FFFFFF',
                      fontSize: hp(2),
                      fontFamily: 'Roboto-Medium',
                      fontWeight: '700',
                    }}>
                    {`${userDetails?.first_name} ${userDetails?.last_name}`}
                  </Text>
                </TouchableOpacity>

                <Text
                  numberOfLines={1}
                  style={{
                    color: '#BDBDBD',
                    fontSize: hp(1.8),
                    fontFamily: 'Roboto-Medium',
                    marginBottom: hp(1),
                    fontWeight: '200',
                  }}>
                  {`@${userDetails?.username}`}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              flex: 1,
              paddingBottom: hp(2),
              // paddingRight: wp(5),
              marginTop: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Wallet');
              }}
              style={{
                paddingVertical: hp(1.8),
                borderBottomColor: '#BDBDBD',
                borderBottomWidth: 0.7,
                paddingLeft: wp(5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: wp(8), height: wp(7), resizeMode: 'contain'}}
                  source={iconData['Wallet'].image}></Image>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#F2F2F2',
                    marginLeft: wp(5),
                    fontWeight: '400',
                  }}>
                  {'My Wallet'}
                </Text>
              </View>
            </TouchableOpacity>
            {props.state.routes.map(item =>
              hideTab(item) ? null : itemList(item),
            )}
            <TouchableOpacity
              onPress={() => {
                userLogout();
                // onLogout();
                props.navigation.replace('Login');
              }}
              style={{
                paddingVertical: hp(1.8),
                borderBottomColor: '#BDBDBD',
                paddingLeft: wp(5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: wp(7),
                    height: wp(7),
                    resizeMode: 'contain',
                  }}
                  source={iconData['Logout'].image}></Image>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#F2F2F2',
                    marginLeft: wp(5),
                    fontWeight: '700',
                  }}>
                  {iconData['Logout'].name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;
