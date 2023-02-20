import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SmallButton} from '@components';
import styles from './styles';
const LongHeader = props => {
  return (
    <View>
      <View
        style={{
          marginBottom: hp(2),
        }}>
        <Neomorph
          inner
          lightShadowColor="#000000"
          darkShadowColor="#000000"
          style={{
            ...styles.NeomorphContainer,
            width: wp(100),
          }}>
          <Neomorph
            inner
            lightShadowColor="#000000"
            darkShadowColor="#000000"
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
                marginTop: hp(1.5),
              }}>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: -1,
                  left: 0,
                }}>
                {props.centerIcon && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={[
                        {width: wp(6), height: wp(6)},
                        props.centerImageStyle && props.centerImageStyle,
                      ]}
                      source={props.centerIcon}
                    />
                    {props.centerText && (
                      <Text
                        numberOfLines={1}
                        style={[
                          {
                            color: '#FFFFFF',
                            fontSize: wp(4.2),
                            fontWeight: '700',
                            paddingLeft: wp(2),
                            alignSelf: 'center',
                          },
                          props.centerTextStyle && props.centerTextStyle,
                        ]}>
                        {props.centerText}
                      </Text>
                    )}
                  </View>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  paddingLeft: wp(5),
                  paddingRight: wp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={props.onClickLeftIcon}
                  activeOpacity={0.5}
                  style={
                    {
                      // padding: 5,
                    }
                  }>
                  <View>
                    <Image
                      style={{width: wp(6), height: wp(6)}}
                      source={props.leftIcon}
                    />
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  {props.rightIcon && (
                    <SmallButton
                      onPress={props.onClickRightIcon}
                      innerComponent={() => (
                        <Image
                          style={{width: wp(5), height: wp(5)}}
                          source={props.rightIcon}
                        />
                      )}></SmallButton>
                  )}
                  {props.secondRightIcon && (
                    <View style={{marginLeft: wp(1)}}>
                      <SmallButton
                        onPress={props.onClickRightSecondIcon}
                        innerComponent={() => (
                          <Image
                            style={{width: wp(5), height: wp(5)}}
                            source={props.secondRightIcon}
                          />
                        )}></SmallButton>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {/* switch bar */}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              {props.innerComponent()}
            </View>
          </Neomorph>
        </Neomorph>
      </View>
    </View>
  );
};
export default LongHeader;
