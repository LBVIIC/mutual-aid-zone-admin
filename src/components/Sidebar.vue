<template>
  <el-aside>
    <el-menu :default-active="defaultActive.toString()" :collapse="isCollapse">
      <el-menu-item v-for="item in sidebarArr" :key="item.name" :index="item.id" @click="handleRouterLink(+item.id)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <div class="switch">
      <el-button :plain="true" @click="handleCollapse" circle>
        <el-icon v-show="isCollapse"><Expand /></el-icon>
        <el-icon v-show="!isCollapse"><Fold /></el-icon>
      </el-button>
    </div>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import debounce from '../utils/debounce';
const router = useRouter();
const route = useRoute();
const sidebarArr = [
  { id: '0', icon: 'HomeFilled', name: '首页', to: { name: 'Index' } },
  { id: '1', icon: 'UserFilled', name: '用户管理', to: { name: 'User' } },
  { id: '2', icon: 'List', name: '任务管理', to: { name: 'Task' } },
  { id: '3', icon: 'Shop', name: '商品管理', to: { name: 'Store' } },
  { id: '4', icon: 'Grid', name: '订单管理', to: { name: 'Order' } },
  { id: '5', icon: 'Ticket', name: '工单管理', to: { name: 'Ticket' } },
  { id: '6', icon: 'Comment', name: '聊天管理', to: { name: 'Chat' } },
  { id: '7', icon: 'CircleCloseFilled', name: '退出登录', to: { name: 'Login' } }
];

const defaultActive = sidebarArr.filter((item) => item.to.name === route.name)[0].id;

// 路由跳转
const handleRouterLink = (id: number) => {
  // 点击退出登录按钮
  if (id === 7) {
    ElMessageBox.confirm('是否确认退出？', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        localStorage.removeItem('token');
        router.push({ name: 'Login' });
      })
      .catch(() => {});
    return;
  }

  router.push(sidebarArr[id].to);
};

// 侧边栏收缩功能
const emits = defineEmits(['collapse']);
const isCollapse = ref(false);
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emits('collapse', isCollapse.value);
};

// 窗口变窄 自动收缩
window.addEventListener(
  'resize',
  debounce(() => {
    if (document.documentElement.clientWidth <= 800) {
      isCollapse.value = true;
    } else {
      isCollapse.value = false;
    }
    emits('collapse', isCollapse.value);
  })
);
</script>

<style lang="less" scoped>
.el-aside {
  position: fixed;
  z-index: 999;
  top: 50px;
  left: 0;
  bottom: 0;
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
  width: initial;
}

.el-menu {
  border: 0;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

.switch {
  position: absolute;
  left: 15px;
  bottom: 20px;
}
</style>
