import React from 'react';
import { StyleSheet, View } from 'react-native';
import store, { AppWithNavigationState } from './store';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { Provider } from 'react-redux';
import theme from './constants/theme';
export default class App extends React.Component {
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
