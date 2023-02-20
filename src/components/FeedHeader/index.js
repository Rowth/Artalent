import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function index(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        paddingHorizontal: wp(5),

        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: hp(1),
      }}>
      <View style={{}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1639317393027-2e5308248ea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
          }}
          style={{
            height: hp(6),
            width: hp(6),
            borderRadius: hp(3),
          }}
        />
      </View>
      <View style={{flex: 1, paddingLeft: wp(3)}}>
        <Text style={{color: '#BDBDBD'}}>Nikhil Soni</Text>
        <Text style={{color: '#BDBDBD'}}>Dancer</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={
            props.onClickDelete
              ? props.onClickDelete
              : () => console.log('delete feed')
          }>
          <Image
            style={{width: wp(5), height: wp(5)}}
            source={require('../../assets/Images/Home/Trash.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
