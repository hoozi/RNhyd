import React, { Component } from 'react';
import Task from '../../components/Task';

export default class NotesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const total = navigation.getParam('total', '')
    return {
      title: `历史${total ? '('+total+')' : ''}`,
      headerBackTitle: null
    }
  }
  render() {
    return <Task taskType='history'/>
  }
}