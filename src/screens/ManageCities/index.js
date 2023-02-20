import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import Modal from 'react-native-modal';
import {Header, InputText, CustomAlert, SmallButton} from '@components';
import CheckBox from 'react-native-check-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import config from '../../config';
import styles from './Styles';
import HeadWrapper from '../../components/HeadWrapper';
const ManageCities = props => {
  const {navigation, route} = props;
  const [city, setCity] = useState('');
  const [flatListMode, setFlatListMode] = useState('normal');
  const [countries, setCountries] = useState([
    {
      key: '1',
      countryName: 'Indore',
      checked: false,
    },

    {
      key: '2',
      countryName: 'Bhopla',
      checked: false,
    },
    {
      key: '3',
      countryName: 'Gwalior',
      checked: false,
    },
    {
      key: '4',
      countryName: 'Jawalpur',
      checked: false,
    },
    {
      key: '5',
      countryName: 'Bina',
      checked: false,
    },
    {
      key: '6',
      countryName: 'Betul',
      checked: false,
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const setToggleCheckBox = key => {
    setCountries(
      countries.map(item =>
        item.key === key ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteItems = () => {
    setCountries(countries.filter(item => item.checked !== true));
    setFlatListMode('normal');
  };
  return (
    <View style={styles.containerFx}>
      {flatListMode == 'delete' ? (
        <View style={{marginBottom: hp(2)}}>
          <Neomorph
            inner
            lightShadowColor="#000"
            style={{...styles.NeomorphContainer, width: wp(100)}}>
            <Neomorph
              inner
              swapShadows
              style={{...styles.NeomorphStyle, width: wp(100)}}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{marginLeft: wp(4)}}
                  onPress={() => {
                    setCountries(
                      countries.map(item => ({...item, checked: false})),
                    );
                    setFlatListMode('normal');
                  }}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
                <SmallButton
                  width={11}
                  height={5.5}
                  onPress={() => {
                    if (
                      countries.filter(item => item.checked === true).length > 0
                    ) {
                      Alert.alert('Delete items!', 'My Alert Msg', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deleteItems()},
                      ]);
                    }
                  }}
                  innerComponent={() => (
                    <Image
                      style={{width: wp(5), height: wp(5)}}
                      source={require('../../assets/Images/Home/Trash.png')}></Image>
                  )}
                />
              </View>
            </Neomorph>
          </Neomorph>
        </View>
      ) : (
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/ManageCities/location.png')}
          rightIcon={require('../../assets/Images/ManageInterest/add.png')}
          RightSecondIcon={require('../../assets/Images/Home/Trash.png')}
          onClickRightSecondIcon={() => setFlatListMode('delete')}
          onClickLeftIcon={() => navigation.goBack()}
          onClickRightIcon={() => setModalVisible(!isModalVisible)}
          centerText={'Manage Cities'}
          centerTextStyle={{paddingLeft: wp(2)}}
        />
      )}
      <View>
        <FlatList
          data={countries}
          showsHorizontalScrollIndicator={false}
          style={{width: wp('100%')}}
          keyExtractor={item => {
            item.key;
          }}
          renderItem={({item}) => (
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: wp(0.4),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => console.log('onpress')}>
                <Text style={styles.tvStyles}>{item.countryName}</Text>
              </TouchableOpacity>
              {flatListMode === 'delete' && (
                <View style={{paddingRight: wp(5)}}>
                  <CheckBox
                    disabled={false}
                    isChecked={item.checked}
                    onClick={newValue => setToggleCheckBox(item.key)}
                    checkBoxColor="white"
                  />
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={{height: hp('40%')}}>
        <Button title="Show modal" onPress={toggleModal} />

        <Modal backdropOpacity={0.2} isVisible={isModalVisible}>
          <CustomAlert
            firstButtonColor={'#DC4848'}
            secondButtonColor={'#219653'}
            onAdd={() => {
              if (city !== '') {
                setCountries([
                  ...countries,
                  {
                    key: countries.length + 1,
                    countryName: city,
                    checked: false,
                  },
                ]);
                setCity('');
                setModalVisible(false);
              }
            }}
            onCancel={() => {
              setModalVisible(false);
              setCity('');
            }}
            innerComponent={() => (
              <View style={{marginVertical: hp(2)}}>
                <InputText
                  value={city}
                  onChangeText={text => {
                    setCity(text.trim());
                  }}
                  height={6}
                  width={85}
                  placeholder="Enter City"
                  placeholderTextColor="rgba(255, 254, 254, 0.5)"
                />
              </View>
            )}
          />
        </Modal>
      </View>
    </View>
  );
};

export default ManageCities;
