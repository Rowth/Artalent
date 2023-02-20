import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ApplyFilterButton = props => {
  return (
    <TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp(5),
        }}>
        <NeomorphFlex
          darkShadowColor="#FFFFFF" // <- set this
          lightShadowColor="#000000" // <- this
          style={{
            shadowOffset: {width: -5, height: -5},
            shadowOpacity: 0.1, // <- and this or yours opacity
            shadowRadius: 5,
            borderRadius: 10,
            backgroundColor: '#219653',
            width: wp(35),
            height: hp(4),
          }}>
          <NeomorphFlex
            darkShadowColor="#000000" // <- set this
            lightShadowColor="#000000" // <- this
            style={{
              shadowOffset: {width: 5, height: 5},
              shadowOpacity: 0.1, // <- and this or yours opacity
              shadowRadius: 5,
              borderRadius: 10,
              backgroundColor: '#219653',
              width: wp(35),
              height: hp(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                justifyContent: 'center',
              }}>
              Apply Filter
            </Text>
          </NeomorphFlex>
        </NeomorphFlex>
      </View>
    </TouchableOpacity>
  );
};
export default memo(ApplyFilterButton);
