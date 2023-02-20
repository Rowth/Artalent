import React from 'react';
import {StyleSheet} from 'react-native';
import {rgba} from 'react-native-color-matrix-image-filters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  body: {
    backgroundColor: '#1A1A1A',
    flex: 1,
  },

  NeomorphContainer: {
    shadowColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    shadowOpacity: 9,
    alignItems: 'center',
    borderColor: 'rgba(128,0,0,0.5)',
    borderRadius: wp(7),
    borderWidth: 1,
    borderRadius: wp(5),
    backgroundColor: '#1A1A1A',
    height: hp('15%'),
    width: wp('100%'),
    flexDirection: 'column',

    marginTop: 7,
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: -1},
    shadowRadius: 2,
    shadowOpacity: 0.1,

    position: 'absolute',
    height: hp('15%'),
    width: wp('100%'),

    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp(2),
  },

  childContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',

    paddingHorizontal: wp(4),
  },

  headerTextStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#F2F2F2',
    marginTop: 10,
  },

  headerTwoStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#828282',
  },
  styleTv: {
    fontSize: 14,
    color: 'white',
    paddingBottom: 20,
    paddingTop: 20,
    marginLeft: wp(5),
  },
  styleTv2: {
    fontSize: 12,
    color: '#828282',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
