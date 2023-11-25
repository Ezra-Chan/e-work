<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="800px"
    :modal-class="modalClass + ' image-cropping-modal'"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    :before-close="closeDialog"
  >
    <image-cropping
      :img-src="imgSrc"
      :output-type="outputType"
      @upload="upload"
    />
  </el-dialog>
</template>

<script setup lang="ts">
interface Props {
  modalClass?: string;
  title?: string;
  visible: boolean;
  imgSrc?: string | Blob | File;
  outputType?: 'jpeg' | 'png' | 'webp';
}

const props = withDefaults(defineProps<Props>(), {
  title: '图片裁剪',
  visible: false,
});
const emit = defineEmits<{
  close: [];
  upload: [data: Blob];
}>();

let dialogVisible = $ref(false);

const closeDialog = () => {
  emit('close');
};

const upload = (data: Blob) => {
  emit('upload', data);
};

watchEffect(() => {
  dialogVisible = props.visible;
});
</script>

<style lang="less" scoped></style>
