import instance from '../utils/request';

export const getOrders = () => {
  return instance.get('/order', { params: { type: 'all' } });
};

export const getOrder = (_id: string) => {
  return instance.get('/order/detail', { params: { _id } });
};

export const editOrder = (_id: string, address: string, express?: string) => {
  return instance.post('/order/edit', { _id, address, express });
};
