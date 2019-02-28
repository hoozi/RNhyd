import React from 'react';
import { StyleSheet, NativeModules, View, DeviceEventEmitter, Platform, Alert, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import store, { AppWithNavigationState } from './store';
import { Provider as AntdProvider, Toast} from '@ant-design/react-native';
import { Provider } from 'react-redux';
import theme from './constants/theme';

const updateDialog = {
  mandatoryContinueButtonLabel: "立即更新",
  appendReleaseDescription: true,
  descriptionPrefix:'\n\n更新内容:\n',
  mandatoryUpdateMessage: "新版本",
  optionalIgnoreButtonLabel: "忽略",
  optionalInstallButtonLabel: "立即更新",
  optionalUpdateMessage: "发现一个可用版本",
  title: "检测到更新"
};

function checkAndroidUpgrade() {
  fetch(`http://www.weihuanginfo.com/upgrade.json?t=${Date.now()}`)
  .then(response=>{
    return response.json();
  }).then(data => {
    const localVersion = NativeModules.upgrade.versionName;
    const serviceVersion = data.versionName;
    if(localVersion!==serviceVersion) {
      Alert.alert('发现新版本','是否下载',
        [
          {text:"确定", onPress:() => {
            NativeModules.upgrade.upgrade(data.upgradeUrl);  
          }},     
          {text:"取消"}    
        ]
      );
    }
  })
}
function checkIOSUpgrade() {}
Platform.OS === 'android' ? checkAndroidUpgrade() : checkIOSUpgrade();
export default class App extends React.Component {
  componentWillMount(){
    if(Platform.OS === 'android') {
      this.progressListener =  DeviceEventEmitter.addListener('LOAD_PROGRESS', msg=>{
        ToastAndroid.show(`当前下载进度：${msg}%`, ToastAndroid.SHORT); 
      }); 
    }
  } 
  componentDidMount() {
    SplashScreen.hide();
    codePush.sync({
      updateDialog,
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
      mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESUME
    },
    syncStatus => this.codePushStatusDidChange(syncStatus));
  }
  componentWillUnmount() {
    Platform.OS === 'android' && this.progressListener.remove();
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
          Toast.success('安装完成,请重启APP')
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
