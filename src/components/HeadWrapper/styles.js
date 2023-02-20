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
    fontSize: 20,
  },
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 15,
    shadowOpacity: 2,
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: hp('7'),
    width: wp('100%'),
    marginHorizontal: 10,
    marginTop: 1,
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    borderRadius: 15,
    position: 'absolute',
    height: hp('7'),
    width: wp('98%'),
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});
