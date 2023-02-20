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
  Text,
} from 'react-native';
import {TextInput, InputText, CustomButton, Header} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const About = props => {
  const {navigation, route} = props;
  const socialMediaData = [
    {
      name: 'Contact us by Email',
      image: require('../../assets/Images/About/EnvelopeSimple.png'),
    },
    {
      name: 'Like our page on Facebook',
      image: require('../../assets/Images/About/FacebookLogo.png'),
    },
    {
      name: 'Follow us on Instagram',
      image: require('../../assets/Images/About/InstagramLogo.png'),
    },
    {
      name: 'Follow us on Youtube',
      image: require('../../assets/Images/About/YoutubeLogo.png'),
    },
    {
      name: 'Visit our Website',
      image: require('../../assets/Images/About/DribbbleLogo.png'),
    },
    {
      name: 'Rate us on PlayStore',
      image: require('../../assets/Images/About/Bag.png'),
    },
    {
      name: 'Thank you for downloading',
      image: require('../../assets/Images/About/InstagramLogo.png'),
    },
  ];
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        centerText={'About'}
        centerTextStyle={{paddingLeft: wp(2)}}
        onClickLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={{flexGrow: 1, backgroundColor: '#1A1A1A'}}>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(7),
              marginBottom: hp(5),
            }}>
            <View style={{marginBottom: hp(2)}}>
              <Image
                style={{width: wp(40), height: wp(40)}}
                resizeMode="contain"
                source={require('../../assets/Images/About/logo.png')}></Image>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: wp(40), height: wp(10)}}
                source={require('../../assets/Images/Home/ARTalent-text.png')}></Image>
              <Image
                style={{marginTop: -5}}
                source={require('../../assets/Images/About/Line.png')}></Image>

              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color: '#BDBDBD',
                    textAlign: 'center',
                    letterSpacing: 3,
                  }}>
                  Let Your Talent Earn!
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: hp(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#BDBDBD',
                textAlign: 'justify',
                justifyContent: 'center',
              }}>
              It is rightly said, that each one of us is a unique personality.
              We all possess some TALENTS. But not everyone has the access to
              showcase their talents before the world. But what if you get the
              opportunity to portray your talent before the world and that to
              from the comfort of your home? Wouldn’t it be wonderful to be able
              to discover a lot many like you and create a community of artists
              away from the geographical boundaries? And what if you get
              recognition, fame and reward for your talents from a single
              platform? Yes you hear us right! And we got you the perfect app to
              help you discover your talents and earn rewards by winning
              contests! ARTalent is a comprehensive platform for you to showcase
              your talent and let the world witness it. It creates a community
              of artists from varied fields to Learn, Perform and Earn together!
              Wanna know how? Keep reading....
            </Text>
          </View>
          <View key="list-social-media-container">
            {socialMediaData.map(item => (
              <View style={{borderTopWidth: 2, borderColor: '#000000'}}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: wp(4),
                      // justifyContent: 'center',
                      alignItems: 'center',
                      //   borderBottomWidth: 2,
                    }}>
                    <Image
                      source={item.image}
                      style={{width: wp(7), height: wp(7)}}></Image>
                    <Text style={{color: '#828282', paddingLeft: wp(5)}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
