import React, {useEffect, useRef, useState, Platform} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  NativeModules,
  ImageBackground,
  Alert,
  NativeEventEmitter,
} from 'react-native';
import {Video as CompVideo} from 'react-native-compressor';
import {
  VESDK,
  VideoEditorModal,
  Configuration,
} from 'react-native-videoeditorsdk';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
// import {RNFFmpeg} from 'react-native-ffmpeg';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Axios, URL, tokenInvalid} from '@config';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ImageButton, SmallButton, Loader} from '@components';
const VedioRecoder = props => {
  const {navigation, route} = props;
  let cam = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [cameraStatus, setCameraStatus] = useState(false);
  const [musicData, setMusicData] = useState('');
  const {VideoEditor} = NativeModules;
  const [editClicked, setEditClicked] = useState(true);
  const [allMusic, setAllMusic] = useState(null);
  const [Configuration, setConfiguration] = useState({
    // Configure audio tool
    audio: {
      // Configure audio clip library
      categories: [
        // Create audio clip category with audio clips
        {
          identifier: 'example_audio_category_custom',
          name: 'Music List',
          items: [
            {
              // Override metadata to display title and artist
              identifier: 'example_audio_custom_danceharder' + 1,
              title: 'sream of the demon.mp3',
              artist: '',
              audioURI:
                'https://artalent1234.s3.amazonaws.com/uploads%2Fsream+of+the+demon.mp3',
            },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 2,
            //   title:
            //     'Kina - Can We Kiss Forever_ (Lyrics) ft. Adriana Proenza.mp3',
            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FKina+-+Can+We+Kiss+Forever_+%28Lyrics%29+ft.+Adriana+Proenza.mp3',
            // },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 3,
            //   title:
            //     'Gym Class Heroes_ Stereo Hearts ft. Adam Levine [OFFICIAL VIDEO].mp3',

            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FGym+Class+Heroes_+Stereo+Hearts+ft.+Adam+Levine+%5BOFFICIAL+VIDEO%5D.mp3',
            // },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 4,
            //   title:
            //     'The Script - Hall of Fame (Official Video) ft. will.i.am.mp3',
            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FThe+Script+-+Hall+of+Fame+%28Official+Video%29+ft.+will.i.am.mp3',
            // },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 5,
            //   title: 'Cartoon - On & On (Lyrics) feat. Daniel Levi.mp3',
            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FCartoon+-+On+%26+On+%28Lyrics%29+feat.+Daniel+Levi.mp3',
            // },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 6,
            //   title: 'Its My Life _ Sri Lankan Version _ Sandaru Sathsara.mp3',
            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FIts+My+Life+_+Sri+Lankan+Version+_+Sandaru+Sathsara.mp3',
            // },
            // {
            //   // Override metadata to display title and artist
            //   identifier: 'example_audio_custom_danceharder' + 7,
            //   title: 'Ali Zafar _ Jhoom (R&B mix) _ Lyrical Video.mp3',
            //   artist: '',
            //   audioURI:
            //     'https://artalent1234.s3.amazonaws.com/uploads%2FAli+Zafar+_+Jhoom+%28R%26B+mix%29+_+Lyrical+Video.mp3',
            // },
          ],
        },
      ],
    },
  });
  const eventListener = useRef(null);
  const buttonData = [
    {key: 1, image: require('../../assets/Images/CameraEditor/CaretLeft.png')},
    {key: 2, image: require('../../assets/Images/CameraEditor/Arrow.png')},
    {
      key: 3,
      image: cameraStatus
        ? require('../../assets/Images/CameraEditor/active.png')
        : require('../../assets/Images/CameraEditor/aperture.png'),
    },
    {key: 4, image: require('../../assets/Images/CameraEditor/colours.png')},
    {
      key: 5,
      image:
        flashMode === 'off'
          ? require('../../assets/Images/CameraEditor/bolt.png')
          : require('../../assets/Images/CameraEditor/flashOn.png'),
    },
  ];
  const processVideo = (videoUrl, callback) => {
    console.log('process vedio');
    const finalVideo = `${RNFS.CachesDirectoryPath}/${videoUrl}`;

    cacheResourcePath(videoUrl).then(rVideoUrl => {
      // const str_cmd = `-y -i ${rVideoUrl} -c:v libx264 -crf 28 -preset ultrafast  ${finalVideo}`;
      const str_cmd = `-y -i ${rVideoUrl} -vf scale=640:360 ${finalVideo}`;

      RNFFmpeg.execute(str_cmd).then(result => {
        if (result === 0) {
          RNFS.unlink(rVideoUrl);

          callback({
            videoPath: finalVideo,
          });
        }
      });
    });
  };
  const cacheResourcePath = async sourcePath => {
    const uriComponents = sourcePath;
    // console.log(uriComponents);
    console.log(sourcePath, 'szxdcfvgbhjn');

    const fileNameAndExtension = uriComponents[uriComponents.length - 1];

    const destPath = `${RNFS.DownloadDirectoryPath}/${fileNameAndExtension}`;

    await RNFS.copyFile(sourcePath, destPath);
    return destPath;
  };
  const GetMusic = async data => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_MUSIC,
    });
    if (res.data.status === 200) {
      console.log('here before setting data');
      if (res.data.music_list.length > 0) {
        setAllMusic(
          res.data.music_list.map((itemx, index) => ({
            identifier: 'example_audio_custom_danceharder' + itemx.id,
            title: itemx.name,
            artist: itemx.name,
            audioURI: itemx.uri,
          })),
        );

        const eventEmitter = new NativeEventEmitter(NativeModules.VideoEditor);
        eventListener.current = eventEmitter.addListener(
          'customEventName',
          event => {
            console.log(event, 'event'); // "someValue
            setVideoUrl(event);
            if (event != null) {
              // GetMusic(event);
              openEditor(
                event,
                res.data.music_list.map((itemx, index) => ({
                  identifier: 'example_audio_custom_danceharder' + itemx.id,
                  title: itemx.name,
                  artist: itemx.name,
                  audioURI: itemx.uri,
                })),
              );
            } else {
              Alert.alert('Compressed video not found');
            }
          },
        );

        // setConfiguration({
        //   // Configure audio tool
        //   audio: {
        //     // Configure audio clip library
        //     categories: [
        //       // Create audio clip category with audio clips
        //       {
        //         identifier: 'example_audio_category_custom',
        //         name: 'Music List',
        //         items: res.data.music_list.map((itemx, index) => ({
        //           identifier: 'example_audio_custom_danceharder' + itemx.id,
        //           title: itemx.name,
        //           artist: itemx.name,
        //           audioURI: itemx.uri,
        //         })),
        //       },
        //     ],
        //   },
        // });
      }

      console.log('here before setting data2');

      // created_at: '2022-06-11T10:09:20.000000Z';
      // id: 37;
      // name: 'Tut Tut Child - Gravity (feat. Isabel Higuero).mp3';
      // updated_at: '2022-06-11T10:09:20.000000Z';
      // uri: 'https://images123456.s3.amazonaws.com/upload%2FTut+Tut+Child+-+Gravity+%28feat.+Isabel+Higuero%29.mp3';
      // user_id: 104;
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };

  VESDK.unlockWithLicense({
    api_token: '_za6QZR1D6hJQRuJvujrEQ',
    app_identifiers: ['com.artalent'],
    available_actions: [],
    domains: ['https://api.photoeditorsdk.com'],
    enterprise_license: false,
    expires_at: null,
    features: [
      'camera',
      'library',
      'export',
      'whitelabel',
      'customassets',
      'adjustment',
      'filter',
      'transform',
      'audio',
      'trim',
      'composition',
      'videolibrary',
    ],
    issued_at: 1655296865,
    minimum_sdk_version: '1.0',
    owner: 'Fusionik productions ',
    platform: 'Android',
    products: ['vesdk'],
    version: '2.4',
    signature:
      'QpJAJB87pXoleK+uHZxfXn3lWTZjZNPbMuO0smdhCnqmrdlvcPnNq6RvSnSAiP/Dbwysp53keOdEeUGi0hhtLFemRBkc68Qrqs5I2cRv1ga0lv0Qeyr1ZL8qFibOFYbdpLD9MweGvucM1VhKnpMtIELAPUegibiYvZvZ97/drCA5CuiopqG+jstP3f0lz4CAOk9tF0Ix3+O0exl1TtIpQYc2XYRPrUbEZD0mz3V0AqrVR5bqTruiX6QOUVzh5MZDnPL8ogKiiEGLVadnfQm4q6HGWXNGOgkRKYr7gcjTCHQg2EVyTfbYWgzd1AGsK21ZPtGZM0EPJ20Ef35X07AMCMMKO0MtCBnLL+IpVRYryaXwq0Xbdr5xjnbz8ymzNTmfq/A0On3zvMwqRdSkj5mw5sMqQYVCX311gjAy7uddue4JSwI1JRyijFWAT1uLHexhMzxP5ohbJOtpTWgxWcGfQR8+QWpq5YtfWEsjrGKrG+ku7TpXd5qBljplV5KMbHAIkVz+xd5JwQHpEafKpO1vTybTwPUsl2cLKokBQraTwmjWekyDekS7gtE+lU/S5yQ7qoPsPJwq+uEPikntaSOn69ULodPL7Cg3Ps5k3n97Lxhvo7KSXfCm5keBnEJhqxFVKJK6qKLk1SGS6m21BMtFIiScz/nVeRJRHhTDbWi9WLk=',
  });

  const [videoUrl, setVideoUrl] = useState(null);
  const getphoto = () => {
    const getCamera = async () => {};
    const devices = useCameraDevices();
    console.log(28, devices);
    const device = cameraType === 'back' ? devices?.back : devices?.front;
    if (device == null) return <Loader />;
    try {
      return videoUrl ? (
        <View
          style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              index: -1,
            }}>
            <Video
              repeat={true}
              useTextureView={false}
              playInBackground={false}
              focusable={true}
              muted={false}
              paused={false}
              resizeMode="cover"
              controls={false}
              selectedVideoTrack={{
                type: 'resolution',
                value: 144,
              }}
              source={{
                uri: videoUrl,
              }}
              bufferConfig={{
                bufferForPlaybackMs: 1000,
                maxBufferMs: 5000,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                index: -1,
                padding: wp(5),
              }}
            />
          </View>
          <View style={{position: 'absolute', top: 10, right: 10, index: 100}}>
            <TouchableOpacity
              onPress={() => {
                setVideoUrl(null);
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
        </View>
      ) : (
        <Camera
          video={true}
          audio={true}
          ref={cam}
          style={{flex: 1}}
          device={device}
          isActive={true}
          torch={flashMode}
          hdr={false}
          fps={30}
          preset={'low'}
          enableHighQualityPhotos={false}
          enableZoomGesture={true}
        />
      );
    } catch (err) {
      return null;
    }
  };
  const clickVideo = async () => {
    setCameraStatus(!cameraStatus);

    if (cameraStatus) {
      const stopRes = await cam.current.stopRecording();
      console.log(stopRes);
      console.log('here 1');
    } else {
      cam.current.startRecording({
        flash: 'auto',

        onRecordingFinished: video => {
          console.log(video);
          setVideoUrl(video.path);
          processVideo(video.path);
          console.log('here 3');
        },

        onRecordingError: error => console.error(error),
      });
    }
    setTimeout(async () => {
      console.log('here in timeout');
      const stopRes = await cam.current.stopRecording();
      console.log(stopRes);
      setCameraStatus(false);
      console.log(cameraStatus);
    }, 30000);
  };
  const EditVideo = async () => {
    console.log(videoUrl);

    if (videoUrl) {
      const fileName = videoUrl.split('/')[videoUrl.split('/').length - 1];
      console.log(fileName, videoUrl);
      const dirPath = RNFS.CachesDirectoryPath;
      console.log(dirPath);
      const finl = await RNFS.exists(dirPath);
      console.log(finl, 'qwwqwqwwqwqwq');
      Alert.alert('your Video is being compressed you will be re-directed');
      VideoEditor.compressVideo(dirPath, fileName);

      // try {
      //   console.log('option');
      //   VESDK.openEditor(videoUrl, Configuration).then(res => {
      //     console.log(res, 'mm');
      //     navigation.navigate('ShareFeed', {
      //       videoUrl: res.video,
      //       path: 'vedioRecoder',
      //     });
      //     // setVideoUrl(res.video);
      //   });
      // } catch {
      //   console.log('unable to open sdk');
      // }
    } else {
      Alert.alert('Please Record Video!');
    }
  };
  const openEditor = async (data, music_List) => {
    console.log(data, 'open edior', Configuration, music_List);
    const configMusic = {
      // Configure audio tool
      audio: {
        // Configure audio clip library
        categories: [
          // Create audio clip category with audio clips
          {
            identifier: 'example_audio_category_custom',
            name: 'Music List',
            items: music_List,
          },
        ],
      },
    };
    try {
      VESDK.openEditor(data, configMusic).then(res => {
        console.log(res, 'mm');
        navigation.navigate('ShareFeed', {
          videoUrl: res.video,
          path: 'vedioRecoder',
        });
        // setVideoUrl(res.video);
      });
    } catch {
      console.log('unable to open sdk');
    }
  };
  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            console.log(result);
            setCameraType('front');
          });
        });
      });
    });
    GetMusic();
  }, []);
  useEffect(() => {
    return () => eventListener.current.remove();
  }, []);
  return isLoading === true ? (
    <View style={{flex: 1}}>
      <Loader backgroundColor={'#1A1A1A'} />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <View style={{flex: 6}}>
        <Image
          resizeMode={'cover'}
          style={{flex: 1}}
          source={{
            uri: imageUri,
          }}
        />
      </View> */}
        <View style={{flex: 1}}>
          {/* {imageUrl !== null ? (
          //
          <Text>{imageUrl}</Text>
        ) : (
          getphoto()
        )} */}
          {getphoto()}
        </View>
        <View
          style={{
            backgroundColor: '#1A1A1A',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),
          }}>
          {buttonData.map(item => (
            <View key={item.key}>
              {
                <SmallButton
                  width={14}
                  height={6}
                  resizeMode={'contain'}
                  borderRadius={20}
                  onPress={() => {
                    if (item.key === 1) {
                      console.log('djdjdj', navigation);
                      navigation.goBack();
                    } else if (item.key === 2) {
                      cameraType === 'back'
                        ? setCameraType('front')
                        : setCameraType('back');
                    } else if (item.key === 3) {
                      clickVideo();
                    } else if (item.key === 4) {
                      EditVideo();
                    } else if (item.key === 5) {
                      flashMode === 'on'
                        ? setFlashMode('off')
                        : setFlashMode('on');
                    }
                  }}
                  innerComponent={() =>
                    item.key === 3 ? (
                      <Image
                        style={{
                          alignItems: 'center',
                          width: cameraStatus ? wp(15) : wp(6),
                          height: cameraStatus ? wp(15) : wp(6),
                          resizeMode: 'contain',
                          marginRight: wp(1.5),
                        }}
                        source={item.image}></Image>
                    ) : (
                      <Image
                        style={{
                          width: wp(6),
                          height: wp(6),
                          resizeMode: 'cover',
                        }}
                        source={item.image}></Image>
                    )
                  }></SmallButton>
              }
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default VedioRecoder;
