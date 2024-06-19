import instance from '../utils/request';

export const login = (username: string, password: string) => {
  return instance.post('/user/login', {
    username,
    password
  });
};

export const getUsers = () => {
  return instance.get('/user');
};

export const getUser = (_id: string) => {
  return instance.get('/user/detail', { params: { _id } });
};

export const deleteUser = (_id: string) => {
  return instance.post('/user/delete', {
    _id
  });
};

export const createUser = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/user/register', {
    username,
    phone,
    email,
    password
  });
};

export const editUser = (
  _id: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  address: string,
  balance: number,
  role: number
) => {
  return instance.post('/user/edit', {
    _id,
    username,
    password,
    email,
    phone,
    address,
    balance,
    role
  });
};
