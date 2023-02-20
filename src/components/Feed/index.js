import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {FeedHeader} from '@components';
import styles from './styles';
const Index = props => {
  const {children} = props;
  return (
    <View>
      <FeedHeader />
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: hp(-0.5),
            zIndex: 100,
          }}>
          <View
            style={{
              width: '95%',
              height: hp(1),
              backgroundColor: '#5a1818',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: '75%',
                height: hp(1),
                backgroundColor: '#EB5757',
                borderRadius: 10,
              }}></View>
          </View>
        </View>
        <Image source={require('../../assets/Images/Home/feedImage.png')} />
        <View style={{position: 'absolute', bottom: wp(5), left: wp(5)}}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              style={{width: wp(5), height: wp(5)}}
              source={require('../../assets/Images/Home/maximise.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#1A1A1A',
          paddingVertical: hp(1),
          paddingHorizontal: wp(5),
          borderBottomColor: '#4F4F4F',
          borderBottomWidth: 2,
          marginBottom: hp(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: hp(3),
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                style={{width: wp(5), height: wp(5)}}
                source={require('../../assets/Images/Home/thumb-up.png')}
              />
            </TouchableOpacity>

            <Text style={{color: '#BDBDBD'}}>157</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: wp(5),
            }}>
            <TouchableOpacity>
              <Image
                style={{width: wp(5), height: wp(5)}}
                source={require('../../assets/Images/Home/chat-alt.png')}
              />
            </TouchableOpacity>

            <Text style={{color: '#BDBDBD'}}>157</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: wp(5),
            }}>
            <TouchableOpacity>
              <Image
                style={{width: wp(5), height: wp(5)}}
                source={require('../../assets/Images/Home/send.png')}
              />
            </TouchableOpacity>

            <Text style={{color: '#BDBDBD'}}></Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#BDBDBD'}}>Description of the video ....</Text>
        </View>
      </View>
    </View>
  );
};
export default Index;
