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
  Checkbox,
} from 'react-native';
import CheckBox from 'react-native-check-box';
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

const Search = props => {
  const {navigation, route} = props;
  const [isSelected, setSelection] = useState(false);
  const [stateCheck, setStateCheck] = useState('Dialogue');
  const [search, setSearch] = useState('');
  const setToggleCheckBox = key => {
    console.log(key);
    setUserData(
      userData.map(item =>
        item.key === key ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const [userData, setUserData] = useState([
    {
      key: '1',
      data: 'Dance',
      checked: true,
    },
    {
      key: '8',
      data: 'Acting',
      checked: true,
    },
    {
      key: '2',
      data: 'Music',
      checked: true,
    },
  ]);

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {/* *******************************************neomorph Tab Layout*************************************************************************** */}
          <View style={{backgroundColor: 'black'}}>
            <LongHeader
              leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
              centerIcon={require('../../assets/Images/Home/ARTalent-text.png')}
              centerImageStyle={{height: wp(8), width: wp(35)}}
              rightIcon={require('../../assets/Images/Home/bell.png')}
              secondRightIcon={require('../../assets/Images/Winners/message.png')}
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
                              Intrest
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
                                    stateCheck === 'song'
                                      ? '#EB5757'
                                      : '#828282',
                                },
                                styles.textStylesTab,
                              ]}>
                              Country
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
                              State
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
                              City
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Neomorph>
                  </Neomorph>
                </View>
              )}
            />
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={userData}
              showsHorizontalScrollIndicator={false}
              style={{
                width: wp('100%'),
                marginTop: 10,
              }}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => (
                <View
                  style={{
                    paddingHorizontal: wp(4),
                    borderTopWidth: index === 0 ? 0.2 : 0,
                    borderBottomWidth: 0.2,
                    borderColor: 'white',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: wp(2),
                    }}>
                    <Text style={{color: 'white', fontSize: wp(4.5)}}>
                      {item.data}
                    </Text>
                    <View>
                      <CheckBox
                        disabled={false}
                        isChecked={item.checked}
                        onClick={newValue => setToggleCheckBox(item.key)}
                        checkBoxColor="white"
                      />
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: hp(3),
            }}>
            <View style={{}}>
              <TextInput
                placeholderTextColor="#828282"
                borderRadius={16}
                rightIcon={require('../../assets/Images/MusicLibrary/search.png')}
                value={search}
                onChangeText={text => {
                  setSearch(text.trim());
                }}
                placeholder="Search"
                width={80}
                height={6}
                TextInputStyle={{
                  width: '100%',
                  color: 'white',
                  paddingLeft: wp(1),
                }}></TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
