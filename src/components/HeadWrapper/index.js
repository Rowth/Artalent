import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const HeadWrapper = props => {
  const {children} = props;
  return (
    <View style={styles.containerFx}>
      <Neomorph inner lightShadowColor="#000" style={styles.NeomorphContainer}>
        <Neomorph inner swapShadows style={styles.NeomorphStyle}>
          <View style={styles.headerViewStyle}>
            <TouchableOpacity onPress={props.firstIcClick}>
              <View style={{padding: 5}}>
                <Image source={props.firstIc} />
              </View>
            </TouchableOpacity>

            <View style={styles.walletIcStyle}>
              <Image source={props.mainIc} />
              <Text style={styles.textStyle}>{props.mainText}</Text>
            </View>

            <Image source={props.endButton} />
          </View>
        </Neomorph>
      </Neomorph>
    </View>
  );
};
export default HeadWrapper;
