import request from '../utils/request';
import { stringify } from 'qs';

export async function updateUserInfo(params) {
  return request('/app/user', {
    method: 'PUT',
    body: params
  });
}

export async function queryCurrentUser() {
  return request('/app/user/info');
}

export async function queryToken(params) {
  return request('/auth/oauth/token', {
    method: 'POST',
    body: `${stringify(params)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}