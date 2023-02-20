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
    marginRight: wp(6),
    marginTop: hp(2),
    textAlign: 'right',
  },
  textStyleH2: {
    fontSize: 15,
    color: '#828282',
    marginRight: wp(5),
    textAlign: 'right',
    marginTop: hp(-0.5),
  },
  textStyleH3: {
    fontSize: 15,
    color: '#828282',
    textAlign: 'center',
    marginTop: hp(-1),
  },
  //   ***************************************neomorph Tab********************************************
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 3.2},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    height: hp(6),
    marginTop: hp(3),
    width: wp('90%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignItems: 'center',
  },

  //   ***************************************neomorph Tab****************************************************
  NeomorphStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 7, height: 2.5},
    shadowRadius: 2,
    shadowOpacity: 0.1,
    borderRadius: 8,
    marginHorizontal: wp(5),
    height: hp(6),
    width: wp('90%'),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: wp(2),
  },
  // ********************************Tab Container*********************************************
  tabButtonContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStylesTab: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },

  // *******************************************Button Container************************************
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
