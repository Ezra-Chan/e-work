<template>
  <div id="headerLeft">
    <el-icon
      :size="IconSize"
      @click="() => globalStore.setGlobalState({ isCollapse: !isCollapse })"
      :title="isCollapse ? '展开' : '收起'"
      class="text-light cursor-pointer"
    >
      <component :is="isCollapse ? Expand : Fold" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue';
import { GlobalStore } from '@/store';
import { IconSize } from 'utils/constants';

const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
</script>

<style lang="less" scoped></style>
