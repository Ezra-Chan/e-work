<template>
  <el-footer id="brand-footer">
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
}

const props = withDefaults(defineProps<FooterProps>(), {
  isFixed: false,
});
const position = $computed(() => (props.isFixed ? 'fixed' : 'static'));
</script>

<style lang="less" scoped>
#brand-footer {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  position: v-bind('position');
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  & > span,
  & > a {
    color: var(--ework-text-white);
    &:hover {
      color: var(--el-color-white);
    }
  }
}
</style>
