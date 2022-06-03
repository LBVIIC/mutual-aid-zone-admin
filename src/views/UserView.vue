<template>
  <h2>用户管理</h2>
  <el-button type="primary" @click="addUserFormVisible = true">新增用户</el-button>

  <!-- 表格 -->
  <el-table :data="userList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="username" label="用户名" width="160" fixed="left" />
    <el-table-column prop="email" label="邮箱" width="160" />
    <el-table-column prop="phone" label="手机号" width="140" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="balance" label="余额" />
    <el-table-column prop="role" label="权限" />
    <el-table-column label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleShowEdit(scope.row)">编辑</el-button>
        <el-popconfirm
          title="确认要删除吗？"
          placement="top-end"
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

  <el-dialog v-model="addUserFormVisible" title="新增用户">
    <el-form ref="addFormRef" :model="addModel" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addModel.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addModel.email" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addModel.phone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="addModel.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addUserFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleAdd(addFormRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editUserFormVisible" title="修改用户">
    <el-form :model="editModel" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="editModel.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editModel.email" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="editModel.phone" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editModel.address" />
      </el-form-item>
      <el-form-item label="余额">
        <el-input-number v-model="editModel.balance" :step="10" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="editModel.role">
          <el-radio :label="0" size="large">普通用户</el-radio>
          <el-radio :label="1" size="large">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="editModel.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editUserFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { useUser } from '../composables/useUser';

const addFormRef = ref<FormInstance>();
const rules = reactive({
  username: { required: true, message: 'Please input Activity name' }
});
const {
  userList,
  editModel,
  addModel,
  addUserFormVisible,
  editUserFormVisible,
  handleUserList,
  handleShowEdit,
  handleEdit,
  handleDelete,
  handleAdd
} = useUser();

handleUserList();
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
}
</style>
