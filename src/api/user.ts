import instance from '../utils/request';

export const getUsers = () => {
  return instance.get('/api/user/list');
}