import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import styles from './styles';
const CustomButton = props => {
  const {children} = props;
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View style={{alignItems: 'center', padding: 10}}>
          <Neomorph
            inner
            lightShadowColor="#000"
            style={styles.NeomorphContainer}>
            <Neomorph inner swapShadows style={styles.NeomorphStyle}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  title="Log In"
                  borderwidth="1"
                  width="100%"
                  padding="5"
                  borderColor="red"
                  textAlign="center"
                  height="6"
                  style={{color: 'white', justifyContent: 'center'}}>
                  {props.title}
                </Text>
              </View>
            </Neomorph>
          </Neomorph>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CustomButton;
