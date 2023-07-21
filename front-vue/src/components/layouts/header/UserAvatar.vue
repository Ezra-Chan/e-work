<template>
  <div class="user-avatar">
    <el-dropdown trigger="click">
      <div
        class="current-user flex items-center border-rd-8 cursor-pointer gap-6 pr-6"
      >
        <el-avatar
          :size="40"
          :src="userInfo?.avatar || user"
          class="border-rd-8"
        />
        <el-text class="text-light w-fit !max-w-32 !fs-1.6" truncated>{{
          userInfo?.realName || '未登录'
        }}</el-text>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import user from '@/assets/images/public/user.png';
import { GlobalStore } from '@/store';
import { logoutApi } from '@/api/modules/login';

const router = useRouter();
const globalStore = GlobalStore();
const userInfo = computed(() => globalStore.userInfo);

const logout = async () => {
  await logoutApi();
  router.push('/login');
  ElMessage.success('退出成功！');
};
</script>

<style lang="less" scoped>
.user-avatar {
  .current-user {
    background-color: var(--ework-bg-secondary-color);

    &:hover {
      .text-light {
        color: var(--ework-text-color-hover) !important;
      }
    }
  }
}
</style>
