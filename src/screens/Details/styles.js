import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.6,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp(6),
    width: wp(38),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: hp(6),
    width: wp(38),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});
