import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import CheckBox from 'react-native-check-box';
import {tokenInvalid, Axios, URL, Helper} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SmallColorButton} from '@components';
import Styles from './styles';
import Modal from 'react-native-modal';
// import {createThumbnail} from 'react-native-create-thumbnail';

const FeedItem = ({
  item,
  index,
  navigation,
  getPostLikes,
  setModalVisible,
  videoData,
  activeIndex,
  muted,
  setMutedStatus,
  deleteVideo,
  id,
}) => {
  const [likeCount, setLikeCount] = useState(item.like_count);
  const [likeStatus, setLikeStatus] = useState(item.like_status);
  const [thumbLink, setThumbLink] = useState('');

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
      setLikeStatus(!likeStatus);
      setLikeCount(res.data.likes_count);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };

  useEffect(() => {
    // createThumbnail({
    //   url: item.image,
    //   timeStamp: 10000,
    // })
    //   .then(response => {
    //     console.log(response);
    //     setThumbLink(response.path);
    //   })
    //   .catch(err => console.log({err}));
  }, []);
  // console.log(item);s
  return (
    <View>
      {/* require('../../assets/Images/FeedContest/specialBack.png') */}
      <ImageBackground
        key={index}
        style={{flex: 1, marginBottom: wp(10)}}
        resizeMode={'stretch'}
        source={
          item.contest_type != 'regular'
            ? require('../../assets/Images/FeedContest/specialBack.png')
            : null
        }>
        <View style={{height: hp(60), margin: wp(3)}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setMutedStatus(!muted)}>
            <View style={{height: hp(60)}}>
              <Video
                poster={
                  'https://cdn-icons-png.flaticon.com/128/1479/1479689.png'
                }
                posterResizeMode="contain"
                repeat={true}
                playInBackground={false}
                useTextureView={false}
                disableFocus={false}
                muted={muted}
                paused={!activeIndex}
                resizeMode="cover"
                controls={false}
                selectedVideoTrack={{
                  type: 'resolution',
                  value: 50,
                }}
                source={{
                  uri: item.feed,
                }}
                bufferConfig={{
                  bufferForPlaybackMs: 100,
                  maxBufferMs: 100,
                }}
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderRadius: 15,
                  padding: wp(5),
                  marginLeft: wp(2),
                }}
              />
            </View>
          </TouchableOpacity>

          <View style={{height: 100, opacity: 0.6}}></View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let dataR = videoData.filter(
                    (itemz, indexz) => itemz.id !== item.id,
                  );
                  navigation.navigate('ViewContestFeed', {
                    data: [{...item}, ...dataR],
                  });
                }}>
                <Image
                  style={{width: wp(6), height: wp(6), margin: wp(3)}}
                  source={require('../../assets/Images/FeedContest/fullScreen.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteVideo(item.id);
                  console.log('snif' + id + ' userId' + item.user_id);
                }}>
                {id === item.user_id ? (
                  <Image
                    style={{width: wp(6), height: wp(6), margin: wp(3)}}
                    source={require('../../assets/Images/FeedContest/bin.png')}
                  />
                ) : null}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                paddingHorizontal: wp(2),
                bottom: hp(1),
                left: 0,
                right: 0,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewProfile', {id: item.user_id})
                  }>
                  <Image
                    style={{
                      width: wp(16),
                      height: wp(16),
                      borderRadius: wp(100),
                    }}
                    source={{
                      uri:
                        item.user_image !== null
                          ? item.user_image
                          : 'https://source.unsplash.com/random',
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: wp(3),
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {item.userfullname}
                  </Text>
                  <Text style={{color: 'white'}}>{item.interestname}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    getPostLikes(item.id);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(4.3),
                      paddingHorizontal: wp(2),
                    }}>
                    {likeCount}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    likeFeeds(item.id);
                  }}>
                  <Image
                    style={{
                      width: wp(5.5),
                      height: wp(5.5),
                      marginHorizontal: wp(2),
                    }}
                    source={
                      likeStatus
                        ? require('../../assets/Images/FeedContest/thumbsupfill.png')
                        : require('../../assets/Images/FeedContest/thumb-up.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Helper.ShareSocial();
                  }}>
                  <Image
                    style={{
                      width: wp(5.5),
                      height: wp(5.5),
                      paddingHorizontal: wp(2),
                    }}
                    source={require('../../assets/Images/FeedContest/send.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const FeedContest = props => {
  const {navigation, route} = props;
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filterState, setFilterState] = useState('interst');
  const [feedData, setFeedData] = useState([]);
  const [intrests, setIntrest] = useState([]);
  const [country, setCountry] = useState([]);
  const [currentIndex, setCurrentIndex] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [filter, setFilter] = useState([]);
  const [countryFeedId, setcountryFeedId] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [page, setPage] = useState(1);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userId, setUserId] = useState('');
  const limit = 5;
  const [likeData, SetLikeData] = useState([]);
  const [mutedStatus, setMutedStatus] = useState(false);
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcv');
    if (res !== null) {
      setUserId(res?.user_data?.id);
      console.log(res);
      console.log(res?.user_data?.id + 'my id is');
    }
  };
  const deleteVideo = async constId => {
    let body = {
      contestfeed_id: constId,
    };
    const res = await Axios({
      method: 'post',
      url: URL.DELETE_VIDEO_POST,
      data: body,
    });

    if (res?.data?.status === 200) {
      Alert.alert('vedio Delete successfully');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding' + res?.data?.message);
    }
  };
  const getAllData = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_ALL_DATA,
    });
    if (res?.data?.status === 200) {
      console.log(res.data);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
  const getPostLikes = useCallback(async id => {
    const body = new FormData();
    body.append('feed_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.SEE_FEED_LIKE_LIST,
      data: body,
    });
    if (res?.data?.status === 200) {
      SetLikeData(res.data.data);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  }, []);

  const [feeds, setFeeds] = useState([]);
  const postLike = useCallback(
    async postData => {
      let body = new FormData();
      body.append('feed_id', id);
      const res = await Axios({
        method: 'post',
        url: URL.LIKE_USER_POST,
        data: body,
      });
      if (res?.data?.status === 200) {
        console.log(feeds);
        Alert.alert('Feed Liked');
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      }
    },
    [feeds],
  );
  const filterRemove = (type, id) => {
    if (type === 'interest') {
      setIntrest(
        intrests.map(item =>
          item.id === id ? {...item, checked: !item.checked} : item,
        ),
      );
    } else if (type === 'state') {
      setState(
        state.map(item =>
          item.id === id ? {...item, checked: !item.checked} : item,
        ),
      );
    } else if (type === 'city') {
      setCity(
        city.map(item =>
          item.id === id ? {...item, checked: !item.checked} : item,
        ),
      );
    } else if (type === 'country') {
      setCountry(
        country.map(
          item => (item.id === id ? {...item, checked: !item.checked} : item),
          setcountryFeedId(id),
        ),
      );
    }
  };
  const setToggleCheckBox = id => {
    setIntrest(
      intrests.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
    intrests.forEach(item => {
      if (item.id === id) {
        if (item.checked) {
          setFilter(
            filter.filter(vData =>
              vData.id === item.id && vData.type === item.type ? false : true,
            ),
          );
        } else {
          setFilter([...filter, item]);
        }
      }
    });
  };
  const setToggleCheckBoxCountry = id => {
    setCountry(
      country.map(
        item => (item.id === id ? {...item, checked: !item.checked} : item),
        setcountryFeedId(id),
      ),
    );
    country.forEach(item => {
      if (item.id === id) {
        if (item.checked) {
          setFilter(
            filter.filter(vData =>
              vData.id === item.id && vData.type === item.type ? false : true,
            ),
          );
        } else {
          setFilter([...filter, item]);
        }
      }
    });
  };
  const setToggleState = id => {
    setState(
      state.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
    state.forEach(item => {
      if (item.id === id) {
        if (item.checked) {
          setFilter(
            filter.filter(vData =>
              vData.id === item.id && vData.type === item.type ? false : true,
            ),
          );
        } else {
          setFilter([...filter, item]);
        }
      }
    });
  };
  const setCityToggel = id => {
    setCity(
      city.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
    city.forEach(item => {
      if (item.id === id) {
        if (item.checked) {
          setFilter(
            filter.filter(vData =>
              vData.id === item.id && vData.type === item.type ? false : true,
            ),
          );
        } else {
          setFilter([...filter, item]);
        }
      }
    });
  };

  const contestFeedsData = async () => {
    setFlatListLoader(true);
    if (filter.length > 0) {
      getFilterDataApi();
    } else {
      const res = await Axios({
        method: 'post',
        url: `${URL.GET_CONTEST_FEEDS}?limit=${limit}&page=${page}`,
        // data: body,
      });
      if (res?.data?.status === 200) {
        setFeedData([...feedData, ...res?.data?.contest_feeds]);
        console.log(res?.data?.contest_feeds[0].user_id + '     ' + userId);
        console.log(
          res?.data?.contest_feeds[0].user_id === userId ? 'done' : 'not_done',
        );
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      }
    }

    setFlatListLoader(false);
  };
  const getFilterDataApi = async () => {
    // GET_USER_FILTER;
    const res = await Axios({
      method: 'post',
      url: `${URL.GET_FILTER_CONTEST_FEED}?page=${page}&limit=${limit}`,
      data: {
        interest_id: getSpecificFilterArray('interest'),
        country: getSpecificFilterArray('country'),
        state: getSpecificFilterArray('state'),
        district: getSpecificFilterArray('city'),
      },
    });
    if (res?.data?.status === 200) {
      setFeedData([...feedData, ...res?.data?.contest_feeds]);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const stateView = () => {
    return (
      <>
        <View style={{height: hp(66)}}>
          <FlatList
            data={state}
            keyExtractor={item => item.key}
            style={{
              marginTop: hp(2),
              paddingHorizontal: wp(5),
            }}
            renderItem={({item}) => (
              <View style={{padding: wp(2)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>{item.states_name}</Text>

                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => {
                      setPage(1);
                      setFeedData([]);
                      setToggleState(item.id);
                    }}
                    checkedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/checked.png')}
                      />
                    }
                    unCheckedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/unchecked.png')}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp(0.1),
                    backgroundColor: 'black',
                    marginTop: wp(1),
                  }}></View>
              </View>
            )}
          />
        </View>
      </>
    );
  };
  const cityView = () => {
    return (
      <>
        <View style={{height: hp(66)}}>
          <FlatList
            data={city}
            keyExtractor={item => item.key}
            style={{
              marginTop: hp(2),
              width: wp('100%'),
              paddingHorizontal: wp(5),
            }}
            renderItem={({item}) => (
              <View style={{padding: wp(2)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>{item.district_name}</Text>

                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => {
                      setPage(1);
                      setFeedData([]);
                      setCityToggel(item.id);
                    }}
                    checkBoxColor="white"
                    checkedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/checked.png')}
                      />
                    }
                    unCheckedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/unchecked.png')}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp(0.1),
                    backgroundColor: 'black',
                    marginTop: wp(1),
                  }}></View>
              </View>
            )}
          />
        </View>
      </>
    );
  };
  const counrtyView = () => {
    return (
      <>
        <View style={{height: hp(66)}}>
          <FlatList
            data={country}
            keyExtractor={item => item.key}
            style={{
              marginTop: hp(2),
              width: wp('100%'),
              paddingHorizontal: wp(5),
            }}
            renderItem={({item}) => (
              <View style={{padding: wp(2)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>{item.country}</Text>

                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => {
                      setPage(1);
                      setFeedData([]);
                      setToggleCheckBoxCountry(item.id);
                    }}
                    checkBoxColor="white"
                    checkedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/checked.png')}
                      />
                    }
                    unCheckedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/unchecked.png')}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp(0.1),
                    backgroundColor: 'black',
                    marginTop: wp(1),
                  }}></View>
              </View>
            )}
          />
        </View>
      </>
    );
  };
  const intrestView = () => {
    return (
      <>
        <View style={{height: hp(66)}}>
          <FlatList
            data={intrests}
            keyExtractor={item => item.key}
            style={{
              marginTop: hp(2),
              width: wp('100%'),
              paddingHorizontal: wp(5),
            }}
            renderItem={({item, index}) => (
              <View style={{padding: wp(2)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>{item.title}</Text>

                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => {
                      setPage(1);
                      setFeedData([]);
                      setToggleCheckBox(item.id);
                    }}
                    checkBoxColor="white"
                    checkedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/checked.png')}
                      />
                    }
                    unCheckedImage={
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: wp(5),
                          width: wp(5),
                        }}
                        source={require('../../assets/Images/FeedContest/unchecked.png')}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp(0.1),
                    backgroundColor: 'black',
                    marginTop: wp(1),
                  }}></View>
              </View>
            )}
          />
        </View>
      </>
    );
  };

  const getFilterAllData = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_FILTER_ALL_DATA,
    });
    if (res?.data?.status === 200) {
      setIntrest(
        res.data.data.interest.map(item => ({
          ...item,
          name: item.title,
          checked: false,
          type: 'interest',
        })),
      );
      setCountry(
        res.data.data.country.map(item => ({
          ...item,
          name: item.country,
          checked: false,
          type: 'country',
        })),
      );
      setState(
        res.data.data.states.map(item => ({
          ...item,
          name: item.states_name,
          checked: false,
          type: 'state',
        })),
      );
      setCity(
        res.data.data.district.map(item => ({
          ...item,
          name: item.district_name,
          checked: false,
          type: 'city',
        })),
      );
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };

  const feedItem = useMemo(
    currentIndex => {
      return ({item, index}) => (
        <View style={{height: hp(60), margin: wp(3)}}>
          {index === index ? (
            <Video
              useTextureView={false}
              playInBackground={true}
              disableFocus={false}
              muted={true}
              paused={index === index ? false : true}
              resizeMode="cover"
              selectedVideoTrack={{
                type: 'resolution',
                value: 480,
              }}
              source={{
                uri: item.feed,
              }}
              thumbnail={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4461/4461744.png',
              }}
              bufferConfig={{
                bufferForPlaybackMs: 100,
                maxBufferMs: 100,
              }}
              // onBuffer={this.onBuffer} // Callback when remote video is buffering
              // onError={this.videoError} // Callback when video cannot be loaded
              // style={{height: hp(60), margin: wp(3)}}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: 20,
              }}
            />
          ) : // <Thumbnail
          //   imageHeight={{flex: 1}}
          //   url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          // />
          null}

          <View
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewContestFeed', {data: item})
              }>
              <Image
                style={{width: wp(6), height: wp(6), margin: wp(3)}}
                source={require('../../assets/Images/FeedContest/fullScreen.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                paddingHorizontal: wp(2),
                bottom: hp(1),
                left: 0,
                right: 0,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Image
                    style={{
                      width: wp(16),
                      height: wp(16),
                      borderRadius: wp(100),
                    }}
                    source={{
                      uri:
                        item.user_image !== null
                          ? item.user_image
                          : 'https://source.unsplash.com/random',
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: wp(3),
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {item.userfullname}
                  </Text>
                  <Text style={{color: 'white'}}>{item.interestname}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setModalType('like');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(4.3),
                      paddingHorizontal: wp(2),
                    }}>
                    {item.like_count}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={{
                      width: wp(5.5),
                      height: wp(5.5),
                      marginHorizontal: wp(2),
                    }}
                    source={require('../../assets/Images/FeedContest/thumb-up.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Helper.ShareSocial();
                  }}>
                  <Image
                    style={{
                      width: wp(5.5),
                      height: wp(5.5),
                      paddingHorizontal: wp(2),
                    }}
                    source={require('../../assets/Images/FeedContest/send.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    },
    [feedData],
  );
  const getSpecificFilterArray = type => {
    let arr = [];
    filter.forEach(item => {
      if (item.type === type) {
        arr.push(item.id);
      }
    });
    return arr;
  };
  const loadMoreData = () => {
    console.log('Loading');
    if (feedData.length % limit > 0) {
      setPage(Math.floor(feedData.length / limit + 2));
    } else {
      setPage(Math.floor(feedData.length / limit + 1));
    }
  };
  const footerRender = () => {
    return flatListLoader ? (
      <View style={{alignItems: 'center', marginBottom: hp(15)}}>
        <ActivityIndicator size="large" color={'grey'} />
      </View>
    ) : null;
  };
  useEffect(() => {
    contestFeedsData();
    getUserData();

    // getPostLikes();
    // getFeedThumbnail();
  }, [page, filter]);
  useEffect(() => {
    getFilterAllData();
  }, []);
  const tabBar = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: hp(10), width: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: wp(3),
            // backgroundColor: 'red',
          }}>
          {/* {isFilterVisible && ( */}
          <TouchableOpacity
            onPress={() => {
              setFilterVisible(!isFilterVisible);
            }}>
            <Image
              style={{height: wp(6), width: wp(6), marginTop: hp(1)}}
              source={require('../../assets/Images/SelectInterest/Vector.png')}
            />
          </TouchableOpacity>
          {/* )} */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: hp(2),
            flex: 1,
          }}>
          <NeomorphFlex
            darkShadowColor="#000000"
            lightShadowColor="grey"
            inner
            style={{
              ...Styles.NeomorphFlatlistWall,
              width: '100%',
            }}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp(1),
                width: '100%',
              }}>
              <FlatList
                data={filter}
                horizontal={true}
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Neomorph
                      darkShadowColor="#000000"
                      lightShadowColor="#000"
                      style={{
                        ...Styles.NeomorphFilter,
                        width: wp(22),
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          width: wp(22),
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#C4C4C4',
                            textAlign: 'center',
                            width: wp(15),
                          }}>
                          {item.name.trim()}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setFilter(
                              filter.filter(vData =>
                                vData.id === item.id && vData.name === item.name
                                  ? false
                                  : true,
                              ),
                            );
                            setFeedData([]);
                            filterRemove(item.type, item.id);
                          }}>
                          <Image
                            style={{height: wp(5), width: wp(5)}}
                            source={require('../../assets/Images/FeedContest/cross.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </Neomorph>
                  </View>
                )}
              />
            </View>
          </NeomorphFlex>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: wp(3),
          }}>
          <TouchableOpacity
            onPress={() => {
              setFilterVisible(!isFilterVisible);
            }}>
            <Image
              style={{height: wp(7), width: wp(7), marginTop: hp(1)}}
              source={require('../../assets/Images/FeedContest/filter.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const _onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
    setActiveIndex(viewableItems[0].index);
  }, []);

  useEffect(() => {
    // console.log(filter);
    // console.log('country', getSpecificFilterArray('country'));
    // console.log('interest', getSpecificFilterArray('interest'));
    // console.log('state', getSpecificFilterArray('state'));
    // console.log('city', getSpecificFilterArray('city'));
    // getFilterDataApi();
  }, [filter]);
  return (
    // <SafeAreaView style={Styles.bodyStyle}>
    <View style={{paddingTop: hp(0)}}>
      {/* SEARCH TAB BAR START */}
      <View style={{flexDirection: 'row', marginTop: hp(10), width: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: wp(3),
          }}>
          {/* {isFilterVisible && ( */}
          <TouchableOpacity
            onPress={() => {
              setFilterVisible(!isFilterVisible);
            }}>
            <Image
              style={{height: wp(6), width: wp(6), marginTop: hp(1)}}
              source={require('../../assets/Images/SelectInterest/Vector.png')}
            />
          </TouchableOpacity>
          {/* )} */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: hp(2),
            flex: 1,
          }}>
          <NeomorphFlex
            darkShadowColor="#000000"
            lightShadowColor="grey"
            inner
            style={{
              ...Styles.NeomorphFlatlistWall,
              width: '100%',
            }}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp(1),
                width: '100%',
              }}>
              <FlatList
                data={filter}
                horizontal={true}
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Neomorph
                      darkShadowColor="#000000"
                      lightShadowColor="#000"
                      style={{
                        ...Styles.NeomorphFilter,
                        width: wp(22),
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          width: wp(22),
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#C4C4C4',
                            textAlign: 'center',
                            width: wp(15),
                          }}>
                          {item.name.trim()}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setFilter(
                              filter.filter(vData =>
                                vData.id === item.id && vData.name === item.name
                                  ? false
                                  : true,
                              ),
                            );
                            setFeedData([]);
                            filterRemove(item.type, item.id);
                          }}>
                          <Image
                            style={{height: wp(5), width: wp(5)}}
                            source={require('../../assets/Images/FeedContest/cross.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </Neomorph>
                  </View>
                )}
              />
            </View>
          </NeomorphFlex>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: wp(3),
          }}>
          <TouchableOpacity
            onPress={() => {
              setFilterVisible(!isFilterVisible);
            }}>
            <Image
              style={{height: wp(7), width: wp(7), marginTop: hp(1)}}
              source={require('../../assets/Images/FeedContest/filter.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* SEARCH TAB BAR END */}

      {!isFilterVisible ? (
        feedData?.length > 0 ? (
          <FlatList
            data={feedData}
            onViewableItemsChanged={_onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            // ListHeaderComponent={() => tabBar()}
            contentContainerStyle={{paddingBottom: wp(27)}}
            style={
              {
                // backgroundColor: 'red',
              }
            }
            renderItem={({item, index}) => (
              <FeedItem
                item={item}
                index={{index}}
                navigation={navigation}
                videoData={feedData}
                getPostLikes={getPostLikes}
                setModalVisible={setModalVisible}
                activeIndex={index === activeIndex}
                muted={mutedStatus}
                setMutedStatus={setMutedStatus}
                deleteVideo={deleteVideo}
                id={userId}
              />
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={footerRender}
            onScroll={e => {}}
          />
        ) : (
          <View
            style={{
              height: '80%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1A1A1A',
            }}>
            <Text style={{color: 'white'}}>
              {feedData.length === 0 ? 'No Video Found' : 'Loading'}
            </Text>
          </View>
        )
      ) : (
        // {/* *******************************************************FILTER sCREEN******************************************************************** */}
        <View style={{alignItems: 'center'}}>
          {/* {tabBar()} */}

          <Neomorph
            lightShadowColor="grey"
            style={{
              ...Styles.NeomorphFilterListTab,
              width: wp(100),
              marginTop: hp(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFilterState('interst');
                }}>
                <Text
                  style={{
                    color: filterState == 'interst' ? '#EB5757' : '#828282',
                  }}>
                  Interest
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setFilterState('country');
                }}>
                <Text
                  style={{
                    color: filterState == 'country' ? '#EB5757' : '#828282',
                  }}>
                  Country
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setFilterState('state');
                }}>
                <Text
                  style={{
                    color: filterState == 'state' ? '#EB5757' : '#828282',
                  }}>
                  State
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setFilterState('city');
                }}>
                <Text
                  style={{
                    color: filterState == 'city' ? '#EB5757' : '#828282',
                  }}>
                  City
                </Text>
              </TouchableOpacity>
            </View>
          </Neomorph>
          <View>
            {filterState === 'interst'
              ? intrestView()
              : filterState === 'country'
              ? counrtyView()
              : filterState == 'state'
              ? stateView()
              : filterState == 'city'
              ? cityView()
              : null}
          </View>
        </View>
      )}
      {/* *****************************************************************</>************************************************************************ */}
      <Modal
        isVisible={isModalVisible}
        animationType="slide"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        // propagateSwipe={true}

        styles={{
          height: hp(60),

          justifyContent: 'flex-end',
        }}
        swipeDirection="down">
        <View
          style={{
            height: hp(50),
            alignItems: 'center',
            position: 'absolute',
            marginTop: hp(5),
            bottom: -1,
            left: 0,
            right: 0,
            backgroundColor: '#1A1A1A',
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
                flex: 1,

                backgroundColor: '#1A1A1A',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 1,

                  backgroundColor: 'black',
                }}></View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={likeData}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <TouchableOpacity activeOpacity={1}>
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
                                uri: item.image,
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
                        {/* <View>
                        {item.followStatus == 'no' ? null : (
                          <TouchableOpacity>
                            <View
                              style={{
                                alignItems: 'center',
                                marginRight: 10,
                                marginTop: -10,
                              }}>
                              <SmallColorButton buttonText={'Follow'} />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View> */}
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
            </View>
          </View>

          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
    // </SafeAreaView>
  );
};
export default FeedContest;
