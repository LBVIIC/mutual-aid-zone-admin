<template>
  <h2>用户管理</h2>
  <el-button type="primary" @click="handleCreate(createFormRef)">新增用户</el-button>

  <!-- 表格 -->
  <el-table :data="userList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="username" label="用户名" width="160" fixed="left" />
    <el-table-column prop="email" label="邮箱" width="160" />
    <el-table-column prop="phone" label="手机号" width="140" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="balance" label="余额" />
    <el-table-column prop="role" label="权限" />
    <el-table-column label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm
          title="确认要删除吗？"
          @confirm="handleDelete(scope.row)"
          confirm-button-text="确认"
          cancel-button-text="取消"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增用户表单 -->
  <el-dialog v-model="createUserFormVisible" title="新增用户">
    <el-form ref="createFormRef" :model="userModel" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userModel.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userModel.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userModel.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userModel.password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="createUserFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit(createFormRef, 'create')">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑用户表单 -->
  <el-dialog v-model="editUserFormVisible" title="编辑用户">
    <el-form ref="editFormRef" :model="userModel" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userModel.username" :disabled="userModel.username === 'admin'" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userModel.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userModel.phone" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="userModel.address" />
      </el-form-item>
      <el-form-item label="余额">
        <el-input-number v-model="userModel.balance" :step="10" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="userModel.role">
          <el-radio :label="0">普通用户</el-radio>
          <el-radio :label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="editPassword">
        <el-input v-model="userModel.password" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editUserFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(editFormRef, 'edit')">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { useUser } from '../composables/useUser';
import { createUser, deleteUser, editUser, getUser, getUsers } from '../api/user';
import { User } from '../types';

const { rules, userModel } = useUser();

// 获取用户列表
const userList = ref<User[]>([]);
const handleUserList = async () => {
  const { data: res } = await getUsers();
  if (res.errno === 0) {
    userList.value = res.data;
    userList.value.forEach((item) => {
      if (item.role === 0) {
        item.role = '普通用户';
      } else {
        item.role = '管理员';
      }
    });
  }
};
handleUserList();

// 新增用户
const createUserFormVisible = ref(false);
const createFormRef = ref<FormInstance>();
const handleCreate = (formEl: FormInstance | undefined) => {
  createUserFormVisible.value = true;
  formEl.resetFields();
};

// 编辑用户
const editUserFormVisible = ref(false);
const editFormRef = ref<FormInstance>();
const handleEdit = async (row: any) => {
  editUserFormVisible.value = true;
  const { data: res } = await getUser(row._id);
  res.data.password = '';
  userModel.value = res.data;
};

// 提交表单
const handleSubmit = async (formEl: FormInstance | undefined, type: string) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { username, password, email, phone } = userModel.value;
      if (type === 'create') {
        const { data: res } = await createUser(username, phone, email, password);
        if (res.errno === 0) {
          createUserFormVisible.value = false;
          ElMessage({ message: '添加成功', type: 'success' });
          formEl.resetFields();
          handleUserList();
        } else {
          ElMessage.error(res.msg);
        }
      } else if (type === 'edit') {
        const { _id, address, balance, role } = userModel.value;
        const { data: res } = await editUser(_id, username, password, email, phone, address, balance, role as number);
        if (res.errno === 0) {
          editUserFormVisible.value = false;
          ElMessage({ message: res.msg, type: 'success' });
          handleUserList();
        } else {
          ElMessage.error(res.msg);
        }
      }
    }
  });
};

// 删除用户
const handleDelete = async (row: any) => {
  if (row.username === 'admin') {
    ElMessage.error('默认管理员不可删除');
    return;
  }
  const { data: res } = await deleteUser(row._id);
  if (res.errno === 0) {
    ElMessage({
      message: res.msg,
      type: 'success'
    });
    handleUserList();
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
}
</style>
