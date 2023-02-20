import React from 'react';
import {StyleSheet, TextInput, Image, Text} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ImageButton = props => {
  return (
    <Neomorph inner lightShadowColor="#000" style={Styles.NeomorphContainer}>
      <Neomorph inner swapShadows style={Styles.NeomorphStyle}></Neomorph>
    </Neomorph>
  );
};

const Styles = StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 1,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    width: wp(90),
    height: hp(7),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.15,
    borderRadius: 10,
    backgroundColor: 'transparent',
    width: wp(90),
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});

export default ImageButton;
