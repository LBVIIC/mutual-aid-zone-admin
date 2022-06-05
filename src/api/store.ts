import instance from '../utils/request';

export const getGoods = () => {
  return instance.get('/api/store');
};

export const getGood = (_id: string) => {
  return instance.get('/api/store/detail', { params: { _id } });
}

export const createGood = (formData: FormData) => {
  return instance.post('/api/store/create', formData);
};

export const editGood = (formData: FormData) => {
  return instance.post('/api/store/edit', formData);
};

export const deleteGood = (_id: string) => {
  return instance.post('/api/store/delete', { _id });
};

