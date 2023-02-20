import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import Slider from 'react-native-slider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SliderComponent = props => {
  const {valueSet} = props;
  const [state, setstate] = useState();
  return (
    <View>
      <Slider
        key={'sliderForBrightness'}
        value={props.value}
        style={{marginHorizontal: wp(4), borderRadius: 100}}
        minimumTrackTintColor={'#EB5757'}
        maximumTrackTintColor={'#EB5757'}
        trackStyle={{height: hp(0.9), marginHorizontal: wp(0.1)}}
        thumbTintColor={'#EB5757'}
        thumbStyle={{
          borderWidth: wp(2),
          borderColor: '#2A2A2A',
          borderRadius: 100,
          padding: wp(2),
        }}
        // onValueChange={value => {
        //   const newVal = Number(value).toFixed(2);
        //   const oldVal = Number(brightnesss).toFixed(2);
        //   if (!isNaN(newVal))
        //     if (oldVal !== newVal) {
        //       setBrightnesss(value);
        //       console.log(newVal, oldVal);
        //     }
        // }}
        onSlidingComplete={value => {
          valueSet(value);
        }}
        thumbTouchSize={{width: wp(10), height: wp(10)}}
      />
    </View>
  );
};
export default SliderComponent;
