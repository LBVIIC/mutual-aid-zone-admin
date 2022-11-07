import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { deleteTask, editTask, getTask, getTasks } from '../api/task';

export const useTask = () => {
  interface Task {
    _id: string;
    title: string;
    price: number;
    setterName: string;
    getterName: string;
    status: number;
  }

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

  return {
    page,
    pageSize,
    total,
    formVisible,
    formRef,
    rules,
    taskList,
    taskModel,
    handleTaskList,
    handleDelete,
    handleEdit,
    handleSubmit
  };
};
