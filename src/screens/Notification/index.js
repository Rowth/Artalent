import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {LongHeader} from '@components';
import Style from './styles';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, tokenInvalid} from '@config';
const Notification = props => {
  const [search, setSearch] = useState('');
  const [tabState, setTabState] = useState('other');
  const [page, setPage] = useState(1);
  const limit = 5;
  const [notificationData, setNotificationData] = useState([]);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const {navigation, route} = props;

  const activeButton = name => {
    return (
      <Neomorph
        inner
        lightShadowColor="transparent"
        darkShadowColor="#000000"
        style={{
          shadowOffset: {width: -1, height: -5},
          shadowRadius: 3,
          shadowOpacity: 3,
          backgroundColor: '#1A1A1A',
          height: hp(18),
          width: wp(90 / 2),
          height: hp(5),
          borderRadius: 12,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#F2C94C',
              fontWeight: '400',
            }}>
            {name}
          </Text>
        </View>
      </Neomorph>
    );
  };
  const nonActiveButton = name => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#828282',
            fontWeight: '400',
          }}>
          {name}
        </Text>
      </View>
    );
  };
  const getNotificationsData = async () => {
    setFlatListLoader(true);
    const res = await Axios({
      method: 'get',
      url: `${URL.GET_NOTIFICATIONS}?type=${tabState}&page=${page}&limit=${limit}`,
    });
    if (res.data.status === 200) {
      setNotificationData([...notificationData, ...res.data.notifications]);
    } else if (res.data.status === 401) {
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
    if (notificationData.length % limit > 0) {
      setPage(Math.floor(notificationData.length / limit + 2));
    } else {
      setPage(Math.floor(notificationData.length / limit + 1));
    }
  };
  useEffect(() => {
    getNotificationsData();
  }, [tabState, page]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1A1A1A'}}>
      <View>
        <LongHeader
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/Home/bell.png')}
          centerText={'NOTIFICATIONS'}
          onClickLeftIcon={() => navigation.goBack()}
          centerTextStyle={{
            fontSize: wp(4.5),
            fontWeight: '500',
            letterSpacing: 1,
            paddingLeft: wp(0.5),
          }}
          innerComponent={() => (
            <View style={{}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Neomorph
                    darkShadowColor="#000000"
                    lightShadowColor="grey"
                    swapShadows
                    style={{
                      shadowOffset: {width: 2, height: 2},
                      shadowColor: '#3A3A3A',
                      shadowRadius: 3,
                      shadowOpacity: 0.4,
                      borderRadius: 12,
                      backgroundColor: '#1A1A1A',
                      height: hp(18),
                      width: wp(90),
                      height: hp(5),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setTabState('other');
                            setNotificationData([]);
                            setPage(1);
                          }}
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {tabState === 'other'
                            ? activeButton('Others')
                            : nonActiveButton('Others')}
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          flex: 1,
                          height: '100%',
                          width: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setTabState('admin');
                            setNotificationData([]);
                            setPage(1);
                          }}>
                          {tabState === 'admin'
                            ? activeButton('Admins')
                            : nonActiveButton('Admins')}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Neomorph>
                </View>
              </View>
            </View>
          )}
        />
        <FlatList
          contentContainerStyle={{paddingBottom: hp(10)}}
          showsHorizontalScrollIndicator={false}
          data={notificationData}
          style={{marginBottom: hp(10)}}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <View style={{paddingHorizontal: wp(5), paddingVertical: hp(1)}}>
                <View>
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
                            if (item.user_name !== 'Admin') {
                              navigation.navigate('ViewProfile', {
                                id: item.userid,
                              });
                            } else {
                            }
                          }}>
                          <Image
                            style={{
                              width: wp(12),
                              height: wp(12),
                              borderRadius: wp(6),
                              justifyContent: 'flex-start',
                            }}
                            source={{
                              uri: item.user_image
                                ? item.user_image
                                : 'https://artalent1234.s3.amazonaws.com/uploads%2Frn_image_picker_lib_temp_1713bd61-73e3-45de-bf8b-06ea2794a883.png',
                            }}></Image>
                        </TouchableOpacity>
                      </NeomorphFlex>
                    </NeomorphFlex>
                    <View style={{padding: 10}}>
                      <Text style={{color: '#F2F2F2'}}>{item.user_name}</Text>
                      <Text
                        style={{
                          color: '#F2F2F2',
                          opacity: 0.3,
                          paddingRight: 15,
                        }}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    color: '#F2F2F2',
                    textAlign: 'right',
                    justifyContent: 'center',
                    fontSize: wp(2.4),
                  }}>
                  {item.date}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: hp('0.2%'),
                  backgroundColor: '#000000',
                }}></View>
            </View>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.01}
          ListFooterComponent={footerRender}
        />
      </View>
    </SafeAreaView>
  );
};
export default Notification;
