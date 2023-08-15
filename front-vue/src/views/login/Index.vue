<template>
  <div
    id="login"
    class="w-h-100 bg-no-repeat bg-cover relative overflow-hidden select-none"
  >
    <header class="w-100% h-15vh lh-15vh flex justify-between">
      <div class="logo-title flex items-center pl-10vw gap-2vw">
        <img
          src="@/assets/images/public/Logo.png"
          alt="logo"
          class="logo brightness-200 w-28 max-h-24 no-drag"
        />
        <h1 class="full-name text-dark fs-4 font-500 m-0 text-center">
          {{ systemName }}
        </h1>
        <h1
          class="abbreviation text-dark fs-4 font-500 m-0 text-center display-none"
        >
          {{ systemAbbreviation }}
        </h1>
      </div>
      <div
        class="functional-area flex items-center justify-center gap-1vw pr-1vw"
      >
        <theme-switch />
      </div>
    </header>
    <div class="centerBgc w-h-100 overflow-hidden !absolute top-0 !z-0">
      <img
        class="cityBgc no-drag absolute inset-0 opacity-30 m-y-a m-x-0"
        src="@/assets/images/login/cityBgc.png"
        alt=""
      />
      <img
        class="bgcImg no-drag w-30% absolute inset-0 left-10% m-y-a m-x-0"
        src="@/assets/images/login/bgcImg.png"
        alt=""
      />
    </div>
    <div
      class="login-module !absolute top-0 bottom-0 m-y-a m-x-0 right-10vw w-25vw min-w-184 border-rd-12 flex flex-col gap-8 h-max pt-32 p-x-20 pb-20"
    >
      <el-text type="primary" tag="h2" class="login-name !fs-3.6">登录</el-text>
      <el-space spacer=" " size="large" class="login-types justify-center">
        <el-text
          v-for="item in loginTypes"
          class="!fs-2 cursor-pointer !pb-2 b-b-2 b-b-solid b-b-transparent"
          :class="loginType === item.type ? 'current-login-type' : ''"
          @click="loginType = item.type"
        >
          {{ item.name }}
        </el-text>
      </el-space>
      <component :is="loginType === 0 ? AccountLogin : FaceLogin" />
    </div>
    <brand-footer :isFixed="true" mode="white" />
  </div>
</template>

<script setup lang="ts" name="Login">
import FaceLogin from './FaceLogin.vue';
import AccountLogin from './AccountLogin.vue';

defineOptions({
  name: 'Login',
});

const systemName = import.meta.env.VITE_SYSTEM_TITLE;
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const loginTypes = reactive<LoginTypes[]>([
  { name: '密码登录', type: 0 },
  { name: '人脸识别', type: 1 },
]);
let loginType = $ref<LoginType>(loginTypes[0].type);
</script>

<style lang="less" scoped>
#login {
  background-image: url('assets/images/login/background-image.png');
  & > * {
    z-index: 1;
    position: relative;
  }
  @media screen and (min-width: 1921px) {
    .centerBgc .cityBgc {
      width: 100%;
    }
  }
  .login-module {
    background-color: var(--ework-bg-color);
    box-shadow: 0 0 3rem #0d2cb8;
    .login-name {
      .letter-spacing-em(1);
    }
    :deep(.login-types) {
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
      .current-login-type {
        color: var(--el-color-primary);
        border-color: initial;
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
  #login .centerBgc {
    filter: brightness(0.7) saturate(1.25);
  }
}
</style>
