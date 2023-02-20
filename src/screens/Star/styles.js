import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  bodyStyle: {
    flex: 1,
  },
  wrapper: {height: hp(35)},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.6,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp(5),
  },

  NeomorphContainerCat: {
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: wp(22),
    margin: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  NeomorphContainerwall: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: hp(7),
    margin: hp(1),
    marginTop: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  NeomorphFlatlistWall: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: hp(25),
    margin: hp(1),

    alignItems: 'center',
    // justifyContent: 'center',
  },
  showAllBtn: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(4),
    backgroundColor: '#1A1A1A',
    height: hp(5),
    margin: hp(1),

    alignItems: 'center',
    justifyContent: 'center',
  },
  NeomorphFlatlisRunning: {
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: wp(2),
    backgroundColor: '#1A1A1A',
    height: wp(35),
    margin: hp(1),
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
