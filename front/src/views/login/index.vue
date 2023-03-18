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
          v-model="theme"
          :active-icon="Moon"
          :inactive-icon="Sunny"
          inline-prompt
          @change="changeTheme"
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
      <account-login v-if="loginType === 0" />
      <face-login v-else />
    </div>
    <brand-footer />
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';
import FaceLogin from './FaceLogin.vue';
import AccountLogin from './AccountLogin.vue';
import BrandFooter from '@/components/BrandFooter.vue';

const systemName = import.meta.env.VITE_SYSTEM_TITLE;
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const iconFontSize = '3rem';
let loginType = $ref<LoginType>(0);

// 暗黑模式
const isDark = useDark();
const toggleDark = useToggle(isDark);
let theme = $ref<typeof isDark>(isDark);
const changeTheme = (e: boolean) => {
  toggleDark();
  theme = e;
};

onMounted(() => {
  // getUser();
});

const getUser = async () => {
  const data = await LoginService.getUser();
  // cancelRequest('/login');
};
</script>

<style lang="less" scoped>
#login {
  --ework-text-white: #fffd;
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
      align-items: center;
      padding-left: 10vw;
      gap: 2vw;
      .logo {
        -webkit-filter: brightness(2);
        filter: brightness(2);
        width: 7rem;
        max-height: 6rem;
      }
      .title {
        font-size: 4rem;
        font-family: PingFang-SC;
        font-weight: bold;
        color: var(--ework-text-white);
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
  }
  @media screen and (max-width: 500px) {
    .login-module {
      min-width: 90vw;
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
      line-height: 10rem;
      .logo-title {
        padding-left: 0;
        justify-content: center;
        .logo {
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
.dark {
  #login {
    filter: brightness(0.7) saturate(1.25);
    --ework-text-white: #cfd3dc;
  }
}
</style>
