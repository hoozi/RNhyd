import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Toast, List, InputItem } from '@ant-design/react-native';
import { connect } from 'react-redux';
import { childDefaultNavigationOptions } from '../../constants/navigationOptions';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers'
import Layout from '../../layouts/Layout';
import CaiNiao from '../../components/Icon';

const mapDispatchToProps = ({ user }) => mapEffects(user, ['updateUserInfo']);

@connect(({user})=>({
  ...user,
  ...mapLoading('user', {
    updateUsering: 'updateUserInfo'
  })
}), mapDispatchToProps)
class UpdateUserScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const state = navigation.state;
    const { params } = state;
    return {
      ...childDefaultNavigationOptions,
      title: '修改密码' 
    }
  }
  state = {
    visible: false,
    password: '',
    newpassword1: ''
  }
  handleVisible = () => {
    this.setState(prevState => {
      const { visible } = prevState;
      //this.input.blur();
      return {
        visible: !visible
      }
    })
  }
  handleUpdatePassword = () => {
    const { password, newpassword1 } = this.state;
    const { navigation } = this.props;
    const userId = navigation.getParam('userId');
    const username = navigation.getParam('username');
    if(!password || !newpassword1) return Toast.fail('新密码或者旧密码必填');
    this.props.updateUserInfo({
      password,
      newpassword1,
      userId,
      username
    });
  }
  handleChangePassword = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  render() {
    const { visible, password, newpassword1 } = this.state
    const { navigation: {getParam}, updateUsering } = this.props
    return (
      <Layout>
        <StatusBar barStyle='dark-content'/>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Card style={styles.accountCard} full>
            <View>
              <View>
                <Text style={styles.desText}>请为您的账号</Text>
                <Text style={styles.titleText}>{getParam('username','')}</Text>
                <Text style={styles.desText}>设置一个新密码</Text>
              </View>
            </View>
          </Card>
          <List style={styles.inputContainer}>
            <InputItem
              type='password'
              placeholder='请输入'
              labelNumber={4}
              onChange={val => this.handleChangePassword('password', val)}
            >
              <Text>旧密码</Text>
            </InputItem>
            <InputItem
              type={!visible ? 'password' : 'text'}
              placeholder='请输入'
              ref={ref => this.input = ref}
              onExtraClick={this.handleVisible}
              onChange={val => this.handleChangePassword('newpassword1', val)}
              labelNumber={4}
              extra={
                <CaiNiao 
                  name={visible ? 'xianshikejian' : 'yincangbukejian'} 
                  size={22} 
                  color='#666'
                />
              }
            >
              <Text>新密码</Text>
            </InputItem>
          </List>
          <View style={styles.bottomButtonContainer}>
            <Button 
              type='primary'
              disabled={!password || !newpassword1 || updateUsering}
              loading={updateUsering}
              onPress={this.handleUpdatePassword}  
              style={styles.bottomButton}
            >
              保存新密码
            </Button>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

export default UpdateUserScreen;

const styles = StyleSheet.create({
  accountCard: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderTopWidth: 0,
    height: 100,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(0,0,0,0.55)'
  },  
  titleText: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    paddingLeft: 12,
    paddingRight: 32,
    height: 45,
    fontSize: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    backgroundColor: '#fff'
  },
  bottomButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  bottomButton: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  }

})