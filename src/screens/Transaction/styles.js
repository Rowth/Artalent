import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  NeomorphFlatContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: hp('12%'),
    width: wp('100%'),
    flexDirection: 'column',

    marginTop: 15,
    alignItems: 'center',
  },
  NeomorphFlatStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    borderRadius: 15,
    position: 'absolute',
    borderColor: 'rgba(139, 0, 0,0.1)',
    borderWidth: 2,
    height: hp('12%'),
    width: wp('100%'),

    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },
});
