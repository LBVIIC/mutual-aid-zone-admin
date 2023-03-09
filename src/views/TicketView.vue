<template>
  <h2>工单管理</h2>
  <!-- 表格 -->
  <el-table :data="ticketList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="user" label="用户" width="180" fixed="left" />
    <el-table-column prop="question" label="问题" show-overflow-tooltip />
    <el-table-column prop="admin" label="管理员" width="180" />
    <el-table-column prop="answer" label="回复" show-overflow-tooltip />
    <el-table-column prop="status" label="状态" width="180">
      <template #default="scope">
        <el-tag :type="scope.row.answer ? 'success' : 'info'" disable-transitions>
          {{ scope.row.answer ? '已回复' : '未回复' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleAnswer(scope.row)">回复</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 表单 -->
  <el-dialog v-model="formVisible" title="回复工单">
    <el-form :model="ticketModel" label-width="80px">
      <el-form-item label="用户" prop="user">
        <el-input v-model="ticketModel.user" disabled />
      </el-form-item>
      <el-form-item label="问题" prop="question">
        <el-input v-model="ticketModel.question" disabled type="textarea" :autosize="true" />
      </el-form-item>
      <el-form-item label="管理员" prop="admin">
        <el-input v-model="ticketModel.admin" disabled />
      </el-form-item>
      <el-form-item label="回答" prop="answer">
        <el-input v-model="ticketModel.answer" type="textarea" maxlength="150" show-word-limit :autosize="true" />
      </el-form-item>
      <el-form-item label="状态">
        <el-tag :type="ticketModel.answer ? 'success' : 'info'" disable-transitions>
          {{ ticketModel.answer ? '已回复' : '未回复' }}
        </el-tag>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import { ref } from 'vue';
import { Ticket } from '../types';
import { getTickets, getTicket, answerTicket } from '../api/ticket';
const ticketModel = ref<Ticket>({
  _id: '',
  user: '',
  question: '',
  admin: '',
  answer: ''
});

// 获取工单列表
const ticketList = ref<Ticket[]>([]);
const handleTicketList = async () => {
  const { data: res } = await getTickets();
  ticketList.value = res.data;
};
handleTicketList();

// 获取工单详情
const handleTickDetail = async (_id: string) => {
  const { data: res } = await getTicket(_id);
  ticketModel.value = res.data;
};

const formVisible = ref(false);
const handleAnswer = (row: any) => {
  formVisible.value = true;
  handleTickDetail(row._id);
};

const handleSubmit = async () => {
  const { _id, answer } = ticketModel.value;
  const { data: res } = await answerTicket(_id, answer);
  if (res.errno === 0) {
    ElMessage.success(res.msg);
    formVisible.value = false;
    handleTicketList();
  } else {
    ElMessage.error(res.msg);
  }
};
</script>

<style lang="less" scoped></style>
