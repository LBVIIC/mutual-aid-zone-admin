<template>
  <el-aside width="200px">
    <el-row>
      <el-col>
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><List /></el-icon>
            <span>任务管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Shop /></el-icon>
            <span>商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.el-aside {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
}

.el-menu {
  border: 0;
}
</style>
