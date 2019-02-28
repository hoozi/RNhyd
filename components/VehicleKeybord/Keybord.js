import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import isIPhoneX from 'react-native-is-iphonex';

export default class KeyBordView extends Component {
  state = {
    value: ''
  }
  handleChange = value => {
    this.props.onChange && this.props.onChange(value)
  }
  renderKey(index) {
    const { keys } = this.props
    let key = null;
    if(index+1 === keys.length) {
      key = (
        <View style={{...styles.key, width:69,backgroundColor:'#108ee9'}}>
          <Text style={{color: '#fff'}}>清除</Text>
        </View>
      )
    } else if(keys[index] === '') {
      key = (
        <View style={{width: 32, height: 32, marginLeft:5}}/>
      )
    } else {
      key = (
        <View style={styles.key}>
          <Text>{keys[index]}</Text>
        </View>
      )
    }
    return key;
  }
  render() {
    const { keys } = this.props
    return (
      <View style={styles.keybordContainer}>
         {
           keys.map((item, index) => {
             return (
              <TouchableHighlight key={index} underlayColor='transparent' onPress={()=>{
                this.props.onSelected && this.props.onSelected(index);
              }}>
                {this.renderKey(index)}
              </TouchableHighlight>
             )
           })
         }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  keybordContainer: {
    paddingRight: 8,
    paddingLeft: 3,
    paddingTop: 8,
    paddingBottom: isIPhoneX ? 16 : 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor:'#eee'
  },
  key: {
    width: 32,
    height: 32,
    fontSize: 14,
    textAlignVertical: 'center',
    color: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom:5,
    marginLeft:5,
    borderRadius: 5
  }
})