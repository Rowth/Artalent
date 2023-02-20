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
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: hp(25),
    margin: hp(1),

    alignItems: 'center',
    // justifyContent: 'center',
  },
  showAllBtn: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(4),
    backgroundColor: '#1A1A1A',
    height: hp(5),
    margin: hp(1),

    alignItems: 'center',
    justifyContent: 'center',
  },
  NeomorphContainerwall: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: hp(7),
    margin: hp(1),
    marginTop: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
