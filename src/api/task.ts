import instance from '../utils/request';

export const getTasks = (page: number, pageSize: number) => {
  return instance.get('/task', { params: { page, pageSize } });
};

export const getTask = (_id: string) => {
  return instance.get('/task/detail', { params: { _id } });
};

export const deleteTask = (_id: string) => {
  return instance.post('/task/delete', { _id });
};

export const editTask = (_id: string, title: string, content: string, price: number, status: number) => {
  return instance.post('/task/edit', { _id, title, content, price, status });
};
