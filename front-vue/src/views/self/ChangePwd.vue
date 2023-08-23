<template>
  <el-form
    ref="formRef"
    label-width="10rem"
    :model="pwdForm"
    :rules="rules"
    class="w-140 p-r-8 p-t-8"
  >
    <el-form-item label="原密码" prop="oldPwd">
      <el-input v-model="pwdForm.oldPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input v-model="pwdForm.newPwd" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPwd">
      <el-input v-model="pwdForm.confirmPwd" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm" :loading="loading">
        确认修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { changePassword } from 'api/modules/user';
import { encrypt } from 'utils/encrypt';

const pwdForm = $ref<IPwdForm>({
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
});
const formRef = $ref<FormInstance>();
let loading = $ref(false);
const rules = reactive<FormRules<IPwdForm>>({
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

const confirm = async () => {
  if (!formRef) return;
  await formRef.validate(async valid => {
    if (valid) {
      loading = true;
      try {
        const { oldPwd, newPwd } = pwdForm;
        const { success, message } = await changePassword({
          oldPwd: encrypt(oldPwd) as string,
          newPwd: encrypt(newPwd) as string,
        });
        if (!success) {
          ElMessage.error(message);
          return;
        }
        ElMessage.success('修改成功!');
      } catch (error) {
        console.error(error);
      } finally {
        loading = false;
        formRef.resetFields();
      }
    }
  });
};
</script>
