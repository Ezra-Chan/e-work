<template>
  <div class="face-recognition">
    <div class="video-area">
      <template v-if="enabled">
        <video
          ref="video"
          muted
          autoplay
          :width="videoWidth"
          :height="videoHeight"
        />
        <canvas class="login-canvas" ref="canvas" />
      </template>
      <el-button v-else type="primary" @click="enabled = true" size="large"
        >开启摄像头</el-button
      >
    </div>
    <div class="login-button">
      <el-button type="primary" @click="onFaceLogin" size="large"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';

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
  const res = await LoginService.faceLogin(base64);
  console.log(res);
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
  const data = await LoginService.getUser();
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
  width: 100%;
  height: 29.6rem;
  .video-area {
    width: 100%;
    height: 23.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-canvas {
      display: none;
    }
  }
  :deep(.login-button) {
    width: 100%;
    margin-bottom: 1.8rem;
    text-align: center;
    button {
      height: 4rem;
      & > span {
        .letter-spacing-em(1);
        font-size: 2.4rem;
      }
    }
  }
}
</style>
