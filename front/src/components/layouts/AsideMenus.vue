<template>
  <el-aside id="asideMenus">
    <div class="logo" @click="routerTo('/home')">
      <img src="@/assets/images/public/Logo.png" alt="logo" />
      <el-text v-show="!isCollapse">{{ systemAbbreviation }}</el-text>
    </div>
    <el-scrollbar>
      <el-menu :collapse="isCollapse">
        <el-sub-menu index="1">
          <template #title>
            <el-icon></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';

const systemAbbreviation = import.meta.env.VITE_SYSTEM_ABBREVIATION;
const router = useRouter();
const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);

const logoMarginRight = computed(() => (isCollapse.value ? '0' : '1rem'));

const routerTo = (path: string) => router.push(path);
</script>

<style scoped lang="less">
#asideMenus {
  --ework-border-color: #191a20;
  background-color: var(--ework-border-color);
  user-select: none;
  transition: width 0.3s ease;
  overflow-x: hidden;
  .logo {
    height: 5.5rem;
    border-bottom: 1px solid #282a35;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    cursor: pointer;
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: v-bind(logoMarginRight);
      -webkit-filter: brightness(2);
      filter: brightness(2);
      -webkit-user-drag: none;
    }
    span {
      font-size: 3.6rem;
      color: var(--ework-text-white);
      white-space: nowrap;
    }
  }
  .el-scrollbar {
    height: calc(100% - 55px);

    .el-menu {
      --el-menu-bg-color: var(--ework-border-color);
      --el-menu-hover-bg-color: #14151a;
      --el-menu-text-color: #bdbdc0;
      --el-menu-hover-text-color: #bdbdc0;
      --el-menu-active-color: #ffffff;
      overflow-x: hidden;
      border-right: none;
      .el-menu-item.is-active {
        background-color: #060708;
        &:before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          content: '';
          background: var(--el-color-primary);
        }
      }
    }
  }
}
.dark {
  --ework-border-color: #4c4c4d;
}
</style>
