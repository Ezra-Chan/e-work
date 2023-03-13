<template>
  <div id="login">
    <div>登录页</div>
    <el-button @click="getUser">Default</el-button>
    <el-button type="warning">Warning</el-button>
  </div>
</template>

<script setup lang="ts">
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';

let flag = true;

onMounted(() => {
  getUser();
});

const getUser = async () => {
  if (flag) {
    flag = false;
    const data = await LoginService.getUser();
    console.log('data', data);
  } else {
    cancelRequest('/login');
    flag = true;
  }
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  background-image: url('assets/images/login/background-image.png');
  background-repeat: no-repeat;
  background-position: left top;
  background-color: linear-gradient(
    to bottom,
    rgb(109, 66, 248),
    rgb(56, 116, 252)
  );
}
</style>
