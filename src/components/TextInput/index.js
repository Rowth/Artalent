import React from 'react';
import {StyleSheet, TextInput, Text, View, Image} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Index = props => {
  return (
    <Neomorph
      inner
      lightShadowColor="#000"
      style={{
        ...Styles.NeomorphContainer,
        width: wp(props.width),
        height: props.height && hp(props.height),
        borderRadius: props.borderRadius && props.borderRadius,
      }}>
      <Neomorph
        inner
        swapShadows
        style={{
          ...Styles.NeomorphStyle,
          width: wp(props.width),
          height: props.height && hp(props.height),
          borderRadius: props.borderRadius && props.borderRadius,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: wp(5),
          }}>
          {props.leftIcon ? <Image source={props.leftIcon} /> : null}
          <TextInput
            placeholderTextColor={
              props.placeholderTextColor
                ? props.placeholderTextColor
                : '#BDBDBD'
            }
            placeholder={props.placeholder}
            style={props.TextInputStyle}
            value={props.value}
            onChangeText={props.onChangeText}></TextInput>
          {props.rightIcon && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: wp(5), height: wp(5)}}
                source={props.rightIcon}></Image>
            </View>
          )}
        </View>
      </Neomorph>
    </Neomorph>
  );
};

const Styles = StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.6,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    height: hp(7),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});

export default Index;
