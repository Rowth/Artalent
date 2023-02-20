import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput as TextInput2,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {Text, TextInput, Header, BottomAlert, CustomAlert} from '@components';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const EditInterest = props => {
  const {navigation, route} = props;
  const [modalType, setModalType] = useState('add');
  const [modalVisible, setModalVisible] = useState(false);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 'bd7acbe-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Fourth Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '3ac68af-c605-48d3-a4f8-fbd91aa97f63',
      title: 'fifth Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '58694a0-3da1-471f-bd96-145571e29d72',
      title: 'Sixth Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '3ac6af-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Seven Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      id: '5894a0-3da1-471f-bd96-145571e29d72',
      title: 'Eight Item',
      image:
        'https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNlb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'black'}}>
        <View>
          <View style={{}}>
            <Header
              leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
              centerIcon={require('../../assets/Images/ManageInterest/wallpaper.png')}
              rightIcon={require('../../assets/Images/ManageInterest/add.png')}
              RightSecondIcon={require('../../assets/Images/Home/Trash.png')}
              onClickRightSecondIcon={() => {
                setModalType('delete');
                setModalVisible(true);
              }}
              onClickLeftIcon={() => navigation.goBack()}
              onClickRightIcon={() => {
                setModalType('add');
                setModalVisible(true);
              }}
              centerText={'Edit interest'}
            />
          </View>
          {/* <View style={{ backgroundColor: '#1A1A1A', }}> */}
          <FlatList
            contentContainerStyle={{
              paddingBottom: 60,
              backgroundColor: '#1A1A1A',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            numColumns={2}
            data={DATA}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'red',
                  height: hp(25),
                  width: wp(45),
                  margin: hp(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Image
                  style={{borderRadius: 10, height: hp(25), width: wp(45)}}
                  source={{uri: item.image}}></Image>
                <View
                  zIndex={1000}
                  style={{
                    height: hp(25),
                    width: wp(45),
                    position: 'absolute',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text style={{color: '#E0E0E0', fontSize: wp(4)}}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
          {/* </View> */}
        </View>
        {modalType === 'delete' && (
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
                <Text style={{marginTop: hp(4), marginBottom: hp(2)}}>
                  Are you sure you want to delete ?
                </Text>
              )}
            />
          </Modal>
        )}
        {modalType === 'add' && (
          <Modal
            isVisible={modalVisible}
            customBackdrop={
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={{flex: 1, backgroundColor: 'black'}} />
              </TouchableWithoutFeedback>
            }>
            <BottomAlert
              headingText={'Change icon'}
              onClickCornerButton={() => setModalVisible(false)}
            />
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditInterest;
