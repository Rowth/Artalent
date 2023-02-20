import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {tokenInvalid, Axios, URL} from '@config';
import {Neomorph} from 'react-native-neomorph-shadows';
const SpecialContest = props => {
  const {navigation, route} = props;
  const [wallOfFame, setWallofFame] = useState([]);
  const [contestList, setContestList] = useState([]);
  const wallOfFrameFlatListRef = useRef();
  const specialBanner = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.SPECIAL_CONTEST_BANNER,
    });
    if (res?.data?.status === 200) {
      setContestList(res.data.contest_banner);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server Error');
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
      url: `${URL.GET_SPECIAL_WEEKLY_WINNER}`,
    });
    if (res?.data?.status === 200) {
      setWallofFame(getWinnersData(res?.data?.winner_details));
      // console.log(res);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
  useEffect(() => {
    console.log('xcvxcv', URL.SPECIAL_CONTEST_BANNER);
    specialBanner();
    getWallOfFame();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{height: hp(8), backgroundColor: 'transparent'}}></View>
        <View style={styles.bodyStyle}>
          {/* *********************************************************TOP BANNER LIST ********************************************************* */}
          <View style={{alignItems: 'center'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={contestList}
              style={{width: wp('100%')}}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewSpecialContest', {
                        special_id: item.id,
                      })
                    }>
                    <ImageBackground
                      style={{
                        width: wp('90%'),
                        height: hp(40),
                        marginLeft: wp(4),
                        marginTop: hp(2),
                        padding: wp(10),
                      }}
                      imageStyle={{borderRadius: wp(5)}}
                      source={{uri: item.image_full_url}}>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: hp(5),
                          left: wp(5),
                        }}>
                        <Text
                          style={{
                            color: 'white',
                          }}>
                          {'Prize :' + '₹' + item.entry_fee}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                          }}>
                          {item.participants + '/' + item.member + ' Talent'}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={{alignItems: 'center', marginLeft: wp(3)}}>
                    <ImageBackground
                      source={require('../../assets/Images/specialContestBg.png')}
                      style={{
                        paddingStart: wp(5),
                        height: wp(20),
                        width: wp(85),
                        justifyContent: 'center',
                        marginTop: hp(-5),
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'black'}}>
                        {item.category_type}
                      </Text>
                      <Text style={{color: 'black'}}>
                        {'Contest ends on ' + item.end_date}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              )}
            />
          </View>
          {/* *************************************************************************</>********************************************************************************** */}

          {/* *****************************************************************************Wall of Fame **************************************************************************** */}
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
          {/* ***************************************************************************************</>*************************************************************** */}

          {/* ***********************************************************************************Wall Of Fame FlatList *************************************************************** */}
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
              <View style={{marginBottom: wp(8)}}>
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
                      wallOfFrameFlatListRef.current.scrollToIndex({index: 0});
                    }}>
                    <Image
                      source={require('../../assets/Images/SpecialContest/RightButtonFlat.png')}
                      style={{
                        width: wp(5),
                        height: hp(10),
                        resizeMode: 'contain',
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
                      source={require('../../assets/Images/SpecialContest/RightButtonFlat.png')}
                      style={{
                        width: wp(5),
                        height: hp(10),
                        resizeMode: 'contain',
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
                    padding: wp(2),
                    marginTop: hp(-2.3),
                  }}
                  keyExtractor={item => item.key}
                  renderItem={({item}) => (
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() =>
                          navigation.navigate('ViewProfile', {id: item.user_id})
                        }>
                        <ImageBackground
                          resizeMode="stretch"
                          style={{
                            width: wp(40),
                            height: hp(26),
                            marginVertical: hp(2),
                          }}
                          source={require('../../assets/Images/Withdraw/SpecialBackground.png')}>
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
                              }}
                              source={{
                                uri: item.user_image,
                              }}
                            />
                            <View style={{alignItems: 'center'}}>
                              <Text
                                style={{color: 'white', marginTop: hp(0.1)}}>
                                {item?.username}
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  textAlign: 'center',
                                  fontSize: wp(2.4),
                                }}>
                                {item?.contest_title}
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

          {/* ***************************************************************************************</>*************************************************************** */}
          {/* *******************************************************************************Show All Btn***************************************************************** */}
          <View style={{alignItems: 'center', marginBottom: hp(5)}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WinnersSpecial')}>
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
        </View>
        {/* **************************************************************************************</>******************************************************************************** */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SpecialContest;
