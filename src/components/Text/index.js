import React from 'react';

import {Text} from 'react-native';
import styles from './styles';
const Index = props => {
  const {children} = props;
  return <Text style={[styles.contain, props.style]}>{children}</Text>;
};
export default Index;
