import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header} from '@components';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterContest = props => {
  const {navigation, route} = props;
  const [contestData, setContestData] = useState([]);
  const [userId, setUserId] = useState(null);
  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(data);
      if (data !== null) {
        setUserId(data?.user_data?.id);
        getContestDetails();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const getContestDetails = async () => {
    const jsonValue = await AsyncStorage.getItem('Auth');
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(data);
    if (data !== null) {
      const res = await Axios({
        method: 'get',
        url: `${URL.GET_USER_ACTIVE_CONTEST}?user_id=${data?.user_data?.id}`,
      });
      if (res?.data?.status === 200) {
        setContestData(res?.data?.data);
      } else if (res?.data?.status === 401) {
        tokenInvalid({navigation});
      } else {
        console.log('server error');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('onFocus call');

      getContestDetails();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerText={'My Contests'}
          centerTextStyle={{paddingLeft: wp(2)}}
          onClickLeftIcon={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: hp(1),
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'white',
              flex: 1,
              textAlign: 'center',
            }}>
            Contest
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'white',
              flex: 1,
              textAlign: 'center',
            }}>
            Reg. price
          </Text>

          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'white',
              flex: 1,
              textAlign: 'center',
            }}>
            Category
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp(0.2),
            marginTop: 10,
            backgroundColor: 'black',
          }}></View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={contestData}
          style={{width: wp('100%')}}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={1}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    marginHorizontal: 10,
                    alignItems: 'center',
                    paddingVertical: hp(1),
                  }}>
                  <Text
                    style={{
                      color:
                        item.contest_type === 'Special' ? '#F9C013' : '#F2F2F2',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      flex: 1,
                      fontSize: wp(4),
                    }}>
                    {`${item.category} | ${item.district}`}
                  </Text>
                  <Text
                    style={{
                      color: '#828282',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      flex: 1,
                    }}>
                    {`₹ ${item.entry_fee}`}
                  </Text>
                  <Text
                    style={{
                      color:
                        item.contest_type === 'Special' ? '#F9C013' : '#F2F2F2',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      flex: 1,
                    }}>
                    {item.contest_type}
                  </Text>
                </View>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp(0.1),
                    backgroundColor: 'black',
                  }}></View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterContest;
