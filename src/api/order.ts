import instance from '../utils/request';

export const getOrders = () => {
  return instance.get('/api/order', { params: { type: 'all' } });
};

export const getOrder = (_id: string) => {
  return instance.get('/api/order/detail', { params: { _id } });
};

export const editOrder = (_id: string, address: string, express?: string) => {
  return instance.post('/api/order/edit', { _id, address, express });
};
