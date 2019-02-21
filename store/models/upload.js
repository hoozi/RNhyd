import { Toast, Portal } from '@ant-design/react-native';
import isNil from 'lodash/isNil';
import upload from '../../api/upload';
 
//const router = getState().router;

const state = {
  bucketName: '',
  fileName: ''
}
const reducers = {
  save(state, payload) {
    return Object.assign(state, payload)
  }
};
const effects = dispatch => ({
  async upload(payload) {
    const response = await upload(payload);
    if(isNil(response) || response.code !== 0) return;
    this.save(response.data);
  }
});

export default {
  state,
  reducers,
  effects
}