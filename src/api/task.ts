import instance from '../utils/request';

export const getTasks = () => {
  return instance.get('/api/task');
};

export const deleteTask = (_id: string) => {
  return instance.post('/api/task/delete', { _id });
};
