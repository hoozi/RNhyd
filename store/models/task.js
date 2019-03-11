import { 
  queryContainerTask, 
  queryCargoTask,  
  queryContainerTaskDetailById, 
  queryCargoTaskDetailById,
  updateContainerTaskStatus,
  updateCargoTaskStatus,
  queryContainerHistory,
  queryCargoHistory,
  queryContainerHistoryDetailById,
  queryCargoHistoryDetailById
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

const operateHistory = {
  1: queryContainerHistory,
  2: queryCargoHistory
}

const operateType = {
  'new': operates,
  'history': operateHistory
}

const operateDetails = {
  1: queryContainerTaskDetailById,
  2: queryCargoTaskDetailById
}

const operateDetailHistory = {
  1: queryContainerHistoryDetailById,
  2: queryCargoHistoryDetailById
}

const operateDetailType = {
  'new': operateDetails,
  'history': operateDetailHistory
}

const operateStatus = {
  1: updateContainerTaskStatus,
  2: updateCargoTaskStatus
}

const effects = {
  async fetchTask(payload, { task }, callback) {
    const { size, current } = task;
    const user = await getStorage('user');
    const { truckType } = JSON.parse(user);
    const response = await operateType[payload.taskType][truckType]({size, current, ...payload.params});
    if(isNil(response) || response.code != 0) {
      callback && callback();
      return;
    };
    this.save({...response.data, truckType});
    callback && callback(response.data);
  },
  async fetchTaskDetailById(payload, {task}) {
    const { truckType } = task;
    const response = await operateDetailType[payload.taskType][truckType](payload.params);
    if(isNil(response) || response.code != 0) return;
    const { data:detail } = response;
    this.save({detail});
  },
  async updateTaskStatus(payload, {task}, callback) {
    const { truckType } = task;
    const { operateName, params } = payload;
    const updateStatusService = operateStatus[truckType](operateName);
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