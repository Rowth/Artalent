import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import styles from './styles';
import {tokenInvalid, Axios, URL, Helper} from '@config';
const ViewContest = props => {
  const {navigation, route} = props;
  const [feedData, setFeedData] = useState(route.params.data);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(route);
  const FeedItem = ({item, index, navigation, activeIndex}) => {
    console.log(item);
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
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      } else {
        console.log('server error');
      }
    };
    return (
      <View style={{height: hp(100)}}>
        <Video
          poster={'https://cdn-icons-png.flaticon.com/128/1479/1479689.png'}
          posterResizeMode="contain"
          useTextureView={false}
          playInBackground={false}
          disableFocus={false}
          muted={false}
          paused={!activeIndex}
          repeat={true}
          resizeMode="cover"
          selectedVideoTrack={{
            type: 'resolution',
            value: 50,
          }}
          source={{
            uri: item.feed,
          }}
          bufferConfig={{
            bufferForPlaybackMs: 1000,
            maxBufferMs: 1000,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: wp(6), height: wp(6), margin: wp(3)}}
              source={require('../../assets/Images/ViewerList/minimizes.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(26,26,26, 0.3)',
            paddingVertical: hp(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(2),
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewProfile', {id: item.user_id})
                }>
                <Image
                  style={{
                    width: wp(16),
                    height: wp(16),
                    borderRadius: wp(100),
                  }}
                  source={{
                    uri:
                      item.user_image !== null
                        ? item.user_image
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
                  {item.userfullname}
                </Text>
                <Text style={{color: 'white'}}>{item.interestname}</Text>
              </View>
            </View>
          </View>
          <View style={{paddingLeft: wp(2), marginTop: hp(2)}}>
            <Text
              numberOfLines={3}
              style={{color: 'white', fontWeight: '300', fontSize: wp(3.5)}}>
              {item.caption}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const _onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <FlatList
        pagingEnabled
        data={feedData}
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={{
          // marginBottom: hp(8),
          backgroundColor: '#1A1A1A',
        }}
        renderItem={({item, index}) => (
          <FeedItem
            item={item}
            index={{index}}
            navigation={navigation}
            videoData={feedData}
            activeIndex={index === activeIndex}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default ViewContest;
