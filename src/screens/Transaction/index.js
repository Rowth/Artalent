import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {TextInput, InputText, HeadWrapper, Header} from '@components';
import styles from './styles';

const Transaction = props => {
  const {navigation, route} = props;
  const [transactions, setTransaction] = useState([]);
  const getTransactionData = async () => {
    const res = await Axios({
      method: 'post',
      url: URL.GET_ALL_TRANSACTION,
    });
    if (res?.data?.status === 200) {
      setTransaction(res.data.transaction_details.transaction);
      console.log(transactions);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };
  useEffect(() => {
    getTransactionData();
  }, []);
  return (
    <View style={styles.body}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        centerIcon={require('../../assets/Images/Wallet/purse.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Transactions'}
        centerTextStyle={{paddingLeft: wp(2)}}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={transactions}
        style={{width: wp('100%')}}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <View style={{}}>
            <Neomorph
              inner
              lightShadowColor="#1A1A1A"
              style={styles.NeomorphFlatContainer}>
              <Neomorph inner swapShadows style={styles.NeomorphFlatStyle}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    paddingHorizontal: wp(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        color:
                          item.type === 'Credit'
                            ? '#79ECA9'
                            : item.type === 'Pending'
                            ? 'yellow'
                            : '#EB5757',
                        marginLeft: 10,
                        fontSize: 16,
                      }}>
                      {item.type}
                    </Text>
                    <Text
                      style={{
                        color: '#F2F2F2',
                        marginLeft: 10,
                        fontSize: 10,
                        marginVertical: 5,
                      }}>
                      {item.status}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: wp(10),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          item.trasactionType !== 'Debit'
                            ? '#EB5757'
                            : '#79ECA9',
                        justifyContent: 'center',
                        fontSize: 16,
                      }}>
                      {'₹ ' + item.amount}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#F2F2F2',
                        justifyContent: 'center',
                        fontSize: 10,
                        marginTop: 5,
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </Neomorph>
            </Neomorph>
          </View>
        )}
      />
    </View>
  );
};
export default Transaction;
