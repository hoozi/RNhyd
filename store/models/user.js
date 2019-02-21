import { Toast, Portal } from '@ant-design/react-native';
import { NavigationActions } from 'react-navigation';
import isNil from 'lodash/isNil';
import { queryToken, queryCurrentUser, updateUserInfo } from '../../api/user';
import { setToken, removeToken } from '../../utils/token';
import { setStorage, removeStorage, getStorage } from '../../utils/storage';
 
//const router = getState().router;

const state = {
  user: {}
}
const reducers = {
  save(state, payload) {
    return Object.assign(state, payload)
  }
};
const effects = dispatch => ({
  async fetchToken(payload, { nav }) {
    const key = Toast.loading('登录中...');
    const response = await queryToken(payload);
    if(isNil(response) || (!isNil(response) && isNil(response.access_token)) ) return;
    const { access_token } = response;
    setToken(access_token);
    dispatch.user.fetchCurrentUser(() => {
      Portal.remove(key);
      const CheckLoginAction = NavigationActions.navigate({
        routeName: 'Main'
      });
      dispatch(CheckLoginAction);
    });
  },
  async updateUserInfo(payload) {
    const response = await updateUserInfo(payload);
    if(isNil(response) || response.code != 0) return;
    if(!response.data) {
      return Toast.fail(response.msg);
    }
    dispatch.user.logout();
  },
  async fetchCurrentUser(callback) {
    const response = await queryCurrentUser();
    if(isNil(response) || response.code != 0) return;
    setStorage('user', response.data);
    this.save({user: response.data});
    callback && callback();
  },
  logout() {
    removeToken();
    removeStorage('user');
    const LoginAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    dispatch(LoginAction);
  }
});

export default {
  state,
  reducers,
  effects
}