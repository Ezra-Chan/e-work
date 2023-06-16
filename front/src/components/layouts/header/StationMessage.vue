<template>
  <div id="stationMessage" ref="iconRef" title="站内信">
    <el-badge :value="5">
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
  display: inline-flex;
  background-color: var(--ework-bg-secondary-color);
  width: v-bind(IconBgSize);
  height: v-bind(IconBgSize);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    .text-light {
      color: var(--ework-text-color-hover) !important;
    }
  }

  .el-badge {
    display: inline-flex;
    .el-badge__content {
      border-color: var(--ework-header-bg-color, #fff);
    }
  }
}
</style>
