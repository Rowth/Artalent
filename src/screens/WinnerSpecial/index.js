import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from './styles';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import LongHeader from '../../components/LongHeader/index';

const WinnersSpecial = props => {
  const [tabState, setTabState] = useState('lastWeek');
  const {navigation, route} = props;

  const [allTime, setAllTime] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
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
      url: URL.GET_SPECIAL_WEEKLY_WINNER,
    });
    if (res?.data?.status === 200) {
      setLastWeek(getWinnersData(res?.data?.winner_details));
      // console.log(getWinnersData(res?.data?.winner_details));

      // setLastWeek(res?.data?.winner_details.winner_data.contest_title);
      console.log(lastWeek);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
  const getAllTimeWallOfFame = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.ALL_TIME_SPECIAL_WINNERS,
    });
    if (res?.data?.status === 200) {
      setAllTime(getWinnersData(res?.data?.winner_details));
      // console.log(getWinnersData(res?.data?.winner_details));
      // setLastWeek(res?.data?.winner_details.winner_data.contest_title);
      console.log(lastWeek);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
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
      <Text
        style={{
          color: '#828282',
          fontWeight: '400',
          //   alignSelf: 'center',
        }}>
        {name}
      </Text>
    );
  };
  useEffect(() => {
    getWallOfFame();
    getAllTimeWallOfFame();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={Styles.bodyContainer}>
        <LongHeader
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/Winners/cup.png')}
          // rightIcon={require('../../assets/Images/Winners/bell.png')}
          // secondRightIcon={require('../../assets/Images/Winners/message.png')}
          centerText={'Winners'}
          onClickLeftIcon={() => navigation.goBack()}
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
                    darkShadowColor="#000"
                    lightShadowColor="#4A4A4A"
                    swapShadows
                    style={{
                      shadowOffset: {width: 2, height: 4},
                      shadowColor: '#3A3A3A',
                      shadowRadius: 1.5,
                      shadowOpacity: 0.2,
                      borderRadius: 12,
                      backgroundColor: '#1A1A1A',
                      height: hp(18),
                      width: wp(90),
                      height: hp(5),
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        height: '100%',
                        textAlign: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          flex: 1,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setTabState('lastWeek');
                        }}>
                        {tabState === 'lastWeek'
                          ? activeButton('Last Week')
                          : nonActiveButton('Last Week')}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          flex: 1,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setTabState('allTime');
                        }}>
                        {tabState === 'allTime'
                          ? activeButton('All time')
                          : nonActiveButton('All time')}
                      </TouchableOpacity>
                    </View>
                  </Neomorph>
                </View>
              </View>
            </View>
          )}
        />
        <View style={{flex: 1}}>
          <FlatList
            data={tabState == 'lastWeek' ? lastWeek : allTime}
            style={{width: wp('100%')}}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <Neomorph
                darkShadowColor="#2A2A2A"
                lightShadowColor="#FFF"
                style={{
                  shadowColor: '#000',
                  shadowRadius: 3,
                  shadowOpacity: 0.06,
                  borderRadius: 10,
                  backgroundColor: '#1A1A1A',
                  width: wp('100%'),
                  marginVertical: 5,
                  height: wp(18),
                }}>
                <Neomorph
                  inner
                  darkShadowColor="#000"
                  lightShadowColor="#1A1A1A"
                  style={{
                    shadowColor: '#000',
                    shadowRadius: 2,
                    alignItems: 'center',
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginVertical: 1,
                    backgroundColor: '#1A1A1A',
                    width: wp('100%'),
                    marginHorizontal: 2,
                    height: wp(17),
                  }}>
                  <View
                    style={{
                      width: wp('100%'),
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Image
                        style={{
                          width: wp(14),
                          height: wp(14),
                          borderRadius: wp(7),
                        }}
                        source={{
                          uri:
                            item.user_image === null
                              ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
                              : item.user_image,
                        }}
                      />
                      <View style={{marginHorizontal: 10}}>
                        <Text style={{color: '#F2C94C'}}>{item.username}</Text>
                        <Text style={{color: '#FFFFFF'}}>
                          {item.contest_title}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color: '#FFFFFF'}}>{'Votes '}</Text>
                          <Text style={{color: '#F2C94C', marginLeft: 5}}>
                            {item.likes}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        //   justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,

                        height: '100%',
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          height: '100%',
                          paddingVertical: 10,
                        }}>
                        <Text
                          style={{
                            color: '#F2C94C',
                            paddingRight: 7,
                          }}>
                          {`#Rank-${item.rank}`}
                        </Text>
                        <Text
                          style={{
                            color: '#27AE60',
                          }}>
                          {'₹ ' + item.prize}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Neomorph>
              </Neomorph>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WinnersSpecial;
