import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const Splash = props => {
  const {navigation, route} = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{marginBottom: 5}}
        size="large"
        color="#828282"
      />
      <Image
        style={{width: wp(50), height: wp(10)}}
        source={require('../../assets/Images/Home/ARTalent-text.png')}
      />
    </View>
  );
};

export default Splash;
