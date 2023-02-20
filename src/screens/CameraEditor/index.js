import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS} from 'react-native-permissions';
// import PhotoEditor from '@baronha/react-native-photo-editor';
import {ImageButton, SmallButton, Loader} from '@components';
const CameraEditor = props => {
  const {navigation, route} = props;
  let cam = useRef(null);
  console.log(route);

  const checkStack = async routex => {
    if (routex.Back === 'pressed') {
      console.log('reached');
      const result = await AsyncStorage.removeItem('postData');
      console.log(result);
    }
    console.log('reached' + JSON.stringify(routex));
  };
  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const buttonData = [
    {key: 1, image: require('../../assets/Images/CameraEditor/CaretLeft.png')},
    {key: 2, image: require('../../assets/Images/CameraEditor/Arrow.png')},
    {key: 3, image: require('../../assets/Images/CameraEditor/aperture.png')},
    {key: 4, image: require('../../assets/Images/CameraEditor/colours.png')},
    {
      key: 5,
      image:
        flashMode === 'off'
          ? require('../../assets/Images/CameraEditor/bolt.png')
          : require('../../assets/Images/CameraEditor/flashOn.png'),
    },
  ];
  checkStack(route.params);
  const [imageUrl, setImageUrl] = useState(null);
  const getphoto = () => {
    const getCamera = async () => {};
    const devices = useCameraDevices();
    console.log(28, devices);
    const device = cameraType === 'back' ? devices?.back : devices?.front;
    if (device == null) return <Loader />;
    try {
      return (
        <View style={{flex: 1}}>
          {imageUrl === null ? (
            <Camera
              photo
              ref={cam}
              style={{flex: 1}}
              focusable={true}
              device={device}
              isActive={true}
              torch={flashMode}
              hdr={true}
              enableZoomGesture={true}
            />
          ) : (
            <ImageBackground
              style={{
                flex: 1,
                alignItems: 'flex-end',
                padding: wp(5),
              }}
              imageStyle={{resizeMode: 'contain'}}
              source={{uri: imageUrl}}>
              <TouchableOpacity
                onPress={() => {
                  setImageUrl(null);
                }}>
                <Image
                  style={{
                    height: wp(15),
                    width: wp(15),
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/Images/AddPost/addcross.png')}></Image>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
      );
    } catch (err) {
      return null;
    }
  };
  const clickPhoto = async () => {
    const photo = await cam.current.takePhoto({
      flash: flashMode,
    });
    if (photo.path) {
      ImagePicker.openCropper({
        path: 'file://' + photo.path,
        width: 500,
        height: 1000,
      }).then(image => {
        console.log(image);
        setImageUrl(image.path);
      });
    }
    console.log(photo.path);
  };

  const editPhoto = async () => {
    navigation.navigate('ApplyFilter', {
      url: imageUrl,
      path: route.params?.path,
    });

    return 1;

    // const imgData = await PhotoEditor.open({path: imageUrl});
    const jsonValue = await AsyncStorage.getItem('postData');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcvpostdat');
    if (res !== null && res.imgUrlData) {
      let value = {};
      value.caption = res.caption;
      value.imgUrlData = [
        ...res.imgUrlData,
        {
          fileName: Date.now().toString() + Math.random().toString(),
          uri: imgData,
          type: 'image/jpeg',
        },
      ];
      try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem('postData', jsonValue).then(dat => {
          console.log(dat);
          navigation.navigate('AddPost');
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
          uri: imgData,
          type: 'image/jpeg',
        },
      ];
      try {
        const jsonValue = JSON.stringify(value);
        const resSetPost = await AsyncStorage.setItem('postData', jsonValue);
        console.log(resSetPost);
        navigation.navigate('AddPost');
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
    // navigation.navigate('ViewImage', {url: imgData});
    console.log(imgData);
    navigation.navigate('AddPost', [{editPhoto: imgData}]);
  };

  console.log(cameraType);
  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            console.log(result);
            setCameraType('front');
            checkStack(route);
          });
        });
      });
    });
  }, []);

  console.log(imageUrl);
  return (
    <View style={{flex: 1, backgroundColor: '#1A1A1A'}}>
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
            <SmallButton
              width={14}
              height={6}
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
                  clickPhoto();
                } else if (item.key === 4) {
                  if (imageUrl !== null) {
                    editPhoto();
                  } else {
                    Alert.alert('please add Image');
                  }
                } else if (item.key === 5) {
                  flashMode === 'on' ? setFlashMode('off') : setFlashMode('on');
                }
              }}
              innerComponent={() => (
                <Image
                  style={{
                    width: wp(6),
                    height: wp(6),
                  }}
                  source={item.image}></Image>
              )}></SmallButton>
          </View>
        ))}
      </View>
    </View>
  );
};
export default CameraEditor;
