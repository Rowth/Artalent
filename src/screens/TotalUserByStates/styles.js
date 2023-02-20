import React from 'react';
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bodyStyle: {flex: 1, backgroundColor: '#1A1A1A', width: wp('100%')},
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 7, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    borderRadius: 1,
    backgroundColor: '#1A1A1A',
    height: wp(12),
    borderWidth: 0.08,
    borderColor: 'red',
    margin: 5,
    width: wp('98%'),
  },
});
