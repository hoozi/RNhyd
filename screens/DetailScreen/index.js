import React, { Component, Fragment } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, List, ActivityIndicator, Toast, Portal} from '@ant-design/react-native';
import Barcode from 'react-native-barcode-builder';
import ImagePicker from 'react-native-image-picker';
import map from 'lodash/map';
import { childDefaultNavigationOptions, childScreenNavigationOptions } from '../../constants/navigationOptions';
import Layout from '../../layouts/Layout';
import FooterToolBar from '../../components/FooterToolbar';
import { connect } from 'react-redux';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers';

const mapStateToProps = ({task}) => ({
  ...task,
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
class DetailScreen extends Component {
  static navigationOptions = {
    ...childScreenNavigationOptions,
    ...childDefaultNavigationOptions,
    title: '订单详情'
  }
  imagePickerOptions = {
    title: '选择签收照片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    maxWidth: 300,
    maxHeight: 300,
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
    const containerStatus = {
      ZX: {
        8: { text: '提空', props: { disabled: !!status === 7} },
        9: { text: '装箱', props: { disabled: true } },
        10: { text: '进港', props: { disabled: true } }
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
        14: { text: '还空', props: { disabled: !!!(status == 13 && status!=7)} }
      }
    }
    const cargoStatus = {
      8: { text: '装货', props: { disabled: !!status === 7  } },
      9: { text: '卸货', props: { disabled: true } },
      10: { text: '完成', props: { disabled: true } }
    }
    
    return operateType ? 
    map(containerStatus[operateType], (item, key) => <Button type='primary' key={key} style={styles.bottomButton} {...item.props}>{item.text}</Button>) :
    map(cargoStatus, (item, key) => <Button type='primary' key={key} style={styles.bottomButton}>{item.text}</Button>)
  }
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    this.props.fetchTaskDetailById(id);
  }
  handleOpenImagePicker() {
    ImagePicker.showImagePicker(this.imagePickerOptions, response => {
      this.setState({
        uri: response.uri
      })
    })
  }
  handleUpdateStatus(operateName, params) {
    const key = Toast.loading('操作中...');
    const { id } = params;
    this.props.updateTaskStatus({
      operateName:operateName,
      params
    }, () => {
      Portal.remove(key);
      Toast.success('操作成功');
      this.props.fetchTaskDetailById(id);
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

      </Fragment>
    )

    const props = {
      1: containerButtons(),
      2: cargoButtons()
    }
    return props[truckType];
  }
  renderListItem(data) {
    const fieldMap = {
      'operateNo': '作业单号',
      'ctnNo': '箱号',
      'ctnSizeType': '箱型尺寸',
      'suitcaseAddress': '提箱点',
      'returnAddress': '还箱点',
      'consigneeAddress': '收货地址',
      'consigneeName': '收货人',
      'consigneeMobile': '联系方式',
      'planStuffingTime': '预计到厂时间',
      'remark': '备注'
    }
    return map(fieldMap, (value, key) => (
      <List.Item key={key} extra={<Text style={styles.fieldValue}>{data[key]}</Text>}>
        <Text style={styles.fieldName}>{value}</Text>
      </List.Item>
    ))
  }
  render() {
    const { navigation, fetchTaskDetailing, detail } = this.props;
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
                </List>
              </View>
            </ScrollView>
            {
              navigation.getParam('hasOperate') &&
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
    fontSize: 14,
    color: 'rgba(0,0,0,.85)'
  }
})