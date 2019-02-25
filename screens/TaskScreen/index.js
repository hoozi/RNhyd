import React, { Component } from 'react';
import Task from '../../components/Task';

export default class TaskScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const total = navigation.getParam('total', '')
    return {
      title: `作业${total ? '('+total+')' : ''}`,
      headerBackTitle: null
    }
  }
  render() {
    return <Task taskType='new'/>
  }
}