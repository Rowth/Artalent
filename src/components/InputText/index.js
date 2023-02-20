import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Icon,
  View,
  Image,
  InteractionManager,
  KeyboardAvoidingView,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const InputText = props => {
  return (
    <View Style={Styles.SectionStyle}>
      <Neomorph
        inner
        lightShadowColor="#000"
        style={[
          Styles.NeomorphContainer,
          {
            width: wp(props.width),
            height: hp(props.height),
            borderRadius: props.borderRadius ? props.borderRadius : 20,
          },
          props.NeomorphContainer,
        ]}>
        <Neomorph
          inner
          swapShadows
          style={[
            Styles.NeomorphStyle,
            {
              width: wp(props.width),
              height: hp(props.height),
              borderRadius: props.borderRadius ? props.borderRadius : 20,
            },
            props.NeomorphStyle,
          ]}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: wp(1),
              }}>
              <View style={{}}>
                {props.source && (
                  <Image
                    style={{width: wp(5), height: hp(5)}}
                    source={props.source}
                    ImageStyleFx={Styles.ImageStyleFx}
                  />
                )}
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  ref={ref => {
                    props.setRef ? props.setRef(ref) : null;
                  }}
                  autoFocus={props.autoFocus ? props.autoFocus : false}
                  keyboardType={props.keyboardType}
                  value={props.value}
                  onChangeText={props.onChangeText}
                  style={[Styles.inputTextStyle, props.inputTextStyle]}
                  placeholder={props.placeholder}
                  placeholderTextColor={props.placeholderTextColor}></TextInput>
              </View>
              <View style={{}}>
                {props.endSource && (
                  <Image
                    style={{width: wp(7), height: hp(7)}}
                    source={props.endSource}
                    resizeMode={'contain'}
                    ImageStyleFx={Styles.ImageStyleFx}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Neomorph>
      </Neomorph>
    </View>
  );
};
const Styles = StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 1,

    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: 'red',
  },
  inputTextStyle: {
    color: 'white',
    paddingLeft: wp(4),
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.15,

    position: 'absolute',
    backgroundColor: 'transparent',
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageStyleFx: {
    marginHorizontal: wp(4),
    height: 20,
    width: 20,
  },
});

export default InputText;
