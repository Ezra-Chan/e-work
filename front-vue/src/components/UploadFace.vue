<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="40rem"
    modal-class="add-face"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    :before-close="closeFaceDialog"
  >
    <take-photo ref="camera" @open="isOpenCamera = true" />
    <template #footer>
      <div class="flex justify-center" v-if="isOpenCamera">
        <el-button type="primary" @click="closeCamera">关闭摄像头</el-button>
        <el-button type="primary" @click="shoot">拍摄</el-button>
        <el-button v-if="!!base" type="primary" @click="reShoot">
          重拍
        </el-button>
        <el-button
          v-if="!!base"
          type="primary"
          @click="createFaceApi"
          :loading="loading"
        >
          上传
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import TakePhoto from '@/components/TakePhoto.vue';
import { useCompRef } from 'utils/useCompRef';
import { createFace } from 'api/modules/user';

interface Props {
  title?: string;
  visible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '上传人脸',
  visible: false,
});
const emit = defineEmits<{
  upload: [data: IFaceInfo];
  close: [];
}>();

let isOpenCamera = $ref(false);
let base = $ref<string | undefined>();
let loading = $ref(false);
let dialogVisible = $ref(false);
const camera = $(useCompRef(TakePhoto));

const closeCamera = () => {
  camera?.stop();
  isOpenCamera = false;
  base = undefined;
};

const closeFaceDialog = () => {
  isOpenCamera = false;
  base = undefined;
  emit('close');
};

const shoot = () => {
  base = camera?.getBase();
};

const reShoot = () => {
  camera?.clearCanvas();
  base = undefined;
};

const createFaceApi = async () => {
  try {
    loading = true;
    const { data, message, success } = await createFace({ base: base! });
    loading = false;
    if (success) {
      emit('upload', data);
      closeFaceDialog();
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    loading = false;
    console.error(error);
  }
};

watchEffect(() => {
  dialogVisible = props.visible;
});
</script>

<style lang="less">
.add-face {
  .el-dialog__footer {
    padding-top: 0;
    height: 52px;
  }
}
</style>
