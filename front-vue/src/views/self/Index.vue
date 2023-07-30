<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card :body-style="{ 'padding-top': '4rem' }">
        <div class="flex flex-col items-center gap-8">
          <ework-avatar
            :size="200"
            :src="userInfo?.avatar || avatar"
            class="cursor-pointer"
            title="点击修改头像"
          />
          <span class="font-500 text-8">
            {{ userInfo?.realName || realName }}
          </span>
          <span class="text-4">
            {{ userInfo?.role?.name || role?.name }}
          </span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <div slot="header" class="w-100">
          <span>修改密码</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="Self">
import { GlobalStore } from '@/store';
import { getUserInfo } from 'api/modules/user';

const globalStore = GlobalStore();
const router = useRouter();

const { id, realName, role, avatar } = $(globalStore.userInfo);
let userInfo = $ref<IUserInfo>();

onMounted(async () => {
  const { data } = await getUserInfo(id);
  userInfo = data;
  console.log('userInfo', userInfo);
});
</script>

<style lang="less" scoped></style>
