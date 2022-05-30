<template>
  <el-container>
    <Header></Header>
    <el-container>
      <Sidebar></Sidebar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<style lang="less" scoped>
.el-main {
  margin: 70px 20px 20px 220px;
  background-color: #fff;
  box-shadow: 0 0 10px #e8e8e8;
}
</style>
