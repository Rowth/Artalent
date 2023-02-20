import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Axios, URL} from '@config';
import {tokenInvalid} from '../../config/Helper';
import styles from './styles';
import {Neomorph} from 'react-native-neomorph-shadows';
import {Header} from '@components';

const ContestList = props => {
  const {navigation, route} = props;
  console.log(route);
  const [contestList, setContestList] = useState([]);
  const getContestList = async () => {
    const res = await Axios({
      method: 'get',
      url: `${URL.GET_ALL_RUNNING_CONTEST}?type=${route?.params?.type}`,
    });
    if (res?.data?.status === 200) {
      setContestList(res.data.running_contest);
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server not responding');
    }
  };
  useEffect(() => {
    getContestList();
  }, []);
  return (
    <SafeAreaView style={styles.bodyStyle}>
      <View>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          onClickLeftIcon={() => navigation.goBack()}
          centerText={'Contest'}
          centerTextStyle={{paddingLeft: wp(2)}}
        />
        <View
          style={{
            marginLeft: wp(1),
          }}>
          <FlatList
            data={contestList}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(20)}}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (item.status === true) {
                      Alert.alert('Registrations Full');
                    } else {
                      if (item.contest_type === 'regular') {
                        navigation.navigate('RegularContest', {
                          intrestId: item.id,
                        });
                      } else {
                        navigation.navigate('ViewSpecialContest', {
                          special_id: item.id,
                        });
                      }
                    }
                  }}>
                  <Neomorph
                    lightShadowColor="#000"
                    darkShadowColor="#000000"
                    style={{
                      ...styles.NeomorphFlatlistWall,
                      width: wp(46),
                      backgroundColor:
                        item.status === false ? '#252525' : 'black',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: wp(2),
                      }}>
                      <Text
                        style={{
                          color: '#F2F2F2',
                          fontSize: wp(3.5),
                          fontWeight: 'bold',
                        }}>
                        {item.category}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{height: wp(4), width: wp(4)}}
                          source={require('../../assets/Images/ContestList/MapPin.png')}
                        />
                        <Text
                          style={{
                            color: '#F2F2F2',
                            fontSize: wp(3.5),
                            fontWeight: 'bold',
                          }}>
                          {item.district}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingTop: hp(0.2),
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 10}}
                        resizeMode="cover"
                        style={{
                          height: hp(15),
                          width: wp(43),
                        }}
                        source={{
                          uri:
                            item.image === null
                              ? 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
                              : item.image,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor:
                              item.status === false
                                ? 'rgba(0, 0, 0, 0.0)'
                                : 'rgba(0, 0, 0 , 0.7)',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: '#F2C94C', opacity: 0.8}}>
                            {item.status === true ? 'Registrations Full' : ''}
                          </Text>
                        </View>
                      </ImageBackground>
                      <View style={{alignItems: 'center'}}>
                        <Text style={{color: 'white', marginTop: hp(0.1)}}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: wp(2.5),
                          }}>
                          {item.contest}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: wp(2),
                        marginTop: hp(-3),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{height: wp(5), width: wp(5)}}
                          source={require('../../assets/Images/ContestList/person.png')}
                        />
                        <Text style={{color: '#F2F2F2'}}>Member</Text>
                      </View>

                      <Text style={{color: '#F2C94C'}}>{item.members}</Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#F2F2F2',
                        fontSize: wp(2.5),
                      }}>
                      {item.title}
                    </Text>
                  </Neomorph>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ContestList;
