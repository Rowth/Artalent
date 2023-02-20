import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  bodyStyle: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: '#1A1A1A',
  },
  NeomorphFlatlistWall: {
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderRadius: wp(4),
    backgroundColor: '#1A1A1A',
    height: hp(5.3),
    alignItems: 'center',
  },
  NeomorphFilter: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderRadius: wp(1),
    backgroundColor: '#1A1A1A',
    height: hp(3.5),
    borderWidth: 0.2,
    borderColor: '#EB5757',
    marginHorizontal: wp(1.2),

    justifyContent: 'center',
  },
  NeomorphFilterListTab: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderRadius: wp(1),
    backgroundColor: '#1A1A1A',
    height: hp(4),

    marginHorizontal: wp(1.2),

    justifyContent: 'center',
  },
});
