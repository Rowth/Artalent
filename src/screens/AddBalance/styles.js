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
  textStyle: {
    fontSize: 15,
    color: '#F2F2F2',
  },
  textStyleH2: {
    fontSize: wp(3.5),
    color: '#828282',
  },
  textStyleH3: {
    fontSize: wp(4),
    color: '#F2F2F2',
  },
  //   ***************************************neomorph Tab********************************************
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    height: hp('5'),
    marginTop: hp(3),
    width: wp('90%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    alignItems: 'center',
  },
  //   ***************************************neomorph Tab****************************************************
  NeomorphStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.1,
    borderRadius: 10,
    marginHorizontal: wp(5),
    height: hp('5%'),
    width: wp('90%'),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: wp(2),
  },
  // ********************************Tab Container*********************************************
  tabButtonContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  textStylesTab: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  // *******************************************Button Container************************************
  NeomorphButtonContainer: {
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    height: hp(5),
    width: wp(40),
  },

  //**********************************************Button style ******************************************
  NeomorphButtonStyle: {
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 10,
    height: hp(5),
    width: wp(40),
    backgroundColor: '#219653',
  },
});
