import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput as TextInput2,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Header, TextInput} from '@components';
import {NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const SubAdminDetails = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const {navigation, route} = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <View
        style={{
          backgroundColor: 'black',
        }}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/Setting/Gear.png')}
          onClickLeftIcon={() => navigation.goBack()}
          // onClickRightIcon={() => setModalVisible(!isModalVisible)}
          centerText={'Sub Admin details'}
        />
      </View>
      <ScrollView>
        <View>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                width: wp(30),
                height: wp(30),
                borderRadius: wp(15),
                marginTop: hp(5),
              }}
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: hp(2),
              marginHorizontal: wp(3.5),
              marginTop: hp(4),
            }}>
            <View style={{marginRight: wp(3)}}>
              <Image
                style={{width: wp(8), height: wp(8)}}
                source={require('../../assets/Images/DetailsScreen/Stroke.png')}
              />
            </View>
            <View
              style={{
                // paddingLeft: 3,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <NeomorphFlex
                inner
                lightShadowColor="#000"
                style={styles.NeomorphContainer}>
                <NeomorphFlex inner swapShadows style={styles.NeomorphStyle}>
                  <TextInput2
                    //   value={firstName}
                    //   onChangeText={text => {
                    //     setFirstName(text.trim());
                    //   }}
                    placeholderTextColor={'#BDBDBD'}
                    placeholder="First name"
                    style={{color: 'white', width: '100%'}}></TextInput2>
                </NeomorphFlex>
              </NeomorphFlex>
              <NeomorphFlex
                inner
                lightShadowColor="#000"
                style={styles.NeomorphContainer}>
                <NeomorphFlex inner swapShadows style={styles.NeomorphStyle}>
                  <TextInput2
                    style={{color: 'white', width: '100%'}}
                    //   value={lastName}
                    //   onChangeText={text => {
                    //     setLastName(text.trim());
                    //   }}
                    placeholderTextColor={'#BDBDBD'}
                    placeholder="Last Name"></TextInput2>
                </NeomorphFlex>
              </NeomorphFlex>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: hp(2),
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: wp(12), height: wp(12)}}
                source={require('../../assets/Images/SubAdminDetails/phone.png')}
              />
            </View>
            <View>
              <TextInput
                placeholder="Phone"
                width={83}
                height={6}
                keyboardType={'numeric'}
                marginLeft={5}
                borderRadius={20}
                TextInputStyle={{
                  color: 'white',
                }}></TextInput>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: hp(5),
              padding: wp(3),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: wp(8),
                height: wp(7),
              }}></View>
            <View>
              <NeomorphFlex
                inner
                darkShadowColor="#000"
                lightShadowColor="grey"
                style={styles.NeomorphTaskContainer}>
                <View
                  style={{
                    width: '100%',
                    marginTop: '5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
                      Manage interest
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: '#F2F2F2',
                        borderRadius: wp(3),
                      }}>
                      <Switch
                        trackColor={{false: 'transparent', true: 'transparent'}}
                        thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
                      Special contests
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: '#F2F2F2',
                        borderRadius: wp(3),
                      }}>
                      <Switch
                        trackColor={{false: 'transparent', true: 'transparent'}}
                        thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
                      Manage location
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: '#F2F2F2',
                        borderRadius: wp(3),
                      }}>
                      <Switch
                        trackColor={{false: 'transparent', true: 'transparent'}}
                        thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
                      Manage contest
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: '#F2F2F2',
                        borderRadius: wp(3),
                      }}>
                      <Switch
                        trackColor={{false: 'transparent', true: 'transparent'}}
                        thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                      marginBottom: wp(5),
                    }}>
                    <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
                      Manage advertisement
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.2,
                        borderColor: '#F2F2F2',
                        borderRadius: wp(3),
                      }}>
                      <Switch
                        trackColor={{false: 'transparent', true: 'transparent'}}
                        thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  </View>
                </View>
              </NeomorphFlex>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: wp('100%'),

              alignItems: 'center',
              paddingBottom: wp(4),
            }}>
            <TouchableOpacity>
              <NeomorphFlex
                lightShadowColor="#3A3A3A"
                style={styles.NeomorphButtonContainer}>
                <NeomorphFlex style={styles.NeomorphButtonStyle}>
                  <View
                    style={{
                      justifyContent: 'center',
                      backgroundColor: '#219653',
                      alignItems: 'center',
                      height: hp('2.5%'),
                      width: wp('20%'),
                      borderRadius: 25,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        alignSelf: 'center',
                        // backgroundColor: 'red',
                      }}>
                      {props.secondButtonText ? props.secondButtonText : 'Add'}
                    </Text>
                  </View>
                </NeomorphFlex>
              </NeomorphFlex>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubAdminDetails;
