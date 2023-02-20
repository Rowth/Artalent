import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import SmallColorButton from '../../components/SmallColorButton';
import Styles from './styles';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = props => {
  const {navigation, route} = props;
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId] = useState(0);
  const [page, setPage] = useState(1);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const limit = 5;
  const [post, setPost] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
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
  const safeNotificationCount = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.SAVE_NOTIFICATION,
    });
    if (res?.data?.status === 200) {
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server Error');
    }
  };
  const getUserDetails = async () => {
    const res = await Axios({
      method: 'post',
      url: URL.USER_DETAILS,
    });
    if (res?.data?.status === 200) {
      setUserDetails(res.data.user_details);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const getFeeds = async () => {
    setFlatListLoader(true);
    const jsonValue = await AsyncStorage.getItem('Auth');
    const resA = jsonValue != null ? JSON.parse(jsonValue) : null;

    const res = await Axios({
      method: 'get',
      url: `${URL.GET_ALL_USER_POST_BY_ID}?user_id=${resA.user_data.id}&page=${page}&limit=${limit}`,
    });
    if (res?.data?.status === 200) {
      setPost([...post, ...res.data.feeds]);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
    setFlatListLoader(false);
  };
  const footerRender = () => {
    return flatListLoader ? (
      <View style={{alignItems: 'center', marginBottom: hp(15)}}>
        <ActivityIndicator size="large" color={'grey'} />
      </View>
    ) : null;
  };
  const loadMoreData = () => {
    if (post.length % limit > 0) {
      setPage(Math.floor(post.length / limit + 2));
    } else {
      setPage(Math.floor(post.length / limit + 1));
    }
  };
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcv');
    if (res !== null) {
      setUserId(res.user_data.id);
    }
  };
  const deletePost = id => {
    setPost(post.filter(item => item.id != id));
  };
  const renderScreen = () => {
    getUserDetails();
    getUserData();
    getFeeds();
    getNotificationCount();
  };
  useEffect(() => {
    renderScreen();
  }, [page]);
  return (
    <SafeAreaView style={Styles.bodyStyle}>
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
            style={{width: wp(30), height: wp(6), resizeMode: 'cover'}}
            source={require('../../assets/Images/Home/ARTalent-text.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
            safeNotificationCount();
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                resizeMode={'contain'}
                style={{width: wp(7), height: wp(7), marginLeft: wp(2)}}
                source={
                  notificationCount === 0
                    ? require('../../assets/Images/Star/simpleBell.png')
                    : require('../../assets/Images/Star/notification.png')
                }
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
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* Header END */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(1),
            paddingHorizontal: wp(2),
            paddingBottom: hp(2),
          }}>
          {/* ******************************************************************Profile Photo**************************************************************** */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                elevation: hp(10),
                shadowColor: 'black',
                shadowRadius: wp(2),
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: wp(25),
                  height: wp(25),
                  paddingTop: wp(4),
                  borderRadius: wp(100),
                  alignItems: 'center',
                }}
                source={
                  userDetails.image
                    ? {uri: userDetails.image}
                    : require('../../assets/Images/DetailsScreen/userImg.png')
                }
              />
            </View>
            <View
              style={{
                marginTop: -wp(14),
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: -1,
              }}>
              <Image
                source={require('../../assets/Images/Profile/profileBg.png')}
                style={{
                  height: hp(18),
                  width: wp(30),
                  resizeMode: 'stretch',
                }}></Image>
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: hp(2),
                  left: 0,
                  right: 0,
                }}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => navigation.navigate('Information')}>
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: 'white',
                      numberOfLines: 1,
                    }}>
                    {'Level ' + userDetails?.level}
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: 'white',
                      marginTop: wp(1),
                      marginBottom: wp(2),
                      numberOfLines: 1,
                    }}>
                    {'Range ' + userDetails?.range}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* ****************************************************************************</>****************************************************************************** */}
          {/* **Profile View** */}
          <View style={{flex: 1, marginTop: wp(5)}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingVertical: wp(3.5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text style={{color: 'white', fontSize: wp(4)}}>
                    {userDetails?.FullName}
                  </Text>
                  <Text style={{color: 'white', fontSize: wp(3)}}>
                    {'@' + userDetails?.username}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('EditProfile', {
                        getUserDetails: getUserDetails,
                      });
                    }}>
                    <Image
                      style={{
                        width: wp(22),
                        height: wp(10),
                        resizeMode: 'stretch',
                      }}
                      source={require('../../assets/Images/Button/editProfile.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: wp(1), color: 'red'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: hp(3),
                    marginBottom: wp(2),
                  }}>
                  <Text style={{color: '#EB5757', fontSize: wp(4)}}>
                    {userDetails?.about_user}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Wallet')}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        resizeMode="contain"
                        style={{width: wp(4.7), height: wp(4.7)}}
                        source={require('../../assets/Images/Profile/coin2.png')}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: wp(3),
                          marginLeft: wp(1),
                        }}>
                        {userDetails?.earnings + ' Earned'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ProfileContest', {id: userId});
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          borderWidth: wp(0.07),
                          borderColor: 'grey',
                          padding: wp(1),

                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: wp(3),
                            numberOfLines: 1,
                          }}>
                          {userDetails?.contestCount}
                        </Text>
                        <Text
                          style={{
                            color: '#F2F2F2',
                            fontSize: wp(3),
                            numberOfLines: 1,
                            opacity: 0.7,
                          }}>
                          Contest
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        alignItems: 'center',
                        borderWidth: wp(0.07),
                        borderColor: 'grey',
                        padding: wp(1),
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: wp(3),
                          numberOfLines: 1,
                        }}>
                        {userDetails?.postsCount}
                      </Text>
                      <Text
                        style={{
                          color: '#F2F2F2',
                          fontSize: wp(3),
                          numberOfLines: 1,
                          opacity: 0.7,
                        }}>
                        Posts
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: wp(0.07),
                        borderColor: 'grey',
                        padding: wp(1),
                        flex: 1,
                      }}>
                      <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={() =>
                          navigation.navigate('OwnFollowers', {
                            getUserDetails,
                            id: userId,
                          })
                        }>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: wp(3),
                            numberOfLines: 1,
                          }}>
                          {userDetails?.followersCount}
                        </Text>
                        <Text
                          style={{
                            color: '#F2F2F2',
                            fontSize: wp(3),
                            numberOfLines: 1,
                            opacity: 0.7,
                          }}
                          numberOfLines={1}>
                          Followers
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        borderWidth: wp(0.1),
                        borderColor: 'grey',
                        padding: wp(1),
                        flex: 1,
                      }}>
                      <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={() =>
                          navigation.navigate('Following', {
                            getUserDetails,
                            id: userId,
                          })
                        }>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: wp(3),
                            numberOfLines: 1,
                          }}>
                          {userDetails?.followingCount}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#F2F2F2',
                            fontSize: wp(3),
                            numberOfLines: 1,
                            opacity: 0.7,
                          }}>
                          Following
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* **</>** */}
        </View>
        {/* ** Post List ** */}
      </View>
      <FlatList
        numColumns={3}
        data={post}
        // keyExtractor={item => item.key}
        style={{
          marginTop: hp(2),
          marginHorizontal: wp(1),
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPost', {
                id: item.id,
                renderScreen,
                screen: 'profile',
                deletePost,
              });
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={{
                  width: wp(32),
                  height: wp(32),
                  margin: wp(0.5),
                }}
                source={{
                  uri:
                    item.image[0].image !== null
                      ? item.image[0].image.includes('amazonaws')
                        ? item.image[0].image
                        : 'https://images.unsplash.com/photo-1643888315500-042402b59e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                      : 'https://images.unsplash.com/photo-1643888315500-042402b59e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.01}
        ListFooterComponent={footerRender}
      />
    </SafeAreaView>
  );
};
export default Profile;
