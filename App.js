import React from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import store, { AppWithNavigationState } from './store';
import { Provider as AntdProvider, Toast } from '@ant-design/react-native';
import { Provider } from 'react-redux';
import theme from './constants/theme';

const updateDialog = {
  mandatoryContinueButtonLabel: "立即更新",
  mandatoryUpdateMessage: "必须更新",
  optionalIgnoreButtonLabel: "忽略",
  optionalInstallButtonLabel: "立即更新",
  optionalUpdateMessage: "一个更新是可用的。你想要安装它吗?",
  title: "检测到更新"
};

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    codePush.sync({
      updateDialog,
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
      mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART
    },
    syncStatus => this.codePushStatusDidChange(syncStatus));
  }
  codePushStatusDidChange(status) {
    switch(status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          Toast.loading('正在下载...')
          break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
          Toast.loading('正在安装...')
          break;
      case codePush.SyncStatus.UP_TO_DATE:
          break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
          Toast.success('更新完成')
          break;
    }
  }

  codePushDownloadDidProgress(progress) {
      
  }
  render() {
    return (
      <Provider store={store}>
        <AntdProvider theme={theme}>
          <View style={styles.container}>
            <AppWithNavigationState />
          </View>
        </AntdProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
