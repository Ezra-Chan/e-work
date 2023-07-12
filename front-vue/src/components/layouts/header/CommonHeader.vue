<template>
  <el-header
    id="commonHeader"
    class="flex justify-between items-center"
    height="5.5rem"
  >
    <header-left />
    <header-right />
  </el-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
#commonHeader {
  --el-header-padding: 0 15px;
  background-color: var(--ework-header-bg-color, #fff);
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
