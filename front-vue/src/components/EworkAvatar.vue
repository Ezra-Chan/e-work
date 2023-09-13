<template>
  <el-avatar
    class="ework-avatar"
    :size="size"
    :src="source"
    :shape="shape"
    @error="errorHandle"
  />
</template>

<script setup lang="ts" name="EworkAvatar">
import user from '@/assets/images/public/user.png';

interface Props {
  size?: number;
  src?: string;
  shape?: 'circle' | 'square';
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  src: user,
  shape: 'circle',
});

let source = $ref(props.src);

const errorHandle = () => {
  source = user;
};
</script>

<style lang="less">
.ework-avatar {
  img {
    -webkit-user-drag: none;
  }
}
</style>
