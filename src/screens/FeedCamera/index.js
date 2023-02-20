import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header, SmallButton, CustomAlert} from '@components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const FeedCamera = props => {
  const {navigation, route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const buttonData = [
    {image: require('../../assets/Images/FeedCamera/bolt.png')},
    {image: require('../../assets/Images/FeedCamera/ArrowsClockwise.png')},
    {image: require('../../assets/Images/FeedCamera/aperture.png')},
    {image: require('../../assets/Images/FeedCamera/volume-loud.png')},
    {image: require('../../assets/Images/FeedCamera/colours.png')},
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          onClickLeftIcon={() => navigation.goBack()}
          // onClickRightIcon={() => setModalVisible(!isModalVisible)}
        />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={require('../../assets/Images/model.png')}></Image>
          </View>
          <View>
            <View
              style={{
                width: wp(100),
                height: hp(8),
                backgroundColor: '#1A1A1A',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: wp(5),
              }}>
              {buttonData.map(item => (
                <View>
                  <SmallButton
                    width={13}
                    height={6}
                    borderRadius={20}
                    innerComponent={() => (
                      <Image
                        style={{width: wp(5), height: wp(5)}}
                        source={item.image}></Image>
                    )}></SmallButton>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FeedCamera;
