<template>
  <el-aside id="asideMenus">
    <div class="logo" @click="routerTo('/home')">
      <img src="@/assets/images/public/Logo.png" alt="logo" />
      <el-text>{{ systemAbbreviation }}</el-text>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const router = useRouter();
const routerTo = (path: string) => router.push(path);
</script>

<style scoped lang="less">
#asideMenus {
  --ework-border-color: #191a20;
  background-color: var(--ework-border-color);
  user-select: none;
  .logo {
    height: 5.5rem;
    border-bottom: 1px solid #282a35;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 1rem;
    cursor: pointer;
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
      -webkit-filter: brightness(2);
      filter: brightness(2);
      -webkit-user-drag: none;
    }
    span {
      font-size: 4rem;
      color: var(--ework-text-white);
    }
  }
}
.dark {
  --ework-border-color: #4c4c4d;
}
</style>
