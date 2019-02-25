import React, { Component, Fragment, PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, List, ActivityIndicator, Toast, Portal} from '@ant-design/react-native';
import Barcode from 'react-native-barcode-builder';
import isEmpty from 'lodash/isEmpty';
import ImagePicker from 'react-native-image-picker';
import map from 'lodash/map';
import { childDefaultNavigationOptions, childScreenNavigationOptions } from '../../constants/navigationOptions';
import Layout from '../../layouts/Layout';
import FooterToolBar from '../../components/FooterToolbar';
import { connect } from 'react-redux';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers';

const mapStateToProps = ({task, upload}) => ({
  ...task,
  ...upload,
  ...mapLoading('task', {
    fetchTaskDetailing: 'fetchTaskDetailById',
    updateStatusing: 'updateTaskStatus'
  }),
  ...mapLoading('upload', {
    uploading: 'upload'
  })
})

const mapDispatchToProps = ({task, upload}) => ({
  ...mapEffects(task, ['fetchTaskDetailById', 'updateTaskStatus']),
  ...mapEffects(upload, ['upload'])
})

@connect(mapStateToProps, mapDispatchToProps)
class DetailScreen extends PureComponent {
  static navigationOptions = {
    ...childScreenNavigationOptions,
    ...childDefaultNavigationOptions,
    title: '订单详情'
  }
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
  state = {
    uri: null
  }
  getButtons(detail) {
    const { status, operateType='', id } = detail;
    const { navigation: {navigate} } = this.props
    const containerStatus = {
      ZX: {
        8: { text: '提空', props: { 
            disabled: !!!(status==7 && status!=8 && status!=9),
            onPress: () => {
              this.handleUpdateStatus('suitcase-empty-container', {id});
            }
          } 
        },
        9: { text: '装箱', props: { 
            disabled: !!!(status==8 && status!=7),
            onPress: () => {
              navigate('Enter', {id})
            }
          } 
        },
        10: { text: '进港', props: { 
            disabled: !!!(status==9 && status!=7),
            onPress: () => {
              this.handleUpdateStatus('enter-port', {id})
            }
          } 
        }
      },
      CX: {
        11: { text: '提重', props: { 
            disabled: !!!(status == 7 && status!=11 && status!=12 && status!=13),  
            onPress: () => { 
              this.handleUpdateStatus('suitcase-full-container', {id}) 
            }
          }
        },
        12: { text: '拆箱', props: { 
            disabled: !!!(status == 11 && status!=7),
            onPress: () => {
              this.handleUpdateStatus('split-container', {id})
            }
          } 
        },
        13: { text: '签收', props: { 
            disabled: !!!(status == 12 && status!=7),
            onPress: () => {
              this.handleOpenImagePicker();
            }
          } 
        },
        14: { text: '还空', props: { 
            disabled: !!!(status == 13 && status!=7),
            onPress: () => { 
              this.handleUpdateStatus('return-empty-container', {id}) 
            }
          } 
        }
      }
    }
    const cargoStatus = {
      8: { text: '装货', props: { 
          disabled: !!!(status==7 && status!=8 && status!=9),
          onPress: () => {
            navigate('Enter', {id})
          }
        } 
      },
      9: { text: '卸货', props: { 
          disabled: !!!(status==8 && status!=7),
          onPress: () => {
            this.handleUpdateStatus('unload-cargo', {id})
          }
        } 
      },
      10: { text: '签收', props: { 
          disabled:!!!(status==9 && status!=7),
          onPress: () => {
            this.handleOpenImagePicker();
          }
        } 
      }
    }
    
    return operateType ? 
    map(containerStatus[operateType], (item, key) => <Button type='primary' key={key} style={styles.bottomButton} {...item.props}>{item.text}</Button>) :
    map(cargoStatus, (item, key) => <Button type='primary' key={key} style={styles.bottomButton} {...item.props}>{item.text}</Button>)
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
      this.handleUpdateStatus('sign', {
        id,
        signPictureUrl: `${bucketName}-${fileName}`
      })
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const taskType = navigation.getParam('taskType');
    this.props.fetchTaskDetailById({
      taskType,
      params: id
    });
  }
  handleOpenImagePicker() {
    ImagePicker.showImagePicker(this.imagePickerOptions, response => {
      if(!response.didCancel) {
        this.uploadPickure(response);
      }
    })
  }
  handleUpdateStatus(operateName, params) {
    const key = Toast.loading('操作中...');
    this.props.updateTaskStatus({
      operateName:operateName,
      params
    }, () => {
      Portal.remove(key);
      Toast.success('操作成功', 1, () => {
        this.props.navigation.navigate('Task', {refresh: true});
      });
    })
  }
  renderButtons(detail) {
    const { truckType } = this.props;
    const containerButtons = () => (
      <Fragment>
        {this.getButtons(detail)}
      </Fragment>
    )
    const cargoButtons = () => (
      <Fragment>
        {this.getButtons(detail)}
      </Fragment>
    )

    const props = {
      1: containerButtons(),
      2: cargoButtons()
    }
    return props[truckType];
  }
  renderListItem(data) {
    if(isEmpty(data)) return [];
    const { truckType, navigation } = this.props;
    const taskType = navigation.getParam('taskType');
    //const operateType = data.operateType;
    const fieldMap = {
      1: {
        'operateNo': '作业单号',
        'finishTime': '完成时间',
        'ctnNo': '箱号',
        'ctnSizeType': '箱型尺寸',
        'suitcaseAddress': '提箱点',
        'returnAddress': '还箱点',
        'consigneeAddress': '收货地址',
        'consigneeName': '收货人',
        'consigneeMobile': '联系方式',
        'planStuffingTime': '预计到厂时间',
        'remark': '备注',
        'evaluationContent': '客户评价'
      },
      2: {
        'operateNo': '作业单号',
        'finishTime': '完成时间',
        'sourceAddress': '提货地',
        'targetAddress': '送货地',
        'cargoName': '货物名称',
        'roughWeight': '单件重量',
        'totalWeight': '总重量',
        'volume': '体积',
        'consigneeAddress': '收货地址',
        'consigneeName': '收货人',
        'consigneeMobile': '联系方式',
        'remark': '备注',
        'evaluationContent': '客户评价'
      }
    }
    const unit = {
      'roughWeight': 'kg',
      'totalWeight': 'kg',
      'volume': 'm³',
    }
    const itemData = fieldMap[truckType];
    
    return map(itemData, (value, key) => {
      let listItemProps = {}
      if(key === 'evaluationContent' || key === 'remark' || key === 'consigneeAddress') {
        listItemProps = {
          multipleLine: true
        }
      }
      if(taskType === 'new') {
        if(key === 'finishTime' || key === 'evaluationContent') {
          return null;
        }
      }
      return (
        <List.Item key={key} {...listItemProps} extra={
            <View style={{flex: 1,flexDirection: 'column'}}>
              <Text style={styles.fieldValue}>{data[key]+(unit[key] ? unit[key] : '')}</Text>
            </View>
          }
        >
          <Text style={styles.fieldName}>{value}</Text>
        </List.Item>
      )
    })
  }
  render() {
    const { navigation, fetchTaskDetailing, detail, uploading, truckType } = this.props;
    const { uri } = this.state;
    return (
      <Layout>
        <StatusBar barStyle='dark-content'/>
        {
          fetchTaskDetailing ?
          <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator text='加载中...'/></View>:
          <Fragment>
            <ScrollView style={{flex: 1}}>
              <View style={{paddingBottom: 72}}>
                <List>
                  {this.renderListItem(detail)}
                  {
                    (detail.operateType === 'CX' && detail.status === '12') || 
                    (truckType == 2 && detail.status === '10') ?
                    <List.Item extra={
                        uploading ? 
                        <ActivityIndicator text='上传中...'/> : 
                        uri ? 
                        <Image source={{uri}} roundAsCircle={true} style={{width: 64, height: 64, borderRadius: 4}}/> :
                        <Text style={styles.fieldValue}>暂无照片</Text>
                      }
                    >
                      <Text style={styles.fieldName}>签收照片</Text>
                    </List.Item> : null
                  }
                </List>
              </View>
            </ScrollView>
            {
              navigation.getParam('taskType') === 'new' &&
              <FooterToolBar>
                {this.renderButtons(detail)}
              </FooterToolBar>
            }
          </Fragment>
        }
      </Layout>
    );
  }
}

export default DetailScreen;

const styles = StyleSheet.create({
  bottomButton: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4
  },
  fieldName: {
    color: 'rgba(0,0,0,.65)'
  },
  fieldValue: {
    textAlignVertical: 'center',
    fontSize: 14,
    textAlign: 'right',
    color: 'rgba(0,0,0,.85)'
  }
})