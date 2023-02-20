import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, SmallButton} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {Axios, URL} from '@config';
const OtherStory = props => {
  const {navigation, route} = props;
  const [contestData, setContestData] = useState([]);
  console.log(props);
  const [curretIndex, setCurretIndex] = useState(0);
  const [loader, setLoader] = useState(0);
  const postStoryView = async id => {
    console.log('dm');
    const body = new FormData();
    body.append('story_id', id);
    const res = await Axios({
      method: 'post',
      url: `${URL.POST_VIEW_STORY}`,
      data: body,
    });
    if (res?.data?.status === 200) {
    }
  };
  useEffect(() => {
    let Interval;
    if (Interval === undefined || Interval === null)
      Interval = setInterval(() => {
        if (loader + 0.5 >= 101) {
          if (curretIndex < contestData.length - 1) {
            setCurretIndex(curretIndex + 1);
            setLoader(0);
          } else {
            // setLoader()
            navigation.goBack();
          }
        } else {
          setLoader(prevState => {
            return prevState + 0.5;
          });
        }
      }, 10);
    if (loader === 0) {
      postStoryView(route.params.story[curretIndex].id);
      // console.log(contestData);
    }
    return () => {
      clearInterval(Interval);
    };
  }, [loader]);
  useEffect(() => {
    setContestData(route.params.story);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <View
          style={{
            flexDirection: 'row',
            padding: wp(1),
            marginTop: hp(1),
            zIndex: 100,
          }}>
          {contestData.map((item, index) => (
            <View
              style={{flex: 1, justifyContent: 'center', marginLeft: wp(1)}}>
              <View
                style={{
                  width: '100%',
                  height: hp(1),
                  backgroundColor: '#828282',
                  zindex: -1,
                  borderRadius: hp(0.5),
                }}></View>
              <View
                style={{
                  width:
                    index < curretIndex
                      ? '100%'
                      : index === curretIndex
                      ? loader + '%'
                      : '0%',
                  height: hp(1),
                  position: 'absolute',
                  backgroundColor: '#EB5757',
                  zindex: 1,
                  borderRadius: hp(0.5),
                }}></View>
            </View>
          ))}
        </View>
        <View style={{padding: wp(1), zIndex: 100}}>
          <Text
            style={{alignSelf: 'flex-end', color: '#F2F2F2', fontSize: wp(3)}}>
            {route.params.story[curretIndex].date}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          {contestData.length > 0 && (
            <View style={{flex: 1}}>
              <Image
                resizeMode="contain"
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                source={
                  contestData[curretIndex].image !== null
                    ? contestData[curretIndex].image.includes('amazonaws')
                      ? {uri: contestData[curretIndex].image}
                      : require('../../assets/Images/feedImage.png')
                    : require('../../assets/Images/feedImage.png')
                }></Image>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: hp(3),
              marginVertical: hp(1),
              justifyContent: 'flex-end',
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                zIndex: 1,
                paddingHorizontal: hp(1),
              }}>
              <SmallButton
                onPress={() => {
                  navigation.goBack();
                }}
                innerComponent={() => (
                  <Image
                    style={{width: wp(5), height: wp(5)}}
                    source={require('../../assets/Images/OtherStory/PaperPlaneRight.png')}
                  />
                )}></SmallButton>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtherStory;
