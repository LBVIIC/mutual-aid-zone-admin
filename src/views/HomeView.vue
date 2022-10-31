<template>
  <el-container>
    <Header></Header>
    <el-container>
      <Sidebar @collapse="handleCollapse"></Sidebar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';

const marginLeft = ref('220px');
const handleCollapse = (isCollapse: boolean) => {
  isCollapse ? (marginLeft.value = '90px') : (marginLeft.value = '220px');
};
</script>

<style lang="less" scoped>
.el-main {
  margin: 70px 20px 20px v-bind(marginLeft);
  background-color: #fff;
  box-shadow: 0 0 10px #e8e8e8;
  transition: margin 0.3s linear;
}
</style>
