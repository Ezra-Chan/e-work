<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :modal-class="modalClass + ' image-cropping-modal'"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    :before-close="closeDialog"
  >
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ImageCroppingModal',
});

interface Props {
  modalClass?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '图片裁剪',
  visible: false,
});
const emit = defineEmits<{
  close: [];
}>();

let dialogVisible = $ref(false);

const closeDialog = () => {
  emit('close');
};

watchEffect(() => {
  dialogVisible = props.visible;
});
</script>

<style lang="less" scoped></style>
