import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Style from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FeedHeader, Header, InputText, CustomAlert} from '@components';
import Modal from 'react-native-modal';
const Comments = props => {
  const {navigation, route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        centerIcon={require('../../assets/Images/Comments/chat-alt.png')}
        // rightIcon={require('../../assets/Images/ManageInterest/add.png')}
        // RightSecondIcon={require('../../assets/Images/Home/Trash.png')}
        // onClickRightSecondIcon={() => setFlatListMode('delete')}
        onClickLeftIcon={() => navigation.goBack()}
        // onClickRightIcon={() => setModalVisible(!isModalVisible)}
        centerText={'Comments'}
      />
      <ScrollView
        style={{
          flex: 1,
          height: hp('100%'),
          width: wp('100%'),
          backgroundColor: '#1A1A1A',
        }}>
        <View style={Style.body}>
          <View style={{marginTop: hp(2)}}>
            <FeedHeader onClickDelete={() => setModalVisible(true)} />
          </View>

          <View style={{marginTop: 5}}>
            <Image
              style={{height: hp(65), width: '100%', resizeMode: 'cover'}}
              source={require('../../assets/Images/feedImage.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                marginHorizontal: 7,
              }}>
              <Image
                style={{width: wp(5), height: wp(5), margin: 5}}
                source={require('../../assets/Images/Home/thumb-up.png')}
              />
              <Text style={{color: 'rgba(255,255,255,0.5)'}}>152</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{width: wp(5), height: wp(5), margin: 5}}
                source={require('../../assets/Images/Home/chat-alt.png')}
              />
              <Text style={{color: 'rgba(255,255,255,0.5)'}}>152</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: wp(5),
                  height: wp(5),
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
                source={require('../../assets/Images/Home/send.png')}
              />
            </View>
          </View>

          <View>
            <Text style={{color: 'rgba(189, 189, 189, 1)', padding: 15}}>
              description of the video.....
            </Text>
          </View>
          <View
            style={{
              height: 0.6,
              backgroundColor: 'rgba(189, 189, 189, 1)',
              width: wp('100%'),
            }}></View>

          <View
            style={{flexDirection: 'row', padding: 12, alignItems: 'center'}}>
            <Image
              style={{width: wp(12), height: wp(12), borderRadius: wp(6)}}
              source={{
                uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Fusionik production
              </Text>
              <Text style={{color: 'rgba(189, 189, 189, 1)'}}>hi</Text>
            </View>
          </View>
          <View
            style={{
              width: wp('100%'),
              height: hp('0.17'),
              backgroundColor: 'black',
            }}></View>
          <View
            style={{flexDirection: 'row', padding: 12, alignItems: 'center'}}>
            <Image
              style={{width: wp(12), height: wp(12), borderRadius: wp(6)}}
              source={{
                uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Nikhil soni
              </Text>
              <Text style={{color: 'rgba(189, 189, 189, 1)'}}>hi</Text>
            </View>
          </View>
          <View
            style={{
              width: wp('100%'),
              height: hp('0.17'),
              backgroundColor: 'black',
            }}></View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <InputText
              height="6"
              width="90%"
              placeholder={'Write Message'}
              placeholderTextColor="rgba(189,189,189,0.2)"
            />
          </View>
        </View>
        <Modal
          isVisible={modalVisible}
          customBackdrop={
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={{flex: 1, backgroundColor: 'black'}} />
            </TouchableWithoutFeedback>
          }>
          <CustomAlert
            onCancel={() => {
              setModalVisible(false);
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
  );
};
export default Comments;
