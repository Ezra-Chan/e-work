<template>
  <div class="user-avatar">
    <el-dropdown trigger="click">
      <div class="current-user">
        <el-avatar :size="40" :src="userInfo?.avatar || user" />
        <el-text class="user-name text-light" truncated>{{
          userInfo?.userName
        }}</el-text>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import user from '@/assets/images/public/user.png';
import { GlobalStore } from '@/store';

const globalStore = GlobalStore();
const userInfo = computed(() => globalStore.userInfo);
</script>

<style lang="less" scoped>
.user-avatar {
  .el-dropdown {
    .current-user {
      display: flex;
      align-items: center;
      border-radius: 20px;
      background-color: var(--ework-bg-secondary-color);
      cursor: pointer;
      gap: 16px;
      padding-right: 16px;
      .el-avatar--circle {
        border-radius: 20px;
      }
      &:hover {
        .text-light {
          color: var(--ework-text-color-hover) !important;
        }
      }
      .user-name {
        width: fit-content;
        max-width: 80px;
        font-size: 16px;
      }
    }
  }
}
</style>
