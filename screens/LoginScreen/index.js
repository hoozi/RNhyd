import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createForm } from 'rc-form';
import CopyRight from '../../components/CopyRight';
import Layout from '../../layouts/Layout';
import layout from '../../constants/Layout';
import { connect } from 'react-redux';
import { mapEffects } from '../../utils/reduxHelpers';

const loginInputMap = [
  {
    name: 'username',
    props: {
      placeholder: '用户名21333'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        }
      ],
      initialValue: '浙B12345'
    }
  },
  {
    name: 'password',
    props: {
      placeholder: '密码'
    },
    options: {
      rules: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      initialValue: '123456'
    }
  }
]
const iconNameMap = {
  'username': 'user',
  'password': 'lock1'
}

const mapStateToProps = ({loading}) => ({

});

const mapDispacthToProps = ({user}) => ({
  ...mapEffects(user, ['fetchToken'])
})

class LoginItem extends Component {
  render() {
    const { item, onChange, value, error } = this.props;
    return (
      <View style={styles.inputItem}>
        <AntDesign name={iconNameMap[item.name]} size={16} color='#e8e8e8' style={styles.textInputPrefix}/>
        <TextInput 
          style={styles.textInput} 
          value={value || ''}
          onChangeText={onChange}
          secureTextEntry={item.name==='password'} 
          underlineColorAndroid='transparent'
          placeholderTextColor='#e8e8e8'
          returnKeyLabel='确定'
          returnKeyType='done'
          {...item.props}
        />
      </View>
    )
  }
}

@connect(mapStateToProps, mapDispacthToProps)
@createForm()
export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  handleLoginSubmit = () => {
    const { form, fetchToken } = this.props;
    form.validateFields((error, values) => {
      if(error) return;
      fetchToken({
        ...values,
        scope: 'server',
        grant_type: 'password'
      });
    });
  }
  render() {
    const { form: {getFieldDecorator, getFieldError, getFieldValue} } = this.props;
    return (
      <Layout>
        <ScrollView contentContainerStyle={{flex: 1}} bounces={false}>
          <KeyboardAvoidingView behavior='padding' enabled style={{flex: 1}}>
            <StatusBar barStyle='dark-content'/>
            <View style={styles.loginHeader}>
              <Image source={
                require('../../assets/images/avatar.png')
              } style={styles.avatar}/>
            </View>
            <View style={styles.loginContainer}>
              {
                loginInputMap.map(item => 
                  <View style={styles.textInputContainer} key={item.name}>
                    {
                      getFieldDecorator(item.name, { ...item.options })(
                        <LoginItem
                          item={item}
                          error={getFieldError(item.name)}
                        />
                      )
                    }
                  </View>
                )
              }
              <Button type='primary' disabled={!getFieldValue('username') || !getFieldValue('password')} onPress={this.handleLoginSubmit} style={styles.loginButton}>登录</Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    width: layout.window.width,
    paddingLeft: 24,
    paddingRight: 24
  },
  avatar: {
    width: 72,
    height: 72,
    resizeMode: 'contain'
  },
  textInputContainer: {
    marginBottom: 16
  },
  textInputPrefix: {
    position: 'absolute',
    left:12,
    top: 12,
    zIndex: 1
  },
  inputItem: {
    
  },
  textInput: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    padding: 0,
    paddingLeft: 34,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  loginButton: {
    marginTop: 32
  },
  loginHeader: {
    marginBottom: 32,
    marginTop: 120,
    alignItems: 'center'
  }
})
