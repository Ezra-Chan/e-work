<template>
  <el-aside
    id="asideMenus"
    class="select-none !overflow-x-hidden transition-width-300"
  >
    <div
      class="logo h-22 flex items-center cursor-pointer px"
      @click="routerTo('/home')"
    >
      <img
        src="@/assets/images/public/Logo.png"
        alt="logo"
        class="w-14 h-14 brightness-200 no-drag"
        :class="isCollapse ? 'mr-0' : 'mr'"
      />
      <el-text v-show="!isCollapse" class="text-dark !fs-3.6 ws-nowrap">{{
        systemAbbreviation
      }}</el-text>
    </div>
    <el-scrollbar class="!h-calc-5.5">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        class="overflow-x-hidden !border-r-0"
      >
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

const routerTo = (path: string) => router.push(path);
</script>

<style scoped lang="less">
#asideMenus {
  background-color: var(--ework-bg-color-2);
  border-right: 1px solid var(--el-border-color-light);

  .el-scrollbar {
    .el-menu {
      --el-menu-bg-color: var(--ework-bg-color-2);
      --el-menu-hover-bg-color: #14151a;
      --el-menu-text-color: #bdbdc0;
      --el-menu-hover-text-color: #bdbdc0;
      --el-menu-active-color: #fff;
      .el-menu-item.is-active {
        background-color: #060708;
        &::before {
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
</style>
