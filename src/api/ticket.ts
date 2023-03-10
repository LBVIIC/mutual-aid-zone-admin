import instance from '../utils/request';

export const getTickets = () => {
  return instance.get('/api/ticket', { params: { type: 'all' } });
};

export const getTicket = (_id: string) => {
  return instance.get('/api/ticket/detail', { params: { _id } });
};

export const answerTicket = (_id: string, answer: string) => {
  return instance.post('/api/ticket/answer', {
    _id,
    answer
  });
};
