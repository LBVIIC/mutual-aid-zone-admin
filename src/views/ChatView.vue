<template>
  <h2>聊天管理</h2>
  <!-- 表格 -->
  <el-table :data="chatList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="sender.username" label="发送者" width="180" fixed="left" />
    <el-table-column prop="receiver.username" label="接收者" width="180" fixed="left" />
    <el-table-column prop="content" label="回复" show-overflow-tooltip />
    <el-table-column prop="createdAt" label="时间" width="180" />
    <el-table-column prop="status" label="状态" width="180">
      <template #default="scope">
        <el-tag :type="scope.row.delete ? 'danger' : ''" disable-transitions>
          {{ scope.row.delete ? '删除' : '正常' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleDelete(scope.row)" v-if="scope.row.delete">恢复</el-button>
        <el-popconfirm
          title="确认要删除吗？"
          @confirm="handleDelete(scope.row)"
          confirm-button-text="确认"
          cancel-button-text="取消"
          v-else
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { deleteChat, getChats } from '../api/chat';
import { Chat } from '../types';
import { formatTime } from '../utils/formatTime';

const chatList = ref<Chat[]>();
const handleChatList = async () => {
  const { data: res } = await getChats();
  chatList.value = res.data;
  chatList.value.forEach((item) => {
    item.createdAt = formatTime(item.createdAt);
  });
};
handleChatList();

const handleDelete = async (row: any) => {
  const { data: res } = await deleteChat(row._id);
  ElMessage.success(res.msg);
  handleChatList();
};
</script>

<style lang="less" scoped></style>
