import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Home,
  NewHome,
  Star,
  Profile,
  Search,
  AddPost,
  CameraEditor,
  FeedContest,
  ShareFeed,
  Wallet,
} from '@screens';
import {
  Neomorph,
  NeomorphFlex,
  Shadow,
  ShadowFlex,
  NeomorphBlur,
} from 'react-native-neomorph-shadows';
function personScreen() {
  return (
    <View style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#1A1A1A',
            paddingHorizontal: wp(5),
            paddingVertical: hp(1),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1639317393027-2e5308248ea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
              }}
              style={{
                height: hp(8),
                width: hp(8),
                borderRadius: hp(4),
              }}
            />
          </View>
          <View style={{flex: 1, paddingLeft: wp(3)}}>
            <Text style={{color: '#BDBDBD'}}>Nikhil Soni</Text>
            <Text style={{color: '#BDBDBD'}}>Dancer</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={require('../assets/Images/Home/Trash.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          <Image source={require('../assets/Images/Home/feedImage.png')} />
          <View style={{position: 'absolute', bottom: wp(5), left: wp(5)}}>
            <TouchableOpacity activeOpacity={0.5}>
              <Image source={require('../assets/Images/Home/maximise.png')} />
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(3),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity>
                <Image source={require('../assets/Images/Home/thumb-up.png')} />
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
                <Image source={require('../assets/Images/Home/chat-alt.png')} />
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
                <Image source={require('../assets/Images/Home/send.png')} />
              </TouchableOpacity>

              <Text style={{color: '#BDBDBD'}}></Text>
            </View>
          </View>
          <View>
            <Text style={{color: '#BDBDBD'}}>
              Description of the video ....
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ListScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>List!</Text>
    </View>
  );
}
function favouriteScreen() {
  const width = wp(8);
  const height = wp(8);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1A1A1A',
            padding: 20,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    shadowRadius: 10,
                    borderRadius: 5,
                    backgroundColor: '#1A1A1A',
                    marginVertical: hp(5),
                    width: '100%',
                    height: '100%',
                  }}>
                  <View style={{padding: 20, flex: 1}}>
                    <Text>
                      chanda852852asdfghjkqertyuiasdfghjklqwertyuiopzxcvbnmn
                    </Text>
                    <Text>chandan</Text>
                    <Text>chandan</Text>
                    <Text>chandan</Text>
                  </View>
                </NeomorphFlex>
              </View>
              <Neomorph
                // swapShadows
                // inner
                darkShadowColor="black" // <- set this
                lightShadowColor="white" // <- this
                style={{
                  // shadowOffset: {width: -5, height: -8},
                  // shadowOpacity: 0.1, // <- and this or yours opacity
                  shadowRadius: 10,
                  borderRadius: 10,
                  backgroundColor: '#1A1A1A',
                  width: wp(80),
                  height: wp(10),
                  marginVertical: hp(10),
                }}>
                {/* <Image source={require('./CaretLeft.png')} /> */}
              </Neomorph>

              <Neomorph
                inner
                lightShadowColor="#000"
                style={{
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 0},
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
                  // swapShadows
                  style={{
                    shadowColor: '#3A3A3A',
                    shadowOffset: {width: 3, height: 1},
                    shadowRadius: 5,
                    shadowOpacity: 0.1,
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
                    <Text style={{color: 'white'}}>kk</Text>
                  </View>
                </Neomorph>
              </Neomorph>
              <View style={{marginTop: 10}}>
                <Neomorph
                  darkShadowColor="black" // <- set this
                  lightShadowColor="white" // <- this
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    shadowRadius: 10,
                    borderRadius: 25,
                    backgroundColor: '#1A1A1A',
                    width: 150,
                    height: 150,
                  }}></Neomorph>
              </View>
              <Neomorph
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={{
                  // shadowOpacity: 0.1,
                  shadowRadius: 10,
                  borderRadius: 9,
                  backgroundColor: '#1A1A1A',
                  width: wp(80),
                  height: wp(10),
                  marginVertical: hp(5),
                }}></Neomorph>
              <Shadow
                // inner // <- enable inner shadow
                useArt // <- set this prop to use non-native shadow on ios
                style={{
                  shadowOffset: {width: -10, height: -10},
                  shadowOpacity: 0.4,
                  shadowColor: 'grey',
                  shadowRadius: 10,
                  borderRadius: 10,
                  backgroundColor: '#1A1A1A',
                  width: wp(80),
                  height: wp(10),
                  marginVertical: hp(5),
                  // ...include most of View/Layout styles
                }}></Shadow>
              <Shadow
                // inner // <- enable inner shadow
                useArt // <- set this prop to use non-native shadow on ios
                style={{
                  shadowOffset: {width: -10, height: -10},
                  shadowOpacity: 0.4,
                  shadowColor: 'grey',
                  shadowRadius: 10,
                  borderRadius: 10,
                  backgroundColor: '#1A1A1A',
                  width: wp(80),
                  height: wp(10),
                  marginVertical: hp(5),
                  // ...include most of View/Layout styles
                }}>
                <Shadow
                  inner // <- enable inner shadow
                  useArt // <- set this prop to use non-native shadow on ios
                  style={{
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.4,
                    shadowColor: 'black',
                    shadowRadius: 10,
                    borderRadius: 10,
                    backgroundColor: '#1A1A1A',
                    width: wp(80),
                    height: wp(10),
                    // ...include most of View/Layout styles
                  }}></Shadow>
              </Shadow>
              <Shadow
                // inner // <- enable inner shadow
                useArt // <- set this prop to use non-native shadow on ios
                style={{
                  shadowOffset: {width: -5, height: -5},
                  shadowOpacity: 0.5,
                  shadowColor: 'grey',
                  shadowRadius: 10,
                  borderRadius: 20,
                  backgroundColor: '#1A1A1A',
                  width: 100,
                  height: 100,
                  marginVertical: hp(5),
                  // ...include most of View/Layout styles
                }}>
                <Shadow
                  inner // <- enable inner shadow
                  useArt // <- set this prop to use non-native shadow on ios
                  style={{
                    shadowOffset: {width: -5, height: -5},
                    shadowOpacity: 0.5,
                    shadowColor: 'black',
                    shadowRadius: 20,
                    borderRadius: 20,
                    backgroundColor: '#1A1A1A',
                    width: 100,
                    height: 100,
                    // ...include most of View/Layout styles
                  }}></Shadow>
              </Shadow>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={{
                  shadowRadius: 10,
                  borderRadius: 5,
                  backgroundColor: '#1A1A1A',
                  marginVertical: hp(5),
                }}>
                <View style={{padding: 20}}>
                  <Text>
                    chanda852852asdfghjkqertyuiasdfghjklqwertyuiopzxcvbnmn
                  </Text>
                  <Text>chandan</Text>
                  <Text>chandan</Text>
                  <Text>chandan</Text>
                </View>
              </NeomorphFlex>
              <View style={{marginVertical: hp(10)}}>
                <NeomorphBlur
                  // inner

                  swapShadows
                  style={{
                    shadowRadius: 12,
                    borderRadius: 70,
                    backgroundColor: '#1A1A1A',
                    width: 140,
                    height: 140,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function addScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <AddPost /> */}
      {/* <CameraEditor /> */}
      <ShareFeed />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const bottomTabData = [
    {
      name: 'Star',
      image: require('../assets/Images/BottomTab/Sta.png'),
      selectedImage: require('../assets/Images/BottomTab/selectedStar.png'),
    },
    {
      name: 'Home',
      image: require('../assets/Images/BottomTab/HomeWhite.png'),
      selectedImage: require('../assets/Images/BottomTab/selectedHome.png'),
    },
    {
      name: 'Add',
      image: require('../assets/Images/BottomTab/PlusRed.png'),
    },
    {
      name: 'Search',
      image: require('../assets/Images/BottomTab/searchWhite.png'),
      selectedImage: require('../assets/Images/BottomTab/selectedSearch.png'),
    },
    {
      name: 'Profile',
      image: require('../assets/Images/BottomTab/user.png'),
      selectedImage: require('../assets/Images/BottomTab/selectedPerson.png'),
    },
  ];
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Star"
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'red',
        },
      }}
      tabBar={props => {
        // console.log(props);
        return (
          <View
            style={{
              backgroundColor: '#1A1A1A',
              widht: wp(100),
              height: hp(8),
              flexDirection: 'row',
            }}>
            {bottomTabData.map((item, index) =>
              item.name === 'Add' ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: hp(-3),
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => props.navigation.navigate('VedioRecoder')}>
                      <Image
                        source={require('../assets/Images/BottomTab/addFullBtn.png')}
                        style={{
                          height: wp(18),
                          width: wp(18),
                          resizeMode: 'cover',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate(item.name)}>
                    <NeomorphFlex
                      inner
                      lightShadowColor="#000000"
                      darkShadowColor="#FFFFFF"
                      style={{
                        shadowOffset: {width: 2, height: 2},
                        shadowRadius: 2.5,
                        shadowOpacity: 0.3,
                        borderRadius: 10,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: wp(3.5),
                        }}>
                        <Image
                          style={{
                            width: wp(5),
                            height: wp(5),
                            resizeMode: 'contain',
                          }}
                          source={
                            props.state.index === index
                              ? item.selectedImage
                              : item.image
                          }
                        />
                      </View>
                    </NeomorphFlex>
                  </TouchableOpacity>
                </View>
              ),
            )}
          </View>
        );
      }}>
      <Tab.Screen
        name="Star"
        component={Star}
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Home"
        component={NewHome}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Add"
        component={addScreen}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="Wallet"
        component={Wallet}
      />
      <Tab.Screen
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        name="FeedContest"
        component={FeedContest}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  NeomorphContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.9,
    // backgroundColor: '#1A1A1A
    height: hp(18),
  },
  NeomorphStyle: {
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    backgroundColor: 'transparent',
    height: hp(18),
    paddingHorizontal: wp(4),
  },
});
