import {RNS3} from 'react-native-aws3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';

export const sendAwsBucket = async (data, type) => {
  //  Access Key ID: AKIAQ43UDM6HMGPHY7C6
  // Secret Access Key: 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
  // AWS S3 Bucket Name:-
  // images123456 => for Images
  // video123456  => for videos
  // Region => ap-south-1
  console.log(data);
  const options = {
    keyPrefix: 'uploads/',
    bucket: 'artalent1234',
    region: 'ap-south-1',
    accessKey: 'AKIAX2TWL4VQRERMUF2K',
    secretKey: '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',
    successActionStatus: 201,
  };
  const file = {
    uri: data.uri,
    name: data.fileName,
    type: data.type,
  };

  try {
    const rest = await RNS3.put(file, options);
    console.log(rest, '-aws res');

    return rest;
  } catch (err) {
    console.log(err, 'aws Error');

    return err;
  }
};
export const tokenInvalid = async ({navigation}) => {
  navigation.replace('LoginWithMobile');
  await AsyncStorage.setItem(
    'Auth',
    JSON.stringify({isLoggedIn: false, starterStatus: true}),
  );
};
export const ShareSocial = data => {
  const options = {
    title: 'ARTALENT',
    subject: 'ARTALENT',
    message: `like and comment post`,
    url: 'https://ARTALENT.com/',
  };
  Share.open(data ? data : options)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};
export const copyToClipboard = text => {
  return Clipboard.setString(text);
};
