import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header, SmallButton, CustomAlert} from '@components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {tokenInvalid, Axios, URL} from '@config';
const GetLikeView = ({likeData, setModalVisible}) => {
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
            justifyContent: 'center',
            width: wp('100%'),
            backgroundColor: '#1A1A1A',
            alignItems: 'center',
            padding: wp(5),
          }}>
          <View>
            <Text
              style={{
                fontSize: wp(4),
                color: '#ffffff',
              }}>{`Views(${likeData.length})`}</Text>
          </View>
          <View style={{position: 'absolute', left: wp(5)}}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                style={{width: wp(5), height: wp(5), resizeMode: 'contain'}}
                source={require('../../assets/Images/EditProfile/back.png')}
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
                          {`${item.first_name} ${item.last_name}`}
                        </Text>
                      </View>
                      {/* <View>
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
                      </View> */}
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
const OwnStory = props => {
  const {navigation, route} = props;
  console.log(route);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('delete');
  const [contestData, setContestData] = useState([]);
  const [curretIndex, setCurretIndex] = useState(0);
  const [likeData, setLikeData] = useState([]);
  const [loader, setLoader] = useState(0);
  const deleteOwnStory = async id => {
    let body = new FormData();
    body.append('story_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.DELETE_USER_STORY,
      data: body,
    });
    if (res?.data?.status === 200) {
      Alert.alert('Story Deleted');
      const afterDelete = contestData.filter(
        (item, index) => index !== curretIndex,
      );
      if (afterDelete.length > 0) {
        setContestData(afterDelete);
        console.log(
          contestData.length - 2 > curretIndex + 1
            ? curretIndex + 1
            : curretIndex - 1,
          curretIndex,
          contestData.length,
        );
        setCurretIndex(0);
        setLoader(0);
      } else {
        navigation.goBack();
      }

      route.params.getAllStory();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('can,t delete story');
    }
  };
  const getStoryViews = async id => {
    const res = await Axios({
      method: 'get',
      url: `${URL.GET_STORY_VIEWS}?story_id=${id}`,
    });
    if (res?.data?.status === 200) {
      setLikeData(res.data.story_views);
    }
  };
  console.log(contestData, curretIndex);
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
          if (modalVisible) {
            setLoader(prevState => {
              return prevState;
            });
          } else {
            setLoader(prevState => {
              return prevState + 0.5;
            });
          }
        }
      }, 10);

    return () => {
      clearInterval(Interval);
    };
  }, [loader, modalVisible]);

  console.log(loader, curretIndex);
  useEffect(() => {
    console.log(route.params.item.story);
    setContestData(route.params.item.story);
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
              key={index + '#'}
              style={{flex: 1, justifyContent: 'center', marginLeft: wp(1)}}>
              <View
                style={{
                  width: '100%',
                  height: hp(1),
                  backgroundColor: '#828282',
                  zindex: -1,
                  borderRadius: hp(0.5),
                }}
              />
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
                }}
              />
            </View>
          ))}
        </View>
        <View style={{padding: wp(1), zIndex: 100}}>
          <Text
            style={{alignSelf: 'flex-end', color: '#F2F2F2', fontSize: wp(3)}}>
            {route.params.item.story[curretIndex].date}
          </Text>
        </View>
        <View
          style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
          {contestData.length > 0 && (
            <View style={{flex: 1}}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                }}
                source={
                  contestData[curretIndex]?.image?.includes('amazonaws')
                    ? {uri: contestData[curretIndex].image}
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
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                zIndex: 1000,
                paddingHorizontal: hp(2),
              }}>
              {modalVisible === false ? (
                <SmallButton
                  onPress={() => {
                    setModalVisible(true);
                    setModalType('delete');
                    console.log('clicked');
                  }}
                  innerComponent={() => (
                    <Image
                      resizeMode="contain"
                      style={{width: wp(7), height: wp(7), elevation: hp(5)}}
                      source={require('../../assets/Images/Home/Trash.png')}
                    />
                  )}></SmallButton>
              ) : null}
            </View>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                width: '100%',
                alignItems: 'center',
                zIndex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  getStoryViews(contestData[curretIndex].id);
                  setModalVisible(true);
                  setModalType('getViewStory');
                }}>
                <Text
                  style={{
                    color: '#F2F2F2',
                  }}>{`Views(${route.params.item.story[curretIndex].view_count})`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        customBackdrop={
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{flex: 1, backgroundColor: 'black'}} />
          </TouchableWithoutFeedback>
        }>
        {modalType === 'delete' ? (
          <CustomAlert
            onCancel={() => {
              setModalVisible(false);
            }}
            onAdd={() => {
              setModalVisible(false);
              deleteOwnStory(contestData[curretIndex].id);
              console.log(contestData);
            }}
            secondButtonText={'delete'}
            innerComponent={() => (
              <Text
                style={{marginTop: hp(4), marginBottom: hp(2), color: 'white'}}>
                Are you sure you want to delete ?
              </Text>
            )}
          />
        ) : (
          <GetLikeView setModalVisible={setModalVisible} likeData={likeData} />
        )}
      </Modal>
    </SafeAreaView>
  );
};
export default OwnStory;
