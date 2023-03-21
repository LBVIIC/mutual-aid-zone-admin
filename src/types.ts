export interface Good {
  _id: string;
  name: string;
  price: number;
  stock: number;
  img: string;
  imgFile: any;
}

export interface Task {
  _id: string;
  title: string;
  content: string;
  price: number;
  setter: string;
  getter: string;
  status: number;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  role: string | number;
}

export interface Order {
  _id: string;
  good: string;
  price: number;
  address: string;
  user: string;
  express: string;
  status: number;
}

export interface Ticket {
  _id: string;
  user: string;
  question: string;
  admin: string;
  answer: string;
}

export interface Chat {
  _id: string;
  sender: { _id: string; username: string };
  receiver: { _id: string; username: string };
  content: string;
  delete: boolean;
  createdAt: string;
}
