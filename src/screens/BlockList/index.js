import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import Styles from './styles';
import Modal from 'react-native-modal';
import {Axios, URL, KEY, Helper} from '@config';
import {tokenInvalid} from '../../config/Helper';
import CustomAlert from '../../components/CustomAlert/index';
import {set} from 'react-native-reanimated';
const BlockList = props => {
  const {navigation, route} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [blockName, setBlockName] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setNames] = useState([]);

  const getBlocList = async () => {
    const res = await Axios({
      method: 'get',
      url: URL.GET_BLOCK_LIST,
    });
    if (res?.data?.status === 200) {
      setNames(res?.data?.data);
      console.log(name, 'wasedrftgyhujikolp;');
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  const blockUser = async user_id => {
    let body = new FormData();
    body.append('user_id', user_id);
    const res = await Axios({
      method: 'post',
      url: URL.BLOCK_USERS,
      data: body,
    });
    if (res?.data?.status === 200) {
      Alert.alert('User unblocked');
      getBlocList();
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding', res);
    }
  };
  const toggleModal = key => {
    setModalVisible(!isModalVisible);
    setDeleteId(key);
  };
  const deleteItems = () => {
    setNames(name.filter(item => item.key !== true));
    setFlatListMode('normal');
  };
  useEffect(() => {
    getBlocList();
  }, []);
  console.log(name);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={Styles.bodyStyle}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/BlockList/Prohibit.png')}
          onClickLeftIcon={() => navigation.goBack()}
          centerText={'Block'}
          centerTextStyle={{}}
        />

        <View style={{paddingTop: hp(2)}}>
          <FlatList
            data={name}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  toggleModal(index);
                  setBlockName(item.username);
                  setUserId(item.id);
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: wp(5),
                      color: '#FFFEFE',
                      opacity: 0.5,
                      paddingHorizontal: wp(5),
                      paddingVertical: 5,
                    }}>
                    {item.username}
                  </Text>
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp(0.15),
                      backgroundColor: 'black',
                    }}></View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Modal backdropOpacity={0.2} isVisible={isModalVisible}>
          <CustomAlert
            firstButtonText={'Cancel'}
            secondButtonText={'Unblock'}
            onAdd={() => {
              blockUser(userId);
              setModalVisible(false);
            }}
            onCancel={() => {
              setModalVisible(false);
            }}
            innerComponent={() => (
              <View style={{marginVertical: hp(1)}}>
                <Text
                  style={{
                    fontSize: wp(4.5),
                    color: '#F2F2F2',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to unblock {blockName} ?
                </Text>
              </View>
            )}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default BlockList;
