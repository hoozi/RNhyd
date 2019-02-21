import React from 'react';
import { Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import layout from '../../constants/Layout';

export default props => (
  <Text 
    style={{
      position: 'absolute',
      bottom: 16,
      left: 0,
      width: layout.window.width,
      textAlign: 'center',
      fontSize: 12,
      color: '#bfbfbf'
    }}>
    Copyright <AntDesign name='copyright' color='#bfbfbf' size={12}/> {props.copyright}
  </Text>
)