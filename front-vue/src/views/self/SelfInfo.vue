<template>
  <el-form
    :inline="true"
    :model="userInfo"
    label-width="10rem"
    class="overflow-y-auto p-r-8"
  >
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="self">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.realName" readonly />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userInfo.sex" readonly />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-autocomplete
            v-model="userInfo.email"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            placeholder="请输入邮箱"
            class="w-100%"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phoneNumber" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="userInfo.idCard" />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="userInfo.maritalStatus" class="w-100%">
            <el-option
              v-for="item in MARITAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="userInfo.politicalStatus" class="w-100%">
            <el-option
              v-for="item in POLITICAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="userInfo.nation" class="w-100%">
            <el-option
              v-for="item in nations"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="userInfo.nativePlace" />
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input v-model="userInfo.accountLocation" />
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="userInfo.address" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="学历信息" name="education">
        <el-form-item label="学历">
          <el-input v-model="userInfo.education" readonly />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="userInfo.graduateSchool" readonly />
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker
            v-model="userInfo.graduateTime"
            type="date"
            class="!w-100%"
            readonly
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="工作信息" name="work">
        <el-form-item label="加入时间">
          <el-date-picker
            v-model="userInfo.joinTime"
            type="date"
            class="!w-100%"
            readonly
          />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userInfo.deptName" readonly />
        </el-form-item>
        <el-form-item label="职位" v-if="userInfo.position">
          <el-input v-model="userInfo.position.name" readonly />
        </el-form-item>
        <el-form-item label="直接主管" v-if="userInfo.leader">
          <el-input v-model="userInfo.leader.realName" readonly />
        </el-form-item>
        <el-form-item label="员工类型">
          <el-select
            v-model="userInfo.employeeType"
            class="w-100% readonly-select"
            disabled
          >
            <el-option
              v-for="item in EMPLOYEE_TYPE"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select
            v-model="userInfo.employeeStatus"
            class="w-100% readonly-select"
            disabled
          >
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
          <el-input v-model="userInfo.bankCard" />
        </el-form-item>
        <el-form-item label="社保卡号">
          <el-input v-model="userInfo.socialSecurity" />
        </el-form-item>
        <el-form-item label="公积金号">
          <el-input v-model="userInfo.accumulationFund" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
  <div class="flex items-center justify-center gap-8 p-t-8 p-r-8">
    <el-button type="primary" @click="onReset">重置</el-button>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import type { CollapseModelValue, CollapseActiveName } from 'element-plus';
import { getNation } from 'api/modules/user';
import {
  EMAIL_SUFFIX,
  POLITICAL_STATUS,
  MARITAL_STATUS,
  EMPLOYEE_TYPE,
  EMPLOYEE_STATUS,
} from 'utils/constants';
import { GlobalStore } from '@/store';

type AutoCompleteSuggestions = {
  value: string;
}[];

type Nation = {
  id: number;
  name: string;
};

const defaultInfo: IUserInfo = {
  id: 0,
  realName: '',
  loginName: '',
};

const globalStore = GlobalStore();
const { cloned: userInfo, sync } = useCloned(
  globalStore.userInfo || defaultInfo
);

let nations = $ref<Nation[]>([]);

let activeNames = $ref<CollapseActiveName[]>([
  'self',
  'education',
  'work',
  'finance',
]);
const handleChange = (val: CollapseModelValue) =>
  (activeNames = val as CollapseActiveName[]);

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

const onReset = () => {
  sync();
};

const onSubmit = () => {
  console.log(userInfo);
};

const getNationApi = async () => {
  const { data } = await getNation();
  nations = data;
};

onMounted(() => {
  getNationApi();
});
</script>

<style lang="less" scoped>
.el-form {
  height: calc(100% - 52px);

  :deep(.el-collapse-item__content) {
    display: flex;
    flex-wrap: wrap;
    gap: 24px 18px;
    .el-form-item {
      margin: 0;
      width: 35rem;

      .el-input__wrapper {
        width: 100%;
      }

      .readonly-select {
        .el-input.is-disabled,
        .el-input.is-disabled .el-input__wrapper,
        .el-input.is-disabled .el-input__inner,
        .el-input.is-disabled .el-select__caret {
          cursor: text;
        }
        .el-input.is-disabled {
          .el-input__wrapper {
            background-color: inherit;
            &:hover {
              box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
            }
          }
          .el-input__inner {
            color: var(--el-input-text-color, var(--el-text-color-regular));
          }
        }
      }
    }
  }
}
</style>
