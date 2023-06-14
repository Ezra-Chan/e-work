<template>
  <el-footer id="brand-footer" :class="{ 'has-color': props.mode === 'black' }">
    <el-text>© {{ new Date().getFullYear() }}</el-text>
    <el-link
      href="https://blog.csdn.net/qq_41065415"
      :underline="false"
      target="_blank"
      >Ezra Chan</el-link
    >
    <el-popover
      :width="220"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;"
    >
      <template #reference>
        <el-icon size="4rem" title="E-Work系统交流群">
          <svg-icon
            icon-class="icon-QQ-circle-fill"
            color="var(--el-color-black)"
          />
        </el-icon>
      </template>
      <template #default>
        <img
          src="@/assets/images/login/qq-group-qrcode.png"
          :width="200"
          alt="E-Work系统交流群"
          title="E-Work系统交流群"
        />
      </template>
    </el-popover>
  </el-footer>
</template>

<script setup lang="ts">
interface FooterProps {
  isFixed?: boolean; // 位置是否固定在页面下方
  mode?: 'white' | 'black'; //
}

const props = withDefaults(defineProps<FooterProps>(), {
  isFixed: false,
  mode: 'black',
});
const position = computed(() => (props.isFixed ? 'fixed' : 'static'));
const color = computed(() =>
  props.mode === 'black' ? 'var(--ework-text-black)' : 'var(--ework-text-white)'
);
const hoverColor = computed(() =>
  props.mode === 'black'
    ? 'var(--ework-text-black-hover)'
    : 'var(--ework-text-white-hover)'
);
</script>

<style scoped lang="less">
#brand-footer {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  position: v-bind(position) !important;
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  &.has-color {
    border-top: 1px solid var(--el-border-color-light);
    background-color: var(--el-color-white);
  }
  & > span,
  & > a {
    color: v-bind(color);
    &:hover {
      color: v-bind(hoverColor);
    }
  }
  .el-icon {
    width: auto;
  }
}
</style>
