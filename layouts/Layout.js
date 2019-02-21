import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props) => (<View style={[styles.container,props.style]}>{props.children}</View>);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  }
})




