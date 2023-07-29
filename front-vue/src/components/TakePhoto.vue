<template>
  <div class="flex items-center justify-center">
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
    <el-button v-else type="primary" @click="enabled = true" size="large">
      开启摄像头
    </el-button>
  </div>
</template>

<script setup lang="ts">
interface TakePhotoProps {
  videoWidth?: number;
  videoHeight?: number;
}
const props = withDefaults(defineProps<TakePhotoProps>(), {
  videoWidth: 300,
  videoHeight: 200,
});

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

const getBase = () => {
  const context = canvas!.getContext('2d');
  // 把流媒体数据画到canvas画布上
  context!.drawImage(video!, 0, 0, props.videoWidth, props.videoHeight);
  const base64 = canvas!.toDataURL('image/png')?.split('base64,')[1];
  return base64;
};

defineExpose({
  getBase,
});

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

onBeforeUnmount(() => {
  stop();
});
</script>
