import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import styles from './styles';
const SmallColorButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Neomorph
        lightShadowColor="#3A3A3A"
        style={styles.NeomorphButtonContainer}>
        <Neomorph style={styles.NeomorphButtonStyle}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: props.buttonColor
                ? props.buttonColor
                : '#DC4848',
              alignItems: 'center',
              height: hp('2.5%'),
              width: wp('20%'),
              borderRadius: 25,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                // backgroundColor: 'red',
              }}>
              {props.buttonText ? props.buttonText : 'Add'}
            </Text>
          </View>
        </Neomorph>
      </Neomorph>
    </TouchableOpacity>
  );
};
export default SmallColorButton;
