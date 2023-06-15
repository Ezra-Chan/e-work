<template>
  <div class="fullscreen">
    <svg-icon
      @click="toggle"
      :icon-class="isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'"
      :tip="isFullscreen ? '退出全屏' : '全屏'"
      :size="IconSize"
      pointer
    />
  </div>
</template>

<script setup lang="ts">
import { IconSize } from 'utils/constants';
const { toggle, isFullscreen } = useFullscreen();
</script>

<style scoped lang="less">
.fullscreen {
  display: inline-flex;
}
</style>
