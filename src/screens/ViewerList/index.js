import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header} from '@components';
import Style from './styles';
import LongHeader from '../../components/LongHeader/index';
import InputText from '../../components/InputText';
import TextInput from '../../components/TextInput';

const ViewerList = props => {
  const {navigation, route} = props;
  const [search, setSearch] = useState('');
  const [Likes, setLikes] = useState([
    {
      key: '1',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
      name: 'Artalent App',
      followCheck: 'true',
    },

    {
      key: '2',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Fusionik production',
      followCheck: 'false',
    },
    {
      key: '3',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'false',
    },
    {
      key: '4',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Fusionik store',
      followCheck: 'true',
    },
    {
      key: '5',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'false',
    },
    {
      key: '6',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '7',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'false',
    },
    {
      key: '8',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '9',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '10',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '11',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '12',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '13',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'false',
    },
    {
      key: '14',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '15',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '16',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
    {
      key: '17',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2VvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',

      name: 'Artalent App',
      followCheck: 'true',
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={Style.body}>
        <Header
          leftIcon={require('../../assets/Images/SelectInterest/Vector.png')}
          centerIcon={require('../../assets/Images/ViewerList/Eye.png')}
          centerText={'Views (154)'}
          onClickLeftIcon={() => navigation.goBack()}
          containerStyle={{marginBottom: 0}}
          // rightIcon={require('../../assets/Images/ManageInterest/add.png')}
          // secondRightIcon={require('../../assets/Images/Home/Trash.png')}
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingTop: hp(2)}}
          data={Likes}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: wp(2),
                    }}>
                    <Image
                      style={{
                        width: wp(14),
                        height: wp(14),
                        borderRadius: wp(7),
                      }}
                      source={{uri: item.image}}
                    />
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: wp('1%'),
                      fontSize: wp(4),
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  height: hp(0.2),
                }}></View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewerList;
