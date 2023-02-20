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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import SmallColorButton from '../../components/SmallColorButton';
import Styles from './styles';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ViewProfile = props => {
  const {navigation, route} = props;
  const [userDetails, setUserDetails] = useState('');
  const [userId, setUserId] = useState(0);
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const limit = 5;
  const [showBlockBtn, setBlockButtuon] = useState(false);
  const getUserDetails = async () => {
    let body = new FormData();
    body.append('user_id', route.params.id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_DETAILS,
      data: body,
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
    setPostusers_Address_get([]);
    const jsonValue = await AsyncStorage.getItem('Auth');
    const resA = jsonValue != null ? JSON.parse(jsonValue) : null;

    const res = await Axios({
      method: 'get',
      url: `${URL.GET_ALL_USER_POST_BY_ID}?user_id=${route.params.id}&page=${page}&limit=${limit}`,
    });
    if (res?.data?.status === 200) {
      setPost(res.data.feeds);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
    setFlatListLoader(false);
  };
  const blockUser = async () => {
    let body = new FormData();
    body.append('user_id', route.params.id);
    const res = await Axios({
      method: 'post',
      url: URL.BLOCK_USERS,
      data: body,
    });
    if (res?.data?.status === 200) {
      Alert.alert('User Blocked');
      navigation.goBack();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
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
      setPage(Math.floor(post.length / limit + 1));
      console.log(post.toString() + ' jjj');
    } else {
      setPage(Math.floor(post.length / limit + 1));
      console.log(post.toString() + 'jj');
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
  useEffect(() => {
    getUserDetails();
    getUserData();
    getFeeds();
  }, [props, page]);
  useEffect(() => {}, [page]);
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
          paddingVertical: hp(1),
          // backgroundColor: 'green',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={{}}>
          <View>
            <Image
              style={{width: wp(6), height: wp(6)}}
              source={require('../../assets/Images/SelectInterest/Vector.png')}
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
          <Text style={{fontSize: wp(4.5), fontWeight: '500', color: 'white'}}>
            View Profile
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
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
                source={require('../../assets/Images/Home/notification.png')}
              />
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
      {/* Header END */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(1),
            paddingHorizontal: wp(2),
            paddingBottom: hp(2),
            // backgroundColor: 'red',
          }}>
          {/*******************************************************************Profile Photo**************************************************************** */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
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
                  zIndex: 10000,
                  alignItems: 'center',
                }}
                source={{
                  uri: userDetails.image
                    ? userDetails.image
                    : 'https://images.unsplash.com/photo-1605541885855-88863971e7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzI2MzI2OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
                }}
              />
            </View>
            <View
              style={{
                marginTop: -wp(14),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/Images/Profile/profileBg.png')}
                style={{
                  height: hp(20),
                  width: wp(30),
                  elevation: wp(-5),
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
          <View style={{flex: 1, marginTop: hp(2), paddingVertical: hp(2)}}>
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
                <View>
                  <Text style={{color: 'white', fontSize: wp(4)}}>
                    {userDetails.FullName}
                  </Text>
                  <Text style={{color: 'white', fontSize: wp(3.5)}}>
                    {'@' + userDetails.username}
                  </Text>
                </View>
                {userDetails.block_status != false ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setBlockButtuon(true);
                      }}>
                      {showBlockBtn === false ? (
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/Images/Profile/threeDot.png')}
                          style={{
                            height: wp(7),
                            width: wp(6),
                            marginTop: hp(-4),
                          }}></Image>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setBlockButtuon(false);
                            blockUser();
                          }}>
                          <View
                            style={{
                              backgroundColor: '#2A2A2A',
                              height: wp(7),
                              width: wp(12),
                              borderWidth: 0.2,
                              elevation: 10,
                              borderRadius: 3,
                              shadowColor: 'black',
                              borderColor: 'red',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: wp(3), color: 'white'}}>
                              Block
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: hp(1.5),
              }}>
              <Text style={{color: '#EB5757', fontSize: wp(3)}}>
                {userDetails?.about_user}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: wp(4.7), height: wp(4.7)}}
                    source={require('../../assets/Images/Profile/coin.png')}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(3),
                      marginLeft: wp(1),
                    }}>
                    {userDetails.earnings + ' Earned'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: hp(1)}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProfileContest', {id: userDetails.id});
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      borderWidth: wp(0.1),
                      borderColor: 'grey',
                      padding: wp(1),
                      flex: 1,
                    }}>
                    <Text style={{color: 'white', fontSize: wp(3)}}>
                      {userDetails.contestCount}
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
                    borderWidth: wp(0.1),
                    borderColor: 'grey',
                    padding: wp(1),
                    flex: 1,
                  }}>
                  <Text style={{color: 'white', fontSize: wp(3)}}>
                    {userDetails.postsCount}
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
                    borderWidth: wp(0.1),
                    borderColor: 'grey',
                    padding: wp(1),
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      navigation.navigate('Followers', {
                        id: userDetails.id,
                        getUserDetails: getUserDetails,
                      })
                    }>
                    <Text style={{color: 'white', fontSize: wp(3)}}>
                      {userDetails.followersCount}
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
                      navigation.navigate('Following', {id: userDetails.id})
                    }>
                    <Text style={{color: 'white', fontSize: wp(3)}}>
                      {userDetails.followingCount}
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
          {/* **</>** */}
        </View>
        {/* ** Post List ** */}
        {console.log(post, 'mc')}
        <View>
          <View>
            <FlatList
              numColumns={3}
              data={post}
              keyExtractor={item => item.key}
              style={{
                marginTop: hp(2),
                marginBottom: hp(2),
              }}
              contentContainerStyle={{}}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewPost', {
                      id: item.id,
                      screen: 'userPosts',
                    })
                  }>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
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
              ListFooterComponent={footerRender}
              onEndReachedThreshold={0.01}
            />
          </View>
        </View>
        {/* **  </> ** */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ViewProfile;
