<template>
  <div id="home">
    <el-container>
      <aside-menus />
      <el-container>
        <common-header />
        <brand-footer />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  & > .el-container {
    width: 100%;
    height: 100%;
    --el-aside-width: 20rem;
    & > .el-container {
      width: calc(100% - var(--el-aside-width));
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
