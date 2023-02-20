import React, {useState, memo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import {Axios, URL, KEY, Helper} from '@config';
import {tokenInvalid} from '../../config/Helper';
const MyVideoFeed = props => {
  const {index, item, getPostLikes, setModalVisible, navigation, activeIndex} =
    props;
  console.log(props, 'Mayank');
  const [likeCount, setLikeCount] = useState(item.like_count);
  const [likeStatus, setLikeStatus] = useState(item.like_status);
  const likeFeeds = async feed_id => {
    let body = new FormData();
    body.append('feed_id', feed_id);
    const res = await Axios({
      method: 'post',
      url: URL.LIKE_CONTEST_FEED,
      data: body,
    });
    if (res?.data?.status === 200) {
      console.log('liked Feed');
      setLikeCount(res.data.likes_count);
      setLikeStatus(!likeStatus);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };

  return (
    <View style={{height: hp(60), margin: wp(3)}}>
      <Video
        useTextureView={false}
        poster={'https://cdn-icons-png.flaticon.com/128/1479/1479689.png'}
        playInBackground={false}
        disableFocus={false}
        muted={false}
        audioOnly={true}
        repeat={true}
        paused={!activeIndex}
        resizeMode="cover"
        selectedVideoTrack={{
          type: 'resolution',
          value: 50,
        }}
        source={{
          uri: item.feed,
        }} // Can be a URL or a local file.
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
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          borderRadius: 20,
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewContest', {data: item})}>
          <Image
            style={{width: wp(6), height: wp(6), margin: wp(3)}}
            source={require('../../assets/Images/FeedContest/fullScreen.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            paddingHorizontal: wp(2),
            bottom: hp(1),
            left: 0,
            right: 0,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                style={{
                  width: wp(16),
                  height: wp(16),
                  borderRadius: wp(100),
                }}
                source={{
                  uri:
                    item.profile !== null
                      ? item.profile
                      : 'https://source.unsplash.com/random',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: wp(3),
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.username}
              </Text>
              <Text style={{color: 'white'}}>{item.category}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                getPostLikes(item.id);
                setModalVisible(true);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp(4.3),
                  paddingHorizontal: wp(2),
                }}>
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                likeFeeds(item.id);
              }}>
              <Image
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                  marginHorizontal: wp(2),
                }}
                source={
                  likeStatus
                    ? require('../../assets/Images/FeedContest/thumbsupfill.png')
                    : require('../../assets/Images/FeedContest/thumb-up.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Helper.ShareSocial();
              }}>
              <Image
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                  paddingHorizontal: wp(2),
                }}
                source={require('../../assets/Images/FeedContest/send.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(MyVideoFeed);
