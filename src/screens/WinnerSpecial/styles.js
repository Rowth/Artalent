import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1A1A1A',
    width: wp('100%'),
  },
});
