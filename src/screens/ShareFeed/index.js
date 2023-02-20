import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  NativeEventEmitter,
} from 'react-native';
import {RNS3} from 'react-native-aws3';
import {Video as CompVideo} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import styles from './styles';
// import {createThumbnail} from 'react-native-create-thumbnail';
import CheckBox from 'react-native-check-box';
import {Header} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios, URL, KEY, Helper, Loader} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {FlatList} from 'react-native-gesture-handler';

const ShareFeed = props => {
  const {navigation, route} = props;
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [contestData, setContestData] = useState([]);
  const [myContestArr, setMyContestArr] = useState([]);
  const [userId, setUserId] = useState(null);
  const [alertCheck, setAlertCheck] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [thumbLink, setThumbLink] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [captionlength, setCaptionLenght] = useState(0);

  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(data);
      if (data !== null) {
        setUserId(data?.user_data?.id);
        getContestDetails();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const saveToGallery = vedio => {
    var path = RNFS.DownloadDirectoryPath;
    console.log(path + '    ' + route.params.videoUrl);
    RNFS.writeFile(path, route.params.videoUrl)
      .then(success => {
        console.log('FILE WRITTEN!' + path);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const videoUploadOnAws = async video => {
    const sendAws = await Helper.sendAwsBucket(video, 'image');
    if (sendAws.status === 201) {
      return sendAws.headers.Location;
    }
    console.log(sendAws);
  };

  const checkFields = () => {
    let validateStatus = true;
    let contestActiveData = [];
    contestData.forEach(item => {
      if (item.checked) {
        contestActiveData.push(item.id);
      }
    });
    if (title === '') {
      validateStatus = false;
    } else if (caption === '') {
      validateStatus = false;
    } else if (contestActiveData.length === 0) {
      validateStatus = false;
    }
    return validateStatus;
  };
  const compressVideo = sourceUri => {
    console.log('  compressVideo  ++++', route.params.videoUrl);
    RNFFmpeg.execute(
      `-i ${route.params.videoUrl} -c:v mpeg4 resultimage.\mp4`,
    ).then(result => {
      console.log(result);
    });
  };
  const saveToDraft = async () => {
    const awsRes = await Helper.sendAwsBucket(videoData, 'image');
    const videoUrl = awsRes.headers.location;
    console.log(videoUrl);
    let body = {
      draft: videoUrl,
    };
    const res = await Axios({
      method: 'post',
      url: URL.ADD_DRAFT,
      data: body,
    });
    if (res?.data?.status === 200) {
      setApiLoading(false);
      Alert.alert('draft added Successfully', '', [
        {
          text: 'ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
      setApiLoading(false);
    } else {
      console.log('server error');
      setApiLoading(false);
    }
  };
  const uploadFeed = async () => {
    console.log('reached', videoData);
    setApiLoading(true);
    let contestActiveData = contestData
      .filter(item => item.checked)
      .map(itemx => itemx.id);
    let videoUrl = '';
    if (route.params.path !== 'Draft') {
      const awsRes = await Helper.sendAwsBucket(videoData, 'image');
      videoUrl = awsRes.headers.location;
      console.log(videoUrl.replace('%2F', '/'), 'reached 2');
    } else {
      videoUrl = route.params.videoUrl;
    }
    // const result = await CompVideo.compress(
    //   videoUrl,
    //   {
    //     compressionMethod: 'auto',
    //   },
    //   progress => {
    //     if (backgroundMode) {
    //       console.log('Compression Progress: ', progress);
    //     } else {
    //       setCompressingProgress(progress);
    //     }
    //   },
    // );
    console.log(videoUrl, 'upload url');
    let body = {
      feed: videoUrl.replace('%2F', '/'),
      title: title,
      caption: caption,
      mycontest: contestActiveData,
    };
    const res = await Axios({
      method: 'post',
      url: URL.UPLOAD_USER_FEED,
      data: body,
    });
    if (res?.data?.status === 200) {
      getContestDetails();
      setApiLoading(false);
      saveToGallery(videoData);
      Alert.alert('Feed added successfully', '', [
        {
          text: 'ok',
          onPress: () => navigation.goBack(),
        },
      ]);

      // navigation.navigate('FeedContest');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
      setApiLoading(false);
    } else {
      console.log('Error,please try again');
      setApiLoading(false);
    }

    // setApiLoading(false);
  };
  const getContestDetails = async () => {
    const res = await Axios({
      method: 'get',
      url: `${URL.GET_USER_CONTESTS}?user_id=${userId}`,
    });
    if (res?.data?.status === 200) {
      setContestData(res?.data?.data.map(item => ({...item, checked: false})));
    } else if (res?.data?.status === 202) {
      setAlertCheck(true);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const setToggleCheckBox = id => {
    setContestData(
      contestData.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const onPost = () => {
    if (contestData.length > 0) {
      console.log('post');
      if (checkFields()) {
        if (route.params.path === 'Draft') {
          Alert.alert('do you want to post video', 'yes or no', [
            {
              text: 'No',
              onPress: () => console.log('NO'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => uploadFeed(),
              style: 'cancel',
            },
          ]);
          2;
        } else if (route.params.path === 'vedioRecoder') {
          Alert.alert('Do you want to post video', 'yes or no', [
            {
              text: 'Save to draft',
              onPress: () => saveToDraft(),
              style: 'cancel',
            },
            {
              text: 'No',
              onPress: () => console.log('NO POst'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => uploadFeed(),

              style: 'cancel',
            },
          ]);
        }
      } else {
        Alert.alert('Enter Valid Data!');
      }
    } else {
      Alert.alert('firstly register contest!');
    }
  };
  console.log(props, 'file://' + route.params.videoUrl);
  useEffect(() => {
    getData('Auth');
  }, [userId]);
  useEffect(() => {
    const d1 = new Date();
    setVideoData({
      type: 'video/mp4',
      uri: route.params.videoUrl,
      fileName: d1.getTime().toString(),
    });

    // createThumbnail({
    //   url: route.params.videoUrl,
    //   timeStamp: 1000,
    // })
    //   .then(response => {
    //     console.log(response);
    //     setThumbLink(response.path);
    //   })
    //   .catch(err => console.log({err}));
  }, []);
  console.log(contestData);
  return apiLoading === true ? (
    <ActivityIndicator
      style={{backgroundColor: '#1A1A1A', flex: 1}}
      size={'large'}
    />
  ) : (
    <SafeAreaView style={styles.bodyStyle}>
      <View>
        <Header
          // leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerText={'Share'}
          centerTextStyle={{paddingLeft: wp(2)}}
          // onClickLeftIcon={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Video
              useTextureView={false}
              playInBackground={false}
              disableFocus={false}
              muted={true}
              paused={false}
              loop={true}
              controls={true}
              controller={true}
              resizeMode="cover"
              selectedVideoTrack={{
                type: 'resolution',
                value: 50,
              }}
              source={{
                uri: route.params.videoUrl,
              }}
              // Can be a URL or a local file.
              // ref={ref => {
              //   this.player = ref;
              // }} // Store reference
              bufferConfig={{
                bufferForPlaybackMs: 1000,
                maxBufferMs: 5000,
              }}
              // onBuffer={this.onBuffer} // Callback when remote video is buffering
              // onError={this.videoError} // Callback when video cannot be loaded
              // style={{height: hp(60), margin: wp(3)}}
              style={{height: wp(90), width: wp(70)}}
            />

            <View style={{alignItems: 'center'}}>
              <Neomorph
                inner
                darkShadowColor="#000000"
                lightShadowColor="#F2F2F2"
                swapShadows
                style={styles.NeomorphContainerTitle}>
                <TextInput
                  value={title}
                  onChangeText={text => setTitle(text)}
                  placeholder="Title"
                  placeholderTextColor={'#828282'}
                  style={{
                    color: 'white',
                    padding: 0,
                    margin: 0,
                    paddingHorizontal: wp(3),
                  }}
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
                    flex: 3,
                    textAlign: 'left',

                    padding: wp(2),
                    flexDirection: 'column',
                  }}>
                  <TextInput
                    value={caption}
                    onChangeText={text => {
                      text.length < 300 ? setCaption(text) : null,
                        text.length < 300
                          ? setCaptionLenght(text.length)
                          : setCaptionLenght('300');
                    }}
                    placeholder="Caption"
                    placeholderTextColor={'#828282'}
                    style={{color: 'white'}}
                    multiline={true}
                    maxlength={wp(10)}
                  />
                </View>
                <View
                  style={{
                    fontSize: wp(2),
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    width: wp(80),
                    marginBottom: wp(2),
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: 'white', textAlign: 'right'}}>
                    {captionlength + '/'}
                  </Text>
                  <Text style={{color: 'white'}}>{300 - captionlength}</Text>
                </View>
              </Neomorph>
            </View>
            <View
              style={{
                width: '100%',

                paddingLeft: wp(10),
                marginTop: wp(4),
              }}>
              <Text style={{color: 'white'}}>My Contest</Text>
            </View>
            <View style={{alignItems: 'center', marginBottom: hp(10)}}>
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
                    padding: wp(2),
                    flex: 1,
                  }}>
                  <FlatList
                    nestedScrollEnabled={true}
                    data={contestData}
                    showsVerticalScrollIndicator={false}
                    style={{width: '100%'}}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => (
                      <View
                        style={{
                          width: '100%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: wp(2),
                            paddingVertical: wp(2),
                          }}>
                          <Text
                            style={{
                              fontSize: wp(4),
                              color:
                                item.contest_type === 'Special'
                                  ? '#F9C013'
                                  : '#EB5757',
                            }}>
                            {item.category + ' | ' + item.district}
                          </Text>
                          <CheckBox
                            disabled={false}
                            isChecked={item.checked}
                            onClick={newValue => setToggleCheckBox(item.id)}
                            checkedImage={
                              <Image
                                resizeMode={'contain'}
                                style={{
                                  height: wp(5),
                                  width: wp(5),
                                }}
                                source={require('../../assets/Images/FeedContest/checked.png')}
                              />
                            }
                            unCheckedImage={
                              <Image
                                resizeMode={'contain'}
                                style={{
                                  height: wp(5),
                                  width: wp(5),
                                }}
                                source={require('../../assets/Images/FeedContest/unchecked.png')}
                              />
                            }
                          />
                        </View>
                        <View
                          style={{
                            width: wp(100),
                            height: wp(0.3),
                            backgroundColor: 'black',
                          }}></View>
                      </View>
                    )}
                  />
                </View>
              </Neomorph>
              <View style={{marginTop: hp(4), marginBottom: hp(-6)}}>
                <TouchableOpacity
                  onPress={async () => {
                    onPost();
                  }}>
                  <Image
                    style={{
                      width: wp(40),
                      height: wp(30),
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/Images/AddPost/post.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ShareFeed;
