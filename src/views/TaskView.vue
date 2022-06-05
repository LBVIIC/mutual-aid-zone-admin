<template>
  <h2>任务管理</h2>
  <!-- 表格 -->
  <el-table :data="taskList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="setterName" label="发布者" />
    <el-table-column prop="getterName" label="接收者" />
    <el-table-column prop="status" label="状态">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 0" type="info">未接受</el-tag>
        <el-tag v-else-if="scope.row.status === 1" type="success">已接受</el-tag>
        <el-tag v-else-if="scope.row.status === 2">已完成</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确认要删除吗？" @confirm="handleDelete(scope.row)" confirm-button-text="确认" cancel-button-text="取消">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 表单 -->
  <!-- <el-dialog v-model="goodFormVisible" :title="formType.title">
    <el-form ref="FormRef" :model="goodModel" label-width="80px" :rules="rules">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="goodModel.name" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="goodModel.price" :step="10" :min="1" :max="9999" />
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input-number v-model="goodModel.stock" :step="10" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="图片">
        <div class="uploader">
          <input type="file" class="uploader__input" ref="imgFileRef" @change="handleImgFile" />
          <img v-if="goodModel.img" :src="goodModel.img" @click="handleImgUpload" />
          <el-icon v-else class="uploader__icon" @click="handleImgUpload"><Plus /></el-icon>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="goodFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit(FormRef, formType.type)">提交</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { deleteTask, getTasks } from '../api/task';

interface Task {
  _id: string;
  title: string;
  price: number;
  setterName: string;
  getterName: string;
  status: string;
}
const taskList = ref<Task[]>([]);

const handleTaskList = async () => {
  const { data: res } = await getTasks();
  taskList.value = res.data;
};

const handleDelete = async (row: any) => {
  const { data: res } = await deleteTask(row._id);
  if (res.errno === 0) {
    ElMessage.success('删除成功');
    handleTaskList();
  } else {
    ElMessage.error(res.msg);
  }
};

handleTaskList();
</script>

<style lang="less" scoped></style>
