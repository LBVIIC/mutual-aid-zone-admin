<template>
  <div class="container">
    <!-- form表单容器 -->
    <div class="form-contain">
      <div class="form-contain__signin">
        <el-form :model="userModel" :rules="rules" ref="loginFormRef" label-width="120px" class="form-contain__signin__form">
          <el-form-item label="用户名" prop="username">
            <el-input type="input" v-model="userModel.username" placeholder="请输入用户名..."></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userModel.password" placeholder="请输入密码..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="form-contain__signin__form__btn" @click="handleLogin(loginFormRef)">登录</el-button>
          </el-form-item>

        </el-form>
      </div>

      <div class="panel-contain">
        <div class="panel-contain__panel">
          <div class="panel-contain__panel__content">
            <h1>互助圈管理系统</h1>
          </div>
          <img src="../assets/log.svg" class="panel-contain__panel__image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '../composables/useUser';
const { rules, userModel, loginFormRef, handleLogin } = useUser();
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    border-radius: 50%;
    z-index: 6;
  }
}

.form-contain {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  &__signin {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 44%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;

    &__form {
      width: 80%;
      margin-top: 20px;
      background-color: #fff;
      padding: 40px 40px 20px 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #cccc;

      // &__btn {
      //   width: 100%;
      // }
    }

    &__tip {
      text-align: right;
      font-size: 12px;
      color: #333;

      p {
        a {
          color: #409eff;
        }
      }
    }
  }
}

.panel-contain {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  &__panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;

    &__image {
      width: 100%;
    }

    &__content {
      color: #fff;
    }
  }
}
</style>
