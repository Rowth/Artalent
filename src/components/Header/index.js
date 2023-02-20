import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const Header = props => {
  return (
    <View style={[{backgroundColor: 'black'}, props.containerStyle]}>
      <ImageBackground
        source={require('../../assets/Images/TopHeader.png')}
        style={{width: wp(100), height: hp(7), resizeMode: 'cover'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: hp(6),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              width: wp(100),
            }}>
            {props.centerIcon && (
              <Image
                style={{width: wp(7), height: wp(7), resizeMode: 'contain'}}
                source={props.centerIcon}
              />
            )}
            {props.centerText && (
              <Text
                style={[
                  {
                    color: '#F2F2F2',
                    fontSize: wp(4.5),
                    fontWeight: '500',
                    marginLeft: props.centerIcon ? wp(1) : 0,
                  },
                  props.centerTextStyle && props.centerTextStyle,
                ]}>
                {props.centerText ? props.centerText : 'Default Text'}
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingLeft: wp(5),
              paddingRight: wp(2),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={props.onClickLeftIcon}
              activeOpacity={0.5}
              style={{padding: 5}}>
              <View>
                <Image
                  style={{width: wp(6), height: wp(6)}}
                  source={props.leftIcon}
                />
              </View>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              {props.rightIcon && (
                <TouchableOpacity onPress={props.onClickRightIcon}>
                  <View style={{alignItems: 'center'}}>
                    <Neomorph
                      inner
                      lightShadowColor="#3A3A3A"
                      style={{
                        shadowColor: '#3A3A3A',
                        shadowOffset: {width: -5, height: -5},
                        shadowRadius: 2,
                        shadowOpacity: 1,
                        borderRadius: 15,
                        backgroundColor: '#1A1A1A',
                        width: wp(11),
                        height: hp(5.5),
                        alignItems: 'center',
                      }}>
                      <Neomorph
                        inner
                        swapShadows
                        style={{
                          shadowColor: '#3A3A3A',
                          shadowOffset: {width: 0.2, height: 0.1},
                          shadowRadius: 5,
                          shadowOpacity: 0.1,
                          borderRadius: 15,
                          backgroundColor: 'transparent',
                          width: wp(11),
                          height: hp(5.5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: wp(4),
                        }}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{width: wp(7), height: wp(6)}}
                            source={props.rightIcon}
                          />
                        </View>
                      </Neomorph>
                    </Neomorph>
                  </View>
                </TouchableOpacity>
              )}
              {props.RightSecondIcon && (
                <TouchableOpacity
                  style={{marginLeft: wp(1)}}
                  onPress={
                    props.onClickRightSecondIcon
                      ? props.onClickRightSecondIcon
                      : console.log('right')
                  }>
                  <View style={{alignItems: 'center'}}>
                    <Neomorph
                      inner
                      lightShadowColor="#3A3A3A"
                      style={{
                        shadowColor: '#3A3A3A',
                        shadowOffset: {width: -5, height: -5},
                        shadowRadius: 2,
                        shadowOpacity: 1,
                        borderRadius: 15,
                        backgroundColor: '#1A1A1A',
                        width: wp(11),
                        height: hp(5.5),
                        alignItems: 'center',
                      }}>
                      <Neomorph
                        inner
                        swapShadows
                        style={{
                          shadowColor: '#1A1A1A',
                          shadowOffset: {width: 0.2, height: 0.1},
                          shadowRadius: 5,
                          shadowOpacity: 0.1,
                          borderRadius: 15,
                          backgroundColor: 'transparent',
                          width: wp(11),
                          height: hp(5.5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: wp(4),
                        }}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{width: wp(5), height: wp(5)}}
                            source={props.RightSecondIcon}
                          />
                        </View>
                      </Neomorph>
                    </Neomorph>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Header;
