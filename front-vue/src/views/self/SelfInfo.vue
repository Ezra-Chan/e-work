<template>
  <el-form :inline="true" :model="selfInfo" label-width="8rem">
    <el-form-item label="姓名">
      <el-input v-model="selfInfo.realName" readonly />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="selfInfo.sex" readonly />
    </el-form-item>
    <el-form-item label="加入时间">
      <el-date-picker v-model="selfInfo.joinTime" type="date" readonly />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-autocomplete
        v-model="selfInfo.email"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        placeholder="请输入邮箱"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="SelfInfo">
type AutoCompleteSuggestions = {
  value: string;
}[];

import { SEX, EMAIL_SUFFIX } from 'utils/constants';

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

/**
 * 判断queryStr内是否含有@符号，且@后有任意字符，如果有则返回[]，否则返回EMAIL_SUFFIX中符合的邮箱后缀
 * @param queryStr
 * @param cb
 */
const querySearch = (
  queryStr: string,
  cb: (arr: AutoCompleteSuggestions) => void
) => {
  const reg = /@.+/;
  if (reg.test(queryStr)) {
    cb([]);
  } else {
    if (queryStr.endsWith('@')) {
      queryStr = queryStr.slice(0, -1);
    }
    const results = EMAIL_SUFFIX.map(item => ({
      value: queryStr + item,
    }));
    cb(results);
  }
};

const handleSelect = (email: any) => {
  selfInfo.email = email.value;
};
</script>

<style lang="less" scoped></style>
