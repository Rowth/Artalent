import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {tokenInvalid, Axios, URL} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import styles from './styles';
import CheckBox from 'react-native-check-box';
import SmallColorButton from '../../components/SmallColorButton';
const Search = props => {
  const {navigation, route} = props;
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filterState, setFilterState] = useState('interst');
  const [intrests, setIntrest] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [filter, setFilter] = useState([]);
  const [userData, setUserData] = useState([]);
  const [countryFeedId, setcountryFeedId] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [flatListLoader, setFlatListLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  const limit = 10;
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
  const stateView = () => {
    return (
      <>
        <View style={{height: hp(66)}}>
          <FlatList
            data={state}
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
                  <Text style={{color: 'white'}}>{item.states_name}</Text>

                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => {
                      setToggleState(item.id);
                      setPage(1);
                      setUserData([]);
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
              // flex: 1,
            }}
            contentContainerStyle={{}}
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
                      setUserData([]);
                      setCityToggel(item.id);
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
                      setUserData([]);
                      setToggleCheckBoxCountry(item.id);
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
                      setUserData([]);
                      setToggleCheckBox(item.id);
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
  const getUserData = async () => {
    setFlatListLoader(true);
    if (filter.length > 0) {
      getFilterDataApi();
    } else {
      const res = await Axios({
        method: 'get',
        url:
          searchText == ''
            ? `${URL.GET_USERS_DATA}?page=${page}&limit=${limit}`
            : `${URL.USER_SEARCH}?name=${searchText}&page=${page}&limit=${limit}`,
      });
      if (res?.data?.status === 200) {
        setUserData([...userData, ...res.data.user_details]);
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
      url: `${URL.GET_USER_FILTER}?page=${page}&limit=${limit}`,
      data: {
        username: searchText,
        interest_id: getSpecificFilterArray('interest'),
        country: getSpecificFilterArray('country'),
        state: getSpecificFilterArray('state'),
        district: getSpecificFilterArray('city'),
      },
    });
    if (res?.data?.status === 200) {
      setUserData([...userData, ...res.data.user_details]);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const loadMoreData = () => {
    if (userData.length % limit > 0) {
      setPage(Math.floor(userData.length / limit + 2));
    } else {
      setPage(Math.floor(userData.length / limit + 1));
    }
  };
  const followUser = async id => {
    let body = new FormData();
    body.append('following_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_FOLLOW_AND_UNFOLLOW,
      data: body,
    });
    if (res?.data?.status === 200) {
      setUserData(
        userData.map(item =>
          item.id === id ? {...item, follow_status: !item.follow_status} : item,
        ),
      );
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const getUserProfileData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcv');
    if (res !== null) {
      // setUserData(res);
      setIntrest(
        res.interest.map(item => ({
          ...item,
          name: item.title,
          checked: false,
          type: 'interest',
        })),
      );
      setCountry(
        res.country.map(item => ({
          ...item,
          name: item.country,
          checked: false,
          type: 'country',
        })),
      );
      setState(
        res.state.map(item => ({
          ...item,
          name: item.states_name,
          checked: false,
          type: 'state',
        })),
      );
      setCity(
        res.district.map(item => ({
          ...item,
          name: item.district_name,
          checked: false,
          type: 'city',
        })),
      );
    }
  };
  const getUserSearchData = async name => {
    if (name !== '') {
      const res = await Axios({
        method: 'get',
        url: `${URL.USER_SEARCH}?name=${name}&page=${page}&limit=${limit}`,
      });
      if (res?.data?.status === 200) {
        setUserData(res.data.user_details);
      } else if (res.data.status === 401) {
        tokenInvalid({navigation});
      }
    } else {
      getUserData();
    }
  };

  const footerRender = () => {
    return flatListLoader ? (
      <View style={{alignItems: 'center', marginBottom: hp(15)}}>
        <ActivityIndicator size="large" color={'grey'} />
      </View>
    ) : null;
  };
  const getSpecificFilterArray = type => {
    let arr = [];
    filter.forEach(item => {
      if (item.type === type) {
        arr.push(item.id);
      }
    });
    return arr;
  };
  useEffect(() => {
    // getUserProfileData();
    getNotificationCount();
    getFilterAllData();
  }, []);
  useEffect(() => {
    console.log(page);
    getUserData();
  }, [page, searchText, filter]);
  // useEffect(() => {
  //   console.log(filter);
  //   console.log('country', getSpecificFilterArray('country'));
  //   console.log('interest', getSpecificFilterArray('interest'));
  //   console.log('state', getSpecificFilterArray('state'));
  //   console.log('city', getSpecificFilterArray('city'));
  //   // getFilterDataApi();
  // }, [filter]);
  // console.log(getSpecificFilterArray('country'));
  return (
    <SafeAreaView style={styles.bodyStyle}>
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
              style={{width: wp(30), height: wp(8), resizeMode: 'cover'}}
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
                onPress={() => {
                  navigation.navigate('Notification'), safeNotificationCount();
                }}>
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

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
              justifyContent: 'center',
              paddingVertical: hp(2),
            }}>
            <NeomorphFlex
              darkShadowColor="#000"
              lightShadowColor="grey"
              inner
              style={{
                ...styles.NeomorphContainer,
                width: wp(80),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  onChangeText={text => {
                    console.log(text);
                    setSearchText(text);
                    setPage(1);
                    setUserData([]);
                  }}
                  placeholder="Search..."
                  placeholderTextColor={'#F2F2F2'}
                  style={{flex: 1, color: '#F2F2F2', paddingLeft: wp(3)}}
                />
                <TouchableOpacity>
                  <Image
                    style={{height: wp(5), width: wp(5), marginRight: wp(3)}}
                    source={require('../../assets/Images/Search/searchIc.png')}
                  />
                </TouchableOpacity>
              </View>
            </NeomorphFlex>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  setFilterVisible(!isFilterVisible);
                  // contestFeedsData();
                }}>
                <Image
                  style={{
                    height: wp(7),
                    width: wp(7),
                    marginHorizontal: wp(2),
                    tintColor: isFilterVisible ? '#EB5757' : '#ffffff',
                  }}
                  source={require('../../assets/Images/Search/searchf.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* //* *****    ****** */}
        {!isFilterVisible ? (
          <FlatList
            data={userData}
            style={{marginBottom: hp(6)}}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: hp(0.3),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: hp(1),
                    alignItems: 'center',
                    paddingHorizontal: wp(5),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                              id: item.id,
                            });
                          }}>
                          <Image
                            style={{
                              height: wp(17),
                              width: wp(17),
                              borderRadius: wp(100),
                            }}
                            source={{
                              uri:
                                item.image !== null
                                  ? item.image
                                  : 'https://artalent1234.s3.amazonaws.com/uploads%2Frn_image_picker_lib_temp_1713bd61-73e3-45de-bf8b-06ea2794a883.png',
                            }}
                          />
                        </TouchableOpacity>
                      </NeomorphFlex>
                    </NeomorphFlex>

                    <View style={{marginLeft: wp(2)}}>
                      <Text style={{color: 'white', fontWeight: '500'}}>
                        {`${item.first_name} ${item.last_name}`}
                      </Text>
                      <Text
                        style={{
                          color: '#F2F2F2',
                          fontWeight: '400',
                          fontSize: wp(3),
                        }}>
                        {'@' + item.username}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      followUser(item.id);
                    }}>
                    {!item.follow_status ? (
                      <Image
                        style={{
                          width: wp(25),
                          height: wp(13),
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/Images/Button/follow.png')}></Image>
                    ) : (
                      <Image
                        style={{
                          width: wp(25),
                          height: wp(13),
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/Images/Button/unfollow.png')}></Image>
                    )}
                  </TouchableOpacity>

                  {/* {!item.follow_status ? (
                    // <SmallColorButton
                    //   buttonColor={'#AB0404'}
                    //   buttonText={'Follow'}
                    //   onPress={() => followUser(item.id)}
                    // />
                    <TouchableOpacity
                      onPress={() => {
                        followUser(item.id);
                      }}>
                      <Image
                        style={{
                          width: wp(25),
                          height: wp(13),
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/Images/Button/follow.png')}></Image>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        followUser(item.id);
                      }}>
                      <Image
                        style={{
                          width: wp(25),
                          height: wp(13),
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/Images/Button/unfollow.png')}></Image>
                    </TouchableOpacity>
                  )} */}
                </View>
              </View>
            )}
            onEndReached={loadMoreData}
            // onEndReached={() => console.log('data')}
            onEndReachedThreshold={0.01}
            ListFooterComponent={footerRender}
          />
        ) : (
          // {/* *******************************************************FILTER sCREEN******************************************************************** */}
          <View style={{alignItems: 'center'}}>
            <Neomorph
              lightShadowColor="grey"
              style={{
                ...styles.NeomorphFilterListTab,
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
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{flex: 1}}>
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
            </ScrollView>
          </View>
        )}
        {/* //  *****    ****** * */}
      </View>
    </SafeAreaView>
  );
};

export default Search;
