import instance from '../utils/request';

export const getChats = () => {
  return instance.get('/chat');
};

export const deleteChat = (_id: string) => {
  return instance.post('/chat/delete', { _id });
};
