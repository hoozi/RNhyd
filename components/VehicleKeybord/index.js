import React, { Component } from 'react';
import { Modal } from '@ant-design/react-native';
import Keybord from './Keybord';

let provinces = ['京', '津', '冀', '鲁', '晋', '蒙', '辽', '吉', '黑'
    , '沪', '苏', '浙', '皖', '闽', '赣', '豫', '鄂', '湘'
    , '粤', '桂', '渝', '川', '贵', '云', '藏', '陕', '甘'
    , '琼', '新', '宁', '青','','','', '']
let vehicleNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9' , '0'
   , 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P','港','澳'
    , 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','学'
    , 'Z', 'X', 'C', 'V','B','N','M', '']

export default class VehicleInput extends Component {
  state = {
    value: '',
    keys: provinces
  }
  value = ''
  handleChange = value => {
    this.props.onChange && this.props.onChange(value)
  }
  handleKeySeleced = index => {
    const { keys } = this.state;
    if(index!==keys.length-1) {
      this.value = this.value+keys[index];
      this.setState({keys:vehicleNum});
    } else {
      this.value = this.value.substring(0, this.value.length-1);
      if(!this.value) {
        this.setState({
          keys: provinces
        })
      }
    }
    this.props.onChange && this.props.onChange(this.value);
  }
  render() {
    const { keys } = this.state;
    const { keybordVisible, renderHeader, modalProps={} } = this.props
    return (
      <Modal 
        visible={keybordVisible} 
        popup 
        animationType='slide-up' 
        {...modalProps}
      >
        {renderHeader && renderHeader(this.value)}
        <Keybord keys={keys} onSelected={this.handleKeySeleced}/>
      </Modal>
    )
  }
}