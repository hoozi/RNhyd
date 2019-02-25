import React from 'react';
import { Platform } from 'react-native';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import CaiNiao from '../components/Icon';

const screenDefaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#108ee9',
    elevation: 0,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: 'transparent'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 18,
    lineHeight: 45
  },
  headerPressColorAndroid: 'transparent'
}

const childDefaultNavigationOptions = {
  ...screenDefaultNavigationOptions,
  headerStyle: {
    ...screenDefaultNavigationOptions.headerStyle,
    backgroundColor: '#fff',
    borderBottomWidth: 0
  },
  headerBackTitleStyle: {
    color:'#108ee9'
  },
  headerTintColor: '#333',
  headerLeftContainerStyle: {
    paddingTop: 4
  },
  headerBackImage: <CaiNiao name='shangyiyehoutuifanhui' color='#108ee9' size={24} style={{marginLeft: Platform.OS === 'ios' ? 5 : 0}}/> 
}

const screenNavigationOptions = {
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  }),
  headerLayoutPreset: 'center'
}


const childScreenNavigationOptions = {
  ...screenNavigationOptions
}

const modalScreenNavigationOptions = {
  ...screenNavigationOptions,
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forVertical
  })
}

export {
  screenDefaultNavigationOptions,
  childDefaultNavigationOptions,
  screenNavigationOptions,
  childScreenNavigationOptions,
  modalScreenNavigationOptions
}