<template>
  <el-header id="commonHeader" height="5.5rem">
    <el-icon
      size="2.2rem"
      @click="() => globalStore.setGlobalState('isCollapse', !isCollapse)"
      :title="isCollapse ? '展开' : '收起'"
    >
      <component :is="isCollapse ? Expand : Fold"></component>
    </el-icon>
  </el-header>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';
import { Expand, Fold } from '@element-plus/icons-vue';

const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const primary = computed(() => globalStore.primary);
</script>

<style scoped lang="less">
#commonHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: v-bind(primary);
  --el-header-padding: 0 15px;
  .el-icon {
    cursor: pointer;
  }
}
</style>
