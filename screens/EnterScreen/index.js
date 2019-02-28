import React, { Component } from 'react';
import { View, StatusBar, ScrollView, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button, List, InputItem, ActivityIndicator, Toast, Picker } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { childDefaultNavigationOptions, childScreenNavigationOptions } from '../../constants/navigationOptions';
import Layout from '../../layouts/Layout';
import CaiNiao from '../../components/Icon';
import FooterToolbar from '../../components/FooterToolbar';
import ImagePreview from '../../components/ImagePreview';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers';

const baseInputMap = [
  {
    name: 'roughWeight',
    label: '重量',
    props: {
      type: 'number',
      extra: 'kg'
    },
    options: {

    }
  },
  {
    name: 'volume',
    label: '体积',
    props: {
      type: 'number',
      extra: 'm³'
    },
    options: {

    }
  },
  {
    name: 'number',
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
    name: 'remark',
    label: '备注',
    props: {

    },
    options: {

    }
  }
]

const containerInputMap = [
  {
    name: 'ctnNo',
    label: '箱号',
    props: {

    },
    options: {

    }
  },
  {
    name: 'cst',
    label: '箱型尺寸',
    props: {

    },
    options: {

    }
  },
  {
    name: 'sealNo',
    label: '封号',
    props: {

    },
    options: {

    }
  },
  ...baseInputMap
]

const cargoInputMap = [...baseInputMap, 
  {
    name: 'totalWeight',
    label: '重量',
    props: {
      type: 'number',
      extra: 'kg'
    },
    options: {

    }
  }];

const cst = [
  [
    {
      label: '25',
      value: '25'
    },
    {
      label: '22',
      value: '22'
    },
    {
      label: '42',
      value: '42'
    },
    {
      label: '45',
      value: '45'
    },
    {
      label: 'L5',
      value: 'L5'
    }
  ],
  [
    {
      label: 'G1',
      value: 'G1'
    },
    {
      label: 'T1',
      value: 'T1'
    },
    {
      label: 'R1',
      value: 'R1'
    },
    {
      label: 'OT',
      value: 'OT'
    },
  ]
]

const mapStateToProps = ({upload, task}) => ({
  ...task,
  ...upload,
  ...mapLoading('upload', {
    uploading: 'upload'
  }),
  ...mapLoading('task', {
    updateStatusing: 'updateTaskStatus'
  })
})

const mapDispatchToProps = (({upload, task}) => ({
  ...mapEffects(upload, ['upload']),
  ...mapEffects(task, ['updateTaskStatus'])
}));

@connect(mapStateToProps, mapDispatchToProps)
@createForm()
class EnterScreen extends Component {
  static navigationOptions = {
    ...childScreenNavigationOptions,
    ...childDefaultNavigationOptions,
    title: '数据录入'
  }
  state = {
    uri: null
  }
  signPictureUrl = ''
  imagePickerOptions = {
    title: '选择签收照片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    maxWidth: 500,
    maxHeight: 500,
    chooseFromLibraryButtonTitle: '选择照片',
    noData: false,
    storageOptions: {
      skipBackup: true  
    }
  }
  uploadPickure(response) {
    const { detail: {id} } = this.props
    const formData = new FormData();
    const {uri, type, fileName: name} = response;
    this.setState({
      uri
    });
    formData.append('file', {uri, type, name: uri});
    this.props.upload(formData, data => {
      const { bucketName, fileName } = data;
      this.signPictureUrl = `${bucketName}-${fileName}`
    });
  }
  componentDidMount() {
    
  }
  handleOpenImagePicker = () => {
    ImagePicker.showImagePicker(this.imagePickerOptions, response => {
      if(!response.didCancel) {
        this.uploadPickure(response);
      }
    })
  }
  handleUpdateStatus(operateName) {
    const { form, navigation } = this.props;
    const id = navigation.getParam('id');
    const type = navigation.getParam('type');
    const nameMap = {
      'container': 'stuffing-container',
      'cargo': 'load-cargo'
    }
    let ctnSize='';
    let ctnType='';
    form.validateFields((error, values) => {
      if(error) return;
      if(type === 'container') {
        ctnSize =  values['cst'][0];
        ctnType =  values['cst'][1];
        delete values['cst'];
      }
      this.props.updateTaskStatus({
        operateName:nameMap[type],
        params: {
          id,
          ...values,
          signPictureUrl: this.signPictureUrl,
          ctnSize,
          ctnType
        }
      }, () => {
        Toast.success('操作成功', 1, () => {
          navigation.navigate('Task');
        });
      })
    });
  }
  renderOpenCameraListItem = () => (
    [
      <List.Item
        extra={<CaiNiao name='xiayiyeqianjinchakangengduo' color='#c7c7cc' size={20}/>}
        onPress={this.handleOpenImagePicker}
        key='1'
      >
        <Text style={{fontSize: 17,color: '#000000'}}>照片</Text>
      </List.Item>,
      <List.Item key='2'>
        <View>
          {
            this.props.uploading ? 
            <ActivityIndicator text='上传中...'/> : 
            this.state.uri ? 
            <ImagePreview uri={this.state.uri}/> :
            <Text style={{color: 'rgba(0,0,0,0.45)'}}>暂无照片</Text>
          }
        </View>
      </List.Item>
    ]
  )
  render() {
    const { form: {getFieldDecorator, getFieldError, getFieldValue}, updateStatusing, navigation } = this.props;
    const type = navigation.getParam('type');
    const inputMap = {
      'container': containerInputMap,
      'cargo': cargoInputMap
    }
    return (
      <Layout>
        <StatusBar barStyle='dark-content'/>
        <KeyboardAvoidingView behavior='padding' enabled style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
              <View style={{paddingBottom: 72}}>
                <List>
                  {
                    inputMap[type].map(item => {
                      const ctnSizeType = getFieldDecorator(item.name, item.options)(
                        <Picker
                          data={cst}
                          cascade={false}
                          key={item.name}
                          extra={<CaiNiao name='xiayiyeqianjinchakangengduo' color='#c7c7cc' size={20}/>}
                        >
                          <List.Item>
                            <Text style={{fontSize: 16, color:'#000000'}}>箱型尺寸</Text>
                          </List.Item>
                        </Picker>
                      )
                      return item.name === 'cst' ? ctnSizeType : getFieldDecorator(item.name, item.options)(
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
                    })
                  }
                  {this.renderOpenCameraListItem()}
                </List>
              </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <FooterToolbar>
          <Button 
            disabled={updateStatusing} 
            loading={updateStatusing} 
            type='primary' 
            style={styles.bottomButton} 
            onPress={() => {
              this.handleUpdateStatus()
            }}
          >提交</Button>
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
  bottomButton: {
    flex: 1,
    marginLeft: 6,
    marginRight: 6
  }
})