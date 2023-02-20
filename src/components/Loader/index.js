import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

export default function index(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : '#1A1A1A',
      }}>
      <ActivityIndicator
        size="large"
        color={props.color ? props.color : 'grey'}
      />
    </View>
  );
}
