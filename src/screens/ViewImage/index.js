import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';

export default function ViewImage(props) {
  const {navigation, route} = props;
  console.log(props);
  const musicUploadOnAws = async data => {
    const options = {
      keyPrefix: 'upload/',
      bucket: 'images123456',
      region: 'ap-south-1',
      accessKey: 'AKIAQ43UDM6HMGPHY7C6',
      secretKey: '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',
      successActionStatus: 201,
    };
    const file = {
      uri: data.uri,
      name: data.name,
      type: data.type,
    };

    try {
      const rest = await RNS3.put(file, options);
      //  return rest;
      console.log(rest);
    } catch (err) {
      console.log(err);
      //  return err;
    }
  };
  useEffect(() => {}, []);
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', top: 10, right: 10, zIndex: 100}}>
        <TouchableOpacity
          onPress={async () => {
            console.log('cmchandan', DocumentPicker);
            const response = await DocumentPicker.pickMultiple({
              presentationStyle: 'fullScreen',
              type: [types.audio],
              // allowMultiSelection: true,
            });
            musicUploadOnAws(response[0]);
            console.log(response);
            // navigation.goBack()
          }}>
          <Image
            source={require('../../assets/Images/AddPost/addcross.png')}
            style={{width: 80, height: 80}}></Image>
        </TouchableOpacity>
      </View>

      {/* <Image
        style={{width: '100%', height: '100%'}}
        source={{uri: props.route.params.url}}></Image> */}
    </View>
  );
}
