import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {Header} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Starter(props) {
  const {navigation, route} = props;
  const [statusTab, setStatusTab] = useState(0);
  const setLogin = async () => {
    await AsyncStorage.setItem(
      'Auth',
      JSON.stringify({isLogin: false, starterStatus: false}),
    );
    navigation.replace('Login');
  };
  const getAnimations = () => {
    if (statusTab === 0) {
      return require('../../assets/LottieFiles/Screen1.json');
    } else if (statusTab === 1) {
      return require('../../assets/LottieFiles/Screen2.json');
    } else if (statusTab === 2) {
      return require('../../assets/LottieFiles/Screen3Animation01.json');
    } else if (statusTab === 3) {
      return require('../../assets/LottieFiles/Screen4Animation.json');
    } else if (statusTab === 4) {
      return require('../../assets/LottieFiles/Screen5Animation.json');
    }
  };
  const getScreens = (image, head, paragraph) => {
    return (
      <View
        key={'#key' + statusTab}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {statusTab !== 2 ? (
          <View>
            <LottieView
              style={{width: wp(80), height: wp(60)}}
              source={getAnimations()}
              autoPlay
              loop
            />
          </View>
        ) : (
          <View style={{width: wp(80), height: wp(60)}}>
            <View>
              <LottieView
                style={{
                  width: wp(80),
                  height: wp(60),
                  // backgroundColor: 'green',
                  position: 'absolute',
                  zIndex: 1,
                  resizeMode: 'cover',
                }}
                source={require('../../assets/LottieFiles/Screen3Animation01.json')}
                autoPlay
                loop
              />
            </View>
            <View
              style={{position: 'absolute', zIndex: 2, right: 0, top: -hp(8)}}>
              <LottieView
                style={{
                  width: wp(40),
                  height: wp(40),
                }}
                source={require('../../assets/LottieFiles/Screen3Animation02.json')}
                autoPlay
                loop
              />
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 3,
                left: wp(5),
                bottom: -hp(5),
              }}>
              <LottieView
                style={{
                  width: wp(40),
                  height: wp(40),
                }}
                source={require('../../assets/LottieFiles/Screen3Animation03.json')}
                autoPlay
                loop
              />
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 4,
                right: -wp(25),
                bottom: -hp(15),
              }}>
              <LottieView
                style={{
                  width: wp(80),
                  height: wp(80),
                }}
                source={require('../../assets/LottieFiles/Screen3Animation04.json')}
                autoPlay
                loop
              />
            </View>
          </View>
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(80),
          }}>
          <Text
            style={{
              fontSize: wp(8),
              color: '#ffffff',
              textAlign: 'center',
              marginVertical: hp(1),
            }}>
            {head}
          </Text>
          <Text style={{width: wp(80), color: '#E5E5E5', textAlign: 'center'}}>
            {paragraph}
          </Text>
          <TouchableOpacity
            style={{marginTop: hp(3)}}
            key={'#desw2'}
            onPress={() =>
              statusTab === 4 ? setLogin() : setStatusTab(statusTab + 1)
            }>
            <View
              style={{
                marginVertical: hp(0.6),
                borderRadius: 10,
                paddingHorizontal: wp(3),
              }}>
              <NeomorphFlex
                darkShadowColor="#000000"
                lightShadowColor="#ffffff"
                style={{
                  backgroundColor: '#1A1A1A',
                  width: wp(15),
                  height: wp(15),
                  borderRadius: 15,
                  shadowRadius: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{}}>
                  <Image
                    style={{
                      height: wp(5),
                      width: wp(5),
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/Images/Info/Vector.png')}></Image>
                </View>
              </NeomorphFlex>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#1A1A1A',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(5),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: wp(30), height: wp(15), resizeMode: 'contain'}}
                source={require('../../assets/Images/Splash/LogoText.png')}></Image>
            </View>
            {statusTab <= 3 && (
              <TouchableOpacity onPress={() => setStatusTab(4)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>{`Skip>>`}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {statusTab === 0 &&
            getScreens(
              '',
              '',
              ` Show your Talent to the World. Connect with Others and Explore new
            Challenges.`,
            )}
          {statusTab === 1 &&
            getScreens(
              '',
              'Create.\n Participate.\n Win!',
              `Create Contests and Special Contest with rewards or Participate.`,
            )}
          {statusTab === 2 &&
            getScreens(
              '',
              'Edit Videos',
              ` Showcase your talent with videos that you can edit effortlessly here.`,
            )}
          {statusTab === 3 &&
            getScreens(
              '',
              'Get Rewards',
              `You can earn rewards & Prizes by winning on the contest`,
            )}
          {statusTab === 4 && getScreens('', 'Let’s Get Started!', ``)}
          {statusTab < 4 && (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  height: hp(1),
                  marginHorizontal: wp(0.2),
                  backgroundColor: statusTab === 0 ? '#CA2929' : '#3A3A3A',
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  flex: 1,
                  height: hp(1),
                  marginHorizontal: wp(0.2),
                  backgroundColor: statusTab === 1 ? '#CA2929' : '#3A3A3A',
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  flex: 1,
                  height: hp(1),
                  marginHorizontal: wp(0.2),
                  backgroundColor: statusTab === 2 ? '#CA2929' : '#3A3A3A',
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  flex: 1,
                  height: hp(1),
                  marginHorizontal: wp(0.2),
                  backgroundColor: statusTab === 3 ? '#CA2929' : '#3A3A3A',
                  borderRadius: 10,
                }}></View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
