import React, { Component } from 'react';
import { View, StatusBar, ScrollView, StyleSheet, Text, TouchableHighlight, Image, Modal } from 'react-native';
import { Button, List, InputItem, ActivityIndicator } from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createForm } from 'rc-form';
import isIPhoneX from 'react-native-is-iphonex';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import { childDefaultNavigationOptions, childScreenNavigationOptions } from '../../constants/navigationOptions';
import Layout from '../../layouts/Layout';
import CaiNiao from '../../components/Icon';
import FooterToolbar from '../../components/FooterToolbar';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers';


const inputItemMap = [
  {
    name: 'ctnNo',
    label: '箱号',
    props: {

    },
    options: {

    }
  },
  {
    name: 'fno',
    label: '封号',
    props: {

    },
    options: {

    }
  },
  {
    name: 'weight',
    label: '重量',
    props: {
      type: 'number',
      extra: 'KG'
    },
    options: {

    }
  },
  {
    name: 'v',
    label: '体积',
    props: {
      type: 'number',
      extra: 'm³'
    },
    options: {

    }
  },
  {
    name: 'count',
    label: '件数',
    props: {
      type: 'number'
    },
    options: {

    }
  },
  {
    name: 'cargoName',
    label: '货名',
    props: {

    },
    options: {

    }
  },
  {
    name: 'mark',
    label: '备注',
    props: {

    },
    options: {

    }
  }
]

const mapDispatchToProps = (({upload}) => ({
  ...mapEffects(upload, ['upload'])
}));

@connect(({upload}) => ({
  ...upload,
  ...mapLoading('upload', {
    uploading: 'upload'
  })
}), mapDispatchToProps)
@createForm()
class EnterScreen extends Component {
  static navigationOptions = {
    ...childScreenNavigationOptions,
    ...childDefaultNavigationOptions,
    title: '装箱'
  }
  state = {
    
  }
  componentDidMount() {
    
  }
  handleShowCameraVisible = flag => {
    this.setState({
      cameraVisible: !!flag
    })
  }
  renderOpenCameraListItem = () => (
    <List.Item
      thumb={<AntDesign name='camera' color='#f15a4a' size={22} style={{marginRight: 12}}/>}
      extra={<CaiNiao name='xiayiyeqianjinchakangengduo' color='#c7c7cc' size={20}/>}
    >
      <Text style={{fontSize: 16}}>拍摄单据照片</Text>
    </List.Item>
  )
  render() {
    const { form: {getFieldDecorator, getFieldError, getFieldValue} } = this.props
    return (
      <Layout>
        <StatusBar barStyle='dark-content'/>
        <ScrollView style={{flex: 1}}>
          <View style={{paddingBottom: 72}}>
            <List renderHeader='基本信息'>
              {
                inputItemMap.map(item => (
                  getFieldDecorator(item.name, item.options)(
                    <InputItem 
                      key={item.name}
                      error={getFieldError(item.name)}
                      placeholder='请输入'
                      labelNumber={4}
                      {...item.props}
                    >
                      {item.label}
                    </InputItem>
                  )
                ))
              }
            </List>
          </View>
        </ScrollView>
        <FooterToolbar>
          <Button type='primary' style={styles.bottomButton}>提交</Button>
        </FooterToolbar>
      </Layout>
    );
  }
}

export default EnterScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bottomBar: {
    paddingBottom: isIPhoneX ? 25 : 5,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  bottomButton: {
    flex: 1,
    marginLeft: 6,
    marginRight: 6
  }
})