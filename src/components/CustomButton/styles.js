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
    shadowOpacity: 1,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    width: wp(70),
    height: hp(6),
    marginTop: wp('25%'),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 9, height: 6},
    shadowRadius: 5,
    shadowOpacity: 0.15,
    borderRadius: 30,
    backgroundColor: 'transparent',
    width: wp(70),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});
