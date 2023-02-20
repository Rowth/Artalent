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
  },
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.35,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: wp(100),
    marginTop: hp(3),
    width: wp('90%'),
  },

  NeomorphContainerComment: {
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.35,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: wp(40),
    marginTop: hp(3),
    width: wp('90%'),
  },
  NeomorphContainerTitle: {
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.35,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: wp(15),
    marginTop: hp(3),
    width: wp('90%'),
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
});
