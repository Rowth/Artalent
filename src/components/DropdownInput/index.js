import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const DropdownInput = props => {
  const inputRef = useRef(null);
  return (
    <ModalSelector
      optionContainerStyle={{backgroundColor: '#1A1A1A'}}
      cancelText={'Cancel'}
      cancelStyle={{backgroundColor: '#1A1A1A'}}
      cancelTextStyle={{color: '#1F51FF'}}
      optionTextStyle={{color: 'white'}}
      data={props.data}
      ref={inputRef}
      onChange={props.onChange}
      customSelector={
        <NeomorphFlex
          inner
          lightShadowColor="#000"
          style={{
            ...Styles.NeomorphContainer,
            width: wp(props.width),
          }}>
          <NeomorphFlex
            inner
            swapShadows
            style={{...Styles.NeomorphStyle, width: wp(props.width)}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {props.leftIcon ? <Image source={props.leftIcon} /> : null}
              <TouchableOpacity
                style={{width: '100%', height: '100%'}}
                onPress={() => inputRef.current.open()}>
                <View
                  style={{
                    width: '100%',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'grey',
                      width: '80%',
                      paddingLeft: wp(1),
                    }}>
                    {props.placeholder}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </NeomorphFlex>
        </NeomorphFlex>
      }
    />
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
    height: hp(6),
    alignItems: 'center',
  },
  NeomorphStyle: {
    shadowColor: '#3A3A3A',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
});

export default DropdownInput;
