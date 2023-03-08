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

  <!-- 表单 -->
  <el-dialog v-model="goodFormVisible" :title="formType.title">
    <el-form ref="formRef" :model="goodModel" label-width="80px" :rules="rules">
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
        <el-button type="primary" @click="handleSubmit(formRef, formType.type)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { createGood, deleteGood, editGood, getGood, getGoods } from '../api/store';
import { Good } from '../types';

const formRef = ref();
const rules = reactive<FormRules>({
  name: [{ required: true, message: '商品名为必填项', trigger: 'blur' }]
});

// 获取商品列表
const goodList = ref<Good[]>([]);
const handleGoodList = async () => {
  const { data: res } = await getGoods();
  goodList.value = res.data;
};
handleGoodList();

const goodFormVisible = ref(false);
const formType = reactive({
  title: '新增商品',
  type: 'create'
});
const goodModel = ref<Good>({
  _id: '',
  name: '',
  price: 0,
  stock: 0,
  img: '',
  imgFile: null
});

// 新增商品
const handleCreate = () => {
  formType.title = '新增商品';
  formType.type = 'create';
  // 初始化表单
  goodModel.value._id = '';
  goodModel.value.name = '';
  goodModel.value.price = 0;
  goodModel.value.stock = 0;
  goodModel.value.img = '';
  goodModel.value.imgFile = null;
  goodFormVisible.value = true;
};

// 编辑商品
const handleEdit = async (row: any) => {
  formType.title = '编辑商品';
  formType.type = 'edit';
  goodFormVisible.value = true;
  const { data: res } = await getGood(row._id);
  goodModel.value = res.data;
};

// 上传商品图片
const imgFileRef = ref();
const handleImgUpload = () => {
  imgFileRef.value.click();
};

// 获取上传图片
const handleImgFile = () => {
  goodModel.value.imgFile = imgFileRef.value.files[0];
  goodModel.value.img = URL.createObjectURL(goodModel.value.imgFile);
};

// 提交商品
const handleSubmit = async (formEl: FormInstance | undefined, type: string) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { name, price, stock, img, imgFile } = goodModel.value;
      if (!imgFile && !img) {
        ElMessage.error('请上传图片！');
        return;
      }
      if (type === 'create') {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('img', imgFile);
        const { data: res } = await createGood(formData);
        if (res.errno === 0) {
          ElMessage.success('新增商品成功！');
          goodFormVisible.value = false;
          handleGoodList();
        } else {
          ElMessage.error(res.msg);
        }
      } else if (type === 'edit') {
        const formData = new FormData();
        const { _id } = goodModel.value;
        formData.append('_id', _id);
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        if (imgFile) {
          formData.append('img', imgFile);
        }
        const { data: res } = await editGood(formData);
        if (res.errno === 0) {
          ElMessage.success('修改商品成功！');
          goodFormVisible.value = false;
          handleGoodList();
        } else {
          ElMessage.error(res.msg);
        }
      }
    }
  });
};

// 删除商品
const handleDelete = async (row: any) => {
  const { data: res } = await deleteGood(row._id);
  if (res.errno === 0) {
    ElMessage.success('删除商品成功！');
    handleGoodList();
  } else {
    ElMessage.error(res.msg);
  }
};

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
