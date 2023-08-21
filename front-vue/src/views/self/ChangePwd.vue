<template>
  <el-form label-width="10rem" :model="pwdForm">
    <el-form-item label="原密码">
      <el-input v-model="pwdForm.oldPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="pwdForm.newPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="pwdForm.confirmPwd" type="password" show-password />
    </el-form-item>
  </el-form>
  <div class="flex items-center justify-center gap-8 p-t-8 p-r-8">
    <el-button type="primary" @click="confirm">确认修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';

interface PwdForm {
  oldPwd: string;
  newPwd: string;
  confirmPwd: string;
}

const globalStore = GlobalStore();
const pwdForm = $ref<PwdForm>({
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
});

const confirm = () => {};
</script>

<style lang="less" scoped></style>
