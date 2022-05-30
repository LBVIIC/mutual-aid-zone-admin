<template>
  <el-header class="header">
    <div class="header__left">
      <div class="header__left__title">互助圈</div>
    </div>
  </el-header>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.header {
  background-color: #001529;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0;

  &__left {
    &__title {
      color: #fff;
      width: 200px;
      line-height: 50px;
      font-size: 24px;
      text-align: center;
    }
  }
}
</style>
