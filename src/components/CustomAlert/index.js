import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import {InputText} from '@components';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const Index = props => {
  const {children} = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Neomorph
        inner
        darkShadowColor="#fff"
        style={styles.NeomorphContainerModel}>
        <Neomorph
          inner
          swapShadows
          darkShadowColor="#000"
          style={styles.NeomorphStyleModel}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{}}>{props.innerComponent()}</View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                width: '80%',

                flex: 1,
              }}>
              <TouchableOpacity onPress={props.onCancel}>
                <ImageBackground
                  resizeMode="contain"
                  style={{
                    height: wp(20),
                    width: wp(35),
                    alignItems: 'center',
                    marginRight: wp(2),
                    justifyContent: 'center',
                  }}
                  source={require('../../assets/Images/ButtonComponents/greenBtn.png')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      alignSelf: 'center',
                    }}>
                    {props.firstButtonText ? props.firstButtonText : 'Cancel'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity onPress={props.onAdd}>
                <ImageBackground
                  resizeMode="contain"
                  style={{
                    height: wp(20),
                    width: wp(35),
                    alignItems: 'center',
                    marginleft: wp(2),
                    justifyContent: 'center',
                  }}
                  source={require('../../assets/Images/ButtonComponents/redBtn.png')}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                    }}>
                    {props.secondButtonText ? props.secondButtonText : 'Add'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Neomorph>
      </Neomorph>
    </View>
  );
};
export default Index;
