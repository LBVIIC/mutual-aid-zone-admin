<template>
  <h2>商品管理</h2>
  <el-button type="primary" @click="handleCreate()">新增商品</el-button>

  <!-- 表格 -->
  <el-table :data="goodList" stripe height="460" style="width: 100%" class="table">
    <el-table-column label="图片" width="140">
      <template #default="scope">
        <el-image style="width: 100px; height: 100px" :src="scope.row.img" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="商品名" />
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="stock" label="库存" />
    <el-table-column label="操作" fixed="right">
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
  <el-dialog v-model="goodFormVisible" :title="formType.title">
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
  </el-dialog>
</template>

<script lang="ts" setup>
import { useGood } from '../composables/useGood';
const {
  goodList,
  goodModel,
  goodFormVisible,
  FormRef,
  imgFileRef,
  formType,
  rules,
  handleGoodList,
  handleCreate,
  handleEdit,
  handleImgUpload,
  handleImgFile,
  handleSubmit,
  handleDelete
} = useGood();

handleGoodList();
</script>

<style lang="less">
.el-dialog {
  max-width: 600px;
}
</style>

<style lang="less" scoped>
.table {
  margin-top: 20px;
}

.uploader {
  width: 120px;
  height: 120px;
  display: block;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    border-color: var(--el-color-primary);
  }

  &__input {
    display: none;
  }

  &__icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
  }
}
</style>
