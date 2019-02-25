import request from '../utils/request';
import { stringify } from 'qs';

export async function queryContainerTask(params) {
  return request(`/app/container/operate/task-list?${stringify(params)}`);
}

export async function queryContainerTaskDetailById(id) {
  return request(`/app/container/operate/task/${id}`)
}

export async function queryCargoTask(params) {
  return request(`/app/cargo/operate/task-list?${stringify(params)}`);
}

export async function queryCargoTaskDetailById(id) {
  return request(`/app/cargo/operate/task/${id}`)
}

export function updateContainerTaskStatus(name) {
  return async params => request(`/app/container/operate/${name}`, {
    method: 'POST',
    body: params
  });
}

export function updateCargoTaskStatus(name) {
  return async params => request(`/app/cargo/operate/${name}`, {
    method: 'POST',
    body: params
  });
}

export async function queryContainerHistory(params) {
  return request(`/app/container/operate/history-task-list?${stringify(params)}`);
}

export async function queryCargoHistory(params) {
  return request(`/app/cargo/operate/history-task-list?${stringify(params)}`);
}

export async function queryContainerHistoryDetailById(id) {
  return request(`/app/container/operate/history-task/${id}`);
}

export async function queryCargoHistoryDetailById(id) {
  return request(`/app/cargo/operate/history-task/${id}`);
}