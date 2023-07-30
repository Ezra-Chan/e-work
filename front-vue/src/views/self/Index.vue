<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card>
        <div slot="header" class="w-100">
          <span>个人信息</span>
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

const globalStore = GlobalStore();

const { realName, avatar, role } = $(globalStore.userInfo);

const router = useRouter();
</script>

<style lang="less" scoped></style>
