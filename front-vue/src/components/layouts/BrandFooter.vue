<template>
  <el-footer
    class="brand-footer w-100% !h-12 flex items-center justify-center gap-4 bottom-0"
    :class="{ 'has-color': props.mode === 'black' }"
  >
    <el-text class="text-light">© {{ new Date().getFullYear() }}</el-text>
    <el-link
      href="https://blog.csdn.net/qq_41065415"
      :underline="false"
      target="_blank"
      class="text-light"
      >Ezra Chan</el-link
    >
    <el-link
      href="https://github.com/Ezra-Chan/e-work"
      :underline="false"
      target="_blank"
    >
      <svg-icon
        icon-class="icon-github-fill"
        :size="IconSize"
        tip="Github项目主页"
      />
    </el-link>
    <el-popover
      :width="220"
      popper-class="qq-group-popover"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;"
      :teleported="false"
    >
      <template #reference>
        <svg-icon icon-class="icon-QQ-circle-fill" :size="IconSize" />
      </template>
      <template #default>
        <el-text tag="h3" class="text-light text-center !mb"
          >E-Work系统交流群</el-text
        >
        <img
          src="@/assets/images/login/qq-group-qrcode.png"
          :width="200"
          alt="E-Work系统交流群"
        />
      </template>
    </el-popover>
  </el-footer>
</template>

<script setup lang="ts">
import { IconSize } from 'utils/constants';
interface FooterProps {
  isFixed?: boolean; // 位置是否固定在页面下方
  mode?: 'white' | 'black'; //
}

const props = withDefaults(defineProps<FooterProps>(), {
  isFixed: false,
  mode: 'black',
});
const position = computed(() => (props.isFixed ? 'fixed' : 'static'));
</script>

<style scoped lang="less">
.brand-footer {
  position: v-bind(position) !important;
  &.has-color {
    border-top: 1px solid var(--el-border-color-light);
    background-color: var(--ework-header-bg-color);
  }
}
</style>
