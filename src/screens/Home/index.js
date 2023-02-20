import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
} from 'react-native';
import {Text, TextInput, Feed, SmallButton} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {onLogout, onLogin, Axios, url} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = props => {
  console.log(props);
  const {navigation, route} = props;
  console.log(navigation);
  const [tabState, setTabState] = useState('feed');
  const activeButton = name => {
    return (
      <Neomorph
        inner
        lightShadowColor="#0000"
        darkShadowColor="#0000"
        style={{
          // shadowColor: '#000',
          // shadowOffset: {width: -2, height: -2},
          shadowRadius: 4.5,
          shadowOpacity: 0.3,
          backgroundColor: '#1A1A1A',
          height: hp(18),
          width: wp(80 / 3),
          height: hp(6),
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
              color: '#EB5757',
              fontWeight: '400',
            }}>
            {name}
          </Text>
        </View>
      </Neomorph>
    );
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          marginBottom: hp(2),
        }}>
        <Neomorph
          inner
          lightShadowColor="#000"
          style={{
            ...styles.NeomorphContainer,
            width: wp(100),
          }}>
          <Neomorph
            inner
            swapShadows
            style={{
              ...styles.NeomorphStyle,
              width: wp(100),
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1),
                paddingLeft: wp(5),
                paddingRight: wp(2),
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: wp(35), height: wp(8)}}
                  source={require('../../assets/Images/Home/ARTalent-text.png')}
                />
              </View>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <SmallButton
                    // width={}
                    onPress={() => {
                      console.log('notify');

                      // onLogout();
                    }}
                    innerComponent={() => (
                      <Image
                        style={{width: wp(5), height: wp(5)}}
                        source={require('../../assets/Images/Home/bell.png')}
                      />
                    )}></SmallButton>
                </View>
              </View>
            </View>
            {/* switch bar */}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Neomorph
                  darkShadowColor="#000000"
                  style={{
                    shadowOffset: {width: 4, height: 6},
                    shadowColor: '#3A3A3A',
                    shadowRadius: 2,
                    shadowOpacity: 0.1,
                    borderRadius: 12,
                    backgroundColor: '#1A1A1A',
                    height: hp(18),
                    width: wp(80),
                    height: hp(6),
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
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => setTabState('feed')}>
                        {tabState === 'feed' ? (
                          activeButton('Feed')
                        ) : (
                          <Text
                            style={{
                              color: '#828282',
                              fontWeight: '400',
                            }}>
                            Feed
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => setTabState('contests')}>
                        {tabState === 'contests' ? (
                          activeButton('Contests')
                        ) : (
                          <Text
                            style={{
                              color: '#828282',
                              fontWeight: '400',
                            }}>
                            Contests
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => setTabState('special')}>
                        {tabState === 'special' ? (
                          activeButton('Special')
                        ) : (
                          <Text
                            style={{
                              color: '#828282',
                              fontWeight: '400',
                            }}>
                            Special
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </Neomorph>
              </View>
            </View>
          </Neomorph>
        </Neomorph>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#1A1A1A',
        }}>
        <View style={{paddingTop: hp(1)}}>
          <Feed />
          <Feed />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
