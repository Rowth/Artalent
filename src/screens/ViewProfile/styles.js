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
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.7,
    borderRadius: wp(4),
    backgroundColor: '#AB0404',
    height: hp(14),

    marginHorizontal: wp(5),
    alignItems: 'center',
    paddingLeft: wp(2),
    marginTop: hp(-6),
  },
  NeomorphImg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: wp(4),
    backgroundColor: 'transparent',
    height: hp(10),
    marginHorizontal: wp(5),
    alignItems: 'center',
    paddingLeft: wp(2),
    alignItems: 'center',
  },
});
