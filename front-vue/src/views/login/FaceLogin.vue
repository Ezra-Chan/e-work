<template>
  <div class="face-recognition w-100% h-118.4">
    <div class="video-area w-100% h-95.2 flex items-center justify-center">
      <template v-if="enabled">
        <video
          ref="video"
          muted
          autoplay
          :width="videoWidth"
          :height="videoHeight"
        />
        <canvas class="login-canvas hidden" ref="canvas" />
      </template>
      <el-button v-else type="primary" @click="enabled = true" size="large"
        >开启摄像头</el-button
      >
    </div>
    <div class="login-button w-100% mb-7.2 text-center">
      <el-button
        type="primary"
        @click="onFaceLogin"
        size="large"
        class="h-16 !fs-2.4"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';
import { GlobalStore } from '@/store';
const globalStore = GlobalStore();
const router = useRouter();

const rootFontSize =
  Number(document.querySelector('html')?.style.fontSize?.slice(0, -2)) || 10;
const videoWidth = $ref<number>(30 * rootFontSize);
const videoHeight = $ref<number>(20 * rootFontSize);
let currentCamera = $ref<string>();
const { videoInputs: cameras } = $(
  useDevicesList({
    onUpdated() {
      if (!cameras.find(i => i.deviceId === currentCamera))
        currentCamera = cameras[0]?.deviceId;
    },
    constraints: { audio: false },
  })
);
let video = $ref<HTMLVideoElement>();
let { stream, enabled, stop } = $(
  useUserMedia({
    constraints: { video: { deviceId: currentCamera }, audio: false },
  })
);
let cameraPermission = $(usePermission('camera'));
const noCameraPermissonTip = () => {
  ElMessage.error('您没有授予相机权限，请授予权限后再试！');
  enabled = false;
};

const canvas = $ref<HTMLCanvasElement>();
const onFaceLogin = async () => {
  const context = canvas!.getContext('2d');
  // 把流媒体数据画到canvas画布上
  context!.drawImage(video!, 0, 0, videoWidth, videoHeight);
  const base64 = canvas!.toDataURL('image/png')?.split('base64,')[1];
  const { message, success, data = {} } = await LoginService.faceLogin(base64);
  if (!success) {
    ElMessage.error(message);
    return;
  }
  ElMessage.success('登录成功！欢迎');
  const { token, info } = data;
  globalStore.setGlobalState('userInfo', info);
  globalStore.setGlobalState('token', token);
  router.push('/');
};

watchEffect(() => {
  if (video) video.srcObject = stream!;
  if (enabled && cameraPermission === 'denied') {
    noCameraPermissonTip();
  }
  if (cameraPermission === 'prompt') {
    const timer = setTimeout(() => {
      if (enabled) {
        noCameraPermissonTip();
        clearTimeout(timer);
      }
    }, 2000);
  }
});

const getUser = async () => {
  // const data = await LoginService.getUser();
  // cancelRequest('/login');
};
onMounted(() => {
  // getUser();
});
onBeforeUnmount(() => {
  stop();
});
</script>

<style lang="less" scoped>
.face-recognition {
  :deep(.login-button) {
    button > span {
      .letter-spacing-em(1);
    }
  }
}
</style>
