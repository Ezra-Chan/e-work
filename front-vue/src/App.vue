<template>
  <ElConfigProvider :locale="zhCN">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCN from "element-plus/dist/locale/zh-cn.mjs";

const getHTMLFontSize = useDebounceFn(() => {
  const width = window.innerWidth;
  let html = document.querySelector('html') as HTMLElement;
  if (width > 1920) {
    const multiple = Number((width / 1920).toFixed(1));
    html.style.fontSize = multiple * 10 + 'px';
  } else {
    html.style.fontSize = '10px';
  }
}, 100);

onMounted(() => {
  getHTMLFontSize();
  useEventListener(window, 'resize', getHTMLFontSize);
});
</script>

<style lang="less">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }
}
</style>
