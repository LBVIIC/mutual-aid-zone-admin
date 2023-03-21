import instance from '../utils/request';

export const getChats = () => {
  return instance.get('/api/chat');
};

export const deleteChat = (_id: string) => {
  return instance.post('/api/chat/delete', { _id });
};
