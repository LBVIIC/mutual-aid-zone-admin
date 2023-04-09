<template>
  <h2>订单管理</h2>
  <!-- 表格 -->
  <el-table :data="orderList" stripe height="460" style="width: 100%" class="table">
    <el-table-column prop="_id" label="订单号" width="250" fixed="left" />
    <el-table-column prop="user" label="用户" width="120" />
    <el-table-column prop="good" label="商品名" width="120" />
    <el-table-column prop="price" label="价格" width="120" />
    <el-table-column prop="address" label="收货地址" />
    <el-table-column prop="express" label="快递单号" width="250" />
    <el-table-column prop="status" label="状态" width="120">
      <template #default="scope">
        <el-tag :type="scope.row.status === 0 ? 'info' : scope.row.status === 1 ? 'success' : ''" disable-transitions>
          {{ statusType[scope.row.status] }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="120" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 表单 -->
  <el-dialog v-model="formVisible" title="编辑订单">
    <el-form ref="formRef" :model="orderModel" label-width="80px" :rules="rules">
      <el-form-item label="订单号" prop="id">
        <el-input v-model="orderModel._id" disabled />
      </el-form-item>
      <el-form-item label="用户" prop="user">
        <el-input v-model="orderModel.user" disabled />
      </el-form-item>
      <el-form-item label="商品名" prop="good">
        <el-input v-model="orderModel.good" disabled />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="orderModel.price" disabled />
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="orderModel.address" />
      </el-form-item>
      <el-form-item label="快递单号" prop="express">
        <el-input v-model="orderModel.express" />
      </el-form-item>
      <el-form-item label="状态">
        <el-tag :type="orderModel.status === 0 ? 'info' : orderModel.status === 1 ? 'success' : ''" disable-transitions>
          {{ statusType[orderModel.status] }}
        </el-tag>
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
import { reactive, ref } from 'vue';
import { Order } from '../types';
import { getOrders, getOrder, editOrder } from '../api/order';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const formRef = ref();
const rules = reactive<FormRules>({
  address: [{ required: true, message: '收货地址不能为空', trigger: 'blur' }]
});

enum statusType {
  未发货,
  待收货,
  已完成
}

// 获取订单列表
const orderList = ref<Order[]>([]);
const handleOrderList = async () => {
  const { data: res } = await getOrders();
  orderList.value = res.data;
};
handleOrderList();

// 获取订单详情
const orderModel = ref<Order>({
  _id: '',
  good: '',
  price: 0,
  address: '',
  user: '',
  express: '',
  status: 0
});
const handleOrderDetail = async (_id: string) => {
  const { data: res } = await getOrder(_id);
  orderModel.value = res.data;
};

const formVisible = ref(false);
const handleEdit = (row: any) => {
  formVisible.value = true;
  handleOrderDetail(row._id);
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { _id, address, express } = orderModel.value;
      const { data: res } = await editOrder(_id, address, express);
      if (res.errno === 0) {
        ElMessage.success(res.msg);
        formVisible.value = false;
        handleOrderList();
      } else {
        ElMessage.error(res.msg);
      }
    }
  });
};
</script>
