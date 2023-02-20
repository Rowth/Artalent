import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const tile = (item, index) => {
  const [show, setShow] = useState(false);
  return show ? (
    <View
      key={'#desw' + index}
      style={{
        marginVertical: hp(0.6),
        borderRadius: 10,
        paddingHorizontal: wp(3),
      }}>
      <NeomorphFlex
        darkShadowColor="#000000"
        lightShadowColor="#ffffff"
        style={{
          backgroundColor: '#1A1A1A',
          width: '100%',
          borderRadius: 5,
          shadowRadius: 3,
        }}>
        <View
          style={{
            paddingHorizontal: wp(4),
            flexDirection: 'row',
            paddingVertical: hp(2),
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: '#EB5757'}}>Show Information</Text>
          </View>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <View>
              <Image
                style={{height: wp(5), width: wp(5), resizeMode: 'contain'}}
                source={require('../../assets/Images/Info/VectorDown.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              paddingHorizontal: wp(2),
              paddingVertical: hp(1),
              color: '#ffffff',
            }}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </Text>
        </View>
      </NeomorphFlex>
    </View>
  ) : (
    <TouchableOpacity key={'#desw2' + index} onPress={() => setShow(!show)}>
      <View
        style={{
          marginVertical: hp(0.6),
          borderRadius: 10,
          paddingHorizontal: wp(3),
        }}>
        <NeomorphFlex
          darkShadowColor="#000000"
          lightShadowColor="#ffffff"
          style={{
            backgroundColor: '#1A1A1A',
            width: '100%',
            borderRadius: 5,
            shadowRadius: 3,
          }}>
          <View
            style={{
              paddingHorizontal: wp(4),
              flexDirection: 'row',
              paddingVertical: hp(2),
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#EB5757'}}>Wallet Information</Text>
            </View>
            <View>
              <Image
                style={{height: wp(5), width: wp(5), resizeMode: 'contain'}}
                source={require('../../assets/Images/Info/Vector.png')}></Image>
            </View>
          </View>
        </NeomorphFlex>
      </View>
    </TouchableOpacity>
  );
};
export default function Info(props) {
  const {navigation, route} = props;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Info'}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#1A1A1A',
        }}>
        {[1, 2, 3].map((item, index) => tile(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
}
