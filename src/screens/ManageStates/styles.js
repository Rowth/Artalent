import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  containerFx: {
    backgroundColor: '#1A1A1A',
    width: wp('100%'),
    flex: 1,
    alignItems: 'center',
  },
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  walletIcStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headertabBackground: {
    backgroundColor: '#1A1A1A',
  },

  textStyle: {
    color: 'white',
    justifyContent: 'space-between',
    textAlign: 'center',
    margin: 3,
    alignItems: 'center',
    fontSize: 16,
  },
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.6,
    backgroundColor: '#1A1A1A',
    height: hp(7),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    backgroundColor: 'transparent',
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },

  tvStyles: {
    fontSize: 18,
    color: '#F2F2F2',
    marginLeft: wp(5),
    padding: 10,
    flex: 1,
  },

  NeomorphContainerButton: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 0,
    shadowOpacity: 0.1,
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#000',
    height: wp('11%'),
    width: wp('11%'),

    marginHorizontal: 2,
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
  },
  NeomorphStyleButton: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    borderRadius: 15,
    position: 'absolute',
    // borderWidth: 1,
    // borderColor: 'white',
    height: wp('11%'),
    width: wp('11%'),
    padding: 10,
    backgroundColor: '#1A1A1A',

    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  NeomorphContainerModel: {
    shadowColor: '#000',
    shadowOffset: {width: 1.7, height: 1.7},
    shadowRadius: 1,
    shadowOpacity: 1,
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: hp('20'),
    width: wp('90%'),
    marginHorizontal: 30,

    alignItems: 'center',
  },
  NeomorphStyleModel: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.1,
    borderRadius: 15,

    height: hp('20'),
    width: wp('90%'),

    backgroundColor: '1A1A1A',

    borderColor: 'white',
    alignItems: 'center',
    padding: 10,
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
  NeomorphButton2Style: {
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 25,
    // position: 'absolute',
    height: hp('2.5%'),
    width: wp('20%'),
    backgroundColor: '#DC4848',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },
});
