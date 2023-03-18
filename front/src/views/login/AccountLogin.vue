<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="rules"
    class="login-form"
  >
    <el-form-item prop="account">
      <span slot="label">
        <el-icon :size="iconFontSize">
          <User />
        </el-icon>
      </span>
      <el-input
        v-model="loginForm.account"
        placeholder="请输入账号"
        class="only-border-bottom"
        size="large"
      />
    </el-form-item>
    <el-form-item prop="password">
      <span slot="label">
        <el-icon :size="iconFontSize">
          <Lock />
        </el-icon>
      </span>
      <el-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
        class="only-border-bottom"
        size="large"
      />
    </el-form-item>
    <el-form-item prop="verificationCode">
      <span slot="label">
        <el-icon :size="iconFontSize">
          <svg-icon icon-class="icon-verified" :size="iconFontSize" />
        </el-icon>
      </span>
      <el-input
        v-model="loginForm.verificationCode"
        placeholder="请输入验证码"
        class="only-border-bottom"
        size="large"
      />
    </el-form-item>
    <el-form-item prop="rememberMe">
      <span slot="label" />
      <el-checkbox v-model="loginForm.rememberMe" label="记住我" size="large" />
    </el-form-item>
    <el-form-item class="form-item-center">
      <el-button type="primary" @click="onLogin" size="large">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { FormInstance, FormRules } from 'element-plus';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';

const iconFontSize = '3rem';

const loginFormRef = $ref<FormInstance>();
const loginForm = reactive<LoginFormType>({
  account: '',
  password: '',
  verificationCode: '',
  rememberMe: false,
});
const rules = reactive<FormRules>({
  account: { required: true, message: '请输入账号！', trigger: 'blur' },
  password: { required: true, message: '请输入密码！', trigger: 'blur' },
  verificationCode: {
    required: true,
    message: '请输入验证码！',
    trigger: 'blur',
  },
});

onMounted(() => {
  // getUser();
});

const onLogin = async () => {
  await loginFormRef!.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const getUser = async () => {
  const data = await LoginService.getUser();
  // cancelRequest('/login');
};
</script>

<style lang="less">
.login-form {
  .el-form-item__content {
    color: var(--el-color-primary);
    gap: 2rem;
    & > span {
      width: 6rem;
      display: inline-flex;
      align-items: center;
      justify-content: right;
    }
    & > div:not(.el-form-item__error) {
      width: calc(100% - 8rem);
    }
    .el-form-item__error {
      font-size: 1.2rem;
      margin-left: calc(8rem + 15px);
    }
    .el-input--large,
    .el-checkbox__label {
      font-size: 1.4rem;
      --el-input-inner-height: 3.8rem;
      --el-input-height: 4rem;
    }
    .el-checkbox--large {
      height: 4rem;
    }
    .el-checkbox__inner {
      width: 1.4rem;
      height: 1.4rem;
    }
    .el-checkbox__inner::after {
      width: 0.3rem;
      height: 0.7rem;
      left: 0.4rem;
      top: 0.1rem;
    }
  }
  .only-border-bottom {
    .el-input__wrapper {
      box-shadow: unset;
      border-radius: unset;
      border-bottom: 2px solid var(--el-input-border-color);
      &:hover {
        border-bottom-color: var(--el-input-hover-border-color);
      }
      &.is-focus {
        border-bottom-color: var(--el-input-focus-border);
      }
    }
  }
  .form-item-center {
    .el-form-item__content {
      display: flex;
      justify-content: center;
      button {
        height: 4rem;
        & > span {
          .letter-spacing-em(1);
          font-size: 2.4rem;
        }
      }
    }
  }
}
</style>
