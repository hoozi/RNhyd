import React, { Component, Fragment } from 'react';
import { Modal, TouchableHighlight, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImagePreview extends Component {
  state = {
    imageModalVisible: false
  }
  handleImagePreview = flag => {
    this.setState({
      imageModalVisible: !!flag
    })
  }
  render() {
    const { uri } = this.props;
    return (
      <Fragment>
        <TouchableHighlight underlayColor='transparent' onPress={this.handleImagePreview}>
          <Image source={{uri}} roundAsCircle={true} style={{width: 64, height: 64, borderRadius: 4}}/>
        </TouchableHighlight>
        <Modal visible={this.state.imageModalVisible} transparent={true}>
          <ImageViewer imageUrls={[
            {
              url: uri
            }
          ]} onClick={() => this.handleImagePreview(false)} saveToLocalByLongPress={false}/>  
        </Modal>
      </Fragment>
    )
    
  }
}