import request from '../utils/request';
export default async function upload(formData) {
  return request('/app/file/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}