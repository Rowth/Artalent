import React from 'react';
import {StyleSheet} from 'react-native';
import styles from '../../components/BottomAlert/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  infoTextStyle: {
    fontSize: wp(4.2),
    fontWeight: '400',
    color: '#828282',
    marginLeft: wp(1),
  },
});
