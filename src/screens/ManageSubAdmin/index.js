import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from './styles';
import {Header, CustomAlert, InputText} from '@components';
import {Neomorph} from 'react-native-neomorph-shadows';

const ManageSubAdmin = props => {
  const {navigation, route} = props;
  const [flatListMode, setFlatListMode] = useState('normal');
  const [deleteId, setDeleteId] = useState(null);
  const [name, setnames] = useState([
    {
      key: '1',
      name: 'Shivani',
    },
    {
      key: '2',
      name: 'Akrati',
    },
    {
      key: '3',
      name: 'Akshay',
    },
    {
      key: '4',
      name: 'Blackmilk',
    },
    {
      key: '5',
      name: 'Rachel',
    },
    {
      key: '6',
      name: 'Rohit',
    },
    {
      key: '7',
      name: 'Shivani',
    },
    {
      key: '8',
      name: 'Rachel',
    },
    {
      key: '9',
      name: 'Akshay',
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const setToggleCheckBox = key => {
    setnames(
      name.map(item =>
        item.key === key ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const toggleModal = key => {
    setModalVisible(!isModalVisible);
    setDeleteId(key);
  };
  const deleteItems = () => {
    setnames(name.filter(item => item.key !== true));
    setFlatListMode('normal');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={Styles.bodyStyle}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/ManageSubAdmin/UserCircleGear.png')}
          onClickLeftIcon={() => navigation.goBack()}
          // onClickRightIcon={() => setModalVisible(!isModalVisible)}
          centerText={'Manage Sub Admin'}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={name}
          contentContainerStyle={{
            width: wp('100%'),
            height: hp('100%'),
            flex: 1,
          }}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(5),
                    color: '#FFFEFE',
                    opacity: 0.5,
                    paddingHorizontal: wp(5),
                    paddingVertical: 5,
                  }}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal(item.key);
                  }}>
                  <Image
                    style={{height: wp(12), width: wp(12)}}
                    source={require('../../assets/Images/ManageSubAdmin/add.png')}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  height: hp(0.15),
                  backgroundColor: 'black',
                }}></View>
            </View>
          )}
        />
        <View
          style={{
            justifyContent: 'center',
            width: wp('100%'),

            alignItems: 'center',
            paddingBottom: wp(4),
          }}>
          <TouchableOpacity>
            <Neomorph
              lightShadowColor="#3A3A3A"
              style={Styles.NeomorphButtonContainer}>
              <Neomorph style={Styles.NeomorphButtonStyle}>
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#219653',
                    alignItems: 'center',
                    height: hp('2.5%'),
                    width: wp('20%'),
                    borderRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                    }}>
                    {props.secondButtonText ? props.secondButtonText : 'Add'}
                  </Text>
                </View>
              </Neomorph>
            </Neomorph>
          </TouchableOpacity>
        </View>

        <Modal backdropOpacity={0.2} isVisible={isModalVisible}>
          <CustomAlert
            firstButtonText={'Cancel'}
            secondButtonText={'Remove'}
            onAdd={() => {
              if (deleteId !== null) {
                setnames(name.filter(item => item.key !== deleteId));
                setDeleteId(null);
              }
              setModalVisible(false);
            }}
            onCancel={() => {
              setModalVisible(false);
            }}
            innerComponent={() => (
              <View style={{marginVertical: hp(3)}}>
                <Text style={{fontSize: wp(4.5), color: '#F2F2F2'}}>
                  Are you sure you want to remove ?
                </Text>
              </View>
            )}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default ManageSubAdmin;
