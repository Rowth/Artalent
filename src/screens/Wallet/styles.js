import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  textStyle: {
    color: '#BDBDBD',
    fontSize: 35,
    justifyContent: 'center',
    textAlign: 'center',

    marginTop: hp('3%'),
  },

  textStyle2: {
    color: '#27AE60',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: -5,
    justifyContent: 'center',
    textAlign: 'center',
  },

  redRvDgn: {
    color: '#EB5757',
    fontSize: 13,
    marginTop: 5,
  },

  NeomorphContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: hp('30%'),
    width: wp('90%'),
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    borderRadius: 15,
    position: 'absolute',
    height: hp('30%'),
    width: wp('90%'),

    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },
  NeomorphContainerProgress: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 1,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    height: hp('1.6%'),
    width: wp('50%'),
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NeomorphStyleProgress: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 1,
    shadowOpacity: 0.1,
    borderRadius: 15,

    // position: 'absolute',
    // marginTop: 1.5,
    height: hp('0.6-----%'),
    width: wp('48.4%'),
    alignSelf: 'center',
    backgroundColor: '#27AE60',
    flexDirection: 'row',
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

  imageGravity: {
    alignItems: 'center',
    justifycontent: 'center',
    height: '100%',
    flex: 1,
  },
  walletBalanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  buttonParent: {
    flexDirection: 'row',

    justifyContent: 'flex-start',
  },

  amountTextStyle: {
    color: '#F2C94C',
    fontSize: 20,
    margin: 10,
  },
  amountTextDiv2: {
    color: '#EB5757',
    fontSize: 20,
    margin: 10,
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
    height: hp('12%'),
    width: wp('100%'),

    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },
});
