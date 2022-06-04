import instance from '../utils/request';

export const getGoods = () => {
  return instance.get('/api/store');
}