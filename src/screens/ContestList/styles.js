import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bodyStyle: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    width: wp('100%'),
  },
  NeomorphFlatlistWall: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.3,
    borderRadius: wp(2),

    height: hp(30),
    margin: wp(1.5),
  },
});
