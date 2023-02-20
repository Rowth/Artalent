import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Header, SmallButton, CustomAlert, SmallColorButton} from '@components';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, tokenInvalid} from '@config';
// import {createThumbnail} from 'react-native-create-thumbnail';
import styles from './styles';
import {NeomorphFlex, ShadowFlex} from 'react-native-neomorph-shadows';
const Thumbnail = ({
  item,
  setDraftData,
  draftData,
  navigation,
  setPlayingVideo,
}) => {
  const [uri, setUri] = useState(null);
  useEffect(() => {
    // createThumbnail({
    //   url: item.draft,
    //   timeStamp: 10000,
    // })
    //   .then(response => {
    //     console.log(response);
    //     setUri(response.path);
    //   })
    //   .catch(err => console.log({err}));
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('cm', draftData, item.id);
        setDraftData(
          draftData.map(itemx =>
            itemx.id === item.id
              ? {...itemx, selected: !itemx.selected}
              : {...itemx, selected: false},
          ),
        );
        setPlayingVideo(item.draft);
        // navigation.navigate('ShareFeed', {videoUrl: item.draft, path: 'Draft'});
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: item.selected ? wp(0.4) : 0,
          borderColor: '#EB5757',
        }}>
        <Image
          style={{
            width: item.selected ? wp(24 - wp(0.2)) : wp(24),
            height: item.selected ? wp(24 - wp(0.2)) : wp(24),
            padding: wp(10),
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif',
          }}></Image>
      </View>
    </TouchableOpacity>
  );
};
const SlideUpGallery = props => {
  const {navigation, route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [draftData, setDraftData] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  console.log(playingVideo);
  const [imageData, setImageData] = useState([
    {key: 1, selected: false},
    {key: 2, selected: false},
    {key: 3, selected: false},
    {key: 4, selected: false},
    {key: 5, selected: false},
    {key: 6, selected: false},
    {key: 7, selected: false},
    {key: 8, selected: false},
    {key: 9, selected: false},
    {key: 10, selected: false},
    {key: 20, selected: false},
    {key: 30, selected: false},
    {key: 40, selected: false},
    {key: 50, selected: false},
    {key: 60, selected: false},
    {key: 70, selected: false},
    {key: 80, selected: false},
    {key: 90, selected: false},
  ]);
  const getDraftData = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_DRAFT_POST,
    });
    if (res?.data?.status === 200) {
      console.log('draft post', res.data);
      setDraftData(res.data.data.map(item => ({...item, selected: false})));
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('onFocus call');
      getDraftData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          onClickLeftIcon={() => navigation.goBack()}
          centerText={'Draft Posts'}
        />
        <View style={{flex: 1}}>
          <View key={'#frontImage'}>
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: hp(1),
                paddingBottom: hp(2),
              }}> */}
            {/* <NeomorphFlex
                darkShadowColor="black" // <- set this
                lightShadowColor="white" // <- this
                style={{
                  shadowOffset: {width: 10, height: 10},
                  shadowColor: 'grey',
                  shadowRadius: 20,
                  borderRadius: 20,
                  backgroundColor: '#1A1A1A',
                  width: '90%',
                  height: hp(45),
                  padding: 0.5,
                }}> */}
            {playingVideo === null ? (
              <View
                style={{
                  height: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                }}>
                <Text style={{color: 'white'}}>
                  {draftData == null ? 'No video in draft' : 'Select any video'}
                </Text>
              </View>
            ) : (
              <Video
                useTextureView={false}
                playInBackground={true}
                disableFocus={false}
                muted={true}
                poster={
                  'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif'
                }
                paused={false}
                loop={true}
                // poster={require('../../assets/Images/SlideUpGallery/loading.png')}
                controls={true}
                controller={true}
                resizeMode="cover"
                selectedVideoTrack={{
                  type: 'resolution',
                  value: 50,
                }}
                source={{
                  uri: playingVideo,
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
                style={{height: '80%', backgroundColor: '#1A1A1A'}}
              />
            )}

            {/* </NeomorphFlex> */}
            {/* </View> */}
          </View>
          <View key={'#flatlistContainer'} style={{width: '100%', flex: 1}}>
            <FlatList
              contentContainerStyle={{
                backgroundColor: '#1A1A1A',
                paddingHorizontal: wp(2),
              }}
              styles={{flex: 1}}
              numColumns={4}
              data={draftData}
              renderItem={({item, index}) => (
                <Thumbnail
                  item={item}
                  setDraftData={setDraftData}
                  draftData={draftData}
                  navigation={navigation}
                  setPlayingVideo={setPlayingVideo}
                  playingVideo={playingVideo}
                />
              )}
            />
            <View
              style={{
                height: hp(6),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SmallColorButton
                buttonColor={'#219653'}
                onPress={() => {
                  if (playingVideo === null) {
                    Alert.alert('Please select a video');
                  } else {
                    navigation.navigate('ShareFeed', {
                      videoUrl: playingVideo,
                      path: 'Draft',
                    });
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SlideUpGallery;
