<template>
  <div id="stationMessage">
    <el-popover
      placement="bottom"
      width="20rem"
      trigger="click"
      popper-class="stationMessagePopover"
    >
      <template #reference>
        <el-badge :value="5">
          <el-icon :size="IconSize">
            <Bell />
          </el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue';
import { IconSize } from 'utils/constants';
</script>

<style lang="less">
#stationMessage {
  display: inline-flex;
  .el-icon {
    cursor: pointer;
  }
  .el-badge__content {
    border-color: var(--ework-header-bg-color, #fff);
  }
}
</style>
