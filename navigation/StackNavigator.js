import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { screenNavigationOptions, screenDefaultNavigationOptions, modalScreenNavigationOptions } from '../constants/navigationOptions';

import TabBarIcon from '../components/TabBarIcon';
import DetailScreen from '../screens/DetailScreen';
import TaskScreen from '../screens/TaskScreen';
import NotesScreen from '../screens/NotesScreen';
import AccountScreen from '../screens/AccountScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import EnterScreen from '../screens/EnterScreen';

const TaskStack = createStackNavigator({
  Task: TaskScreen
}, {
  ...screenNavigationOptions,
  defaultNavigationOptions: {
    ...screenDefaultNavigationOptions
  }
});

TaskStack.navigationOptions = {
  tabBarLabel: '作业',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`lingdang${focused ? '' : '-xianxing'}`}
    />
  )
};

const NotesStack = createStackNavigator({
  Notes: NotesScreen
}, {
  ...screenNavigationOptions,
  defaultNavigationOptions: {
    ...screenDefaultNavigationOptions
  }
});

NotesStack.navigationOptions = {
  tabBarLabel: '记录',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`danju${focused ? '' : '-xianxing'}`}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen
}, {
  ...screenNavigationOptions,
  defaultNavigationOptions: {
    ...screenDefaultNavigationOptions
  }
});

AccountStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`yonghu${focused ? '' : '-xianxing'}`}
    />
  ),
};

const TabNavigator = createBottomTabNavigator({
  TaskStack,
  NotesStack,
  AccountStack,
},{
  tabBarOptions: {
    labelStyle: {
      fontSize: 11,
    },
    style: {
      borderTopColor: "#eaeaea",
      paddingTop: 6,
      paddingBottom: 5,
      height: 50
    }
  }
})

TabNavigator.navigationOptions = {
  header: null
}

export default createStackNavigator({
  Tab: TabNavigator,
  Detail: DetailScreen,
  Enter: EnterScreen,
  UpdateUser: UpdateUserScreen
}, {
  defaultNavigationOptions: {
    headerBackTitle: null
  },
  headerLayoutPreset: 'center',
  transitionConfig:screenNavigationOptions.transitionConfig,
  initialRouteName: 'Tab'
});