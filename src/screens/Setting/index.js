import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, tokenInvalid} from '@config';
const Setting = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPrivateEnabled, setIsPrivateEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsPrivateEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled(previousState => !previousState);
  const [status, setStatus] = useState(0);
  const [privateStatus, setPrivateStatus] = useState(null);
  const {navigation, route} = props;
  const setNotification = async () => {
    let body = new FormData();
    body.append('notification_Show_status', status);
    const res = await Axios({
      method: 'post',
      url: URL.NOTIFICATION_STATUS,
      data: body,
    });
    if (res?.data?.status === 200) {
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('error');
    }
  };
  const setPrivateAcc = async () => {
    let body = new FormData();
    body.append('private_status', privateStatus);
    const res = await Axios({
      method: 'post',
      url: URL.SET_PRIVATE_ACC,
      data: body,
    });
    if (res?.data?.status === 200) {
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert(res?.data?.message);
    }
  };
  const getNotificationOnStatus = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.NOTIFICATION_ON,
    });
    if (res.data.status === 200) {
      setIsEnabled(res?.data?.notification_status);
      setIsPrivateEnabled(res?.data?.private_account_status);
    } else if (res.data.status === 401) {
      tokenInvalid({navigation});
    } else {
      Alert.alert('Server Error');
    }
  };
  useEffect(() => {
    getNotificationOnStatus();
  }, []);
  console.log(isEnabled, isPrivateEnabled);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyStyle}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/Setting/Gear.png')}
          onClickLeftIcon={() => navigation.goBack()}
          // onClickRightIcon={() => setModalVisible(!isModalVisible)}
          centerText={'Setting'}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(5),
              alignItems: 'center',
              marginBottom: 15,
              paddingTop: hp(2),
            }}>
            <Text style={{color: 'white', fontSize: wp(4)}}>Notification</Text>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'white',
                borderRadius: 15,
              }}>
              <Switch
                key="#switch1"
                trackColor={{false: 'transparent', true: 'transparent'}}
                thumbColor={isEnabled ? '#27AE60' : '#EB5757'}
                onValueChange={() => {
                  toggleSwitch1();
                  if (!isEnabled) {
                    setStatus(1);
                    setNotification();
                  } else {
                    setStatus(0);
                    setNotification();
                  }
                }}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(5),
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
              Private account
            </Text>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: '#F2F2F2',
                borderRadius: 15,
              }}>
              <Switch
                key="#switch2"
                trackColor={{false: 'transparent', true: 'transparent'}}
                thumbColor={isPrivateEnabled ? '#27AE60' : '#EB5757'}
                onValueChange={() => {
                  toggleSwitch();
                  if (!isPrivateEnabled) {
                    setPrivateStatus(0);

                    setPrivateAcc();
                  } else {
                    setPrivateAcc();
                    setPrivateStatus(1);
                  }
                }}
                value={isPrivateEnabled}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BlockList');
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: wp(5),
                marginBottom: 15,
                alignItems: 'center',
              }}>
              <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>Block</Text>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(5),
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <Text style={{color: '#F2F2F2', fontSize: wp(4)}}>
              Manage admins
            </Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Setting;
