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
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#1A1A1A',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderColor: '#F2F2F2',
        borderWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#828282',
            textAlign: 'center',
          }}>
          {props.headingText ? props.headingText : 'add icon'}
        </Text>
        <View style={{zIndex: 10, position: 'absolute', right: 5, top: 1}}>
          <TouchableOpacity style={{}} onPress={props.onClickCornerButton}>
            <View style={{alignItems: 'center'}}>
              <Neomorph
                inner
                lightShadowColor="#000"
                style={{
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowRadius: 2,
                  shadowOpacity: 1,
                  borderRadius: 15,
                  backgroundColor: '#1A1A1A',
                  width: wp(12),
                  height: hp(6),
                  alignItems: 'center',
                }}>
                <Neomorph
                  inner
                  swapShadows
                  style={{
                    shadowColor: '#3A3A3A',
                    shadowOffset: {width: 9, height: 6},
                    shadowRadius: 5,
                    shadowOpacity: 0.15,
                    borderRadius: 15,
                    backgroundColor: 'transparent',
                    width: wp(12),
                    height: hp(6),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: wp(4),
                  }}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: wp(5), height: wp(5)}}
                      source={require('../../assets/Images/ManageInterest/Check.png')}
                    />
                  </View>
                </Neomorph>
              </Neomorph>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: hp(2),
          alignItems: 'center',
        }}>
        <Image
          style={{width: hp(15), height: hp(15)}}
          source={{
            uri: 'https://media.istockphoto.com/photos/colleagues-having-meeting-in-boardroom-businessman-giving-speech-picture-id1325276224?b=1&k=20&m=1325276224&s=170667a&w=0&h=gwyosKN95ptLychzz0_KcxN8vgw7F2Q-Sdt7kCp5xIo=',
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => console.log('')}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Neomorph
              inner
              lightShadowColor="#000"
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowRadius: 2,
                shadowOpacity: 1,
                borderRadius: 30,
                backgroundColor: '#1A1A1A',
                width: wp(80),
                height: hp(6),

                alignItems: 'center',
              }}>
              <Neomorph
                inner
                swapShadows
                style={{
                  shadowColor: '#3A3A3A',
                  shadowOffset: {width: 9, height: 6},
                  shadowRadius: 5,
                  shadowOpacity: 0.15,
                  borderRadius: 30,
                  backgroundColor: 'transparent',
                  width: wp(80),
                  height: hp(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp(4),
                }}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    color="#F2F2F2"
                    title="Log In"
                    borderwidth="1"
                    width="100%"
                    padding="5"
                    borderColor="red"
                    textAlign="center"
                    height="6"
                    style={{
                      color: 'white',
                      justifyContent: 'center',
                    }}>
                    {props.buttonText?props.buttonText:"Music"}
                  </Text>
                </View>
              </Neomorph>
            </Neomorph>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Index;
