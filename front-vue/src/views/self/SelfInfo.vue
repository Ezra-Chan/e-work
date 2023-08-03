<template>
  <el-form :inline="true" :model="selfInfo">
    <el-form-item label="姓名">
      <el-input v-model="selfInfo.realName" readonly />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="selfInfo.sex" readonly />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="SelfInfo">
import { SEX } from 'utils/constants';

const selfInfo = $ref<IUserInfo>({
  id: 0,
  realName: '',
  sex: SEX.MALE,
  loginName: '',
  password: '',
  role: {
    id: 0,
    name: '',
  },
});
</script>

<style lang="less" scoped></style>
