<template>
  <div
    id="stationMessage"
    class="inline-flex border-rdp-50 items-center justify-center cursor-pointer"
    ref="iconRef"
    title="站内信"
  >
    <el-badge :value="5" class="!inline-flex">
      <el-icon :size="IconSize" class="text-light">
        <Bell />
      </el-icon>
    </el-badge>
  </div>
  <el-popover
    width="20rem"
    trigger="click"
    popper-class="station-message-popover"
    virtual-triggering
    ref="popoverRef"
    :virtual-ref="iconRef"
  >
    test
  </el-popover>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue';
import { IconSize, IconBgSize } from 'utils/constants';

const iconRef = ref();
const popoverRef = ref();
onClickOutside(iconRef, () => {
  unref(popoverRef).popperRef?.delayHide?.();
});
</script>

<style lang="less">
#stationMessage {
  background-color: var(--ework-bg-secondary-color);
  width: v-bind(IconBgSize);
  height: v-bind(IconBgSize);

  &:hover {
    .text-light {
      color: var(--ework-text-color-hover) !important;
    }
  }

  .el-badge .el-badge__content {
    border-color: var(--ework-header-bg-color, #fff);
  }
}
</style>
