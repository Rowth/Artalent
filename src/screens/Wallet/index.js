import React, {useState, useEffect} from 'react';

import {
  View,
  ViewBase,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Axios, URL, KEY} from '@config';
import {tokenInvalid} from '../../config/Helper';
import {
  TextInput,
  InputText,
  HeadWrapper,
  Header,
  SmallColorButton,
} from '@components';
import styles from './styles';

const Wallet = props => {
  const {navigation, route} = props;
  const [walletDetails, setWalletDetails] = useState([]);
  const [transactions, setTransaction] = useState([]);
  const [barPerCentage, setBarPercentage] = useState(0);
  const [walletBal, setWallBal] = useState(0);
  const [barLength, setBarLength] = useState('0');
  const getWalletData = async () => {
    const res = await Axios({
      method: 'post',
      url: URL.GET_WALLET_DATA,
    });
    if (res?.data?.status === 200) {
      setWalletDetails(res.data.transaction_details);
      setWallBal(res.data.transaction_details.total_balance);
      setTransaction(res.data.transaction_details.transaction);
      setBarPercentage(res.data.transaction_details.winning_balance / 10);
      if (res.data.transaction_details.winning_balance / 10 >= 100) {
        setBarPercentage(100);
        setBarLength(
          res.data.transaction_details.winning_balance / 10,
        ).toString();
        console.log(
          res.data.transaction_details.winning_balance / 10,
          'kjjdjjkkjdjkfdjkfdjk',
        );
      } else {
        setBarLength(
          res.data.transaction_details.winning_balance / 10,
        ).toString();
        console.log('regularAmount');

        console
          .log(res.data.transaction_details.winning_balance / 10)
          .toString();
      }
    } else if (res?.data?.status === 401) {
      tokenInvalid({navigation});
    } else {
      console.log('server error');
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWalletData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: wp(4), paddingVertical: hp(2)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: wp(7), height: wp(7), resizeMode: 'contain'}}
                source={require('../../assets/Images/Home/List.png')}
              />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: wp(6), height: wp(6), resizeMode: 'contain'}}
                source={require('../../assets/Images/Wallet/walletWhite.png')}
              />
              <Text
                style={{color: '#F2F2F2', marginLeft: wp(2), fontSize: wp(5)}}>
                Wallet
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Info')}>
              <Image
                style={{width: wp(7), height: wp(7), resizeMode: 'contain'}}
                source={require('../../assets/Images/Wallet/Info.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginTop: hp(2), paddingHorizontal: wp(4)}}>
            <View style={{flexDirection: 'row', marginBottom: hp(4)}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: wp(5),
                    letterSpacing: 3,
                  }}>
                  {'₹' + walletBal}
                </Text>
                <Text
                  style={{
                    color: '#F2F2F2',
                    fontWeight: '300',
                    fontSize: wp(3),
                  }}>
                  Balance
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddBalance')}>
                  <Image
                    resizeMode="cover"
                    style={{
                      height: heightPercentageToDP(7),
                      width: widthPercentageToDP(45),
                      paddingLeft: wp(2),
                    }}
                    source={require('../../assets/Images/Wallet/AddBalanceBtn.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View key="CardContainer" style={{marginBottom: hp(4)}}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginBottom: hp(1),
                  paddingRight: wp(4),
                }}>
                {/* <Text style={{color: 'white'}}>Show Transactions</Text> */}
              </View>
              <View
                style={{
                  borderColor: 'red',
                  borderWidth: 0.3,
                  borderRadius: wp(20),
                }}>
                <NeomorphFlex
                  darkShadowColor="#000000" // <- set this
                  lightShadowColor="#FFFFFF" // <- this
                  style={{
                    shadowOpacity: 0.1, // <- and this or yours opacity
                    shadowRadius: 3,
                    borderRadius: 5,
                    backgroundColor: '#1A1A1A',
                  }}>
                  <NeomorphFlex
                    style={{
                      // <- and this or yours opacity
                      shadowRadius: 6,
                      borderRadius: 5,
                      backgroundColor: '#1A1A1A',
                      padding: wp(8),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={{color: '#F2F2F2'}}>Add Money</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{color: '#F2F2F2', fontSize: wp(5)}}>
                          {'₹ ' + walletDetails?.wallet_balance}
                        </Text>
                        <Text
                          style={{color: '#F2F2F2', fontSize: wp(3)}}></Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 0.1,
                        opacity: 0.2,
                        backgroundColor: 'red',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: '#EB5757',
                        height: 0.2,
                        borderRadius: 10,
                        marginVertical: hp(2),
                      }}></View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={{color: '#F2F2F2'}}>Winning Prize</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{color: '#F2F2F2', fontSize: wp(5)}}>
                          {`${'₹'} ${walletDetails.winning_balance}`}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#EB5757',
                        height: 0.5,
                        borderRadius: 10,
                        marginVertical: hp(2),
                      }}></View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={{color: '#F2F2F2'}}>
                          Refer & Earn Bonus
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{color: '#F2F2F2', fontSize: wp(5)}}>
                          {`${'₹'} ${walletDetails.referral_balance}`}
                        </Text>
                      </View>
                    </View>
                  </NeomorphFlex>
                </NeomorphFlex>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: hp(5),
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: 'black',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: barPerCentage + '%',
                      borderRadius: 10,
                      backgroundColor:
                        barPerCentage <= 10 ? '#AB0404' : '#27AE60',
                      position: 'absolute',
                    }}></View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      barPerCentage <= 10
                        ? 'red'
                        : 'green' + barPerCentage + barLength,
                    );
                  }}>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginBottom: -hp(4),
                      paddingTop: hp(0.5),
                    }}>
                    <Text
                      style={{
                        color: barPerCentage <= 10 ? '#AB0404' : '#27AE60',
                      }}>
                      {walletDetails.winning_balance > 1000
                        ? walletDetails.winning_balance
                        : walletDetails.winning_balance}
                      <Text style={{fontSize: wp(3)}}> withdraw</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginRight: -10}}>
                {/* <SmallColorButton
                  onPress={() => navigation.navigate('Withdraw')}
                  buttonColor="#219653"
                  buttonText="Withdraw"></SmallColorButton> */}
                <TouchableOpacity
                  onPress={() => {
                    if (barLength <= 10) {
                      Alert.alert("Can't withdraw amount");
                    } else {
                      navigation.navigate('Withdraw', {
                        WalletBal: walletDetails.wallet_balance,
                      });
                    }
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: wp(30), height: wp(19)}}
                    source={require('../../assets/Images/Wallet/WithdrawBtn.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: hp(2),
                marginBottom: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: '#F2F2F2', fontSize: wp(5), fontWeight: '600'}}>
                Earn more wallet balance
              </Text>
              <Text style={{color: '#F2F2F2', fontWeight: '300'}}>
                A new way to earn and get discounts
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#121212',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                paddingHorizontal: wp(4),
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ReferAndEarn');
                }}>
                <View style={{}}>
                  <View
                    style={{
                      marginTop: -hp(3),
                      marginBottom: hp(3),
                      width: '100%',
                      borderWidth: 0.2,
                      borderColor: 'red',
                      borderRadius: wp(30),
                    }}>
                    <NeomorphFlex
                      inner
                      darkShadowColor="#000000" // <- set this
                      lightShadowColor="black" // <- this
                      style={{
                        shadowOpacity: 0.1, // <- and this or yours opacity
                        shadowRadius: 3,
                        borderRadius: 10,
                        backgroundColor: '#1A1A1A',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <NeomorphFlex
                        style={{
                          width: '100%',
                          shadowRadius: 6,
                          borderRadius: 10,
                          backgroundColor: '#1A1A1A',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            margin: wp(4),
                            width: '100%',
                            // backgroundColor: 'pink',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginRight: wp(3),
                            }}>
                            <Image
                              style={{
                                width: wp(6),
                                height: wp(6),
                                resizeMode: 'contain',
                                marginLeft: wp(4),
                              }}
                              source={require('../../assets/Images/Wallet/refer.png')}></Image>
                          </View>
                          <View>
                            <Text style={{color: '#F2F2F2', fontSize: wp(3.5)}}>
                              Invite friends to increase your wallet balance
                            </Text>
                            <Text style={{color: '#F2F2F2'}}>
                              Refer and Earn
                            </Text>
                          </View>
                        </View>
                      </NeomorphFlex>
                    </NeomorphFlex>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '100%', marginBottom: hp(2)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: wp(4),
                }}>
                <Text
                  style={{
                    color: '#F2F2F2',
                    fontSize: wp(4.5),
                    fontWeight: '500',
                  }}>
                  Transactions
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Transaction')}>
                  <Text
                    style={{
                      color: '#F2F2F2',
                      fontSize: wp(4),
                      fontWeight: '300',
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={transactions}
              style={{width: wp('100%')}}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => (
                <View
                  style={{
                    marginVertical: hp(0.6),
                    width: '100%',
                    borderRadius: wp(10),
                    borderWidth: 0.2,
                    borderColor: 'red',
                  }}>
                  <NeomorphFlex
                    darkShadowColor="#000000"
                    style={{
                      backgroundColor: '#1A1A1A',
                      width: '100%',
                      borderRadius: 5,
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 0.2,
                      shadowColor: 'grey',
                      shadowRadius: 3,
                    }}>
                    <View
                      style={{
                        paddingHorizontal: wp(4),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: hp(1),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: hp(1),
                        }}>
                        <Text
                          style={{
                            color:
                              item.type === 'Credit' ? '#1F864A' : '#EB5757',
                            fontSize: wp(5),
                            flex: 4,
                            fontWeight: '600',
                          }}>
                          {item.type}
                        </Text>
                        <Text
                          style={{
                            color:
                              item.type === 'Credit' ? '#1F864A' : '#EB5757',
                            fontSize: wp(4),
                            flex: 1,
                            numberOfLines: 1,
                            textAlign: 'center',
                          }}>
                          {'₹' + item.amount}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', color: '#F2F2F2'}}>
                        <Text
                          numberOfLines={1}
                          style={{flex: 5, fontSize: wp(3), color: '#F2F2F2'}}>
                          {item.status}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            flex: 1,
                            fontSize: wp(2),
                            color: '#F2F2F2',
                            textAlign: 'center',
                          }}>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  </NeomorphFlex>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
