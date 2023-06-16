<template>
  <div
    class="fullscreen"
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
  display: inline-flex;
  width: v-bind(IconBgSize);
  height: v-bind(IconBgSize);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: var(--ework-bg-secondary-color);
  cursor: pointer;

  &:hover {
    .svg-icon .icon {
      color: var(--ework-text-color-hover) !important;
    }
  }
}
</style>
