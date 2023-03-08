<template>
  <h2>任务管理</h2>
  <!-- 表格 -->
  <el-table :data="taskList" stripe height="400" style="width: 100%" class="table">
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="setterName" label="发布者" />
    <el-table-column prop="getterName" label="接收者" />
    <el-table-column prop="status" label="状态">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 0" disable-transitions type="info">未接受</el-tag>
        <el-tag v-else-if="scope.row.status === 1" disable-transitions type="success">已接受</el-tag>
        <el-tag v-else-if="scope.row.status === 2" disable-transitions>已完成</el-tag>
      </template>
    </el-table-column>
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

  <div class="pagination">
    <el-pagination
      small
      background
      layout="prev, pager, next"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
    />
  </div>

  <!-- 表单 -->
  <el-dialog v-model="formVisible" title="编辑任务">
    <el-form ref="formRef" :model="taskModel" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="taskModel.title" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="taskModel.price" :step="10" :min="0" :max="999" />
      </el-form-item>
      <el-form-item label="接收者">
        <el-input v-model="taskModel.setterName" disabled />
      </el-form-item>
      <el-form-item label="发布者">
        <el-input v-model="taskModel.getterName" disabled />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="taskModel.status">
          <el-radio :label="0">未接受</el-radio>
          <el-radio :label="1">已接受</el-radio>
          <el-radio :label="2">已完成</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch, reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { deleteTask, editTask, getTask, getTasks } from '../api/task';
import { Task } from '../types';

const formRef = ref();
const rules = reactive<FormRules>({
  title: [{ required: true, message: '标题为必填项', trigger: 'blur' }]
});

// 获取任务列表
const taskList = ref<Task[]>([]);
const page = ref(1);
const pageSize = 8;
const total = ref(0);
const handleTaskList = async () => {
  const { data: res } = await getTasks(page.value, pageSize);
  taskList.value = res.data.list;
  total.value = res.data.total;
};
watch(
  () => page.value,
  () => {
    handleTaskList();
  },
  { immediate: true }
);

// 删除任务
const handleDelete = async (row: any) => {
  const { data: res } = await deleteTask(row._id);
  if (res.errno === 0) {
    ElMessage.success('删除成功');
    handleTaskList();
  } else {
    ElMessage.error(res.msg);
  }
};

// 编辑任务
const formVisible = ref(false);
const taskModel = ref<Task>({
  _id: '',
  title: '',
  price: 0,
  setterName: '',
  getterName: '',
  status: 0
});
const handleEdit = async (row: any) => {
  formVisible.value = true;
  const { data: res } = await getTask(row._id);
  taskModel.value = res.data;
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { _id, title, price, status } = taskModel.value;
      const { data: res } = await editTask(_id, title, price, status);
      if (res.errno === 0) {
        ElMessage.success('修改成功');
        formVisible.value = false;
        handleTaskList();
      } else {
        ElMessage.error(res.msg);
      }
    }
  });
};
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: end;
}
</style>
