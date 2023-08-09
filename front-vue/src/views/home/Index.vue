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

<script setup lang="ts" name="Home">
import { GlobalStore } from '@/store';

defineOptions({
  name: 'Home',
});

const router = useRouter();
const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const asideWidth = computed(() => (isCollapse.value ? '6.4rem' : '20rem'));

router.beforeEach(to => {
  console.log('to', to);
});

onBeforeRouteUpdate((to, from) => {
  console.log('to', to);
  console.log('from', from);
});

onMounted(() => {});
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
