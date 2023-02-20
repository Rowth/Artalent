import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useState, memo} from 'react';
import Swiper from 'react-native-swiper';
import styles from './styles';
import Share from 'react-native-share';
import {Helper, Axios, URL} from '@config';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AdvertisementPost = props => {
  const item = props.data;
  console.log('AdvertiseMent', props);
  const {
    setModalVisible,
    setModalType,
    postLike,
    setCommentPostDetail,
    getPostLikes,
    getPostComments,
    goToProfile,
  } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [showStatus, setShowStatus] = useState(true);
  const imageData = item.image;
  const deleteAdv = async id => {
    const body = new FormData();
    body.append('ad_id', id);
    const res = await Axios({
      method: 'post',
      url: URL.DELETE_ADVERTISEMENT,
      data: body,
    });
    if (res.data.status === 200) {
      setShowStatus(false);
    }
  };
  // console.log(item);
  return showStatus ? (
    <View>
      <NeomorphFlex
        darkShadowColor="grey" // <- set this
        lightShadowColor="grey" // <- this
        style={{
          shadowOffset: {width: 3, height: 3},
          shadowOpacity: 0.1, // <- and this or yours opacity
          shadowRadius: 3,
          backgroundColor: '#1A1A1A',
          shadowColor: 'grey',
          padding: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp(0.7),
          // borderRadius: 10,
        }}>
        <View>
          <View
            style={{
              padding: wp(5),
              marginTop: hp(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <NeomorphFlex
                darkShadowColor="black" // <- set this
                lightShadowColor="black" // <- this
                style={{
                  shadowOffset: {width: 3, height: 3},
                  shadowOpacity: 0.3, // <- and this or yours opacity
                  shadowRadius: 1,
                  backgroundColor: 'transparent',
                  shadowColor: 'grey',
                  padding: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp(100),
                  // borderRadius: 10,
                }}>
                <NeomorphFlex
                  darkShadowColor="black" // <- set this
                  lightShadowColor="grey" // <- this
                  style={{
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.5, // <- and this or yours opacity
                    shadowRadius: 2,
                    backgroundColor: 'transparent',
                    shadowColor: 'black',
                    padding: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp(100),

                    // borderRadius: 10,
                  }}>
                  <TouchableOpacity onPress={() => console.log('')}>
                    <Image
                      style={{
                        height: wp(13),
                        width: wp(13),
                        borderRadius: wp(10),
                        marginTop: wp(0.5),
                        backgroundColor: 'white',
                      }}
                      source={{
                        uri:
                          item.user_image !== null
                            ? item.user_image
                            : 'data:image/png;base64,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',
                      }}
                    />
                  </TouchableOpacity>
                </NeomorphFlex>
              </NeomorphFlex>
              <View style={{paddingHorizontal: wp(3)}}>
                <Text style={{color: 'white'}}>{item.company_name}</Text>
                <Text style={{fontSize: wp(3), color: 'white'}}>
                  {item.sponsored}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  deleteAdv(item.id);
                }}>
                <Image
                  style={{width: wp(3.5), height: wp(3.5)}}
                  resizeMode={'cover'}
                  source={require('../../assets/Images/Home/deleteIc.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              height: hp(42),
              paddingHorizontal: wp(2),
              borderRadius: 15,
            }}>
            <Swiper
              key={item.id + 'sw'}
              loop={false}
              onIndexChanged={e => {
                console.log(e);
                setActiveTab(e);
              }}
              showsPagination={false}
              showsButtons={false}
              style={styles.wrapper}>
              {imageData.map((itemImage, index) => (
                <NeomorphFlex
                  darkShadowColor="black" // <- set this
                  lightShadowColor="white" // <- this
                  style={{
                    height: hp(42),
                    shadowRadius: 10,
                    borderRadius: 10,
                    shadowColor: 'grey',
                    backgroundColor: '#1A1A1A',
                  }}>
                  <View key={'#' + item.id + Math.random()} style={{}}>
                    <TouchableOpacity
                      onPress={async () => {
                        console.log(item.company_website);
                        try {
                          await Linking.openURL(item.company_website);
                        } catch (e) {
                          console.log(e);
                        }
                      }}>
                      <Image
                        resizeMode="cover"
                        style={{
                          width: '100%',
                          height: hp(40),
                          borderRadius: 10,
                        }}
                        source={{
                          uri: itemImage.image
                            ? itemImage.image
                            : `https://foodish-api.herokuapp.com/images/pizza/pizza${
                                index + 1
                              }.jpg`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </NeomorphFlex>
              ))}
            </Swiper>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                paddingHorizontal: wp(2.5),
                marginTop: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {imageData.length > 1 && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {imageData.map((item, index) => (
                    <View
                      style={{
                        width: wp(2),
                        height: wp(2),
                        borderRadius: wp('100%'),
                        backgroundColor:
                          index === activeTab ? '#AB0404' : '#ffffff',
                        marginHorizontal: wp(1),
                      }}></View>
                  ))}
                </View>
              )}
            </View>
            <View>
              <Text style={{color: 'white'}}>{item.date}</Text>
            </View>
          </View>

          <Text
            numberOfLines={3}
            style={{
              paddingHorizontal: wp(2),
              marginTop: hp(2),
              marginBottom: hp(2),
              color: 'white',
            }}>
            {item.description}
          </Text>
        </View>
      </NeomorphFlex>
    </View>
  ) : null;
};
export default memo(AdvertisementPost);
