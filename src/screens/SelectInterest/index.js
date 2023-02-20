import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  Alert,
} from 'react-native';

import {URL, Axios} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TextInput, Header} from '@components';
import {NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const SelectInterest = props => {
  const {navigation, route} = props;

  const [interestData, setInterestData] = useState([
    {title: 'chandna', id: 1},
    {title: 'chandna', id: 2},
  ]);
  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : {};
      if (data !== null) {
        console.log(data);
        0;
        setInterestData(
          data.interest.map(item => ({...item, selected: false})),
        );
      }
    } catch (e) {
      // error reading value
    }
  };
  const setInterest = async () => {
    let body = new FormData();
    let interestIds = [];
    interestData.forEach(item => {
      if (item.selected) {
        interestIds.push(item);
      }
      item.selected && body.append('interest_id[]', item.id);
    });
    if (interestIds.length) {
      const res = await Axios({
        method: 'post',
        url: URL.ADD_SELECT_INTEREST,
        data: body,
      });
      console.log(res, URL.ADD_SELECT_INTEREST);
      if (res.data.status === 200) {
        const rest = await AsyncStorage.mergeItem(
          'Auth',
          JSON.stringify({user_interest: interestIds}),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'DrawerNavigation'}],
        });
      }
    } else {
      Alert.alert('Select Interest!');
    }
  };
  useEffect(() => {
    getData('Auth');
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'black'}}>
        <View style={{flex: 1}}>
          <Header
            // leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
            centerIcon={require('../../assets/Images/SelectInterest/wallpaper.png')}
            rightIcon={require('../../assets/Images/SelectInterest/check.png')}
            // onClickLeftIcon={() => navigation.goBack()}
            onClickRightIcon={() => {
              setInterest();
            }}
            centerText={'Select interest'}
          />
          <FlatList
            contentContainerStyle={{
              backgroundColor: '#1A1A1A',
              paddingHorizontal: 10,
            }}
            numColumns={2}
            data={interestData}
            renderItem={({item}) => (
              <View
                style={{
                  justifyContent: 'center',
                  width: '50%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: item.selected ? 'red' : 'transparent',
                    margin: hp(1),
                    borderRadius: 12,
                    padding: 1,
                  }}>
                  <NeomorphFlex
                    darkShadowColor={'#000000'}
                    lightShadowColor={'grey'}
                    style={{
                      shadowRadius: 2,
                      borderRadius: 12,
                      shadowOffset: {width: 4, height: 6},
                      shadowOpacity: 0.3,
                      shadowColor: 'grey',
                      backgroundColor: 'black',
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{alignSelf: 'center'}}
                      onPress={() => {
                        console.log(interestData);
                        setInterestData(
                          interestData.map(itemx =>
                            itemx.id === item.id
                              ? {...itemx, selected: !item.selected}
                              : {...itemx},
                          ),
                        );
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: hp(23),
                          width: wp(42),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}>
                        <Image
                          style={{
                            borderRadius: 10,
                            height: hp(23),
                            width: wp(42),
                            resizeMode: 'cover',
                            opacity: 0.7,
                            backgroundColor: 'black',
                          }}
                          source={{
                            uri: item.image,
                          }}></Image>
                        <View
                          zIndex={1000}
                          style={{
                            height: hp(25),
                            width: wp(45),
                            position: 'absolute',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <Text style={{color: '#E0E0E0', fontSize: hp(2.5)}}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </NeomorphFlex>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SelectInterest;
