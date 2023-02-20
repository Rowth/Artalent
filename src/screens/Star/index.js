import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FeedContest from '../../screens/FeedContest/index';
import SpecialContest from '../../screens/SpecialContest/index';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import styles from './styles';
import SmallColorButton from '../../components/SmallColorButton/index';
import color from '../../config/color';
const Star = props => {
  const {navigation, route} = props;
  const [tabState, setTabState] = useState('contest');
  const imageData = [1, 2, 3, 4, 5];
  const [banner, setBannners] = useState([]);
  const [getRunningContest, setRunningContestData] = useState([]);
  const [getIntrest, setGetIntrest] = useState([]);
  const [constestId, setContestId] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [tabShow, setTabShow] = useState(true);
  const runningFlatListRef = useRef();
  const wallOfFrameFlatListRef = useRef();
  console.log(banner);

  const getNotificationCount = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_NOTIFICATION_COUNT,
    });
    if (res?.data?.status === 200) {
      setNotificationCount(res?.data?.count);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const tabManger = () => {
    if (tabState == 'contestFeed') {
      return <FeedContest navigation={navigation} route={route} />;
    } else if (tabState == 'contest') {
      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={{height: hp(8)}}></View>
            {/* *******************************************************bannerImg*********************************** */}
            {banner?.length ? (
              <Swiper
                key={props.key + 'sw'}
                loop={false}
                onIndexChanged={e => {
                  console.log(e);
                }}
                showsPagination={false}
                showsButtons={false}
                style={styles.wrapper}>
                {banner?.map((item, index) => (
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => {
                      navigation.navigate('RegularContest', {
                        intrestId: item?.id,
                      });
                    }}>
                    <ImageBackground
                      style={{flex: 1}}
                      source={{
                        uri: item?.image_full_url,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          // marginTop: hp(20),
                          paddingHorizontal: wp(5),
                          flex: 1,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: wp(100),
                            paddingHorizontal: wp(5),
                            position: 'absolute',
                            bottom: hp(0),
                            backgroundColor: 'rgba(26, 26, 26, 0.6)',
                            paddingVertical: hp(6),
                          }}>
                          <View style={{width: wp(40)}}>
                            <Text style={{color: 'white', fontSize: wp(3.5)}}>
                              {item?.title}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                marginTop: '1%',
                                fontSize: wp(3.5),
                              }}>
                              {'$ ' + item?.prize}
                            </Text>
                          </View>
                          <View style={{width: wp(40)}}>
                            <Text
                              style={{
                                color: 'white',
                                textAlign: 'right',
                                fontWeight: 'bold',
                                fontSize: wp(3.5),
                              }}>
                              {'$ ' + item?.entry_fee}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                textAlign: 'right',
                                fontSize: wp(3.5),
                              }}>
                              {'Registration Ends On \n' + item?.end_date}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </Swiper>
            ) : (
              <View
                style={{
                  height: hp(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: hp(3)}}>
                  No Banner Found
                </Text>
              </View>
            )}

            <View style={{width: wp(100), marginTop: -hp(5)}}>
              <Image
                style={{
                  height: hp(5),
                  resizeMode: 'stretch',
                  width: wp(100),
                }}
                source={require('../../assets/Images/Star/HeroDivider.png')}></Image>
            </View>
            {/* *********************************************show All************************************* */}

            <View style={{marginTop: hp(3)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: wp(4),
                }}>
                <View>
                  <Text style={{color: 'white', fontSize: wp(5)}}>
                    A Beginning to your destiny!
                  </Text>
                  <Text style={{color: '#F2F2F2', fontSize: wp(2.5)}}>
                    Register yourself and get rewarded
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ContestList', {type: 'regular'})
                  }>
                  <Image
                    style={{
                      height: wp(10),
                      width: wp(22),
                      resizeMode: 'stretch',
                    }}
                    source={require('../../assets/Images/Button/showall.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>

            {/* -------------------------------------------------</>---------------------------------------------- */}
            {/* ------------------------------------------------------catagory flatlist------------------------------------------- */}

            <View style={{marginTop: hp(2)}}>
              <FlatList
                data={getIntrest}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{width: wp('100%')}}
                keyExtractor={item => item.key}
                renderItem={({item, index}) => (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('RegularContest', {
                          intrestId: item.contest_id,
                        })
                      }>
                      <Neomorph
                        lightShadowColor="#000000"
                        darkShadowColor="#000000"
                        style={{
                          ...styles.NeomorphContainerCat,
                          width: wp(22),
                        }}>
                        <Neomorph
                          lightShadowColor="grey"
                          darkShadowColor="#000000"
                          style={{
                            ...styles.NeomorphContainerCat,
                            width: wp(22),
                          }}>
                          <Image
                            resizeMode="cover"
                            style={{
                              width: wp(22),
                              height: wp(22),
                              borderRadius: wp(2),
                            }}
                            source={{uri: item.image}}
                          />
                        </Neomorph>
                      </Neomorph>
                    </TouchableOpacity>

                    <Text style={{fontSize: wp(4), color: 'white'}}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
            {/* -----------------------------------------------------------</>-------------------------------------------------------- */}

            {/* ----------------------------------------Hall Of Fame------------------------------------------ */}
            <View style={{alignItems: 'center'}}>
              <Neomorph
                lightShadowColor="grey"
                darkShadowColor="#000000"
                style={{
                  ...styles.NeomorphContainerwall,
                  width: wp(80),
                  height: wallOfFame.length === 0 ? wp(50) : hp(7),
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/Images/Star/medal.png')}
                      style={{
                        width: wp(8),
                        height: wp(8),
                        marginTop: wallOfFame.length === 0 ? hp(-15) : hp(0),
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        marginHorizontal: wp(2),
                        marginTop: wallOfFame.length === 0 ? hp(-15) : hp(0),
                      }}>
                      Wall of Fame : The Winners
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/Images/Star/medal.png')}
                      style={{
                        width: wp(8),
                        height: wp(8),
                        marginTop: wallOfFame.length === 0 ? hp(-15) : hp(0),
                      }}
                    />
                  </View>
                </View>
              </Neomorph>
            </View>
            {/* ---------------------------------------------</>--------------------------------------------------- */}

            {/* ----------------------------------------------------Wall of Fame Flatlist----------------------------------------- */}

            {wallOfFame.length === 0 ? (
              <View style={{alignItems: 'center', marginBottom: wp(8)}}>
                <Image
                  style={{
                    height: wp(50),
                    width: wp(50),
                    marginTop: wallOfFame.length === 0 ? hp(-17) : hp(0),
                  }}
                  resizeMode={'contain'}
                  source={require('../../assets/Images/Home/winnerLay.png')}
                />
              </View>
            ) : (
              wallOfFame.length > 0 && (
                <View style={{marginBottom: hp(5), marginTop: wp(-7)}}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: 20,
                      zIndex: 10000,
                      alignItems: 'center',
                      justifyContent: 'center',
                      left: 0,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        wallOfFrameFlatListRef.current.scrollToIndex({
                          index: 0,
                        });
                      }}>
                      <Image
                        source={require('../../assets/Images/Star/RightButtonFlatlist.png')}
                        style={{
                          width: wp(7),
                          height: hp(10),
                          resizeMode: 'contain',
                          opacity: 0.5,
                          transform: [{rotate: '180deg'}],
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: 20,
                      zIndex: 10000,
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 0,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        wallOfFrameFlatListRef.current.scrollToEnd()
                      }>
                      <Image
                        source={require('../../assets/Images/Star/RightButtonFlatlist.png')}
                        style={{
                          width: wp(7),
                          height: hp(10),
                          resizeMode: 'contain',
                          opacity: 0.5,
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    ref={ref => (wallOfFrameFlatListRef.current = ref)}
                    data={wallOfFame}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      width: wp('100%'),
                      padding: wp(1),
                      marginTop: hp(-2),
                    }}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => (
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => {
                            navigation.navigate('ViewProfile', {
                              id: item.user_id,
                            });
                          }}>
                          <ImageBackground
                            resizeMode="stretch"
                            style={{
                              width: wp(40),
                              height: hp(30),
                              marginVertical: hp(2),
                            }}
                            source={require('../../assets/Images/RegularContest/winnerFrame.png')}>
                            <View
                              style={{
                                paddingTop: hp(2),
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Image
                                resizeMode="cover"
                                style={{
                                  height: hp(17),
                                  width: wp(29),
                                  borderRadius: 10,
                                  marginTop: wp(1),
                                }}
                                source={{
                                  uri: item.user_image
                                    ? item.user_image
                                    : 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
                                }}
                              />
                              <View
                                style={{
                                  alignItems: 'center',
                                  paddingHorizontal: wp(1.5),
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: 'white',
                                    marginTop: hp(0.5),
                                    fontSize: wp(3),
                                    fontWeight: 'bold',
                                  }}>
                                  {item.username}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: wp(3),
                                    opacity: 0.6,
                                    paddingHorizontal: wp(1),
                                  }}>
                                  {'contest for ' + item.contest_title}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: wp(3),
                                    opacity: 0.6,

                                    textAlign: 'justify',
                                  }}>
                                  {
                                    <Text
                                      style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: wp(3),
                                        opacity: 0.6,
                                        textAlign: 'justify',
                                      }}>
                                      {item.district}
                                    </Text>
                                  }
                                </Text>
                              </View>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              )
            )}

            {/* ---------------------------------------------------------</>------------------------------------------------------ */}
            {/* -------------------------------------------------------Show All btn---------------------------------------------------- */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: hp(5),
                marginTop: hp(-3),
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Winners')}>
                <Neomorph
                  lightShadowColor="grey"
                  darkShadowColor="#000000"
                  style={{
                    ...styles.showAllBtn,
                    width: wp(70),
                  }}>
                  <View>
                    <Text style={{color: 'white'}}>Show All</Text>
                  </View>
                </Neomorph>
              </TouchableOpacity>
            </View>

            {/* ------------------------------------------------------------</>---------------------------------------------------------------------- */}
            {/* --------------------------------------------------------------Running Contest Btn------------------------------------------------------------ */}
            <View
              style={{
                marginBottom: hp(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(3),
              }}>
              <Text style={{fontSize: wp(4), color: 'white'}}>
                Running Contest
              </Text>
              {/* <SmallColorButton
                buttonText={'Show all'}
                buttonColor={'#AB0404'}
                onPress={() =>
                  navigation.navigate('ContestList', {type: 'running'})
                }
              />
                onPress={() => navigation.navigate('ContestList')}
              /> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ContestList', {type: 'running'})
                }>
                <Image
                  style={{
                    height: wp(10),
                    width: wp(22),
                    resizeMode: 'stretch',
                  }}
                  source={require('../../assets/Images/Button/showall.png')}></Image>
              </TouchableOpacity>
            </View>

            {/* ------------------------------------------------------------------</>------------------------------------------------------------------------ */}

            {/* -------------------------------------------------------------Running Contest Flatlist------------------------------------------------------------- */}
            {getRunningContest.length > 0 && (
              <View style={{marginBottom: hp(5)}}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: 20,
                    zIndex: 10000,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 0,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      runningFlatListRef.current.scrollToIndex({index: 0});
                    }}>
                    <Image
                      source={require('../../assets/Images/Star/RightButtonFlatlist.png')}
                      style={{
                        width: wp(7),
                        height: hp(10),
                        resizeMode: 'contain',
                        opacity: 0.5,
                        transform: [{rotate: '180deg'}],
                      }}></Image>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: 20,
                    zIndex: 10000,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 0,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => runningFlatListRef.current.scrollToEnd()}>
                    <Image
                      source={require('../../assets/Images/Star/RightButtonFlatlist.png')}
                      style={{
                        width: wp(7),
                        height: hp(10),
                        resizeMode: 'contain',
                        opacity: 0.5,
                      }}></Image>
                  </TouchableOpacity>
                </View>
                <FlatList
                  ref={ref => (runningFlatListRef.current = ref)}
                  data={getRunningContest}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{width: wp('100%')}}
                  keyExtractor={item => item.key}
                  renderItem={({item, index}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.contest_type);
                          if (item.contest_type === 'regular') {
                            navigation.navigate('RegularContest', {
                              intrestId: item.id,
                            });
                          } else {
                            navigation.navigate('ViewSpecialContest', {
                              special_id: item.id,
                            });
                          }
                        }}>
                        <Neomorph
                          lightShadowColor="grey"
                          darkShadowColor="#000000"
                          style={{
                            ...styles.NeomorphFlatlisRunning,
                            width: wp(35),
                          }}>
                          <ImageBackground
                            resizeMode="cover"
                            // source={require('../../assets/Images/Star/mic.jpg')}
                            imageStyle={{borderRadius: 5}}
                            source={{uri: item.image}}
                            style={{
                              flex: 1,
                              width: '100%',
                              height: '100%',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                alignItems: 'center',
                                bottom: -1,
                                position: 'absolute',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                justifyContent: 'center',
                                width: '100%',
                                height: '40%',
                              }}>
                              <Text style={{color: 'white', fontSize: wp(3.5)}}>
                                {item.title}
                              </Text>
                            </View>
                          </ImageBackground>
                        </Neomorph>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}

            {/* ----------------------------------------------------------------------</>----------------------------------------------------------------------------- */}
          </View>
        </ScrollView>
      );
    } else if (tabState == 'specialContest') {
      return (
        <View style={{flex: 1}}>
          <SpecialContest navigation={navigation} route={route} />
        </View>
      );
    }
  };

  const activeButton = name => {
    return (
      <ImageBackground
        resizeMode="stretch"
        style={{
          width: '100%',
          height: hp(6.8),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
        source={
          name === 'Special Contest'
            ? require('../../assets/Images/Star/yellowbgtab.png')
            : require('../../assets/Images/Star/redtabbar.png')
        }>
        <Text style={{color: 'white', fontSize: wp(3), textAlign: 'center'}}>
          {name}
        </Text>
      </ImageBackground>
    );
  };

  const [wallOfFame, setWallofFame] = useState([]);
  const [categoryData, setCategoryData] = useState([
    {
      key: '1',
      image: require('../../assets/Images/Star/headphones.png'),
      name: 'Music',
    },
    {
      key: '2',
      image: require('../../assets/Images/Star/writing.png'),
      name: 'Writing',
    },
    {
      key: '3',
      image: require('../../assets/Images/Star/acting.png'),
      name: 'Action',
    },
    {
      key: '4',
      image: require('../../assets/Images/Star/headphones.png'),
      name: 'Music',
    },
    {
      key: '5',
      image: require('../../assets/Images/Star/writing.png'),
      name: 'Writing',
    },
    {
      key: '6',
      image: require('../../assets/Images/Star/acting.png'),
      name: 'Action',
    },
    {
      key: '7',
      image: require('../../assets/Images/Star/headphones.png'),
      name: 'Music',
    },
    {
      key: '8',
      image: require('../../assets/Images/Star/writing.png'),
      name: 'Writing',
    },
    {
      key: '9',
      image: require('../../assets/Images/Star/acting.png'),
      name: 'Action',
    },
  ]);

  // **** API METHODS ****

  const getBanners = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_BANNERS,
    });
    if (res?.data?.status === 200) {
      setBannners(res.data.contest_banner);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const getWinnersData = data => {
    const resArray = [];
    data.forEach(element => {
      element.winner_data.forEach(item => {
        resArray.push(item);
      });
    });
    return resArray;
  };
  const getWallOfFame = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_REGULAR_WINNERS,
    });
    if (res?.data?.status === 200) {
      setWallofFame(getWinnersData(res?.data?.winner_details));

      console.log(res);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
  const getIntrestData = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_INTRESTS,
    });
    if (res?.data?.status === 200) {
      setGetIntrest(res.data.interest);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
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

  const getRunningContestsData = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.RUNNING_CONTEST,
    });
    if (res?.data?.status === 200) {
      setRunningContestData(res.data.running_contest);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server Error');
    }
  };
  //  ** special contest **

  const [getUpcoming, setUpcoming] = useState([]);
  const upcomingBanner = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.RUNNING_SPECIAL_CONTEST,
    });
    if (res?.data?.status === 200) {
      setUpcoming(res.data.setUpcoming);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const [contestFeedData, setContestFeedData] = useState([]);

  // ** end **

  // ****  </> ****
  useEffect(() => {
    getBanners();
    getIntrestData();
    getRunningContestsData();
    getWallOfFame();
    getNotificationCount();
    // upcomingBanner();
    // contestFeedsData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1A1A1A',
      }}>
      {/* CONTAINRE TAB BAR AND HEADER START */}

      {/* HEADER START */}
      <View
        style={{
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          position: 'absolute',
          backgroundColor: 'rgba(26,26,26, 0.5)',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(5),
            height: hp(6),
            backgroundColor: 'rgba(26,26,26, 0.5)',
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
              backgroundColor: 'transparent',
            }}>
            <Image
              style={{width: wp(30), height: wp(8), resizeMode: 'cover'}}
              source={require('../../assets/Images/Home/ARTalent-text.png')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification'), safeNotificationCount();
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: wp(7),
                  height: wp(7),
                }}
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
            </TouchableOpacity>
          </View>
        </View>
        {/* TAB BAR START */}
        <View
          style={{
            height: hp(4.5),
            alignItems: 'center',
            paddingHorizontal: wp(10),
            marginBottom: -hp(2),
          }}>
          <NeomorphFlex
            lightShadowColor="grey"
            style={{...styles.NeomorphContainer, width: '100%', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    marginLeft: tabState === 'contestFeed' ? -wp(3) : 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setTabState('contestFeed');
                  }}>
                  {tabState == 'contestFeed' ? (
                    activeButton('Contest Feed')
                  ) : (
                    <Text style={{color: 'white', fontSize: wp(3)}}>
                      Contest Feed
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'grey
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: -wp(3),
                  }}
                  onPress={() => {
                    setTabState('contest');
                  }}>
                  {tabState == 'contest' ? (
                    activeButton('Contest')
                  ) : (
                    <Text style={{color: 'white', fontSize: wp(3.5)}}>
                      Contest
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: tabState === 'specialContest' ? -wp(5) : 0,
                  }}
                  onPress={() => {
                    setTabState('specialContest');
                  }}>
                  {tabState == 'specialContest' ? (
                    activeButton('Special Contest')
                  ) : (
                    <Text style={{color: 'white', fontSize: wp(3)}}>
                      Special Contest
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </NeomorphFlex>
        </View>
        {/* TAB BAR END */}
      </View>
      {/* Header END */}

      {/* CONTAINRE TAB BAR AND HEADER END */}

      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'transparent',
          // marginTop: hp(8),
          // paddingTop: hp(8),
        }}>
        {/* <View style={{height: hp(8), backgroundColor: 'transparent'}}></View> */}
        <View style={{flex: 1, zIndex: -1}}>{tabManger()}</View>
      </View>
    </SafeAreaView>
  );
};
export default Star;
