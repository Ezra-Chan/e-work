<template>
  <div
    id="login"
    class="w-h-100 bg-no-repeat bg-cover relative overflow-hidden select-none"
  >
    <header class="w-100% flex justify-between">
      <div class="logo-title">
        <img src="@/assets/images/public/Logo.png" alt="logo" class="logo" />
        <h1 class="title full-name text-dark">{{ systemName }}</h1>
        <h1 class="title abbreviation text-dark">{{ systemAbbreviation }}</h1>
      </div>
      <div class="functional-area">
        <theme-switch />
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
      <component :is="loginType === 0 ? AccountLogin : FaceLogin" />
    </div>
    <brand-footer :isFixed="true" mode="white" />
  </div>
</template>

<script setup lang="ts">
import FaceLogin from './FaceLogin.vue';
import AccountLogin from './AccountLogin.vue';

const systemName = import.meta.env.VITE_SYSTEM_TITLE;
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
let loginType = $ref<LoginType>(0);

onMounted(() => {
  // getUser();
});
</script>

<style lang="less" scoped>
#login {
  background-image: url('assets/images/login/background-image.png');
  & > * {
    z-index: 1;
    position: relative;
  }
  img {
    -webkit-user-drag: none;
  }
  header {
    height: 15vh;
    line-height: 15vh;
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
    background-color: var(--ework-bg-color);
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
      padding: 8rem 1rem 5rem;
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
      line-height: 7rem;
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
  }
}
</style>
