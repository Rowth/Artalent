import React, {useState} from 'react';

import {View, SafeAreaView, Text, FlatList} from 'react-native';
import Styles from './styles';
import Header from '../../components/Header/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Neomorph} from 'react-native-neomorph-shadows';

const TotalUserByStates = () => {
  const [sateList, setSateList] = useState([
    {
      key: '1',
      state: 'punjab',
      users: '1000',
    },
    {
      key: '2',
      state: 'Punjab',
      users: '1000',
    },
    {
      key: '3',
      state: 'Punjab',
      users: '1000',
    },
    {
      key: '4',
      state: 'Punjab',
      users: '1000',
    },
    {
      key: '5',
      state: 'Punjab',
      users: '1000',
    },
    {
      key: 6,
      state: 'Punjab',
      users: '1000',
    },
    {
      key: 7,
      state: 'Haryana',
      users: '1000',
    },
    {
      key: 8,
      state: 'Haryana',
      users: '1000',
    },
    {
      key: 9,
      state: 'Haryana',
      users: '1000',
    },
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
        onClickLeftIcon={() => navigation.goBack()}
        centerText={'Total Users'}
        centerTextStyle={{}}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: wp(2),
            paddingHorizontal: wp(6),
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: wp(4), color: '#F2F2F2'}}>state</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              paddingHorizontal: wp(6),
            }}>
            <Text style={{fontSize: wp(4), color: '#F2F2F2'}}>Users</Text>
            <Text style={{fontSize: wp(4), color: '#F2F2F2'}}>list</Text>
          </View>
        </View>
        <FlatList
          data={sateList}
          style={{width: wp('100%'), marginTop: wp(4)}}
          keyExtractor={item => item.key}
          style={{flex: 1}}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <Neomorph
                darkShadowColor="#000"
                lightShadowColor="grey"
                swapShadows
                style={Styles.NeomorphContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(5),
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#F2F2F2'}}>{item.state}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#F2F2F2'}}>{item.users}</Text>
                    <Text style={{color: '#EB5757'}}>Show all</Text>
                  </View>
                </View>
              </Neomorph>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TotalUserByStates;
