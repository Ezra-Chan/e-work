<template>
  <el-header id="commonHeader" height="5.5rem">
    <el-icon
      size="4rem"
      @click="() => globalStore.setIsCollapse(!isCollapse)"
      :title="isCollapse ? '展开' : '收起'"
    >
      <Expand v-if="isCollapse" />
      <Fold v-else />
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
  padding-left: 0px;
  background-color: v-bind(primary);
  .el-icon {
    cursor: pointer;
  }
}
</style>
