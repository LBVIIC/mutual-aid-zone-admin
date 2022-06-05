import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { createGood, deleteGood, editGood, getGood, getGoods } from '../api/store';

export const useGood = () => {
  interface Good {
    _id: string;
    name: string;
    price: number;
    stock: number;
    img: string;
    imgFile: any;
  }

  const FormRef = ref();
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '商品名为必填项', trigger: 'blur' }]
  });

  const goodList = ref<Good[]>([]);
  const handleGoodList = async () => {
    const { data: res } = await getGoods();
    goodList.value = res.data;
  };

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

  return {
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
  };
};
