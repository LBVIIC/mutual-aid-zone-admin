import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { addUser, deleteUser, editUser, getUser, getUsers } from '../api/user';

export const useUser = () => {
  interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    balance: number;
    role: string;
  }

  const addUserFormVisible = ref(false);
  const editUserFormVisible = ref(false);

  const userList = ref<User[]>([]);

  const addModel = reactive({
    username: '',
    password: '',
    email: '',
    phone: ''
  });

  const editModel = ref({
    _id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    balance: 0,
    role: 0
  });

  // 获取用户列表
  const handleUserList = async () => {
    const { data: res } = await getUsers();
    if (res.errno === 0) {
      userList.value = res.data;
      userList.value.forEach((item) => {
        if (parseInt(item.role) === 0) {
          item.role = '普通用户';
        } else {
          item.role = '管理员';
        }
      });
    }
  };

  // 新增用户
  const handleAdd = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        // const { username, password, email, phone } = addModel;
        // const { data: res } = await addUser(username, password, email, phone);
        // if (res.errno === 0) {
        //   addUserFormVisible.value = false;
        //   handleUserList();
        // } else {
        //   ElMessage.error(res.msg);
        // }
        console.log('ok');
        
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 编辑用户
  const handleShowEdit = async (row: any) => {
    editUserFormVisible.value = true;
    const { data: res } = await getUser(row._id);
    res.data.password = '';
    editModel.value = res.data;
  };

  const handleEdit = async () => {
    const { _id, username, password, email, phone, address, balance, role } = editModel.value;
    const { data: res } = await editUser(_id, username, password, email, phone, address, balance, role);
    if (res.errno === 0) {
      editUserFormVisible.value = false;
      ElMessage({
        message: res.msg,
        type: 'success'
      });
      handleUserList();
    } else {
      ElMessage.error(res.msg);
    }
  };

  // 删除用户
  const handleDelete = async (row: any) => {
    const { data: res } = await deleteUser(row._id);
    if (res.errno === 0) {
      ElMessage({
        message: res.msg,
        type: 'success'
      });
      handleUserList();
    }
  };

  return {
    addUserFormVisible,
    editUserFormVisible,
    addModel,
    editModel,
    userList,
    handleUserList,
    handleShowEdit,
    handleEdit,
    handleDelete,
    handleAdd
  };
};
