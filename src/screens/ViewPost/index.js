import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {SmallColorButton, Loader} from '@components';
import Style from './styles';
import {Axios, URL, Helper} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FeedHeader, Header, InputText, CustomAlert} from '@components';
import Modal from 'react-native-modal';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';

const getSwipper = data => {};
const ViewPost = props => {
  const {navigation, route} = props;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [commentId, setCommentId] = useState('');
  const [likeData, setLikeData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteCommnetvisisble, setDeleteCommentModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  let touchStart = 0;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalDeleteComment = () => {
    setDeleteCommentModalVisible(!deleteCommnetvisisble);
  };

  const deleteComment = async commnet_Id => {
    const res = await Axios({
      method: 'get',
      url: `${URL.DELETE_COMMENT}?comment_id=${commnet_Id}`,
    });
    if (res?.data?.status === 200) {
      getPostComments();
      toggleModalDeleteComment();
      Alert.alert('comment Deleted successfully');
      getPostDetail();
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const followUser = async id => {
    let body = new FormData();
    body.append('following_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_FOLLOW_AND_UNFOLLOW,
      data: body,
    });
    if (res?.data?.status === 200) {
      setLikeData(
        likeData.map(item =>
          item.id === id ? {...item, follow_status: !item.follow_status} : item,
        ),
      );
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
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
      getPostComments(postDetails.id);
      setPostDetails({
        ...postDetails,
        comments_count: res.data.data.comment_count,
      });
      console.log(postDetails);
      return true;
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    } else {
      return false;
    }
  };
  const getPostLikes = async id => {
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
  };
  const getPostComments = async id => {
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
  };

  const getPostDetail = async () => {
    let body = new FormData();

    body.append('feed_id', route.params.id);
    const res = await Axios({
      method: 'post',
      url: URL.MY_POST,
      data: body,
    });

    if (res?.data?.status === 200) {
      setPostDetails(res.data.contest_banner);
      setImageData(res.data.contest_banner.image);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const postLike = async postData => {
    let body = new FormData();
    body.append('feed_id', postData.id);
    const res = await Axios({
      method: 'post',
      url: URL.LIKE_USER_POST,
      data: body,
    });
    if (res.data.status === 200) {
      setPostDetails({
        ...postDetails,
        like_status: !postDetails.like_status,
        likes_count: res.data.likes_count,
      });
    }
  };
  const deletePost = async id => {
    let body = new FormData();
    body.append('feed_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.USER_POST_DELETE,
      data: body,
    });

    if (res?.data?.status === 200) {
      route.params.renderScreen();
      route.params.deletePost(id);
      navigation.goBack();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    }
    setDeleteModalVisible(false);
  };
  useEffect(() => {
    getPostDetail();
  }, []);
  return postDetails !== null ? (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Post'}
      />
      <ScrollView
        style={{
          flex: 1,
          width: wp('100%'),
          backgroundColor: '#1A1A1A',
        }}>
        <View style={Style.body}>
          <View style={{marginTop: hp(2)}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#1A1A1A',
                paddingHorizontal: wp(5),
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: hp(1),
              }}>
              <View style={{}}>
                <Image
                  source={{
                    uri: postDetails.user_image
                      ? postDetails.user_image
                      : 'https://images.unsplash.com/photo-1639317393027-2e5308248ea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
                  }}
                  style={{
                    height: hp(6),
                    width: hp(6),
                    borderRadius: hp(3),
                  }}
                />
              </View>
              <View style={{flex: 1, paddingLeft: wp(3)}}>
                <Text style={{color: '#BDBDBD'}}>{postDetails.user_name}</Text>
                <Text style={{color: '#BDBDBD'}}>{postDetails.about_user}</Text>
              </View>
              <View>
                {route.params.screen === 'profile' && (
                  <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                    <Image
                      style={{width: wp(5), height: wp(5)}}
                      source={require('../../assets/Images/Home/Trash.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={{marginTop: 5}}>
            <Swiper
              key={props.key + 'sw'}
              loop={false}
              onIndexChanged={e => {
                console.log(e);
                setActiveTab(e);
              }}
              showsPagination={false}
              showsButtons={false}
              style={{height: hp(50)}}>
              {imageData.map((item, index) => (
                <View key={'#' + index + Math.random()} style={{}}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: hp(50),
                    }}
                    source={{
                      uri: item?.image?.includes('amazonaws')
                        ? item.image
                        : `https://foodish-api.herokuapp.com/images/pizza/pizza${
                            index + 1
                          }.jpg`,
                    }}
                  />
                </View>
              ))}
            </Swiper>
          </View>
          <View
            style={{
              paddingHorizontal: wp(2.5),
              marginTop: hp(1),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', marginHorizontal: 2}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setModalType('like');
                    getPostLikes(postDetails.id);
                  }}>
                  <Text style={{color: '#ffffff'}}>
                    {postDetails.likes_count}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    postLike(postDetails);
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      marginHorizontal: wp(1),
                    }}
                    source={
                      postDetails.like_status
                        ? require('../../assets/Images/Home/Heart.png')
                        : require('../../assets/Images/Home/Heartunselected.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 2}}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{color: '#ffffff'}}>
                    {postDetails.comments_count}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setModalType('comment');
                    getPostComments(postDetails.id);
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      marginHorizontal: wp(1),
                    }}
                    source={require('../../assets/Images/Home/Comment.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 2}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    // setModalVisible(true);
                    // setModalType('share');
                    Helper.ShareSocial();
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      marginHorizontal: wp(1),
                    }}
                    source={require('../../assets/Images/Home/Share.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {imageData.length > 1 &&
                imageData.map((item, index) => (
                  <View
                    style={{
                      width: wp(2),
                      height: wp(2),
                      borderRadius: wp('100%'),
                      backgroundColor:
                        activeTab === index ? '#AB0404' : 'white',
                      marginHorizontal: wp(1),
                    }}></View>
                ))}
            </View>
            <View>
              <Text style={{color: '#ffffff'}}>{postDetails.created_at}</Text>
            </View>
          </View>

          <View>
            <Text style={{color: 'rgba(189, 189, 189, 1)', padding: 15}}>
              {postDetails.caption}
            </Text>
          </View>
          <View
            style={{
              height: 0.6,
              backgroundColor: 'rgba(189, 189, 189, 1)',
              width: wp('100%'),
            }}></View>
          {postDetails.comments.map(item => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 12,
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: wp(12), height: wp(12), borderRadius: wp(6)}}
                  source={{
                    uri:
                      item.image !== null
                        ? item.image
                        : 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
                  }}
                />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                    {`${item.first_name} ${item.last_name}`}
                  </Text>
                  <Text style={{color: 'rgba(189, 189, 189, 1)'}}>
                    {item.comment}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('0.17'),
                  backgroundColor: 'black',
                }}></View>
            </View>
          ))}

          <View style={{padding: 10, alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setModalVisible(true);
                setModalType('comment');
                getPostComments(postDetails.id);
              }}>
              <Neomorph
                inner
                lightShadowColor="#000"
                style={{
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowRadius: 5,
                  shadowOpacity: 1,
                  borderRadius: 15,
                  backgroundColor: '#1A1A1A',
                  width: wp(90),
                  height: hp(6),
                  alignItems: 'center',
                }}>
                <Neomorph
                  inner
                  swapShadows
                  style={{
                    shadowColor: '#3A3A3A',
                    shadowOffset: {width: 0, height: 0},
                    shadowRadius: 5,
                    shadowOpacity: 0.15,
                    borderRadius: 15,
                    backgroundColor: 'transparent',
                    width: wp(90),
                    height: hp(6),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: wp(4),
                  }}>
                  <Text style={{color: 'white'}}>Write Comment</Text>
                </Neomorph>
              </Neomorph>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={deleteModalVisible}
          customBackdrop={
            <TouchableWithoutFeedback
              onPress={() => setDeleteModalVisible(false)}>
              <View style={{flex: 1, backgroundColor: 'black'}} />
            </TouchableWithoutFeedback>
          }>
          <CustomAlert
            onAdd={() => {
              deletePost(postDetails.id);
            }}
            onCancel={() => {
              setDeleteModalVisible(false);
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
        {/* MODAL START FOR LIKE,COMMENT,SHARE  */}
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
            setCommentText('');
          }}
          // propagateSwipe={true}

          styles={{
            height: hp(30),
            justifyContent: 'flex-end',
            backgroundColor: '#1A1A1A',

            // top: 0,
            // right: 0,
            // left: 0,
            // bottom: 1,
          }}
          swipeDirection="down">
          {modalType === 'like' ? (
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
                    <Text style={{fontSize: wp(5), color: '#ffffff'}}>
                      Likes
                    </Text>
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
                      data={likeData}
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
                                  <TouchableOpacity>
                                    <View
                                      style={{
                                        alignItems: 'center',
                                        marginRight: 10,
                                        marginTop: -10,
                                      }}>
                                      {item.follow_status === 0 ? (
                                        // <SmallColorButton
                                        //   onPress={() => {
                                        //     followUser(item.id);
                                        //   }}
                                        //   buttonColor={'#AB0404'}
                                        //   buttonText={
                                        //     item.follow_status === 0
                                        //       ? 'Follow'
                                        //       : 'unfollow'
                                        //   }
                                        // />
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
                                      ) : null}
                                    </View>
                                  </TouchableOpacity>
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
          ) : modalType === 'comment' ? (
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
                    <Text style={{fontSize: wp(5), color: '#ffffff'}}>
                      Comment
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        style={{width: wp(7), height: wp(7)}}
                        source={require('../../assets/Images/Home/Comment.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: wp(100),
                    height: hp(0.1),
                    backgroundColor: 'black',
                  }}></View>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  style={{backgroundColor: '#1A1A1A'}}>
                  <TouchableOpacity activeOpacity={1}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{backgroundColor: '#1A1A1A'}}
                      data={commentData}
                      keyExtractor={item => item.key}
                      renderItem={({item}) => (
                        // <TouchableOpacity activeOpacity={0.5}>
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
                              toggleModal();
                              touchStart = 0;
                              if (item.status === true) {
                                toggleModalDeleteComment();
                                setCommentId(item.Comment_id);
                              }
                            }
                          }}
                          style={{backgroundColor: '#1A1A1A'}}>
                          <TouchableOpacity onPress={() => {}}>
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
                                <View>
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
                                      marginLeft: wp('1%'),
                                      fontSize: wp(2.7),
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
                                    <Text
                                      style={{
                                        fontSize: wp(2.5),
                                        color: '#ffffff',
                                      }}>
                                      {item.created_at}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>

                          <View
                            style={{
                              backgroundColor: 'black',
                              width: '100%',
                              height: hp(0.2),
                            }}></View>
                        </View>
                        // </TouchableOpacity>
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
                    width="85%"
                    placeholder={'comment'}
                    placeholderTextColor="#BDBDBD"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (commentText !== '') {
                        const res = postComment({
                          id: postDetails.id,
                          comment: commentText,
                        });
                        if (res) {
                          setCommentText('');
                        }
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
          ) : modalType === 'share' ? (
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
                    <Text style={{fontSize: wp(5), color: '#ffffff'}}>
                      Share
                    </Text>
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
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={likeData}
                  keyExtractor={item => item.key}
                  renderItem={({item}) => (
                    <TouchableOpacity activeOpacity={1}>
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
                                  uri: 'https://source.unsplash.com/random',
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
              </View>

              {/* <Button title="Hide modal" onPress={toggleModal} /> */}
            </View>
          ) : null}
        </Modal>
        {/* MODAL END FOR LIKE,COMMENT,SHARE  */}
        {/* delete Comment Modal         */}
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
              toggleModalDeleteComment();
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
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loader />
  );
};
export default ViewPost;
