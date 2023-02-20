import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
import {
  Text,
  TextInput,
  Feed,
  Header,
  LongHeader,
  SmallButton,
  CustomAlert,
  Loader,
} from '@components';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {onLogout, onLogin} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, {types} from 'react-native-document-picker';
import {RNS3} from 'react-native-aws3';
import Sound from 'react-native-sound';
import {Axios, URL, tokenInvalid} from '@config';
const MusicLibrary = props => {
  // console.log(props);
  const [search, setSearch] = useState('');
  const {navigation, route} = props;
  const [startLoader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [playStatus, setPlayStatus] = useState(false);
  const [songNumber, setSongNumber] = useState(null);
  const [musicData, setMusicData] = useState([]);
  const [chipType, setChipType] = useState('');
  const [repeatStatus, setRepeatStatus] = useState(false);
  const [shuffleStatus, setShuffleStatus] = useState(false);
  const [chipData, setChipData] = useState([
    {
      key: 1,
      data: 'All',
      musicType: '',
    },
    {
      key: 2,
      data: 'Songs',
      musicType: 'my_music',
    },
    {
      key: 3,
      data: 'My Playlist',
      musicType: '',
    },
  ]);
  var whoosh = useRef(
    new Sound('preet.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('music');
    }),
  );
  const PostMusic = async (responseLocal, responseAws) => {
    const {name} = responseLocal;
    const {location} = responseAws?.body?.postResponse;
    console.log(name, location);
    let body = {
      name: name,
      uri: location,
    };
    if (!name || !location) {
      Alert.alert('song not found');
    } else {
      const res = await Axios({
        method: 'post',
        url: URL.POST_MUSIC,
        data: body,
      });
      if (res.data.status === 200) {
        Alert.alert('Audio Uploaded Succesfully');
        GetMusic();
      } else if (res.data.status === 401) {
        tokenInvalid({navigation});
      }
    }
  };
  const getCheckedMusicData = () => {
    const musicIdData = musicData
      .filter(item => item.checked)
      .map(item => item.id);
    return musicIdData;
  };
  const deleteMusic = async () => {
    const musicIdData = getCheckedMusicData();
    const res = await Axios({
      method: 'post',
      url: URL.DELETE_MUSIC,
      data: {music_id: musicIdData},
    });
    if (res.data.status === 200) {
      // GetMusic();
      console.log(musicIdData);
      setMusicData(
        musicData.filter((itemx, indexz) => {
          console.log(itemx.id in musicIdData, itemx.id);
          if (musicIdData.indexOf(itemx.id) !== -1) {
            if (songNumber === indexz) {
              whoosh.current.stop();
              whoosh.current.release();
              setPlayStatus(false);
            }
            return false;
          } else {
            return true;
          }
        }),
      );
    }
  };
  const GetMusic = async () => {
    const res = await Axios({
      method: 'get',
      url:
        search === ''
          ? `${URL.GET_MUSIC}?type=${chipType}`
          : `${URL.SEARCH_MUSIC}?search_key=${search}`,
    });
    if (res.data.status === 200) {
      console.log(res.data);

      setMusicData(
        res.data.music_list.map((item, index) => ({
          isRequired: false,
          id: item.id,
          song: item.uri,
          title: item.name, //item.name,
          icon: require('../../assets/Images/MusicLibrary/music.png'),
          checked: false,
          download: true,
          active:
            songNumber !== null
              ? songNumber + 1 === index
                ? true
                : false
              : false,
        })),
      );
      console.log(musicData);
      // {
      //   id: 1,
      //   icon: require('../../assets/Images/MusicLibrary/music.png'),
      //   title: 'On my way - Alan walker....',
      //   download: true,
      //   checked: false,
      //   song: require('../../assets/song/tandav.mp3'),
      //   isRequired: true,
      // },
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    }
  };
  const musicUploadOnAws = async data => {
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
      name: data.name,
      type: data.type,
    };

    try {
      const rest = await RNS3.put(file, options);
      return rest;
      // console.log(rest);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const onClickUpload = async () => {
    let response;

    try {
      response = await DocumentPicker.pickMultiple({
        presentationStyle: 'fullScreen',
        type: [types.audio],
        allowMultiSelection: true,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    if (response) {
      Alert.alert('Are you sure you want to upload Music !', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setLoader(true);
            const allMusicUploadPromises = response.map(item =>
              musicUploadOnAws(item),
            );
            console.log(allMusicUploadPromises);
            Promise.all(allMusicUploadPromises).then(res => {
              console.log('this', res);
              console.log(response);
              setLoader(false);
              PostMusic(response[0], res[0]);
            });
          },
        },
      ]);
    }
  };
  const playSound = () => {
    console.log(songNumber, 'playsi');
    if (songNumber !== null) {
      setPlayStatus(!playStatus);
      // Sound.setCategory('Playback');
      console.log(whoosh, playStatus);
      if (playStatus) {
        console.log('stop music');
        whoosh.current.pause(() => {});
      } else {
        console.log(whoosh);
        setSound();
        setMusicData(
          musicData.map((item, indexd) =>
            indexd === songNumber
              ? {...item, active: true}
              : {...item, active: false},
          ),
        );
      }
    } else {
      setSongNumber(0);
    }
  };
  const setSound = () => {
    if (songNumber != null) {
      console.log('setsound', whoosh.current);
      whoosh.current.stop();
      whoosh.current.release();
      console.log(whoosh.current, 'chandanhkhkhk');
      setPlayStatus(false);
      if (musicData.length > 0) {
        if (musicData[songNumber].isRequired) {
          console.log(musicData[songNumber].song, 'active', songNumber);
          whoosh.current = new Sound(musicData[songNumber].song, error => {
            console.log('cmcmcm');
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            setMusicData(
              musicData.map((item, indexd) =>
                indexd === songNumber
                  ? {...item, active: true}
                  : {...item, active: false},
              ),
            );
            // loaded successfully
            console.log(
              'duration in seconds: ' +
                whoosh.current.getDuration() +
                'number of channels: ' +
                whoosh.current.getNumberOfChannels(),
            );

            // Play the sound with an onEnd callback
            setPlayStatus(true);
            whoosh.current.play(success => {
              if (success) {
                console.log('successfully finished playingzz');
                if (repeatStatus) {
                  setSongNumber(songNumber);
                } else if (shuffleStatus) {
                  let randomSong = Math.floor(Math.random() * musicData.length);
                  setSongNumber(randomSong);
                  setMusicData(
                    musicData.map((item, indexd) =>
                      indexd === randomSong
                        ? {...item, active: true}
                        : {...item, active: false},
                    ),
                  );
                } else {
                  console.log('ckckck');
                  let songIndex =
                    songNumber === musicData.length - 1 ? 0 : songNumber + 1;
                  setSongNumber(songIndex);
                  console.log('ckckck', songIndex);
                  setMusicData(
                    musicData.map((item, indexd) =>
                      indexd === songIndex
                        ? {...item, active: true}
                        : {...item, active: false},
                    ),
                  );
                }
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          });
        } else {
          whoosh.current = new Sound(
            musicData[songNumber].song,
            Sound.MAIN_BUNDLE,
            error => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }
              // loaded successfully
              console.log(
                'duration in seconds: ' +
                  whoosh.current.getDuration() +
                  'number of channels: ' +
                  whoosh.current.getNumberOfChannels(),
              );
              // Play the sound with an onEnd callback
              setPlayStatus(true);
              whoosh.current.play(success => {
                if (success) {
                  console.log('successfully finished playingyy');
                  // setSongNumber(
                  //   songNumber === musicData.length - 1 ? 0 : songNumber + 1,
                  // );
                  if (repeatStatus) {
                    setSongNumber(songNumber);
                  } else if (shuffleStatus) {
                    let randomSong = Math.floor(
                      Math.random() * musicData.length,
                    );
                    setSongNumber(randomSong);
                    setMusicData(
                      musicData.map((item, indexd) =>
                        indexd === randomSong
                          ? {...item, active: true}
                          : {...item, active: false},
                      ),
                    );
                  } else {
                    let songIndex =
                      songNumber === musicData.length - 1 ? 0 : songNumber + 1;
                    setSongNumber(songIndex);

                    setMusicData(
                      musicData.map((item, indexd) =>
                        indexd === songIndex
                          ? {...item, active: true}
                          : {...item, active: false},
                      ),
                    );
                  }
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            },
          );
        }
      }
    }
  };
  const buttonData = [
    {
      image: require('../../assets/Images/MusicLibrary/SkipBack.png'),
      onPress: () => {
        let songIndex =
          songNumber === 0 ? musicData.length - 1 : songNumber - 1;
        setSongNumber(songIndex);
        setMusicData(
          musicData.map((item, indexd) =>
            indexd === songIndex
              ? {...item, active: true}
              : {...item, active: false},
          ),
        );
      },
    },
    {
      image: require('../../assets/Images/MusicLibrary/Shuffle.png'),
      onPress: () => setShuffleStatus(!shuffleStatus),
    },
    {
      image: playStatus
        ? require('../../assets/Images/MusicLibrary/playgradient.png')
        : require('../../assets/Images/MusicLibrary/pausegradient.png'),
      onPress: () => playSound(),
    },
    {
      image: require('../../assets/Images/MusicLibrary/Repeat.png'),
      onPress: () => setRepeatStatus(!repeatStatus),
    },
    {
      image: require('../../assets/Images/MusicLibrary/SkipForward.png'),
      onPress: () => {
        let songIndex =
          songNumber === musicData.length - 1 ? 0 : songNumber + 1;
        setSongNumber(songIndex);
        setMusicData(
          musicData.map((item, indexd) =>
            indexd === songIndex
              ? {...item, active: true}
              : {...item, active: false},
          ),
        );
      },
    },
  ];
  console.log(songNumber);
  useEffect(() => {
    setSound();
  }, [songNumber]);
  useEffect(() => {
    GetMusic();
  }, [search]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {startLoader === true ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000',
          }}>
          <LongHeader
            leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
            centerIcon={require('../../assets/Images/MusicLibrary/MusicNotesSimple.png')}
            centerText={'Music'}
            rightIcon={require('../../assets/Images/ManageInterest/add.png')}
            secondRightIcon={require('../../assets/Images/Home/Trash.png')}
            onClickLeftIcon={() => navigation.goBack()}
            onClickRightSecondIcon={() => {
              if (getCheckedMusicData().length > 0) {
                setModalVisible(true);
              } else {
                Alert.alert('Please Select Music!');
              }
            }}
            onClickRightIcon={async () => {
              onClickUpload();
            }}
            innerComponent={() => (
              <View style={{}}>
                <TextInput
                  placeholderTextColor="#828282"
                  borderRadius={12}
                  rightIcon={require('../../assets/Images/MusicLibrary/search.png')}
                  value={search}
                  onChangeText={text => {
                    setSearch(text.trim());
                    setMusicData([]);
                  }}
                  placeholder="Search"
                  width={80}
                  height={6}
                  TextInputStyle={{
                    width: '100%',
                    color: 'white',
                  }}></TextInput>
              </View>
            )}
          />
          <View style={{flex: 1, backgroundColor: '#1A1A1A'}}>
            <View>
              <FlatList
                data={chipData}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: hp(1),
                  marginHorizontal: wp(2),
                  paddingRight: wp(2),
                }}
                horizontal={true}
                renderItem={({item}) => (
                  <View style={{marginHorizontal: wp(1)}}>
                    <SmallButton
                      borderRadius={20}
                      width={30}
                      onPress={() => {
                        setChipType(item.musicType);
                        console.log(chipType);
                        GetMusic();
                      }}
                      innerComponent={() => (
                        <Text numberOfLines={1}>{item.data}</Text>
                      )}></SmallButton>
                  </View>
                )}
                keyExtractor={(item, index) => `feed_${index}`}
              />
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={musicData}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: hp(1),
                  marginHorizontal: wp(2),
                }}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSongNumber(index);
                      setPlayStatus(true);
                      setMusicData(
                        musicData.map((item, indexd) =>
                          indexd === index
                            ? {...item, active: true}
                            : {...item, active: false},
                        ),
                      );
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: wp(2),
                        paddingVertical: hp(2),
                        borderBottomColor: '',
                        borderBottomWidth: 2,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.active ? (
                          <Image
                            style={{width: wp(5), height: wp(5)}}
                            source={require('../../assets/Images/MusicLibrary/music2.png')}></Image>
                        ) : (
                          <Image
                            style={{width: wp(5), height: wp(5)}}
                            source={require('../../assets/Images/MusicLibrary/music.png')}></Image>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          paddingLeft: wp(3),
                          justifyContent: 'center',

                          alignItems: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: item.active ? '#EB5757' : '#828282',
                            fontSize: 15,
                            flex: 1,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',

                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        {item.download !== undefined ? (
                          <Neomorph
                            darkShadowColor="black" // <- set this
                            lightShadowColor="white" // <- this
                            // inner // <- enable shadow inside of neomorph
                            swapShadows // <- change zIndex of each shadow color
                            style={{
                              shadowRadius: 6,
                              borderRadius: 8,
                              backgroundColor: '#1A1A1A',
                              width: wp(8),
                              height: hp(4),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.download ? (
                              <TouchableOpacity>
                                <Image
                                  style={{width: wp(5), height: wp(5)}}
                                  source={require('../../assets/Images/MusicLibrary/checkbox.png')}></Image>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity>
                                <Image
                                  style={{width: wp(5), height: wp(5)}}
                                  source={require('../../assets/Images/MusicLibrary/DownloadSimple.png')}></Image>
                              </TouchableOpacity>
                            )}
                          </Neomorph>
                        ) : null}
                        {item.checked !== undefined ? (
                          <View style={{marginLeft: wp(4)}}>
                            <Neomorph
                              darkShadowColor="black" // <- set this
                              lightShadowColor="white" // <- this
                              // inner // <- enable shadow inside of neomorph
                              swapShadows // <- change zIndex of each shadow color
                              style={{
                                shadowRadius: 6,
                                borderRadius: 8,
                                backgroundColor: '#1A1A1A',
                                width: wp(8),
                                height: hp(4),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <CheckBox
                                disabled={false}
                                isChecked={item.checked}
                                onClick={
                                  newValue => {}
                                  // setMusicData(
                                  //   musicData.map(items =>
                                  //     items.id === item.id
                                  //       ? {...items, checked: !items.checked}
                                  //       : items,
                                  //   ),
                                  // )
                                }
                                checkedImage={
                                  <TouchableOpacity
                                    onPress={() => {
                                      setMusicData(
                                        musicData.map(items =>
                                          items.id === item.id
                                            ? {
                                                ...items,
                                                checked: !items.checked,
                                              }
                                            : items,
                                        ),
                                      );
                                    }}>
                                    <Image
                                      style={{width: wp(5), height: wp(5)}}
                                      source={require('../../assets/Images/MusicLibrary/checkbox2.png')}
                                    />
                                  </TouchableOpacity>
                                }
                                unCheckedImage={
                                  <TouchableOpacity
                                    onPress={() => {
                                      setMusicData(
                                        musicData.map(items =>
                                          items.id === item.id
                                            ? {
                                                ...items,
                                                checked: !items.checked,
                                              }
                                            : items,
                                        ),
                                      );
                                    }}>
                                    <Image
                                      style={{width: wp(5), height: wp(5)}}
                                      source={require('../../assets/Images/MusicLibrary/checkbox1.png')}
                                    />
                                  </TouchableOpacity>
                                }
                              />
                            </Neomorph>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `feed_${index}${item.id}`}
              />
            </View>
            <View
              style={{
                width: wp(100),
                height: hp(8),
                backgroundColor: '#1A1A1A',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: wp(5),
              }}>
              {buttonData.map((item, index) =>
                index === 2 ? (
                  <TouchableOpacity
                    onPress={item.onPress ? () => item.onPress() : () => {}}>
                    <View>
                      <Image
                        style={{
                          width: wp(18),
                          height: wp(18),
                          resizeMode: 'contain',
                          marginBottom: wp(3),
                          marginHorizontal: wp(-2),
                        }}
                        source={item.image}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <SmallButton
                      width={13}
                      height={6}
                      borderRadius={20}
                      onPress={item.onPress ? () => item.onPress() : () => {}}
                      innerComponent={() => (
                        <Image
                          style={{width: wp(4), height: wp(4)}}
                          source={item.image}></Image>
                      )}></SmallButton>
                  </View>
                ),
              )}
            </View>
            <View></View>
          </View>
        </View>
      )}

      <Modal
        isVisible={modalVisible}
        customBackdrop={
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{flex: 1, backgroundColor: 'black'}} />
          </TouchableWithoutFeedback>
        }>
        <CustomAlert
          onAdd={() => {
            deleteMusic();
            setModalVisible(false);
          }}
          secondButtonText="Delete"
          onCancel={() => {
            setModalVisible(false);
          }}
          innerComponent={() => (
            <Text style={{marginTop: hp(4), marginBottom: hp(2)}}>
              Are you sure you want to delete ?
            </Text>
          )}
        />
      </Modal>
    </SafeAreaView>
  );
};
export default MusicLibrary;
