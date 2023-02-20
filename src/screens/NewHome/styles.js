import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: -2},
    shadowRadius: 5,
    shadowOpacity: 1,
    // borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp(7),
    // alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#1A1A1A',
    shadowOffset: {width: 0.2, height: 0.1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    // borderRadius: 20,
    backgroundColor: 'transparent',
    height: hp(7),
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
