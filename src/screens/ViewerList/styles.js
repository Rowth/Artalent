import React from 'react';
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  body: {
    backgroundColor: '#1A1A1A',
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
  },
  NeomorphContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 2, height: 0.1},
    shadowRadius: 1,
    shadowOpacity: 0.1,
    alignItems: 'center',

    backgroundColor: '#1A1A1A',
    height: hp('20%'),

    width: wp('100%'),

    justifyContent: 'center',
    alignItems: 'center',

    alignItems: 'center',
  },

  //   ***************************************neomorph Tab****************************************************
  NeomorphStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowRadius: 5,
    shadowOpacity: 0.8,
    marginHorizontal: wp(10),
    height: hp('20%'),
    width: wp('100%'),
    backgroundColor: 'transparent',
    alignItems: 'center',

    // paddingTop: wp(2),
  },
  NeomorphButtonContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp('2.6%'),
    width: wp('20%'),
    flexDirection: 'column',
    marginTop: 15,
    alignItems: 'center',
  },

  //**********************************************Button style ******************************************
  NeomorphButtonStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 25,
    // position: 'absolute',
    height: hp('2.5%'),
    width: wp('20%'),
    backgroundColor: '#219653',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },
});
