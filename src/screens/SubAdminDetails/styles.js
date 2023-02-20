import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  bodyStyle: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    width: '100%',
  },
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
  NeomorphTaskContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: wp(60),
    width: wp(85),
    alignItems: 'center',
  },
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
    marginTop: 15,
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
