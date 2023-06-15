<template>
  <div id="headerRight">
    <el-dropdown>
      <div class="current-user">
        <el-avatar :size="40" :src="userInfo?.avatar || user" />
        <el-text class="user-name" truncated>{{ userInfo?.userName }}</el-text>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Fullscreen />
    <station-message />
    <theme-switch />
  </div>
</template>
<script setup lang="ts">
import { GlobalStore } from '@/store';
import user from '@/assets/images/public/user.png';

const globalStore = GlobalStore();
const userInfo = computed(() => globalStore.userInfo);
</script>
<style lang="less" scoped>
#headerRight {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 16px;
  .el-dropdown {
    .current-user {
      outline: none;
      display: flex;
      align-items: center;
      border-radius: 20px;
      background-color: #fff;
      cursor: pointer;
      gap: 16px;
      padding-right: 16px;
      .el-avatar--circle {
        border-radius: 20px;
      }
      .user-name {
        width: fit-content;
        max-width: 80px;
        font-size: 16px;
      }
    }
  }
  .el-icon {
    cursor: pointer;
  }
}
</style>
