import instance from '../utils/request';

export const getGoods = () => {
  return instance.get('/store');
};

export const getGood = (_id: string) => {
  return instance.get('/store/detail', { params: { _id } });
}

export const createGood = (formData: FormData) => {
  return instance.post('/store/create', formData);
};

export const editGood = (formData: FormData) => {
  return instance.post('/store/edit', formData);
};

export const deleteGood = (_id: string) => {
  return instance.post('/store/delete', { _id });
};

