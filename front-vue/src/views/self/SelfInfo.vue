<template>
  <el-form
    ref="selfInfoForm"
    :inline="true"
    :model="userInfo"
    :rules="rules"
    label-width="10rem"
    class="overflow-y-auto p-r-8"
    scroll-to-error
  >
    <el-collapse v-model="activeNames">
      <el-collapse-item title="个人信息" name="self">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userInfo.realName" readonly />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userInfo.sex" class="w-100%">
            <el-option
              v-for="item in SEX"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-autocomplete
            v-model="userInfo.email"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            placeholder="请输入邮箱"
            class="w-100%"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="userInfo.phoneNumber" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="userInfo.idCard" />
        </el-form-item>
        <el-form-item label="婚姻状况" prop="maritalStatus">
          <el-select v-model="userInfo.maritalStatus" class="w-100%">
            <el-option
              v-for="item in MARITAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politicalStatus">
          <el-select v-model="userInfo.politicalStatus" class="w-100%">
            <el-option
              v-for="item in POLITICAL_STATUS"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="民族" prop="nationId">
          <el-select v-model="userInfo.nationId" class="w-100%">
            <el-option
              v-for="item in nations"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativePlace">
          <el-input v-model="userInfo.nativePlace" />
        </el-form-item>
        <el-form-item label="户口所在地" prop="accountLocation">
          <el-input v-model="userInfo.accountLocation" />
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="userInfo.address" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="学历信息" name="education">
        <el-form-item label="学历" prop="education">
          <el-input v-model="userInfo.education" readonly />
        </el-form-item>
        <el-form-item label="毕业院校" prop="graduateSchool">
          <el-input v-model="userInfo.graduateSchool" readonly />
        </el-form-item>
        <el-form-item label="毕业时间" prop="graduateTime">
          <el-date-picker
            v-model="userInfo.graduateTime"
            type="date"
            class="!w-100%"
            readonly
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="工作信息" name="work">
        <el-form-item label="加入时间" prop="joinTime">
          <el-date-picker
            v-model="userInfo.joinTime"
            type="date"
            class="!w-100%"
            readonly
          />
        </el-form-item>
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="userInfo.deptName" readonly />
        </el-form-item>
        <el-form-item label="职位" prop="positionName">
          <el-input v-model="userInfo.positionName" readonly />
        </el-form-item>
        <el-form-item label="直接主管" prop="leaderName">
          <el-input v-model="userInfo.leaderName" readonly />
        </el-form-item>
        <el-form-item label="员工类型" prop="employeeType">
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
        <el-form-item label="员工状态" prop="employeeStatus">
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
        <el-form-item label="银行卡号" prop="bankCard">
          <el-input v-model="userInfo.bankCard" />
        </el-form-item>
        <el-form-item label="社保卡号" prop="socialSecurity">
          <el-input v-model="userInfo.socialSecurity" />
        </el-form-item>
        <el-form-item label="公积金号" prop="accumulationFund">
          <el-input v-model="userInfo.accumulationFund" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
  <div class="flex items-center justify-center gap-8 p-t-8 p-r-8">
    <el-button type="primary" @click="onReset">重置</el-button>
    <el-button type="primary" @click="onSubmit" :loading="loading">
      提交
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { CollapseActiveName, FormInstance, FormRules } from 'element-plus';
import { getNation, updateUser } from 'api/modules/user';
import {
  EMAIL_SUFFIX,
  POLITICAL_STATUS,
  MARITAL_STATUS,
  EMPLOYEE_TYPE,
  EMPLOYEE_STATUS,
  SEX,
} from 'utils/constants';
import { GlobalStore } from '@/store';

const defaultInfo: IUserInfo = {
  id: 0,
  realName: '',
  loginName: '',
};

const globalStore = GlobalStore();
const { cloned: userInfo, sync } = useCloned(
  globalStore.userInfo || defaultInfo
);
const selfInfoForm = $ref<FormInstance>();
const rules = $ref<FormRules<SelfInfoFormRule>>({
  realName: [{ required: true }],
  sex: [{ required: true, message: '请选择性别' }],
  email: [
    {
      required: true,
      message: '请输入邮箱',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号',
    },
  ],
  idCard: [
    {
      required: true,
      message: '请输入身份证号',
    },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: '请输入正确的身份证号',
    },
  ],
});
let loading = $ref(false);
let nations = $ref<Nation[]>([]);
let activeNames = $ref<CollapseActiveName[]>([
  'self',
  'education',
  'work',
  'finance',
]);

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

const onSubmit = async () => {
  if (!selfInfoForm) return;
  await selfInfoForm.validate(async valid => {
    if (valid) {
      loading = true;
      try {
        const { success, message } = await updateUser(
          globalStore.userInfo!.id,
          userInfo as Partial<IUserInfo>
        );
        if (!success) {
          ElMessage.error(message);
          return;
        }
        ElMessage.success('修改成功!');
        globalStore.setGlobalState({
          userInfo: { ...globalStore.userInfo!, ...userInfo },
        });
      } catch (error) {
        console.error(error);
      } finally {
        loading = false;
      }
    }
  });
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
