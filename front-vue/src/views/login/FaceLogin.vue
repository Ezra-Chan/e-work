<template>
  <div class="face-recognition w-100% h-118.4">
    <take-photo
      ref="camera"
      class="h-95.2"
      :videoWidth="videoWidth"
      :videoHeight="videoHeight"
    />
    <div class="login-button w-100% mb-7.2 text-center">
      <el-button
        type="primary"
        @click="onFaceLogin"
        size="large"
        class="h-16 !fs-2.4"
        :loading="loading"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts" name="FaceLogin">
import TakePhoto from '@/components/TakePhoto.vue';
import * as LoginService from 'api/modules/login';
import { cancelRequest } from 'api/request';
import { handleLogin } from 'utils/loginFunc';
import { useCompRef } from 'utils/useCompRef';

const router = useRouter();

const rootFontSize =
  Number(document.querySelector('html')?.style.fontSize?.slice(0, -2)) || 10;
const videoWidth = $ref<number>(30 * rootFontSize);
const videoHeight = $ref<number>(20 * rootFontSize);
const camera = $(useCompRef(TakePhoto));
let loading = $ref<boolean>(false);

const onFaceLogin = async () => {
  loading = true;
  try {
    const base64 = camera?.getBase();
    const {
      message,
      success,
      data = {},
    } = await LoginService.faceLogin(base64!);
    loading = false;
    if (!success) {
      ElMessage.error(message);
      camera?.clearCanvas();
      return;
    }
    handleLogin(data, router);
  } catch (error) {
    loading = false;
  }
};
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
