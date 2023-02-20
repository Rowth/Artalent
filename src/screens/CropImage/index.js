import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Crop = props => {
  const [uri, setUri] = useState(null);
  const {navigation, route} = props;
  console.log(props);
  const cropViewRef = useRef();
  useEffect(async () => {
    const status = await RNFS.exists(route.params.uri);
    console.log(status, 'file://' + route.params.uri);
    // setUri('file://' + route.params.uri);
  }, []);
  console.log(uri);
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', top: 10, right: 10, zIndex: 100}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.goBack()
            // launchImageLibrary(
            //   {
            //     mediaType: 'photo',
            //     quality: 1,
            //   },
            //   response => {
            //     console.log(response);
            //     setUri(response.assets[0].uri);
            //   },
            // );
            ImagePicker.openCropper({
              path: 'file://' + route.params.uri,
              width: 300,
              height: 400,
            }).then(image => {
              console.log(image);
            });
          }}>
          <Image
            source={{uri: 'file://' + route.params.uri}}
            style={{width: 80, height: 80}}></Image>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};
export default Crop;
