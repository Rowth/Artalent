import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header, SmallColorButton, Loader} from '@components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Axios, URL, Helper, tokenInvalid} from '@config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import styles from './styles';
// import PhotoEditor from '@baronha/react-native-photo-editor';

const AddPost = props => {
  const {navigation, route} = props;
  console.log(route);
  const [imgUrlData, setImgUrlData] = useState([]);
  const [userData, setUserData] = useState({});
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const getUserData = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    // console.log(res, 'vcvcv');
    if (res !== null) {
      setUserData(res.user_data);
    }
  };
  const getPostData = async () => {
    const jsonValue = await AsyncStorage.getItem('postData');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcvpostdat');
    if (res !== null) {
      setImgUrlData(res.imgUrlData);
    }
  };
  const saveDataInLocal = async () => {
    console.log('saved', caption);
    let value = {};
    value.caption = caption;
    value.imgUrlData = [...imgUrlData];
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('postData', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const sendDataAws = async () => {
    setIsLoading(true);
    let finalRes = [];
    console.log(imgUrlData);
    const AllResAws = imgUrlData.map(item =>
      Helper.sendAwsBucket(item, 'image'),
    );
    Promise.all(AllResAws)
      .then(res => {
        console.log(res);
        res.forEach(resData => {
          if (resData.status === 201) {
            finalRes.push(resData.body.postResponse.location);
          }
        });
        if (finalRes.length === imgUrlData.length) {
          uploadPost(finalRes, navigation);
        } else {
          uploadPost([]);
        }
      })
      .catch(err => {
        console.log('error in aws sending', err);
      });
  };
  const uploadPost = async (data, navigation) => {
    console.log('uploading', data);
    if (caption !== '') {
      if (data.length > 0) {
        const res = await Axios({
          method: 'post',
          url: URL.ADD_USER_POST,
          data: {
            caption: caption,
            images: data,
          },
        });
        if (res?.data?.status === 200) {
          setIsLoading(false);
          Alert.alert(res.data.message);
          setImgUrlData([]);
          setCaption('');
          navigation.navigate('Home');
          try {
            await AsyncStorage.removeItem('postData');
          } catch (e) {
            // remove error
          }
        } else if (res?.data?.status === 401) {
          setIsLoading(false);
          tokenInvalid({navigation});
        } else {
          setIsLoading(false);
          Alert.alert(res.data.message);
        }
      } else {
        setIsLoading(false);
        Alert.alert('Some Error Occured!');
      }
    } else {
      setIsLoading(false);
      Alert.alert('Caption Required');
    }
  };

  const getimgFromGallery = async () => {
    const imageRes = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    console.log(imageRes);

    // setImageUri(res.assets[0].uri);
    if (imageRes?.path) {
      navigation.replace('ApplyFilter', {url: imageRes.path});
    }

    return 1;
    // const imageRes = await launchImageLibrary({
    //   mediaType: 'mixed',
    //   videoQuality: 'high',
    //   quality: 1,
    //   durationLimit: 1000,
    //   height: 400,
    //   width: 400,
    //   selectionLimit: 5,
    // });
    // console.log(!imageRes.didCancel);
    // if (imageRes.didCancel) {
    //   console.log('User cancelled image picker');
    // } else {
    //   console.log(imageRes);
    //   const imgData = await PhotoEditor.open({path: imageRes.assets[0].uri});
    //   const jsonValue = await AsyncStorage.getItem('postData');
    //   const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    //   console.log(res, 'vcvcvpostdat');
    //   if (res !== null && res.imgUrlData) {
    //     let value = {};
    //     value.caption = res.caption;
    //     const newImgData = [
    //       ...res.imgUrlData,
    //       {
    //         fileName: Date.now().toString() + Math.random().toString(),
    //         uri: imgData,
    //         type: 'image/jpeg',
    //       },
    //     ];
    //     value.imgUrlData = newImgData;
    //     try {
    //       const jsonValue = JSON.stringify(value);
    //       await AsyncStorage.setItem('postData', jsonValue);
    //       setImgUrlData(newImgData);
    //     } catch (e) {
    //       // saving error
    //       console.log(e);
    //     }
    //   } else {
    //     let value = {};
    //     value.caption = '';
    //     const newImgData = [
    //       ...res.imgUrlData,
    //       {
    //         fileName: Date.now().toString() + Math.random().toString(),
    //         uri: imgData,
    //         type: 'image/jpeg',
    //       },
    //     ];
    //     value.imgUrlData = newImgData;
    //     try {
    //       const jsonValue = JSON.stringify(value);
    //       await AsyncStorage.setItem('postData', jsonValue);
    //       setImgUrlData(newImgData);
    //     } catch (e) {
    //       // saving error
    //       console.log(e);
    //     }
    //   }
    //   // navigation.navigate('ViewImage', {url: imgData});
    //   console.log(imgData);
    // }
  };
  const getPic = async () => {
    const imageRes = await launchCamera({
      mediaType: 'mixed',
      videoQuality: 'high',
      quality: 1,
      durationLimit: 1000,
      height: 400,
      width: 400,
    });
    console.log(imageRes);
    if (imageRes.didCancel) {
      console.log('User cancelled image picker');
    } else {
      // setImageUri(res.assets[0].uri);
      console.log(imageRes);
      // const awsRes = await Helper.sendAwsBucket(imageRes, 'image');
      // if (awsRes.status === 201) {
      //   console.log(awsRes);
      //   postStory(awsRes.body.postResponse.location);
      // }
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('onFocus call');
      getUserData();
      getPostData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{backgroundColor: '#1A1A1A'}}>
      {isLoading && <Loader backgroundColor="transparent" />}
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() =>
          navigation.navigate('CameraEditor', {Back: 'pressed'})
        }
        centerText={'Add Post'}
        centerTextStyle={{}}
      />

      <ScrollView style={{flexGrow: 1, backgroundColor: '#1A1A1A'}}>
        <View style={styles.bodyStyle}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp(2),
                paddingHorizontal: wp(2),
              }}>
              {/* <View> */}
              <Image
                style={{width: wp(15), height: wp(15), borderRadius: wp(7.5)}}
                source={{
                  uri:
                    userData.image !== null
                      ? userData.image
                      : 'https://media.istockphoto.com/photos/successful-businesswoman-picture-id1297832789?b=1&k=20&m=1297832789&s=170667a&w=0&h=5sBCKhENkSE2179jIyZX5yv4O9SFQ2SHWw0DZPcoqd4=',
                }}
              />
              <View style={{paddingLeft: wp(2)}}>
                <Text style={{fontSize: wp(3.5), color: '#FFFFFF'}}>
                  {userData.first_name}
                </Text>
                <Text style={{fontSize: wp(3), color: '#FFFFFF', opacity: 0.5}}>
                  {'@' + userData.username}
                </Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Neomorph
              inner
              swapShadows
              darkShadowColor="#000000"
              lightShadowColor="#F2F2F2"
              style={styles.NeomorphContainer}>
              <FlatList
                nestedScrollEnabled
                numColumns={2}
                data={[...imgUrlData, {isAddPost: true}]}
                renderItem={({item, index}) =>
                  item.isAddPost ? (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <View
                        style={{
                          height: wp(40),
                          width: wp(40),
                          margin: '2%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{
                            height: wp(10),
                            width: wp(10),
                          }}
                          source={require('../../assets/Images/AddPost/add.png')}
                        />
                        <Text style={{color: '#828282'}}>Add image</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        width: '50%',
                        marginHorizontal: wp(1),
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 100,
                          right: 0,
                          top: -10,
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            const jsonValue = await AsyncStorage.getItem(
                              'postData',
                            );
                            const res =
                              jsonValue != null ? JSON.parse(jsonValue) : null;
                            try {
                              const rmData = JSON.stringify({
                                ...res,
                                imgUrlData: res.imgUrlData.filter(
                                  oldItem => oldItem.fileName != item.fileName,
                                ),
                              });
                              await AsyncStorage.setItem('postData', rmData);

                              setImgUrlData(
                                imgUrlData.filter(
                                  oldItem => oldItem.fileName != item.fileName,
                                ),
                              );
                            } catch (e) {
                              // saving error
                              console.log(e);
                            }
                          }}>
                          <Image
                            style={{
                              height: wp(15),
                              width: wp(15),
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/Images/AddPost/addcross.png')}></Image>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={async () => {
                          navigation.navigate('ApplyFilter', {
                            url: item.uri,
                            data: item,
                            path: 'AddPost',
                          });
                          return 1;
                          console.log(imgUrlData);
                          // const imgData = await PhotoEditor.open({
                          //   path: item.uri,
                          // });
                          // if (imgData) {
                          //   const dData = imgUrlData.map(itemx => {
                          //     console.log(itemx.uri === item.uri, imgData);

                          //     if (itemx.uri === item.uri) {
                          //       return {...item, uri: imgData};
                          //     } else {
                          //       return itemx;
                          //     }
                          //   });
                          //   console.log(dData, imgData);
                          //   setImgUrlData(dData);
                          // }
                        }}>
                        <Image
                          style={{
                            height: wp(40),
                            width: wp(40),
                            margin: wp(1),
                            resizeMode: 'cover',
                          }}
                          source={{uri: item.uri}}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }
              />
            </Neomorph>
          </View>
          <View style={{alignItems: 'center'}}>
            <Neomorph
              inner
              darkShadowColor="#000000"
              lightShadowColor="#F2F2F2"
              swapShadows
              style={styles.NeomorphContainerComment}>
              <View
                style={{
                  textAlign: 'left',
                  color: '#828282',
                  padding: wp(3),
                  flex: 1,
                }}>
                <TextInput
                  value={caption}
                  onChangeText={text => setCaption(text)}
                  placeholder="What’s on your mind?"
                  placeholderTextColor={'#828282'}
                  style={{color: 'white'}}
                />
              </View>
            </Neomorph>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: hp(15),
            }}>
            <SmallColorButton
              onPress={() => {
                if (caption !== '') {
                  sendDataAws();
                } else {
                  Alert.alert('Caption Required!');
                }
              }}
              buttonColor="#219653"
              buttonText={'Post'}></SmallColorButton>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        animationType="slide"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onModalHide={() => {}}
        // propagateSwipe={true}

        styles={{
          height: hp(30),
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
        }}
        swipeDirection="down">
        <View
          key="#start"
          style={{
            alignItems: 'center',
            zIndex: 100,
            backgroundColor: 'transparent',
          }}>
          <View></View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#AB0404',
              height: hp(24),
              width: wp(85),
              borderRadius: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  saveDataInLocal();
                  setModalVisible(false);
                  navigation.navigate('CameraEditor');
                }}
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: wp(9), width: wp(9)}}
                  source={require('../../assets/Images/Home/camera.png')}
                />
                <Text style={{fontSize: wp(2.5), color: '#FFFFFF'}}>
                  Take a Picture
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: hp(22),
                width: wp(0.12),
                backgroundColor: 'white',
              }}></View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  saveDataInLocal();
                  setModalVisible(false);
                  getimgFromGallery();
                }}
                style={{alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  style={{height: wp(9), width: wp(9)}}
                  source={require('../../assets/Images/Home/gallery.png')}
                />
                <Text style={{fontSize: wp(2.5), color: '#FFFFFF'}}>
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddPost;
