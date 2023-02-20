import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import styles from './styles';
import Video from 'react-native-video';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {Header, SmallColorButton} from '@components';
import MyVideoFeed from '../../components/MyVideoFeed';
const GetLikeView = ({likeData}) => {
  const [likesData, setLikesData] = useState([]);
  const followUser = async id => {
    let body = new FormData();
    body.append('following_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_FOLLOW_AND_UNFOLLOW,
      data: body,
    });
    if (res?.data?.status === 200) {
      setLikesData(
        likesData.map(item =>
          item.id === id ? {...item, follow_status: !item.follow_status} : item,
        ),
      );
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  useEffect(() => {
    setLikesData(likeData);
  }, [likeData]);
  return (
    <View
      style={{
        height: hp(50),
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp(5),
        bottom: -1,
        left: 0,
        right: 0,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('100%'),
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            padding: wp(5),
          }}>
          <View>
            <Text style={{fontSize: wp(5), color: '#ffffff'}}>Likes</Text>
          </View>
          <View>
            <Image
              style={{width: wp(7), height: wp(7)}}
              source={require('../../assets/Images/Home/thumbsLike.png')}
            />
          </View>
        </View>
        <View
          style={{
            width: wp(100),
            height: hp(0.1),
            backgroundColor: 'black',
          }}></View>
        <ScrollView style={{backgroundColor: '#1A1A1A'}}>
          <TouchableOpacity activeOpacity={1}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={likesData}
              contentContainerStyle={{backgroundColor: '#1A1A1A'}}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <View style={{backgroundColor: '#1A1A1A'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(2),
                          }}>
                          <Image
                            style={{
                              width: wp(14),
                              height: wp(14),
                              borderRadius: wp(7),
                            }}
                            source={{
                              uri:
                                item.image !== null
                                  ? item.image
                                  : 'https://source.unsplash.com/random',
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: wp('1%'),
                            fontSize: wp(4),
                            fontWeight: 'bold',
                          }}>
                          {item.username}
                        </Text>
                      </View>
                      <View>
                        {!item.follow_status && (
                          <TouchableOpacity
                            onPress={() => {
                              followUser(item.id);
                            }}>
                            <Image
                              style={{
                                width: wp(22),
                                height: wp(10),
                                resizeMode: 'stretch',
                              }}
                              source={require('../../assets/Images/Button/follow.png')}></Image>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: hp(0.2),
                      }}></View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const ProfileContest = props => {
  const {navigation, route} = props;
  console.log(route, 'myid');
  const [userId, setUserId] = useState('');
  const [feeds, setfeeds] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const getUserFeeds = async () => {
    const res = await Axios({
      method: 'get',
      url: `${URL.GET_USER_PROFILE_FEEDS}?user_id=${route.params.id}`,
    });
    if (res?.data?.status === 200) {
      setfeeds(res?.data?.data);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const likeFeeds = async feed_id => {
    let body = new FormData();
    body.append('feed_id', feed_id);
    const res = await Axios({
      method: 'post',
      url: URL.LIKE_CONTEST_FEED,
      data: body,
    });
    if (res?.data?.status === 200) {
      console.log('liked Feed');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const getPostLikes = useCallback(async id => {
    const res = await Axios({
      method: 'post',
      url: URL.SEE_FEED_LIKE_LIST,
      data: {feed_id: id},
    });
    if (res.data.status === 200) {
      setLikeData(res.data.data);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  }, []);
  const _onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
    setActiveIndex(viewableItems[0].index);
  }, []);
  useEffect(() => {
    getUserFeeds();
  }, []);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Contest'}
        centerTextStyle={{}}
      />

      <View>
        <View>
          <FlatList
            onViewableItemsChanged={_onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            data={feeds}
            keyExtractor={(item, index) => index}
            style={{
              marginTop: hp(2),
              marginBottom: hp(8),
              backgroundColor: '#1A1A1A',
            }}
            renderItem={({item, index}) => (
              <MyVideoFeed
                index={index}
                item={item}
                getPostLikes={getPostLikes}
                setModalVisible={setModalVisible}
                navigation={navigation}
                activeIndex={activeIndex === index}
              />
            )}
          />
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        animationType="slide"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onModalHide={() => {}}
        styles={{
          height: hp(30),
          justifyContent: 'flex-end',
          backgroundColor: '#1A1A1A',
        }}
        swipeDirection="down">
        <GetLikeView likeData={likeData} />
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileContest;
