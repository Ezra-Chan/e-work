<template>
  <div id="home">
    <el-container>
      <aside-menus />
      <el-container>
        <common-header />
        <Main />
        <brand-footer />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';
const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const asideWidth = computed(() => (isCollapse.value ? '6.4rem' : '20rem'));

onMounted(() => {
  globalStore.setGlobalState('userInfo', {
    userName: '超级管理员',
    loginName: 'admin',
    id: 1,
    avatar: 'https://avatars.githubusercontent.com/u/21073039?v=4',
  });
});
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  & > .el-container {
    width: 100%;
    height: 100%;
    --el-aside-width: v-bind(asideWidth);
    transition: width 0.5s;
    & > .el-container {
      width: calc(100% - var(--el-aside-width));
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
    }
  }
}
</style>
