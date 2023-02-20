import react from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bodyStyle: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 1,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    width: wp(90),
    height: hp(6),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.15,
    borderRadius: 15,
    backgroundColor: 'transparent',
    width: wp(90),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});
