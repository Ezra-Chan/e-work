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
            <SvgIcon
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
      <el-space spacer="|" size="large" class="login-types">
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
          <el-input v-model="loginForm.account" placeholder="请输入账号" />
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
          />
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input
            v-model="loginForm.verificationCode"
            placeholder="请输入验证码"
          />
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
import { FormInstance } from 'element-plus';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';
import SvgIcon from '@/components/SvgIcon.vue';

const systemName = import.meta.env.VITE_SYSTEM_TITLE;
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const iconFontSize = '30px';
const loginType = $ref<LoginType>(0);
let flag = true;
const isDark = useDark();
const toggleDark = useToggle(isDark);

const loginFormRef = ref<FormInstance>();

const loginForm = reactive({
  account: undefined,
  password: undefined,
  verificationCode: '',
});

onMounted(() => {
  // getUser();
});

const changeMode = e => {
  console.log(e);
  ElMessage.success('测试');
  toggleDark();
};

const getUser = async () => {
  if (flag) {
    flag = false;
    const data = await LoginService.getUser();
    console.log('data', data);
  } else {
    cancelRequest('/login');
    flag = true;
  }
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
    height: 140px;
    line-height: 140px;
    display: flex;
    justify-content: space-between;

    .logo-title {
      display: flex;
      padding-left: 10%;

      .logo {
        margin: 25px 0;
        -webkit-filter: brightness(2);
        filter: brightness(2);
      }

      .title {
        width: 580px;
        font-size: 40px;
        font-family: PingFang-SC;
        font-weight: bold;
        color: #fff;
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
      gap: 10px;
      align-items: center;
      padding-right: 20px;
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
    right: 10%;
    width: 25%;
    min-width: 450px;
    height: 60%;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0px 0px 30px #0d2cb8;
    padding: 80px 50px 50px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .login-name {
      font-size: 36px;
      letter-spacing: 20px;
      padding-left: 6px;
    }
    :deep(.login-types) {
      justify-content: center;
      & > span {
        height: 29px;
      }
      .login-type {
        font-size: 20px;
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 2px solid transparent;
      }
      .current-login-type {
        color: var(--el-color-primary);
        border-bottom: 2px solid;
      }
    }
    .login-form {
      :deep(.el-form-item__content) {
        color: var(--el-color-primary);
        display: flex;
        gap: 20px;
        & > span {
          width: 60px;
          display: inline-flex;
          align-items: center;
          justify-content: right;
        }
        & > div {
          width: calc(100% - 80px);
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
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
        .logo {
          margin: 40px 0;
          max-width: 65px;
          max-height: 60px;
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
