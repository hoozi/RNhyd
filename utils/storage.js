import { AsyncStorage } from 'react-native';
import isObject from 'lodash/isObject';

const { setItem, getItem, removeItem } = AsyncStorage;

export async function setStorage(key, value) {
  return setItem(key, isObject(value) ? JSON.stringify(value) : value);
}

export async function getStorage(key) {
  return getItem(key);
}

export async function removeStorage(key) {
  return removeItem(key);
}