<template>
  <div class="main-content">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
            <h1>main</h1>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.main-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-header {
  background-color: pink;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.el-aside {
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: aqua;
}

.el-main {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 200px;
  background-color: yellow;
}
</style>
