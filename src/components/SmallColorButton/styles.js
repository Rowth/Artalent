import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  NeomorphButtonContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp('3.5%'),
    width: wp('22%'),
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',
  },

  //**********************************************Button style ******************************************
  NeomorphButtonStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 25,
    height: hp('3.5%'),
    width: wp('22%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
