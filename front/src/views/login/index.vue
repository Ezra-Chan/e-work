<template>
  <div id="login">
    <header>
      <div class="logo-title">
        <img src="@/assets/images/login/Logo.png" alt="logo" class="logo" />
        <h1 class="title full-name">{{ systemName }}</h1>
        <h1 class="title abbreviation">{{ systemAbbreviation }}</h1>
      </div>
      <div class="functional-area">
        <el-switch
          v-model="isDark"
          :active-icon="Moon"
          :inactive-icon="Sunny"
          inline-prompt
          @change="changeMode"
          aria-label="切换暗色主题"
        />
        <el-link
          href="https://github.com/Ezra-Chan/e-work"
          :underline="false"
          target="_blank"
        >
          <el-icon :size="iconFontSize">
            <svg-icon
              icon-class="icon-github-fill"
              :size="iconFontSize"
              color="#000"
            />
          </el-icon>
        </el-link>
      </div>
    </header>
    <div class="centerBgc">
      <img class="cityBgc" src="@/assets/images/login/cityBgc.png" alt="" />
      <img class="bgcImg" src="@/assets/images/login/bgcImg.png" alt="" />
    </div>
    <div class="login-module">
      <el-text type="primary" tag="h2" class="login-name">登录</el-text>
      <el-space spacer=" " size="large" class="login-types">
        <el-text
          class="login-type"
          :class="loginType === 0 ? 'current-login-type' : ''"
          @click="loginType = 0"
          >密码登录</el-text
        >
        <el-text
          class="login-type"
          :class="loginType === 1 ? 'current-login-type' : ''"
          @click="loginType = 1"
          >人脸识别</el-text
        >
      </el-space>
      <el-form
        v-if="loginType === 0"
        ref="loginFormRef"
        :model="loginForm"
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
          <el-checkbox
            v-model="loginForm.rememberMe"
            label="记住我"
            size="large"
          />
        </el-form-item>
        <el-form-item class="form-item-center">
          <el-button type="primary" @click="onLogin" size="large"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <el-text>© {{ new Date().getFullYear() }}</el-text>
      <el-link
        href="https://blog.csdn.net/qq_41065415"
        :underline="false"
        target="_blank"
        >Ezra Chan</el-link
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon, User, Lock } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';

const systemName = import.meta.env.VITE_SYSTEM_TITLE;
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const iconFontSize = '3rem';
const loginType = $ref<LoginType>(0);
let isDark = useDark();
const toggleDark = useToggle(isDark);

const loginFormRef = ref<FormInstance>();

const loginForm = reactive<LoginFormType>({
  account: '',
  password: '',
  verificationCode: '',
  rememberMe: false,
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
});

onMounted(() => {
  // getUser();
});

const changeMode = (e: typeof isDark) => {
  isDark = e;
  toggleDark();
};

const onLogin = async () => {
  console.log(loginFormRef);
  await loginFormRef.validate((valid, fields) => {
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

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  background-image: url('assets/images/login/background-image.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  user-select: none;
  & > * {
    z-index: 1;
    position: relative;
  }
  img {
    -webkit-user-drag: none;
  }
  header {
    width: 100%;
    height: 15vh;
    line-height: 15vh;
    display: flex;
    justify-content: space-between;
    .logo-title {
      display: flex;
      padding-left: 10vw;
      gap: 2vw;
      .logo {
        margin: 4vh 0;
        -webkit-filter: brightness(2);
        filter: brightness(2);
      }
      .title {
        font-size: 4rem;
        font-family: PingFang-SC;
        font-weight: bold;
        color: var(--el-color-white);
        margin: 0;
        text-align: center;
      }
      .abbreviation {
        display: none;
      }
    }
    .functional-area {
      display: flex;
      justify-content: center;
      gap: 1vw;
      align-items: center;
      padding-right: 1vw;
    }
  }
  .centerBgc {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 0;
    .cityBgc {
      position: absolute;
      inset: 0;
      margin: auto 0;
      opacity: 0.3;
    }
    @media screen and (min-width: 1921px) {
      .cityBgc {
        width: 100%;
      }
    }
    .bgcImg {
      width: 30%;
      position: absolute;
      inset: 0;
      left: 10%;
      margin: auto 0;
    }
  }
  .login-module {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 10vw;
    width: 25vw;
    min-width: 450px;
    height: max-content;
    border-radius: 3rem;
    background-color: var(--el-bg-color);
    box-shadow: 0 0 3rem #0d2cb8;
    padding: 8rem 5rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .login-name {
      font-size: 3.6rem;
      .letter-spacing-em(1);
    }
    :deep(.login-types) {
      justify-content: center;
      & > * {
        margin-right: 1.6rem !important;
      }
      & > span {
        height: 2rem;
        border-left: 0.1rem solid var(--el-text-color-regular);
        margin-bottom: 5px;
      }

      & > .el-space__item:last-child {
        margin-right: 0 !important;
      }
      .login-type {
        font-size: 2rem;
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 2px solid transparent;
      }
      .current-login-type {
        color: var(--el-color-primary);
        border-bottom: 2px solid;
      }
    }
    :deep(.login-form) {
      .el-form-item__content {
        color: var(--el-color-primary);
        display: flex;
        gap: 2rem;
        & > span {
          width: 6rem;
          display: inline-flex;
          align-items: center;
          justify-content: right;
        }
        & > div {
          width: calc(100% - 8rem);
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
  }
  @media screen and (max-width: 500px) {
    .login-module {
      min-width: 90vw;
    }
  }
  footer {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    & > span,
    & > a {
      color: #fff9;
    }
    & > a:hover {
      color: #fffc;
    }
  }
  @media screen and (max-width: 910px) {
    .bgcImg {
      display: none;
    }
    .login-module {
      right: 0;
      left: 0;
      margin: auto;
    }
  }
  @media screen and (max-width: 820px) {
    header {
      justify-content: center;
      flex-direction: column;
      height: auto;
      .logo-title {
        padding-left: 0;
        justify-content: center;
        align-items: center;
        .logo {
          margin: 4rem 0;
          max-width: 6.5rem;
          max-height: 6rem;
        }
        .full-name {
          display: none;
        }
        .abbreviation {
          display: block;
          width: 200px;
        }
      }
      .functional-area {
        justify-content: center;
        padding-right: 0;
      }
    }
  }
}
</style>
