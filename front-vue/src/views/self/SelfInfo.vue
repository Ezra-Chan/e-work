<template>
  <el-form :inline="true" :model="selfInfo" label-width="10rem">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="self">
        <el-form-item label="姓名">
          <el-input v-model="selfInfo.realName" readonly />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="selfInfo.sex" readonly />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-autocomplete
            v-model="selfInfo.email"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            placeholder="请输入邮箱"
            class="w-100%"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="selfInfo.phoneNumber" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="selfInfo.idCard" />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="selfInfo.maritalStatus">
            <el-option
              v-for="item in MARITAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="selfInfo.nativePlace" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="selfInfo.politicalStatus">
            <el-option
              v-for="item in POLITICAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="selfInfo.nation">
            <el-option
              v-for="item in nations"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input v-model="selfInfo.accountLocation" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="selfInfo.address" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="学历信息" name="education">
        <el-form-item label="学历">
          <el-input v-model="selfInfo.education" readonly />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="selfInfo.graduateSchool" readonly />
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker v-model="selfInfo.graduateTime" type="date" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="工作信息" name="work">
        <el-form-item label="加入时间">
          <el-date-picker v-model="selfInfo.joinTime" type="date" readonly />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="selfInfo.role.name" readonly />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="selfInfo.deptName" readonly />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="selfInfo.position" readonly />
        </el-form-item>
        <el-form-item label="直接主管">
          <el-input v-model="selfInfo.position" readonly />
        </el-form-item>
        <el-form-item label="员工类型">
          <el-select v-model="selfInfo.employeeType">
            <el-option
              v-for="item in EMPLOYEE_TYPE"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select v-model="selfInfo.employeeStatus">
            <el-option
              v-for="item in EMPLOYEE_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="财务信息" name="finance">
        <el-form-item label="银行卡号">
          <el-input v-model="selfInfo.bankCard" />
        </el-form-item>
        <el-form-item label="社保卡号">
          <el-input v-model="selfInfo.socialSecurity" />
        </el-form-item>
        <el-form-item label="公积金号">
          <el-input v-model="selfInfo.accumulationFund" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script setup lang="ts" name="SelfInfo">
type AutoCompleteSuggestions = {
  value: string;
}[];

type Nation = {
  id: number;
  name: string;
};

import {
  SEX,
  EMAIL_SUFFIX,
  POLITICAL_STATUS,
  MARITAL_STATUS,
  EMPLOYEE_TYPE,
  EMPLOYEE_STATUS,
} from 'utils/constants';

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

let nations = $ref<Nation[]>([]);

let activeNames = $ref<string[]>(['self', 'education', 'work', 'finance']);
const handleChange = (val: string[]) => (activeNames = val);
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

<style lang="less" scoped>
.el-form {
  :deep(.el-collapse-item__content) {
    display: flex;
    flex-wrap: wrap;
    gap: 32px 18px;
    .el-form-item {
      margin: 0;
      width: 30rem;
    }
  }
}
</style>
