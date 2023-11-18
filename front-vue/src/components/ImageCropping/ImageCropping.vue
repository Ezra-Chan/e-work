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
        <el-button type="primary">更换图片</el-button>
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
        <el-button type="primary" @click="upload">
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

const props = withDefaults(defineProps<Props>(), {
  outputType: 'jpeg',
});

defineEmits<{
  upload: [data: any];
  close: [];
}>();

const cropper = $(useCompRef(VueCropper));
let img = $ref(props.imgSrc);
let previews = $ref<IPreviewData>();
const options = {
  size: 1,
  fixedNumber: [1, 1],
};

const imgLoad = (res: 'success' | 'error') => {
  if (res === 'error') {
    ElMessage.error('图片加载失败，请重新上传');
  }
};

const realTime = (data: IPreviewData) => (previews = data);

const changeScale = (num: number) => cropper.changeScale(num);

const rotateRight = () => cropper.rotateRight();

const rotateLeft = () => cropper.rotateLeft();

const getPreviewBlob = () => {
  cropper.getCropBlob((data: Blob) => {
    // 将Blob转化为本地url
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      // previewImg = reader.result as string;
      console.log(reader.result);
    };
  });
};

const upload = () => {
  getPreviewBlob();
};

onMounted(() => {
  // if (props.imgSrc) {
  //   getPreviewBlob();
  // }
});
</script>

<style lang="less" scoped></style>
