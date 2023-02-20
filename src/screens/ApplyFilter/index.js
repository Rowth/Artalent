import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import Slider from 'react-native-slider';
import {useDispatch, useSelector} from 'react-redux';
import {Helper, Axios, URL} from '@config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TextInput,
  InputText,
  HeadWrapper,
  Header,
  SliderComponent,
} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
  brightness,
  ColorTone,
  Temperature,
  temperature,
  tint,
  hueRotate,
  sepia,
  cool,
  warm,
  technicolor,
  polaroid,
  toBGR,
  kodachrome,
  browni,
  vintage,
  protanomaly,
  deuteranomaly,
  tritanomaly,
  protanopia,
} from 'react-native-image-filter-kit';

const ApplyFilter = props => {
  const {navigation, route} = props;
  const [brightnesss, setBrightnesss] = useState(1);
  const [brightnessVal, setBrightnessVal] = useState('');
  const [contrasts, setContrasts] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [temperatureS, setTempratureS] = useState(0);
  const [tintS, setTintS] = useState(0.0);
  const [hue, setHue] = useState(0.0);
  const [filter, setFilter] = useState(0.5);
  const [sepiaS, setSepias] = useState(0.0);
  const [methodname, setMethodName] = useState('');
  const [tabStatus, setTabStatus] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('none');
  const dispatch = useDispatch();

  const [screenFilters, setScreenFilters] = useState([
    {key: '0', data: 'None'},
    {
      key: '1',
      data: 'Invert',
    },
    {
      key: '2',
      data: 'Warm',
    },
    {
      key: '3',
      data: 'Cool',
    },
    {
      key: '4',
      data: 'Technicolor',
    },
    {
      key: '5',
      data: 'Polaroid',
    },
    {
      key: '6',
      data: 'ToBGR',
    },
    {
      key: '7',
      data: 'Kodachrome',
    },
    {
      key: '8',
      data: 'Brownie',
    },
    {
      key: '9',
      data: 'Vintage',
    },

    {
      key: '10',
      data: 'Protanomaly',
    },

    {
      key: '11',
      data: 'Deuteranomaly',
    },

    {
      key: '12',
      data: 'Tritanomaly',
    },

    {
      key: '13',
      data: 'Protanopia',
    },
  ]);
  const getFilter = activeTab => {
    if (activeTab === 'cool') {
      return cool();
    } else if (activeTab === 'Warm') {
      return warm();
    } else if (activeTab === 'Invert') {
      return invert();
    } else if (activeTab === 'Technicolor') {
      return technicolor();
    } else if (activeTab === 'Polaroid') {
      return polaroid();
    } else if (activeTab === 'ToBGR') {
      return toBGR();
    } else if (activeTab === 'Kodachrome') {
      return kodachrome();
    } else if (activeTab === 'Brownie') {
      return browni();
    } else if (activeTab === 'Vintage') {
      return vintage();
    } else if (activeTab === 'Protanomaly') {
      return protanomaly();
    } else if (activeTab === 'Deuteranomaly') {
      return deuteranomaly();
    } else if (activeTab === 'Tritanomaly') {
      return tritanomaly();
    } else if (activeTab === 'Protanopia') {
      return protanopia();
    } else if (activeTab === 'None') {
      return saturate(saturation);
    } else {
      return saturate(saturation);
    }
  };
  console.log(props);
  useEffect(() => {}, [props]);
  const postStory = async imageUrl => {
    console.log([imageUrl]);
    let body = new FormData();
    body.append('image[]', imageUrl);
    const res = await Axios({
      method: 'post',
      url: URL.POST_STORY,
      data: {
        image: [imageUrl],
      },
    });
    if (res?.data?.status === 200) {
      navigation.navigate('Home');
      Alert.alert('Story Added');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('can,t add story');
    }
  };
  return (
    <View style={{backgroundColor: '#1A1A1A', flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Edit'}
        rightIcon={require('../../assets/Images/SelectInterest/check.png')}
        onClickRightIcon={async () => {
          const jsonValue = await AsyncStorage.getItem('postData');
          const res = jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(res, 'vcvcvpostdat', route.params);
          if (route.params?.path === 'AddPost') {
            if (editedImage) {
              const {data, uri, path} = route.params;

              try {
                const rmData = JSON.stringify({
                  ...res,
                  imgUrlData: res.imgUrlData.map(oldItem =>
                    oldItem.fileName === data.fileName
                      ? {...oldItem, uri: editedImage}
                      : oldItem,
                  ),
                });
                await AsyncStorage.setItem('postData', rmData);
                navigation.navigate('AddPost');
              } catch (e) {
                // saving error
                console.log(e);
              }
            }
          } else if (route.params?.path === 'NewHome') {
            console.log(editedImage, 'dj');
            const d1 = new Date();
            let imageName = d1.getTime();
            Alert.alert(
              'Are you sure you want to Add Story?',
              'Please Click Yes or No',
              [
                {
                  text: 'No',
                  onPress: () => console.log('No'),
                  style: 'cancel',
                },

                {
                  text: 'Yes',
                  onPress: async () => {
                    const awsRes = await Helper.sendAwsBucket(
                      {
                        uri: editedImage,
                        fileName: imageName,
                        type: 'image/png',
                      },
                      'image',
                    );
                    console.log(awsRes);
                    if (awsRes.status === 201) {
                      console.log(awsRes);
                      postStory(awsRes.body.postResponse.location);
                    } else {
                      console.log('aws error');
                    }
                  },
                },
              ],
            );
          } else {
            if (res !== null && res.imgUrlData) {
              let value = {};
              value.caption = res.caption;
              value.imgUrlData = [
                ...res.imgUrlData,
                {
                  fileName: Date.now().toString() + Math.random().toString(),
                  uri: editedImage,
                  type: 'image/jpeg',
                },
              ];
              try {
                const jsonValue = JSON.stringify(value);
                AsyncStorage.setItem('postData', jsonValue).then(dat => {
                  console.log(dat);
                  navigation.replace('AddPost');
                });
              } catch (e) {
                // saving error
                console.log(e);
              }
            } else {
              let value = {};
              value.caption = '';
              value.imgUrlData = [
                {
                  fileName: Date.now().toString() + Math.random().toString(),
                  uri: editedImage,
                  type: 'image/jpeg',
                },
              ];
              try {
                const jsonValue = JSON.stringify(value);
                const resSetPost = await AsyncStorage.setItem(
                  'postData',
                  jsonValue,
                );
                console.log(resSetPost);
                navigation.navigate('AddPost');
              } catch (e) {
                // saving error
                console.log(e);
              }
            }
          }
        }}
        centerTextStyle={{paddingLeft: wp(1), fontWeight: '500'}}
      />
      <ColorMatrix
        extractImageEnabled={true}
        matrix={concatColorMatrices([
          saturate(saturation),
          contrast(contrasts),
          brightness(brightnesss),
          temperature(temperatureS),
          tint(tintS),
          hueRotate(hue),
          sepia(sepiaS),

          getFilter(tabStatus),
        ])}
        onExtractImage={({nativeEvent}) => [
          //   dispatch(['save-photo', nativeEvent.uri]),
          console.log(nativeEvent.uri),
          setEditedImage(nativeEvent.uri),
        ]}
        image={
          <Image
            resizeMode="contain"
            style={{width: wp(100), height: wp(45)}}
            source={{
              uri: route.params.url,
            }}
          />
        }></ColorMatrix>
      <ScrollView>
        <View style={{backgroundColor: '#1A1A1A'}}>
          {/* <SliderComponent value={brightnesss} valueSet={brightnesss} /> */}
          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Brightness'}
            </Text>
            <Slider
              key={'sliderForBrightness'}
              value={brightnesss / 2}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setBrightnesss(value * 2);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>

          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Contrast'}
            </Text>
            <Slider
              key={'sliderForContrast'}
              value={contrasts / 2}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setContrasts(value * 2);
                console.log(contrast);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>

          <View>
            <Text style={{color: 'white', marginTop: wp(3), marginLeft: wp(4)}}>
              {'Saturation'}
            </Text>
            <Slider
              key={'sliderForSaturation'}
              value={saturation / 2}
              minimumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              maximumTrackTintColor={'#EB5757'}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setSaturation(value * 2);
                console.log(saturation);
              }}
              thumbTouchSize={{
                width: wp(10),
                height: wp(10),
              }}
            />
          </View>

          {/* <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Filter '}
            </Text>
            <Slider
              key={'sliderForFilter'}
              value={filter / 2}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setFilter(value * 2);
                console.log(filter);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View> */}
          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Temperature '}
            </Text>
            <Slider
              key={'sliderForTemprature'}
              value={temperatureS * 2}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setTempratureS(value / 2);
                console.log(value);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Tint'}
            </Text>
            <Slider
              key={'sliderForTint'}
              value={tintS}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setTintS(value);
                console.log(tintS);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Hue'}
            </Text>
            <Slider
              key={'sliderForHue'}
              value={hue}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              onSlidingComplete={value => {
                setHue(value);
                console.log(hue);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                marginTop: wp(3),
                marginHorizontal: wp(4),
              }}>
              {'Sepia '}
            </Text>
            <Slider
              key={'sliderForsepias'}
              value={sepiaS}
              minimumTrackTintColor={'#EB5757'}
              maximumTrackTintColor={'#EB5757'}
              style={{marginHorizontal: wp(4), borderRadius: 100}}
              trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
              thumbTintColor={'#EB5757'}
              // thumbImage={require('../../assets/Images/ApplyFilter/sliderBtn.png')}
              thumbStyle={{
                borderWidth: wp(2),
                borderColor: '#2A2A2A',
                borderRadius: 100,
                padding: wp(2),
              }}
              // thumbStyle={{resizeMode: 'contain'}}
              onSlidingComplete={value => {
                setSepias(value);
                console.log(sepia);
              }}
              thumbTouchSize={{width: wp(10), height: wp(10)}}
            />
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={screenFilters}
          style={{paddingBottom: wp(5)}}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setTabStatus(item.data);
                }}>
                <ImageBackground
                  imageStyle={
                    {
                      // borderRadius: wp(5),
                      // margin: wp(2),
                    }
                  }
                  // source={{
                  //   uri: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                  // }}>
                >
                  <View
                    style={{
                      marginHorizontal: wp(2),
                      alignItems: 'center',
                    }}>
                    <ColorMatrix
                      matrix={concatColorMatrices([getFilter(item.data)])}
                      style={{height: wp(20), width: wp(20)}}
                      image={
                        <Image
                          style={{
                            height: wp(20),
                            width: wp(20),
                            borderRadius: wp(2),
                            opacity: tabStatus === item.data ? 0.3 : 1,
                          }}
                          source={{
                            uri: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                          }}
                        />
                      }></ColorMatrix>
                    <Text
                      style={{
                        color: tabStatus === item.data ? 'red' : 'white',
                        fontSize: wp(3),
                      }}>
                      {item.data}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};
export default ApplyFilter;
