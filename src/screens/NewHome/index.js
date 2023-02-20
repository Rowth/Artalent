import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  FlatList,
  ImageBackground,
  Alert,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {
  Text,
  InputText,
  UserPost,
  AdvertisementPost,
  CustomAlert,
} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Likes from '../Likes/index';
import {postHelper} from '@config';
import SmallColorButton from '../../components/SmallColorButton/index';
import styles from './styles';
import {Axios, URL, tokenInvalid} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import PhotoEditor from '@baronha/react-native-photo-editor';
import {request, PERMISSIONS} from 'react-native-permissions';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const AddFeedView = ({
  goToCamera,
  goToViewImage,
  closeModal,
  goToAddPost,
  navigation,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const editPhoto = async imgUrl => {
    // const imgData = await PhotoEditor.open({path: imgUrl});
    const jsonValue = await AsyncStorage.getItem('postData');
    const res = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(res, 'vcvcvpostdat');

    if (res !== null) {
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
        await AsyncStorage.setItem('postData', jsonValue);
        goToAddPost();
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
        await AsyncStorage.setItem('postData', jsonValue);
        goToAddPost();
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
    // navigation.navigate('ViewImage', {url: imgData});
    console.log(imgData);
  };
  const getimgFromGallery = async () => {
    const imageRes = await ImagePicker.openPicker({
      width: 500,
      height: 400,
      compressImageQuality: 1,
      cropping: true,
    });
    console.log(imageRes);

    // setImageUri(res.assets[0].uri);
    setImageUrl(imageRes.path);
    navigation.navigate('ApplyFilter', {url: imageRes.path});

    // editPhoto(imageRes.path);

    // toggleModalStory();
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 25,
          bottom: 0,
          right: -10,
          left: 10,
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            width: 0,
            height: 0,
            marginRight: '12%',
            borderLeftWidth: 15,
            borderRightWidth: 15,
            borderBottomWidth: 18,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#AB0404',
            marginTop: '5%',
          }}></View>
        <View
          style={{
            height: hp(20),
            width: wp(30),
            backgroundColor: '#AB0404',
            justifyContent: 'center',
            borderRadius: wp(2),
          }}>
          <TouchableOpacity
            onPress={() => {
              goToCamera();
            }}>
            <View style={{alignItems: 'center', paddingBottom: wp(3)}}>
              <Image
                resizeMode="contain"
                style={{width: wp(8), height: wp(8)}}
                source={require('../../assets/Images/Home/camera.png')}
              />
              <Text style={{fontSize: wp(2), marginTop: '5%'}}>
                Take a Picture
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              height: 0.4,
              backgroundColor: 'white',
            }}></View>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => {
                closeModal();
                getimgFromGallery();
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(3),
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: wp(8), height: wp(8)}}
                  source={require('../../assets/Images/Home/gallery.png')}
                />
                <Text style={{fontSize: wp(2), marginTop: '5%'}}>
                  Choose from gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const GetLikeView = ({likeData}) => {
  const [likesData, setLikesData] = useState([]);
  const followUser = async id => {
    let body = new FormData();
    body.append('following_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_FOLLOW_AND_UNFOLLOW,
      data: body,
    });
    if (res?.data?.status === 200) {
      setLikesData(
        likesData.map(item =>
          item.id === id ? {...item, follow_status: !item.follow_status} : item,
        ),
      );
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  useEffect(() => {
    setLikesData(likeData);
  }, [likeData]);
  return (
    <View
      style={{
        height: hp(50),
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp(5),
        bottom: -1,
        left: 0,
        right: 0,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('100%'),
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            padding: wp(5),
          }}>
          <View>
            <Text style={{fontSize: wp(5)}}>Likes</Text>
          </View>
          <View>
            <Image
              style={{width: wp(7), height: wp(7)}}
              source={require('../../assets/Images/Home/thumbsLike.png')}
            />
          </View>
        </View>
        <View
          style={{
            width: wp(100),
            height: hp(0.1),
            backgroundColor: 'black',
          }}></View>
        <ScrollView style={{backgroundColor: '#1A1A1A'}}>
          <TouchableOpacity activeOpacity={1}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={likesData}
              contentContainerStyle={{backgroundColor: '#1A1A1A'}}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <View style={{backgroundColor: '#1A1A1A'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(2),
                          }}>
                          <Image
                            style={{
                              width: wp(14),
                              height: wp(14),
                              borderRadius: wp(7),
                            }}
                            source={{
                              uri:
                                item.image !== null
                                  ? item.image
                                  : 'https://source.unsplash.com/random',
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: wp('1%'),
                            fontSize: wp(4),
                            fontWeight: 'bold',
                          }}>
                          {item.username}
                        </Text>
                      </View>
                      <View>
                        {!item.follow_status && (
                          <TouchableOpacity
                            onPress={() => {
                              followUser(item.id);
                            }}>
                            <Image
                              style={{
                                width: wp(22),
                                height: wp(10),
                                resizeMode: 'stretch',
                              }}
                              source={require('../../assets/Images/Button/follow.png')}></Image>
                          </TouchableOpacity>
                          // <TouchableOpacity onPress={{}}>
                          //   <View
                          //     style={{
                          //       alignItems: 'center',
                          //       marginRight: 10,
                          //       marginTop: -10,
                          //     }}>
                          //     <SmallColorButton
                          //       onPress={() => followUser(item.id)}
                          //       buttonText={'Follow'}
                          //       buttonColor={'#AB0404'}
                          //     />
                          //   </View>
                          // </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: hp(0.2),
                      }}></View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* <Button title="Hide modal" onPress={toggleModal} /> */}
    </View>
  );
};
const GetCommentView = props => {
  const {
    commentPostDetail,
    postComment,
    commentData,
    setFeeds,
    setDeleteCommentModalVisible,
    setCommentId,
  } = props;
  const [commentText, setCommentText] = useState('');
  let touchStart = 0;
  return (
    <View
      style={{
        height: hp(50),
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp(5),
        bottom: -10,
        left: 0,
        right: 0,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('100%'),
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            padding: wp(5),
          }}>
          <View>
            <Text style={{fontSize: wp(5)}}>Comment</Text>
          </View>
          <View>
            <Image
              style={{width: wp(7), height: wp(7)}}
              source={require('../../assets/Images/Home/Comment.png')}
            />
          </View>
        </View>
        <View
          style={{
            width: wp(100),
            height: hp(0.1),
            backgroundColor: 'black',
          }}></View>
        <ScrollView style={{backgroundColor: '#1A1A1A'}}>
          <TouchableOpacity activeOpacity={1}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{backgroundColor: '#1A1A1A'}}
              data={commentData}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View
                  onTouchStart={e => {
                    touchStart = e.nativeEvent.locationX;
                    console.log('wasedrftgyh', e.nativeEvent.locationX);
                  }}
                  onTouchEnd={e => {
                    console.log(
                      'wasedrftgyhend',
                      e.nativeEvent.locationX,
                      touchStart,
                    );
                    if (e.nativeEvent.locationX - touchStart > 100) {
                      touchStart = 0;

                      if (item.status === true) {
                        setDeleteCommentModalVisible(true);

                        setCommentId(item.Comment_id);
                      }
                    }
                  }}
                  style={{backgroundColor: '#1A1A1A'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: wp(1),
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: wp(2),
                        }}>
                        <Image
                          style={{
                            width: wp(14),
                            height: wp(14),
                            borderRadius: wp(7),
                          }}
                          source={{
                            uri:
                              item.image !== null
                                ? item.image
                                : 'https://source.unsplash.com/random',
                          }}
                        />
                      </View>
                      <View style={{paddingRight: wp(5)}}>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: wp('1%'),
                            fontSize: wp(4),
                          }}>
                          {item.username}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            width: wp(60),

                            paddingHorizontal: wp(2),
                            fontSize: wp(3),
                          }}>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <View
                          style={{
                            alignItems: 'center',
                            marginRight: 10,
                            marginTop: -10,
                          }}>
                          <Text style={{fontSize: wp(2.5)}}>
                            {item.created_at}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'black',
                      width: '100%',
                      height: hp(0.2),
                    }}></View>
                </View>
              )}
            />
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            backgroundColor: '#1A1A1A',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: wp(3),
          }}>
          <InputText
            value={commentText}
            onChangeText={txt => setCommentText(txt)}
            height="7"
            autoFocus={true}
            width="85%"
            placeholder={'comment'}
            placeholderTextColor="#BDBDBD"
          />
          <TouchableOpacity
            onPress={() => {
              const res = postComment({
                id: commentPostDetail.id,
                comment: commentText,
              });
              if (res) {
                setCommentText('');
              }
            }}>
            <Image
              style={{height: wp(7), width: wp(7)}}
              source={require('../../assets/Images/Home/send.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Button title="Hide modal" onPress={toggleModal} /> */}
    </View>
  );
};
const GetShareView = ({likeData}) => {
  return (
    <View
      style={{
        height: hp(50),
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp(5),
        bottom: -1,
        left: 0,
        right: 0,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('100%'),
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            padding: wp(5),
          }}>
          <View>
            <Text style={{fontSize: wp(5)}}>Share</Text>
          </View>
          <View>
            <Image
              style={{width: wp(7), height: wp(7)}}
              source={require('../../assets/Images/Home/send.png')}
            />
          </View>
        </View>
        <View
          style={{
            width: wp(100),
            height: hp(0.1),
            backgroundColor: 'black',
          }}></View>
        <ScrollView>
          <TouchableOpacity activeOpacity={1}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={likeData}
              contentContainerStyle={{backgroundColor: '#1A1A1A'}}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.5}>
                  <View style={{backgroundColor: '#1A1A1A'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(2),
                          }}>
                          <Image
                            style={{
                              width: wp(14),
                              height: wp(14),
                              borderRadius: wp(7),
                            }}
                            source={{uri: 'https://source.unsplash.com/random'}}
                          />
                        </View>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: wp('1%'),
                            fontSize: wp(4),
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity>
                          <View
                            style={{
                              alignItems: 'center',
                              marginRight: 10,
                              marginTop: -10,
                            }}>
                            <SmallColorButton
                              buttonText={
                                item.followStatus === 'no' ? 'send' : 'sent'
                              }
                              buttonColor={
                                item.followStatus === 'no'
                                  ? '#219653'
                                  : '#FFC616'
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: hp(0.2),
                      }}></View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* <Button title="Hide modal" onPress={toggleModal} /> */}
    </View>
  );
};

