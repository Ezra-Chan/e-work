<template>
  <el-form
    label-width="10rem"
    :model="pwdForm"
    :rules="rules"
    class="w-140 p-r-8"
    ref="formRef"
  >
    <el-form-item label="原密码">
      <el-input v-model="pwdForm.oldPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="pwdForm.newPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="pwdForm.confirmPwd" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';
import type { FormInstance, FormRules } from 'element-plus';

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
const formRef = $ref<FormInstance>();
const rules = $ref<FormRules<PwdForm>>({
  oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '长度不能少于6个字符', trigger: 'blur' },
  ],
  confirmPwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      asyncValidator: (_, value) => {
        return new Promise((resolve, reject) => {
          if (value !== pwdForm.newPwd) {
            reject('两次输入密码不一致');
          } else {
            resolve();
          }
        });
      },
      trigger: 'blur',
    },
  ],
});

const confirm = () => {};
</script>

<style lang="less" scoped></style>
