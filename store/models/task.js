import { 
  queryContainerTask, 
  queryCargoTask,  
  queryContainerTaskDetailById, 
  queryCargoTaskDetailById,
  updateContainerTaskStatus
} from '../../api/task';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import { Toast } from '@ant-design/react-native';
import { getStorage } from '../../utils/storage';

const state = {
  records: [],
  total: 0,
  size: 10,
  current: 1,
  pages: 0,
  detail: {},
  truckType: -1
}

const reducers = {
  save(state, payload) {
    return Object.assign(state, payload);
  }
}

const operates = {
  1: queryContainerTask,
  2: queryCargoTask
}

const operateDetails = {
  1: queryContainerTaskDetailById,
  2: queryCargoTaskDetailById
}

const effects = {
  async fetchTask(payload, { task }, callback) {
    if(isFunction(payload)) {
      callback = payload;
      payload = {};
    }
    const { size, current } = task;
    const user = await getStorage('user');
    const { truckType } = JSON.parse(user);
    const response = await operates[truckType]({size, current, ...payload});
    if(isNil(response) || response.code != 0) {
      callback && callback();
      return;
    };
    this.save({...response.data, truckType});
    callback && callback(response.data.records);
  },
  async fetchTaskDetailById(payload) {
    const user = await getStorage('user');
    const { truckType } = JSON.parse(user);
    const response = await operateDetails[truckType](payload);
    if(isNil(response) || response.code != 0) return;
    const { data:detail } = response;
    this.save({detail});
  },
  async updateTaskStatus(payload, rootState, callback) {
    const { operateName, params } = payload;
    const updateStatusService = updateContainerTaskStatus(operateName);
    const response = await updateStatusService(params);
    if(isNil(response) || response.code != 0) return;
    callback && callback();
  }
}



export default {
  state,
  reducers,
  effects
}