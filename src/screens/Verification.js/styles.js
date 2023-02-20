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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontSize: wp('4%'),
    color: 'white',
    alignContent: 'center',
    textAlign: 'center',
  },
  textStyle2: {
    fontSize: wp('3%'),
    color: '#828282',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: wp('10%'),
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems:"center",
    paddingHorizontal:wp(20),
    paddingVertical:wp(5)
  },
});
