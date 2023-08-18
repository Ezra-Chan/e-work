<template>
  <pro-form
    :form="formOptions"
    :columns="formColumns"
    v-model="userInfo"
    ref="formRef"
  />
  <div class="flex items-center justify-center gap-8 p-t-8 p-r-8">
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { type CollapseModelValue, type CollapseActiveName } from 'element-plus';
import {
  EMAIL_SUFFIX,
  POLITICAL_STATUS,
  MARITAL_STATUS,
  EMPLOYEE_TYPE,
  EMPLOYEE_STATUS,
} from 'utils/constants';
import { GlobalStore } from '@/store';
import { useCompRef } from '@/utils/useCompRef';
import ProForm from '@/components/Form/ProForm.vue';

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
const { userInfo = defaultInfo } = $(globalStore);
const formOptions = markRaw({
  inline: true,
  labelWidth: '10rem',
  class: 'overflow-y-auto p-r-8',
  group: true,
  defaultExpandAll: true,
});

let nations = $ref<Nation[]>([]);
let activeNames = $ref<CollapseActiveName[]>([
  'self',
  'education',
  'work',
  'finance',
]);
const formRef = useCompRef(ProForm);
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

const formColumns = markRaw([
  {
    title: '个人信息',
    children: [
      {
        formItem: {
          label: '姓名',
          prop: 'realName',
        },
        component: ElInput,
        attrs: {
          clearable: true,
          placeholder: '请输入姓名',
          readonly: true,
        },
      },
      {
        formItem: {
          label: '性别',
          prop: 'sex',
        },
        component: ElInput,
        attrs: {
          placeholder: '性别',
          readonly: true,
        },
      },
    ],
  },
  {
    title: '学历信息',
    children: [
      {
        formItem: {
          label: '邮箱',
          prop: 'email',
        },
        component: ElAutocomplete,
        attrs: {
          clearable: true,
          placeholder: '请输入邮箱',
          fetchSuggestions: querySearch,
          class: 'w-100%',
          triggerOnFocus: false,
        },
      },
    ],
  },
]);

const onSubmit = () => {
  console.log(userInfo);
  console.log(formRef);
};

watch(
  () => userInfo,
  val => {
    console.log('val', val);
    console.log('userInfo', userInfo);
    console.log('formRef', formRef);
  },
  { deep: true }
);
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
