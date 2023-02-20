import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import styles from './styles';
const SmallButton = props => {
  const {children} = props;
  return (
    <TouchableOpacity
      disabled={props.disabled ? true : false}
      onPress={props.onPress}
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.5}>
      <View style={{alignItems: 'center'}}>
        <Neomorph
          inner
          lightShadowColor="#3A3A3A"
          style={{
            shadowColor: '#3A3A3A',
            shadowOffset: {width: -5, height: -5},
            shadowRadius: 2,
            shadowOpacity: 1,
            borderRadius: props.borderRadius ? props.borderRadius : 15,
            backgroundColor: '#1A1A1A',
            width: props.width ? wp(props.width) : wp(11),
            height: props.height ? hp(props.height) : hp(5.5),
            alignItems: 'center',
          }}>
          <Neomorph
            inner
            swapShadows
            style={{
              shadowColor: '#3A3A3A',
              shadowOffset: {width: 3, height: 1},
              shadowRadius: 5,
              shadowOpacity: 0.1,
              borderRadius: props.borderRadius ? props.borderRadius : 15,
              backgroundColor: 'transparent',
              width: props.width ? wp(props.width) : wp(11),
              height: props.height ? hp(props.height) : hp(5.5),
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
              {props.innerComponent()}
            </View>
          </Neomorph>
        </Neomorph>
      </View>
    </TouchableOpacity>
  );
};
export default SmallButton;
