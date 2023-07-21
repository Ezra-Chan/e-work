<template>
  <div id="home" class="w-h-100">
    <el-container class="w-h-100 transition-width-300">
      <aside-menus />
      <el-container class="!flex-col overflow-y-hidden">
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
    realName: '超级管理员',
    loginName: 'admin',
    id: 1,
    role: 1,
    avatar: 'https://avatars.githubusercontent.com/u/21073039?v=4',
  });
});
</script>

<style lang="less" scoped>
#home {
  & > .el-container {
    --el-aside-width: v-bind(asideWidth);
    & > .el-container {
      width: calc(100% - var(--el-aside-width));
    }
  }
}
</style>
