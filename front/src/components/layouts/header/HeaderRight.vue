<template>
  <div id="headerRight">
    <user-avatar />
    <Fullscreen />
    <station-message />
    <theme-switch />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
#headerRight {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 16px;

  .el-icon {
    cursor: pointer;
  }
}
</style>
