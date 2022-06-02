<template>
  <h2>用户管理</h2>
  <el-button type="primary">新增用户</el-button>
  <el-table :data="userList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="username" label="用户名" width="160" fixed="left" />
    <el-table-column prop="email" label="邮箱" width="160" />
    <el-table-column prop="phone" label="手机号" width="140" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="balance" label="余额" />
    <el-table-column prop="role" label="权限" />
    <el-table-column label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { getUsers } from '../api/user';

interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  role: string;
}

const userList: User[] = [
  {
    _id: '6281f546321e768efb7b8ae4',
    username: '123456',
    password: 'a8fafeab06db8996201cd578b21f9ea9',
    email: '43055550@qq.com',
    phone: '18067055553',
    address: '浙江省嘉兴市',
    balance: 30,
    role: '0'
  },
  {
    _id: '6281f546321e768efb7b8ae4',
    username: '123456',
    password: 'a8fafeab06db8996201cd578b21f9ea9',
    email: '43055550@qq.com',
    phone: '18067055553',
    address: '浙江省嘉兴市',
    balance: 30,
    role: '0'
  }
];

const handleEdit = (row: any) => {
  console.log(row);
};
const handleDelete = (row: any) => {
  console.log(row);
};

getUsers().then((res) => {
  console.log(res);
});
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
}
</style>
