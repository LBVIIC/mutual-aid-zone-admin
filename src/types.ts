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
  price: number;
  setterName: string;
  getterName: string;
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
