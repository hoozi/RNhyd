import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CaiNiao from '../../components/Icon';
import {
  Card,
  List,
  WhiteSpace,
  ActionSheet
} from '@ant-design/react-native';
import Barcode from 'react-native-barcode-builder';
import Layout from '../../layouts/Layout';
import { connect } from 'react-redux';
import { mapEffects } from '../../utils/reduxHelpers';
import { getStorage } from '../../utils/storage';

const mapDispatchToProps = ({ user }) => mapEffects(user, ['logout'])

@connect(({user})=>({...user}), mapDispatchToProps)
class AccountScreen extends Component {
  static navigationOptions = {
    title: '我的',
    headerBackTitle: null
  }
  state = {
    truckNo: '', 
    driver: '', 
    driverMobile: '', 
    organizationName: '', 
    id: ''
  }
  async componentDidMount() {
    const user = await getStorage('user');
    this.setState(JSON.parse(user))
  }
  handleShowLogoutActionSheet = () => {
    const { logout } = this.props
    ActionSheet.showActionSheetWithOptions(
      {
        title: '确定要退出登录吗？',
        options: [
          '退出登录',
          '取消'
        ],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      buttonIndex => {
        if(buttonIndex === 0) {
          logout();
        }
      }
    );
  }
  render() {
    const { navigation: { navigate }, currentUser } = this.props;
    const { 
      truckNo, 
      driver, 
      driverMobile, 
      organizationName, 
      id
    } = this.state
    return (
      <Layout>
        <Card style={styles.accountCard} full>
          <View style={styles.userInfo}>
            <Image source={
              require('../../assets/images/avatar.png')
            } style={styles.avatar}/>
            <View style={styles.userInfoList}>
              <Text style={[styles.cartTextColor, {fontSize: 20}]}>{truckNo}</Text>
              <View style={styles.cardSub}>
                <Text style={{color: '#d4e7f7',lineHeight: 16}}>{organizationName}</Text> 
              </View>
            </View>
          </View>
        </Card>
        <List>
          <List.Item
            thumb={<CaiNiao name='yonghuziliao' color='#29ab91' size={22} style={styles.accountIcon}/>}
          >
            <Text style={styles.fieldLable}>{driver}</Text>
          </List.Item>
          <List.Item
            thumb={<CaiNiao name='dianhua' color='#108ee9' size={22} style={styles.accountIcon}/>}
          >
            <Text style={styles.fieldLable}>{driverMobile}</Text>
          </List.Item>
        </List>
        <WhiteSpace size='md'/>
        <List>
          <List.Item
            thumb={<CaiNiao name='suoding' color='#f39826' size={22} style={styles.accountIcon}/>}
            extra={<CaiNiao name='xiayiyeqianjinchakangengduo' color='#c7c7cc' size={20}/>}
            onPress={() => navigate('UpdateUser', { username: truckNo, userId: id }) }
          >
            <Text style={styles.fieldLable}>修改密码</Text>
          </List.Item>
          <List.Item
            thumb={<CaiNiao name='zhuxiaoguanji' color='#f15a4a' size={22} style={styles.accountIcon}/>}
            extra={<CaiNiao name='xiayiyeqianjinchakangengduo' color='#c7c7cc' size={20}/>}
            onPress={this.handleShowLogoutActionSheet}
          >
            <Text style={styles.fieldLable}>退出登录</Text>
          </List.Item>
        </List>
      </Layout>
    )
  }
}

export default AccountScreen;

const styles = StyleSheet.create({
  accountCard: {
    borderWidth: 0,
    backgroundColor: '#108ee9',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12
  },
  cartTextColor: {
    color: '#fff', 
    fontSize: 15
  },
  cardSub: {
    borderRadius: 20,
    backgroundColor:'#2989d5',
    borderWidth: 1, 
    borderColor: '#60a8df', 
    paddingLeft: 8, 
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 5,
    flexDirection: 'row'
  },
  avatar: {
    width: 64,
    height: 64,
    resizeMode: 'contain'
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  userInfoList: {
    marginLeft: 16,
    justifyContent: 'center'
  },
  fieldLable: {
    fontSize: 16
  },
  accountIcon: {
    marginRight: 12
  },
  bottomButton: {
    position: 'absolute',
    left:0 ,
    bottom: 0,
    color: 'red', 
    textAlign: 'center', 
    fontSize: 20,
    paddingTop: 16,
    paddingBottom: 16
  }
})