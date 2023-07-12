<template>
  <div
    class="fullscreen inline-flex items-center justify-center border-rdp-50 cursor-pointer"
    @click="toggle"
    :title="isFullscreen ? '退出全屏' : '全屏'"
  >
    <svg-icon
      :icon-class="isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'"
      :size="IconSize"
    />
  </div>
</template>

<script setup lang="ts">
import { IconSize, IconBgSize } from 'utils/constants';
const { toggle, isFullscreen } = useFullscreen();
</script>

<style lang="less">
.fullscreen {
  width: v-bind(IconBgSize);
  height: v-bind(IconBgSize);
  background-color: var(--ework-bg-secondary-color);

  &:hover {
    .svg-icon .icon {
      color: var(--ework-text-color-hover) !important;
    }
  }
}
</style>
