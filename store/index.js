import { init } from '@rematch/core';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import createLoadingPlugin from '@rematch/loading';
import AppNavigator from '../navigation/AppNavigator';

import user from './models/user';
import upload from './models/upload';
import task from './models/task';

const loading = createLoadingPlugin()

const navReducer = createNavigationReducer(AppNavigator);

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const redux = {
  middlewares: [middleware],
  reducers: {
    nav: navReducer
  }
}

const App = reduxifyNavigator(AppNavigator, 'root');

const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = init({
  models: {
    user,
    upload,
    task
  },
  redux,
  plugins: [loading]
});

const dispatch = store.dispatch;

export { 
  dispatch,
  AppWithNavigationState 
}
export default store;