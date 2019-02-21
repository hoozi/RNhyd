import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import StackNavigator from './StackNavigator';
import LoginScreen from '../screens/LoginScreen';
import CheckLoginScreen from '../screens/CheckLoginScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: StackNavigator,
  Login: LoginScreen,
  CheckLogin: CheckLoginScreen
}, {
  initialRouteName: 'CheckLogin'
}));