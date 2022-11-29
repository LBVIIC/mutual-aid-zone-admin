<template>
  <el-aside>
    <el-menu :default-active="defaultActive" :collapse="isCollapse">
      <el-menu-item index="1" @click="handleRouterLink(1)">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="handleRouterLink(2)">
        <el-icon><UserFilled /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="handleRouterLink(3)">
        <el-icon><List /></el-icon>
        <span>任务管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="handleRouterLink(4)">
        <el-icon><Shop /></el-icon>
        <span>商品管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="handleRouterLink(5)">
        <el-icon><CircleCloseFilled /></el-icon>
        <span>退出登录</span>
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
import debounce from '../utils/debounce';
const router = useRouter();
const route = useRoute();
const emits = defineEmits(['collapse']);

const isCollapse = ref(false);

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emits('collapse', isCollapse.value);
};

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

const defaultActive = ref('1');
switch (route.name) {
  case 'Index':
    defaultActive.value = '1';
    break;
  case 'User':
    defaultActive.value = '2';
    break;
  case 'Task':
    defaultActive.value = '3';
    break;
  case 'Store':
    defaultActive.value = '4';
    break;
}

const handleRouterLink = (index: number) => {
  switch (index) {
    case 1:
      router.push({ name: 'Index' });
      break;
    case 2:
      router.push({ name: 'User' });
      break;
    case 3:
      router.push({ name: 'Task' });
      break;
    case 4:
      router.push({ name: 'Store' });
      break;
    case 5:
      localStorage.removeItem('token');
      router.push({ name: 'Login' });
  }
};
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
