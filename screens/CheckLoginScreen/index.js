import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import Layout from '../../layouts/Layout';
import { getToken } from '../../utils/token';

export default class CheckLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.checkLogin()
  }
  async checkLogin() {
    const token = await getToken();
    const { navigation } = this.props
    if(token) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  }
  render() {
    return (
      <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </Layout>
    )
  }
}