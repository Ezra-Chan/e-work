<template>
  <el-form
    ref="loginFormRef"
    class="login-form"
    :model="loginForm"
    :rules="rules"
    @keydown.enter.native="onLogin(loginFormRef)"
  >
    <el-form-item prop="loginName">
      <span slot="label">
        <el-icon :size="iconFontSize" class="text-light">
          <User />
        </el-icon>
      </span>
      <el-input
        v-model="loginForm.loginName"
        placeholder="请输入账号"
        class="only-border-bottom"
        size="large"
        clearable
      />
    </el-form-item>
    <el-form-item prop="password">
      <span slot="label">
        <el-icon :size="iconFontSize" class="text-light">
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
        clearable
      />
    </el-form-item>
    <el-form-item prop="code">
      <span slot="label">
        <svg-icon icon-class="icon-verified" :size="iconFontSize" />
      </span>
      <el-input
        v-model="loginForm.code"
        placeholder="请输入验证码"
        class="only-border-bottom captcha-input"
        size="large"
        clearable
      />
      <img
        :src="captcha"
        @click="getCaptcha"
        class="w-48 cursor-pointer"
        alt="验证码"
      />
    </el-form-item>
    <el-form-item prop="rememberMe">
      <span slot="label" />
      <el-checkbox v-model="loginForm.rememberMe" label="记住我" size="large" />
    </el-form-item>
    <el-form-item class="form-item-center">
      <el-button
        type="primary"
        @click="onLogin(loginFormRef)"
        size="large"
        :loading="loading"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="AccountLogin">
import { User, Lock } from '@element-plus/icons-vue';
import { FormInstance, FormRules } from 'element-plus';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';
import { encrypt } from 'utils/encrypt';
import { Encrypt as AESEncrypt, Decrypt } from 'utils/AES';
import { handleLogin } from 'utils/loginFunc';

const router = useRouter();
const iconFontSize = '3rem';

const loginFormRef = $ref<FormInstance>();

let loginForm = reactive<LoginFormType>({
  loginName: '',
  password: '',
  code: '',
  rememberMe: false,
});
let loginFormCache = $(
  useLocalStorage('ework-loginCache', null)
) as InitLoginFormType;
const rules = reactive<FormRules>({
  loginName: { required: true, message: '请输入账号！', trigger: 'blur' },
  password: { required: true, message: '请输入密码！', trigger: 'blur' },
  code: { required: true, message: '请输入验证码！', trigger: 'blur' },
});
let captcha = $ref<string>();
let loading = $ref(false);

onMounted(() => {
  getCaptcha();
  if (loginFormCache) {
    const cache = JSON.parse(loginFormCache);
    loginForm.loginName = cache.loginName;
    loginForm.password = Decrypt(cache.password);
    loginForm.rememberMe = true;
  }
});

const onLogin = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate(async valid => {
    if (valid) {
      try {
        loading = true;
        const {
          success,
          data = {},
          message,
        } = await LoginService.accountLogin({
          ...loginForm,
          password: encrypt(loginForm.password) as string,
        });
        if (!success) {
          ElMessage.error(message);
          getCaptcha();
          return;
        }
        if (loginForm.rememberMe) {
          loginFormCache = JSON.stringify({
            loginName: loginForm.loginName,
            password: AESEncrypt(loginForm.password),
          });
        } else {
          loginFormCache = null;
        }
        handleLogin(data, router);
      } catch (error) {
      } finally {
        loading = false;
      }
    }
  });
};

const getCaptcha = async () => {
  captcha = LoginService.getCaptcha() + `?t=${new Date().getTime()}`;
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
    & > .el-input {
      width: calc(100% - 10rem);
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
    .captcha-input {
      width: calc(100% - 24rem);
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
