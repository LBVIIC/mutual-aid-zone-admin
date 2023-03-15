import { reactive, ref } from 'vue';
import { FormRules } from 'element-plus';
import { User } from '../types';

export const useUser = () => {
  // 表单校验规则
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '用户名为必填项', trigger: 'blur' },
      { min: 2, max: 12, message: '用户名长度应为2-12个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '邮箱为必填项', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '手机号为必填项', trigger: 'blur' },
      {
        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: '请输入正确的手机号',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '密码为必填项', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度应为6-16个字符', trigger: 'blur' }
    ],
    editPassword: [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度应为6-16个字符', trigger: 'blur' }]
  });

  const userModel = ref<User>({
    _id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    balance: 0,
    role: 0
  });

  return { rules, userModel };
};
