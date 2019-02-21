import { AsyncStorage } from 'react-native';

const { setItem, getItem, removeItem } = AsyncStorage;
const KEY = 'USER_TOKEN';

export async function setToken(token) {
  return setItem(KEY, token);
}

export async function getToken() {
  return getItem(KEY);
}

export async function removeToken() {
  return removeItem(KEY);
}