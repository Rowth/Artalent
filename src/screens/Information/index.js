import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header} from '@components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const Information = props => {
  const {navigation, route} = props;
  const [contestData, setContestData] = useState([
    {
      key: 1,
      level: 1,
      price: 10,
      range: '0-50',
    },
    {
      key: 2,
      level: 2,
      price: 20,
      range: '50-150',
    },
    {
      key: 3,
      level: 3,
      price: 30,
      range: '150-250',
    },
    {
      key: 4,
      level: 4,
      price: 40,
      range: '250-350',
    },
    {
      key: 5,
      level: 5,
      price: 50,
      range: '350-450',
    },
    {
      key: 6,
      level: 6,
      price: 60,
      range: '550-650',
    },
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.bodyContainer}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerText={'INFORMATION'}
          centerTextStyle={{paddingLeft: wp(2)}}
          onClickLeftIcon={() => navigation.goBack()}
          centerIcon={require('../../assets/Images/Information/ChartLineUp.png')}
          containerStyle={{marginBottom: 0}}
        />

        <View style={{borderBottomWidth: 1}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: hp(1),
              paddingHorizontal: wp(6),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: wp(5),
                  fontWeight: '400',
                  color: '#FFFFFF',
                  alignSelf: 'flex-start',
                }}>
                LEVELS
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: wp(5),
                  fontWeight: '400',
                  color: '#FFFFFF',
                  alignSelf: 'center',
                }}>
                Reg. price
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: wp(5),
                  fontWeight: '400',
                  color: '#FFFFFF',
                  alignSelf: 'flex-end',
                }}>
                RANGE
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: hp(50)}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={contestData}
            style={{width: '100%'}}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: wp(6),
                    paddingVertical: hp(2),
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: wp(4.5),
                        fontWeight: '400',
                        color: '#828282',
                        alignSelf: 'flex-start',
                      }}>
                      {'Level ' + item.level}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: wp(4.5),
                        fontWeight: '400',
                        color: '#828282',
                        alignSelf: 'center',
                      }}>
                      {'₹' + item.price}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: wp(4.5),
                        fontWeight: '400',
                        color: '#828282',
                        alignSelf: 'flex-end',
                      }}>
                      {item.range}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{paddingHorizontal: wp(6)}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
            }}>
            <View
              style={{
                width: wp(2),
                height: wp(2),
                borderRadius: wp(1),
                backgroundColor: '#BDBDBD',
                position: 'relative',
                top: hp(1),
              }}></View>
            <Text style={[styles.infoTextStyle]}>
              Same level opponents compete with each other only.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
            }}>
            <View
              style={{
                width: wp(2),
                height: wp(2),
                borderRadius: wp(1),
                backgroundColor: '#BDBDBD',
                position: 'relative',
                top: hp(1),
              }}></View>
            <Text style={[styles.infoTextStyle]}>
              Levels depend on your followers. Levels upgrade as followers
              increase.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(1),
            }}>
            <View
              style={{
                width: wp(2),
                height: wp(2),
                borderRadius: wp(1),
                backgroundColor: '#BDBDBD',
                position: 'relative',
                top: hp(1),
              }}></View>
            <Text style={[styles.infoTextStyle]}>
              Registration fees differ from level to level.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Information;
