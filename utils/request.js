import store from '../store';
import { Toast } from '@ant-design/react-native';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import { getToken } from './token';
import { SERVICE_URL } from '../constants/app';

const codeMessage = {
  200: '操作成功',
  401: '用户没有权限',
  403: '访问被禁止',
  404: '资源不存在',
  426: '用户名或密码错误',
  500: '服务器发生错误',
  502: '网关错误',
  504: '网关超时',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  
  const errortext = codeMessage[response.status] || response.statusText;
  response.status != 401 && Toast.fail(errortext);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const token = await getToken();
  const headers = {
    Authorization: token ? `Bearer ${token}` : 'Basic YXBwOmFwcA==',
    Tenant: 1
  }
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = {
    ...defaultOptions, 
    ...options
  };
  
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = isObject(newOptions.body) ? JSON.stringify(newOptions.body) : newOptions.body;
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  newOptions.headers = {
    ...newOptions.headers,
    ...headers
  }
  return fetch(`${SERVICE_URL}${url}`, newOptions)
    .then(checkStatus)
    .then(response => {
      const json = response.json();
      return json
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if(isNil(e.response)) return Toast.offline('服务器无响应');
      if (status === 401 || status === 403) {
        return dispatch.user.logout();
      }
    });
}