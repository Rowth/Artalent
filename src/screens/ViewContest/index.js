import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import styles from './styles';
const ViewContest = props => {
  const {navigation, route} = props;
  const [feedData, setFeedData] = useState(route.params.data);
  console.log(route);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Video
          useTextureView={false}
          playInBackground={false}
          disableFocus={true}
          poster={'https://cdn-icons-png.flaticon.com/128/1479/1479689.png'}
          resizeMode="cover"
          selectedVideoTrack={{
            type: 'resolution',
            value: 50,
          }}
          source={{
            uri: feedData.feed,
          }} // Can be a URL or a local file.
          // ref={ref => {
          //   this.player = ref;
          // }} // Store reference
          bufferConfig={{
            bufferForPlaybackMs: 100,
            maxBufferMs: 100,
          }}
          style={{flex: 1, backgroundColor: '#1A1A1A'}}
        />
        <View
          style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{
                  width: wp(6),
                  height: wp(6),
                  margin: wp(5),
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Images/ViewerList/minimizes.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: hp(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: wp(15),
                    height: wp(15),
                    margin: wp(3),
                    borderRadius: wp(100),
                  }}
                  source={{
                    uri: feedData.profile,
                  }}
                />
              </TouchableOpacity>

              <View>
                <Text style={{color: 'white'}}>{`${feedData.username}`}</Text>
                <Text style={{color: '#BEBEBE'}}>{feedData.category}</Text>
              </View>
            </View>
            <Text
              style={{
                color: '#ffffff',
                paddingHorizontal: wp(3),
                fontSize: wp(2.8),
              }}>
              {feedData.caption}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ViewContest;
