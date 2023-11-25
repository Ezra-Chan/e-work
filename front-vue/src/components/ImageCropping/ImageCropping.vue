<template>
  <div class="image-cropping flex justify-between w-300 h-180">
    <div class="flex flex-col justify-between w-160">
      <vue-cropper
        ref="cropper"
        class="h-160!"
        fixed
        fixedBox
        autoCrop
        canScale
        canMove
        canMoveBox
        centerBox
        :img="img"
        :outputSize="options.size"
        :outputType="outputType"
        :fixedNumber="options.fixedNumber"
        :autoCropWidth="300"
        :autoCropHeight="300"
        @imgLoad="imgLoad"
        @realTime="realTime"
      />
      <div class="flex gap-6 justify-center">
        <el-upload
          accept=".jpg, .jpeg, .png"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleImageChange"
          :before-upload="beforeImageUpload"
        >
          <template #trigger>
            <el-button type="primary">更换图片</el-button>
          </template>
        </el-upload>
        <el-button @click="changeScale(1)" title="放大">
          <el-icon :size="iconButtonSize"><ZoomIn /></el-icon>
        </el-button>
        <el-button @click="changeScale(-1)" title="缩小">
          <el-icon :size="iconButtonSize"><ZoomOut /></el-icon>
        </el-button>
        <el-button @click="rotateRight" title="左旋转">
          <el-icon :size="iconButtonSize"><RefreshRight /></el-icon>
        </el-button>
        <el-button @click="rotateLeft" title="右旋转">
          <el-icon :size="iconButtonSize"><RefreshLeft /></el-icon>
        </el-button>
      </div>
    </div>
    <div class="flex flex-col justify-between" v-if="img && previews">
      <div class="w-160 h-160 flex items-center justify-center">
        <div :style="previews.div" class="overflow-hidden border-rdp-50">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
      <div class="flex justify-center">
        <el-button type="primary" @click="getPreviewBlob" :loading="loading">
          上传
          <el-icon size="16px" class="m-l-2"><UploadFilled /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
import { VueCropper } from 'vue-cropper';
import type { UploadProps } from 'element-plus';
import {
  ZoomIn,
  ZoomOut,
  RefreshRight,
  RefreshLeft,
  UploadFilled,
} from '@element-plus/icons-vue';
import { useCompRef } from 'utils/useCompRef';
import 'vue-cropper/dist/index.css';

interface Props {
  imgSrc?: string | Blob | File;
  outputType?: 'jpeg' | 'png' | 'webp';
}

interface IPreviewData {
  w: number;
  h: number;
  div: CSSProperties;
  img: CSSProperties;
  url: string;
}

const iconButtonSize = '2rem';
const options = {
  size: 1,
  fixedNumber: [1, 1],
};

const props = withDefaults(defineProps<Props>(), {
  outputType: 'jpeg',
});

const emit = defineEmits<{
  upload: [data: Blob];
}>();

const cropper = $(useCompRef(VueCropper));
let img = $ref(props.imgSrc);
let previews = $ref<IPreviewData>();
let loading = $ref(false);

const imgLoad = (res: 'success' | 'error') => {
  if (res === 'error') {
    ElMessage.error('图片加载失败，请更换图片');
  }
};

const realTime = (data: IPreviewData) => (previews = data);

const changeScale = (num: number) => cropper.changeScale(num);

const rotateRight = () => cropper.rotateRight();

const rotateLeft = () => cropper.rotateLeft();

const getPreviewBlob = () => {
  cropper.getCropBlob((data: Blob) => {
    emit('upload', data);
  });
};

const handleImageChange: UploadProps['onChange'] = uploadFile => {
  const { raw } = uploadFile;
  // 将raw创建本地url
  const reader = new FileReader();
  reader.readAsDataURL(raw!);
  reader.onload = () => {
    img = reader.result as string;
  };
};

const beforeImageUpload: UploadProps['beforeUpload'] = file => {
  // Element-Plus暂时有bug，不触发beforeUpload事件
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传jpg、png格式的图片!');
    return false;
  }
  return true;
};

onMounted(() => {
  // if (props.imgSrc) {
  //   getPreviewBlob();
  // }
});
</script>

<style lang="less" scoped>
.image-cropping {
  img {
    -webkit-user-drag: none;
  }
}
</style>
