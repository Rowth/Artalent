import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bodyStyle: {
    backgroundColor: '#1A1A1A',
    flex: 1,
    width: wp('100%'),
  },
});
