import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';

import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TextInput,
  InputText,
  HeadWrapper,
  Header,
  LongHeader,
} from '@components';
import styles from './styles';

const AddMusic = props => {
  const {navigation, route} = props;
  const [stateCheck, setStateCheck] = useState('Dialogue');

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {/* *******************************************neomorph Tab Layout*************************************************************************** */}
          <LongHeader
            leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
            centerIcon={require('../../assets/Images/MusicLibrary/MusicNotesSimple.png')}
            centerText={'Add Music'}
            onClickLeftIcon={() => navigation.goBack()}
            innerComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: hp(4),
                }}>
                <Neomorph
                  // inner
                  swapShadows
                  lightShadowColor="#BDBDBD"
                  darkShadowColor="black"
                  style={[styles.NeomorphContainer]}>
                  <Neomorph
                    inner
                    lightShadowColor="#444444"
                    darkShadowColor="#1A1A1A"
                    style={styles.NeomorphStyle}>
                    <View style={styles.tabButtonContainer}>
                      <View style={{flex: 1}}>
                        <TouchableOpacity
                          style={{
                            height: '100%',
                          }}
                          onPress={() => {
                            setStateCheck('Dialogue');
                          }}>
                          <Text
                            style={[
                              {
                                color:
                                  stateCheck === 'Dialogue'
                                    ? '#EB5757'
                                    : '#828282',
                              },
                              styles.textStylesTab,
                            ]}>
                            Dialogue
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: 1}}>
                        <TouchableOpacity
                          style={{
                            height: '100%',
                          }}
                          onPress={() => {
                            setStateCheck('song');
                          }}>
                          <Text
                            style={[
                              {
                                color:
                                  stateCheck === 'song' ? '#EB5757' : '#828282',
                              },
                              styles.textStylesTab,
                            ]}>
                            Song
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: 1}}>
                        <TouchableOpacity
                          style={{height: '100%'}}
                          onPress={() => setStateCheck('music')}>
                          <Text
                            style={[
                              {
                                color:
                                  stateCheck === 'music'
                                    ? '#EB5757'
                                    : '#828282',
                              },
                              styles.textStylesTab,
                            ]}>
                            Music
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          // backgroundColor: 'red',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => setStateCheck('playlist')}
                          style={{
                            height: '100%',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={[
                              {
                                alignSelf: 'center',
                                color:
                                  stateCheck === 'playlist'
                                    ? '#EB5757'
                                    : '#828282',
                              },
                              styles.textStylesTab,
                            ]}>
                            Playlist
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Neomorph>
                </Neomorph>
              </View>
            )}
          />
          <View style={{width: wp(85), height: hp(60), alignSelf: 'center'}}>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              // swapShadows // <- change zIndex of each shadow color
              style={{
                shadowRadius: 10,
                borderRadius: 15,
                backgroundColor: '#1A1A1A',
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: hp(2),
                  // paddingHorizontal: wp(2),
                }}>
                <View style={{height: '80%'}}>
                  <FlatList
                    data={[1, 2, 3]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{borderRadius: 25}}
                    renderItem={({item}) => (
                      <View
                        style={{marginHorizontal: wp(1), paddingRight: wp(2)}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: hp(1.5),
                            borderBottomWidth: 1,
                            borderColor: '#000000',
                            paddingHorizontal: wp(2),
                          }}>
                          <Image
                            style={{width: wp(5), height: wp(5)}}
                            source={require('../../assets/Images/AddMusic/music.png')}></Image>
                          <Text
                            style={{
                              fontSize: wp(5),
                              color: '#828282',
                              marginLeft: wp(1),
                            }}>
                            On my way - Alan walker....
                          </Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item, index) => `feed_${index}`}
                  />
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity>
                    <Text style={{color: '#828282', fontSize: wp(3.5)}}>
                      Add Audio
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </NeomorphFlex>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMusic;
