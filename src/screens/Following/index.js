import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
import {
  Text,
  TextInput,
  Feed,
  Header,
  LongHeader,
  SmallButton,
  SmallColorButton,
  CustomAlert,
} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

import {tokenInvalid, Axios, URL} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Following = props => {
  console.log(props);
  const limit = 10;
  const {navigation, route} = props;
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const [followersList, setFollowersList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const getFollowing = async () => {
    setFlatListLoader(true);
    const res = await Axios({
      method: 'get',
      url:
        searchText === ''
          ? `${URL.ALL_FOLLOWING}?page=${page}&limit=${limit}&user_id=${route.params.id}`
          : `${URL.GET_SEARCH_FOLLOWING}?username=${searchText}&page=${page}&limit=${limit}&user_id=${route.params.id}`,
    });

    if (res?.data?.status === 200) {
      setFollowersList([...followersList, ...res.data.following]);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
    setFlatListLoader(false);
  };
  const followUser = async following_id => {
    let body = new FormData();
    body.append('following_id', following_id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_FOLLOW_AND_UNFOLLOW,
      data: body,
    });
    if (res?.data?.status === 200) {
      setFollowersList(
        followersList.map(item =>
          item.following_id === following_id
            ? {...item, follow_status: !item.follow_status}
            : item,
        ),
      );
      route.params.getUserDetails();
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
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
    if (followersList.length % limit > 0) {
      setPage(Math.floor(followersList.length / limit + 2));
    } else {
      setPage(Math.floor(followersList.length / limit + 1));
    }
  };
  useEffect(() => {
    getFollowing();
  }, [page, searchText]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000',
        }}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          // centerIcon={require('../../assets/Images/Following/Users.png')}
          onClickLeftIcon={() => navigation.goBack()}
          centerText={'Following'}
          centerTextStyle={{paddingLeft: wp(1), fontWeight: '400'}}
        />
        <View style={{flex: 1, backgroundColor: '#1A1A1A'}}>
          <View style={{flex: 1}}>
            <FlatList
              data={followersList}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: hp(1),
                marginHorizontal: wp(2),
              }}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: wp(2),
                    paddingVertical: hp(1.5),
                    borderBottomColor: '',
                    borderBottomWidth: 2,
                    justifyContent: 'space-between',
                    marginTop: hp(-1.5),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <NeomorphFlex
                      darkShadowColor="black" // <- set this
                      lightShadowColor="black" // <- this
                      style={{
                        shadowOffset: {width: 3, height: 3},
                        shadowOpacity: 0.3, // <- and this or yours opacity
                        shadowRadius: 1,
                        backgroundColor: 'transparent',
                        shadowColor: 'grey',
                        padding: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: wp(100),

                        // borderRadius: 10,
                      }}>
                      <NeomorphFlex
                        darkShadowColor="black" // <- set this
                        lightShadowColor="grey" // <- this
                        style={{
                          shadowOffset: {width: 2, height: 2},
                          shadowOpacity: 0.5, // <- and this or yours opacity
                          shadowRadius: 2,
                          backgroundColor: 'transparent',
                          shadowColor: 'black',
                          padding: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: wp(100),

                          // borderRadius: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ViewProfile', {
                              id: item.following_id,
                            });
                          }}>
                          <Image
                            style={{
                              width: wp(12),
                              height: wp(12),
                              borderRadius: wp(6),
                            }}
                            source={{
                              uri: item.image
                                ? item.image
                                : 'https://artalent1234.s3.amazonaws.com/uploads%2Frn_image_picker_lib_temp_1713bd61-73e3-45de-bf8b-06ea2794a883.png',
                            }}></Image>
                        </TouchableOpacity>
                      </NeomorphFlex>
                    </NeomorphFlex>
                    <View
                      style={{
                        paddingLeft: wp(3),
                        justifyContent: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#FFFFFF',
                          fontSize: wp(4),
                        }}>
                        {item.first_name + '' + item.last_name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#BDBDBD',
                          fontSize: wp(3.5),
                        }}>
                        {'@' + item.username}
                      </Text>
                    </View>
                  </View>

                  {item.follow_status === null ? null : !item.follow_status ? (
                    // <SmallColorButton
                    //   buttonColor={'#AB0404'}
                    //   buttonText={'Follow'}
                    //   onPress={() => followUser(item.following_id)}
                    // />
                    <TouchableOpacity
                      onPress={() => {
                        followUser(item.following_id);
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: wp(25), height: wp(20)}}
                        source={require('../../assets/Images/Following/FollowBtn.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    // <SmallColorButton
                    //   buttonColor={'#1F864A'}
                    //   buttonText={'unfollow'}
                    //   onPress={() => followUser(item.following_id)}
                    // />
                    <TouchableOpacity
                      onPress={() => {
                        followUser(item.following_id);
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{width: wp(25), height: wp(20)}}
                        source={require('../../assets/Images/Following/Unfollow.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              keyExtractor={(item, index) => `feed_${index}${item.id}`}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.01}
              ListFooterComponent={footerRender}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Following;
