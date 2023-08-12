<template>
  <div
    class="take-photo flex items-center justify-center"
    :style="{
      '--take-photo-width': props.videoWidth + 'px',
      '--take-photo-height': props.videoHeight + 'px',
    }"
  >
    <template v-if="enabled">
      <video
        ref="video"
        muted
        autoplay
        :width="videoWidth"
        :height="videoHeight"
      />
      <canvas
        class="login-canvas hidden"
        :width="(videoHeight / 3) * 4"
        :height="videoHeight"
        ref="canvas"
      />
    </template>
    <el-button v-else type="primary" @click="openCamera" size="large">
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
let video = $ref<HTMLVideoElement>();
let cameraPermission = $(usePermission('camera'));
const canvas = $ref<HTMLCanvasElement>();

const { videoInputs: cameras } = $(
  useDevicesList({
    onUpdated() {
      if (!cameras.find(i => i.deviceId === currentCamera))
        currentCamera = cameras[0]?.deviceId;
    },
    constraints: { audio: false },
  })
);
let { stream, enabled, stop } = $(
  useUserMedia({
    constraints: { video: { deviceId: currentCamera }, audio: false },
  })
);
const noCameraPermissonTip = () => {
  ElMessage.error('您没有授予相机权限，请授予权限后再试！');
  enabled = false;
};

const getBase = () => {
  const context = canvas!.getContext('2d');
  // 把流媒体数据画到canvas画布上
  context!.drawImage(video!, 0, 0, props.videoWidth, props.videoHeight);
  const base64 = canvas!.toDataURL('image/png')?.split('base64,')[1];
  return base64;
};

defineExpose({
  getBase,
  stop,
});

const emits = defineEmits(['open']);

const openCamera = () => {
  enabled = true;
  emits('open');
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

onBeforeUnmount(() => {
  stop();
});
</script>

<style lang="less" scoped>
.take-photo {
  min-width: var(--take-photo-width, 300px);
  min-height: var(--take-photo-height, 200px);
}
</style>