const NewHome = props => {
  const [imageRes, setImageRes] = useState('');
  const {navigation, route} = props;
  const [imageUri, setImageUri] = useState('');
  const [tabState, setTabState] = useState('feed');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isModalVisibleStory, setModelVisibleStory] = useState(false);
  const [storyData, setStoryData] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [commentPostDetail, setCommentPostDetail] = useState({});
  const [likeData, setLikeData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [deleteCommnetvisisble, setDeleteCommentModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [flatListLoader, setFlatListLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [commentId, setCommentId] = useState(null);
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  console.log('FEED: ', feeds);
  const limit = 5;
  console.log('storeldkskdlks', store);
  const toggleModalDeleteComment = () => {
    setDeleteCommentModalVisible(!deleteCommnetvisisble);
  };

  const deleteComment = async commnet_Id => {
    const res = await Axios({
      method: 'get',
      url: `${URL.DELETE_COMMENT}?comment_id=${commnet_Id}`,
    });
    if (res?.data?.status === 200) {
      getPostComments(res.data.comment_id);
      setFeeds(
        feeds.map(itemx =>
          itemx.id === res.data.feed_id
            ? {...itemx, comment_count: res.data.comment_count}
            : itemx,
        ),
      );
      Alert.alert('Comment deleted successfully');
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
    setDeleteCommentModalVisible(false);
  };
  const getNotificationCount = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_NOTIFICATION_COUNT,
    });
    if (res?.data?.status === 200) {
      setNotificationCount(res.data.count);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  // console.log(props);
  const getStory = () => {
    return Axios({
      method: 'post',
      url: URL.GET_STORY,
    });
  };
  const getPostLikes = useCallback(async id => {
    const res = await Axios({
      method: 'post',
      url: URL.LIKES_FEED_GET,
      data: {feed_id: id},
    });
    if (res.data.status === 200) {
      setLikeData(res.data.data);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  }, []);
  const goToProfile = useCallback(id => {
    navigation.navigate('ViewProfile', {id});
  }, []);
  const goToPost = useCallback(id => {
    navigation.navigate('ViewPost', {id});
  }, []);
  const getPostComments = useCallback(async id => {
    const res = await Axios({
      method: 'post',
      url: URL.COMMENTS_FEED_GET,
      data: {feed_id: id},
    });
    if (res.data.status === 200) {
      setCommentData(res.data.data);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  }, []);

  const postLike = useCallback(
    async postData => {
      // handle the click event
      let body = new FormData();
      body.append('feed_id', postData.id);
      const res = await Axios({
        method: 'post',
        url: URL.LIKE_USER_POST,
        data: body,
      });
      if (res.data.status === 200) {
        console.log(feeds);
        setFeeds(
          feeds.map(item =>
            item.id === postData.id
              ? {
                  ...item,
                  like_status: !item.like_status,
                  like_count: res.data.likes_count,
                }
              : item,
          ),
        );
      } else if (res.data.status === 401) {
        tokenInvalid({navigation});
      }
    },
    [feeds],
  );

  const postComment = async postData => {
    let body = new FormData();
    body.append('feed_id', postData.id);
    body.append('comment', postData.comment);

    const res = await Axios({
      method: 'post',
      url: URL.COMMENT_FEED,
      data: body,
    });
    if (res.data.status === 200) {
      getPostComments(res.data.data.feed_id);
      setFeeds(
        feeds.map(itemx =>
          itemx.id === res.data.data.feed_id
            ? {...itemx, comment_count: res.data.data.comment_count}
            : itemx,
        ),
      );
      return true;
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    } else {
      return false;
    }
  };
  const getOwnStory = async () => {
    const Auth = await AsyncStorage.getItem('Auth');
    const data = Auth != null ? JSON.parse(Auth) : {};
    let body = new FormData();
    body.append('user_id', data?.user_data?.id);
    return Axios({
      method: 'post',
      url: URL.GET_STORY,
      data: body,
    });
  };
  const getAllStory = () => {
    let allStory = [];

    Promise.all([getStory(), getOwnStory()]).then(function (results) {
      console.log(results);
      if (results[1].data.status === 200) {
        if (results[1].data?.user_story?.length > 0) {
          if (results[1].data.user_story[0].story.length > 0) {
            allStory.push({
              ...results[1].data.user_story[0],
              isOwnStory: true,
            });
          }
        }
      }
      if (results[0].data.status === 200) {
        if (results[0].data?.user_story?.length > 0) {
          allStory = allStory.concat(results[0].data.user_story);
        }
      }
      setStoryData(allStory);
    });
  };

  const getFeeds = async () => {
    setFlatListLoader(true);
    const res = await Axios({
      method: 'post',
      url: `${URL.GET_FEEDS}?page=${page}&limit=${limit}`,
    });
    if (res.data.status === 200) {
      console.log(res.data.contest_feeds + 'dxfcgvhbjnkm,l.');
      setFeeds([...feeds, ...res.data.contest_feeds]);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
    setFlatListLoader(false);
  };

  const postStory = async imageUrl => {
    console.log([imageUrl]);
    let body = new FormData();
    body.append('image[]', imageUrl);
    const res = await Axios({
      method: 'post',
      url: URL.POST_STORY,
      data: {
        image: [imageUrl],
      },
    });
    if (res?.data?.status === 200) {
      Alert.alert('Story Added');
      dispatch({type: 'CLEAR', data: null});
      getAllStory();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('can,t add story');
    }
  };

  const getimgFromGallery = async () => {
    const imageRes = await ImagePicker.openPicker({
      width: 500,
      compressImageQuality: 1,
      height: 400,
      cropping: true,
    });
    console.log(imageRes);
    navigation.navigate('ApplyFilter', {
      path: 'NewHome',
      url: imageRes.path,
    });
    toggleModalStory();

    return 1;
    // const imgData = await PhotoEditor.open({path: imageRes.path});
    // console.log(imageRes);
    // let d1 = new Date();
    // let imageNameArray = imageRes.path.split('/');
    // let imageName = d1.getTime() + imageNameArray[imageNameArray.length - 1];
    // console.log('djddj', imageName);
    // // setImageUri(res.assets[0].uri);
    // let dateName = new Date();
    // Alert.alert(
    //   'Are you sure you want to Add Story?',
    //   'Please Click Yes or No',
    //   [
    //     {
    //       text: 'No',
    //       onPress: () => console.log('No'),
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Yes',
    //       onPress: async () => {
    //         const awsRes = await Helper.sendAwsBucket(
    //           {
    //             uri: imgData,
    //             fileName: imageName,
    //             type: imageRes.mime,
    //           },
    //           'image',
    //         );
    //         console.log(awsRes);
    //         if (awsRes.status === 201) {
    //           console.log(awsRes);
    //           postStory(awsRes.body.postResponse.location);
    //         }
    //       },
    //     },
    //   ],
    // );

    // toggleModalStory();
  };
  const safeNotificationCount = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.SAVE_NOTIFICATION,
    });
    if (res?.data?.status === 200) {
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server Error');
    }
  };
  const getPic = async () => {
    // const imageRes = await launchCamera({
    //   mediaType: 'mixed',
    //   videoQuality: 'high',
    //   quality: 1,
    //   durationLimit: 1000,
    //   height: 400,
    //   width: 400,
    // });

    const imageRes = await ImagePicker.openCamera({
      width: 500,
      height: 1000,
      cropping: true,
    });
    // const imgData = await PhotoEditor.open({path: imageRes.path});
    console.log(imageRes);
    let d1 = new Date();
    let imageNameArray = imageRes.path.split('/');
    let imageName = d1.getTime() + imageNameArray[imageNameArray.length - 1];
    console.log('djddj', imageName);
    // setImageUri(res.assets[0].uri);
    Alert.alert(
      'Are you sure you want to Add Story?',
      'Please Click Yes or No',
      [
        {
          text: 'No',
          onPress: () => console.log('No'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const awsRes = await Helper.sendAwsBucket(
              {
                uri: imgData,
                fileName: imageName,
                type: imageRes.mime,
              },
              'image',
            );
            if (awsRes.status === 201) {
              console.log(awsRes);
              postStory(awsRes.body.postResponse.location);
            } else {
              console.log('aws error');
            }
          },
        },
      ],
    );
    // Alert.alert()
    toggleModalStory();
  };
  const loadMoreData = () => {
    console.log('ddddd856965');
    if (feeds.length % limit > 0) {
      setPage(Math.floor(feeds.length / limit + 2));
    } else {
      setPage(Math.floor(feeds.length / limit + 1));
    }
  };
  const footerRender = () => {
    return flatListLoader ? (
      <View style={{alignItems: 'center', marginBottom: hp(15)}}>
        <ActivityIndicator size="large" color={'grey'} />
      </View>
    ) : null;
  };
  const toggleModalStory = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleX,
      ),
    );
    setModelVisibleStory(!isModalVisibleStory);
  };
  const getPermissions = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            console.log(result);
            // setCameraType('front');
          });
        });
      });
    });
  };
  // console.log(storyData);
  useEffect(() => {
    getPermissions();
    getAllStory();
    getNotificationCount();
  }, []);
  useEffect(() => {
    console.log(page);
    getFeeds();
  }, [page]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllStory();
      console.log('onFocus call', props, store);
      getFeeds();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1A1A1A',
      }}>
      {/* HEADER START */}
      <View
        style={{
          backgroundColor: 'rgba(26,26,26, 0.8)',
          height: hp(7),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(5),
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            activeOpacity={0.5}
            style={{
              padding: 5,
            }}>
            <View>
              <Image
                style={{width: wp(8), height: wp(8)}}
                source={require('../../assets/Images/Home/List.png')}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1,
            }}>
            <Image
              style={{width: wp(30), height: wp(8), resizeMode: 'cover'}}
              source={require('../../assets/Images/Home/ARTalent-text.png')}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalType('camera');
                  setModalVisible(true);
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{width: wp(7), height: wp(7)}}
                  source={require('../../assets/Images/Home/addImage.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Notification');
                  safeNotificationCount();
                  // VideoEditor.launchVideoEditor('');
                }}>
                <View style={{flex: 1}}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: wp(7), height: wp(7), marginLeft: wp(2)}}
                    source={
                      notificationCount === 0
                        ? require('../../assets/Images/Star/simpleBell.png')
                        : require('../../assets/Images/Star/notification.png')
                    }
                  />

                  {notificationCount !== 0 ? (
                    <View
                      style={{
                        height: wp(3),
                        width: wp(3),
                        borderRadius: 100,
                        borderEndWidth: 0.5,
                        borderColor: 'red',
                        backgroundColor: '#AB0404',
                        position: 'absolute',
                        alignItems: 'center',
                        top: 0,
                        right: 0,
                        left: 15.5,
                        bottom: 0,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: wp(2),
                        }}>
                        {notificationCount}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* HEADER END */}
      <FlatList
        headerViewStyle={{}}
        ListHeaderComponent={
          <View style={{height: hp(24)}}>
            <View
              key="container-1"
              style={{
                // width: wp('100%'),
                background: '#1A1A1A',
              }}>
              <View
                key="container-2"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: hp(24),
                }}>
                <View key="container-856">
                  {isModalVisibleStory ? (
                    <View
                      key="#start"
                      style={{
                        alignItems: 'center',
                        zIndex: 100,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: -hp(12),
                        left: 0,
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={{
                          width: wp(100),
                        }}
                        onPress={() => {
                          toggleModalStory();
                        }}
                        onTouchEnd={e => {}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#AB0404',
                            height: hp(24),
                            width: wp(60),
                            // paddingHorizontal: wp(2.5),
                            borderTopRightRadius: wp(10),
                            borderBottomRightRadius: wp(10),
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                // getPic();
                                toggleModalStory();

                                navigation.navigate('CameraEditor', {
                                  path: 'NewHome',
                                });
                              }}
                              style={{
                                alignItems: 'center',
                              }}>
                              <Image
                                resizeMode="contain"
                                style={{height: wp(9), width: wp(9)}}
                                source={require('../../assets/Images/Home/camera.png')}
                              />
                              <Text style={{fontSize: wp(2.5)}}>
                                Take a Picture
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: hp(22),
                              width: wp(0.12),
                              backgroundColor: 'white',
                            }}></View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                getimgFromGallery();
                              }}
                              style={{alignItems: 'center'}}>
                              <Image
                                resizeMode="contain"
                                style={{height: wp(9), width: wp(9)}}
                                source={require('../../assets/Images/Home/gallery.png')}
                              />
                              <Text style={{fontSize: wp(2.5)}}>
                                Choose from Gallery
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      key="#end"
                      style={{
                        justifyContent: 'center',
                        // backgroundColor: 'red',
                        alignSelf: 'center',
                        height: hp(24),
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={{
                          // backgroundColor: 'green',
                          // transform: [{rotate: '-90deg'}],
                          alignItems: 'center',
                          width: wp(40),
                          // position: 'absolute',
                          marginLeft: -23,
                        }}
                        onPress={() => {
                          toggleModalStory();
                        }}>
                        <View
                          style={{
                            width: wp(55),
                            height: wp(70),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: wp(5),
                          }}>
                          {/* <View style={{justifyContent: 'center'}}> */}

                          {!isModalVisibleStory && (
                            <Image
                              style={{height: wp(80), width: wp(33)}}
                              resizeMode={'contain'}
                              source={require('../../assets/Images/Home/defaultStory.png')}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* </View> */}
                <View
                  style={{
                    flex: 1,
                    marginLeft: hp(-1),
                    justifyContent: 'center',
                  }}>
                  <FlatList
                    contentContainerStyle={{
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}
                    horizontal={true}
                    data={storyData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({item, index}) => (
                      <View>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              item.isOwnStory
                                ? navigation.navigate('OwnStory', {
                                    item,
                                    getAllStory: getAllStory,
                                  })
                                : navigation.navigate('OtherStory', item);
                            }}>
                            {/* {console.log(item, storyData, item.story[0].image)} */}
                            <ImageBackground
                              style={{
                                height: hp(21),
                                width: wp(30),
                                margin: wp(1.5),
                                resizeMode: 'cover',
                              }}
                              imageStyle={{
                                borderRadius: wp(3),
                              }}
                              source={
                                item.story.length > 0
                                  ? {
                                      uri: item.story[item.story.length - 1]
                                        .image
                                        ? item.story[item.story.length - 1]
                                            .image
                                        : 'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                                    }
                                  : {
                                      uri: 'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                                    }
                              }>
                              <View
                                style={{position: 'absolute', bottom: hp(1)}}>
                                <Text
                                  style={{
                                    fontSize: wp(2.5),
                                    paddingLeft: wp(2),
                                  }}>
                                  {item.isOwnStory
                                    ? 'My Story'
                                    : '@' + item.username}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        }
        onScrollEndDrag={(event, scroll) => {}}
        onEndReached={info => {
          if (info.distanceFromEnd < 1) {
            loadMoreData();
          }
        }}
        data={feeds}
        renderToHardwareTextureAndroid={true}
        keyExtractor={item => item.key}
        style={{paddingBottom: hp(0), paddingTop: hp(7)}}
        contentContainerStyle={{paddingBottom: hp(10)}}
        renderItem={({item, index}) =>
          item.ad_status ? (
            <AdvertisementPost
              key={'#' + index}
              setModalVisible={setModalVisible}
              setModalType={setModalType}
              data={item}
              postLike={postLike}
              setCommentPostDetail={setCommentPostDetail}
              getPostComments={getPostComments}
              getPostLikes={getPostLikes}
              goToProfile={goToProfile}
            />
          ) : (
            <UserPost
              key={'#' + index}
              setModalVisible={setModalVisible}
              setModalType={setModalType}
              data={item}
              postLike={postLike}
              setCommentPostDetail={setCommentPostDetail}
              getPostComments={getPostComments}
              getPostLikes={getPostLikes}
              goToProfile={goToProfile}
              goToPost={goToPost}
            />
          )
        }
        // onEndReached={() => console.log('data')}
        // onEndReachedThreshold={0.001}
        ListFooterComponent={footerRender}
      />
      {/* **********************************************Like Model**************************************** */}
      <Modal
        isVisible={isModalVisible}
        animationType="slide"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onModalHide={() => {
          setCommentData([]);
          setLikeData([]);
        }}
        // propagateSwipe={true}
        styles={{
          height: hp(30),
          justifyContent: 'flex-end',
          backgroundColor: '#1A1A1A',
        }}
        swipeDirection="down">
        {modalType === 'like' ? (
          <GetLikeView likeData={likeData} />
        ) : modalType === 'comment' ? (
          <GetCommentView
            postComment={postComment}
            commentPostDetail={commentPostDetail}
            commentData={commentData}
            setFeeds={setFeeds}
            setDeleteCommentModalVisible={setDeleteCommentModalVisible}
            setCommentId={setCommentId}
          />
        ) : modalType === 'share' ? (
          <GetShareView likeData={likeData} />
        ) : modalType === 'camera' ? (
          <AddFeedView
            goToCamera={() => {
              setModalVisible(false);
              navigation.navigate('CameraEditor');
            }}
            goToViewImage={() => {
              navigation.navigate('ViewImage', {url: imgData});
            }}
            closeModal={() => {
              setModalVisible(false);
            }}
            goToAddPost={() => navigation.navigate('AddPost')}
            navigation={navigation}
          />
        ) : null}
      </Modal>
      <Modal
        isVisible={deleteCommnetvisisble}
        animationType="slide"
        onSwipeComplete={() => setDeleteCommentModalVisible(false)}
        onBackdropPress={() => setDeleteCommentModalVisible(false)}
        swipeDirection="left">
        <CustomAlert
          onAdd={() => {
            deleteComment(commentId);
          }}
          onCancel={() => {
            setDeleteCommentModalVisible(false);
          }}
          secondButtonText={'delete'}
          innerComponent={() => (
            <Text
              style={{
                marginTop: hp(4),
                marginBottom: hp(2),
                color: 'white',
                fontWeight: 'bold',
              }}>
              Are you sure you want to delete ?
            </Text>
          )}
        />
      </Modal>
    </SafeAreaView>
  );
};
export default NewHome;
