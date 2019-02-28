import React from 'react';
import { View, StyleSheet } from 'react-native';
import isIPhoneX from 'react-native-is-iphonex';

const { hairlineWidth } = StyleSheet;

export default props => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 10,
      paddingTop: 8,
      paddingBottom: isIPhoneX ? 25 : 8,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: '#fff',
      borderTopWidth: hairlineWidth,
      borderTopColor: '#e8e8e8'
    }}
  >{props.children}</View>
)
