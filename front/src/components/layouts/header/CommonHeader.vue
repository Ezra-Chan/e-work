<template>
  <el-header id="commonHeader" height="5.5rem">
    <header-left />
    <header-right />
  </el-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
#commonHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ework-header-bg-color, #fff);
  --el-header-padding: 0 15px;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
