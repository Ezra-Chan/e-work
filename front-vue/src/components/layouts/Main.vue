<template>
  <el-main>
    <RouterView />
  </el-main>
</template>

<script setup lang="ts" name="main">
import { storeToRefs } from 'pinia';
import { GlobalStore } from '@/store';

const globalStore = GlobalStore();
const { isCollapse } = storeToRefs(globalStore);

let screenWidth = $ref(0);
let cancelListenWidth: (() => void) | undefined;

const listenWidth = useDebounceFn(() => {
  screenWidth = document.body.clientWidth;
  if (!isCollapse.value && screenWidth < 1200)
    globalStore.setGlobalState({ isCollapse: true });
  if (isCollapse.value && screenWidth > 1200)
    globalStore.setGlobalState({ isCollapse: false });
}, 100);

onMounted(() => {
  cancelListenWidth = useEventListener(window, 'resize', listenWidth);
});

onBeforeUnmount(() => {
  cancelListenWidth?.();
});
</script>
