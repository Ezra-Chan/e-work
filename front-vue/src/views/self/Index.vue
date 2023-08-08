<template>
  <el-row :gutter="20" class="self-info h-100%">
    <el-col :lg="6" :md="8">
      <el-card :body-style="{ 'padding-top': '4rem' }">
        <div class="flex flex-col items-center gap-8">
          <ework-avatar
            :size="180"
            :src="userInfo?.avatar || avatar"
            class="cursor-pointer"
            title="点击修改头像"
          />
          <span class="font-500 text-8">
            {{ userInfo?.realName || realName }}
          </span>
          <span class="text-6">
            {{ userInfo?.role?.name || role?.name }}
          </span>
          <span class="text-6">
            {{ userInfo?.deptName || deptName }}
          </span>
          <div class="text-6 flex gap-8">
            <span>{{ sex }}</span>
            <span>{{ age }}岁</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :lg="18" :md="16" class="h-100%">
      <el-card class="h-100%">
        <el-tabs v-model="activeTab" class="h-100%">
          <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.value">
            <component :is="tab.comp" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="Self">
import { GlobalStore } from '@/store';
import { getUserInfo } from 'api/modules/user';
import { getAgeByIdCard } from 'utils/timeFunc';
import SelfInfo from './SelfInfo.vue';

const globalStore = GlobalStore();
const router = useRouter();

const { id, realName, role, avatar, deptName, sex } = $(globalStore.userInfo);
let userInfo = $ref<IUserInfo>();
const tabs = markRaw([
  {
    label: '个人信息',
    value: 'info',
    comp: SelfInfo,
  },
  {
    label: '修改密码',
    value: 'password',
    comp: 'SelfPassword',
  },
]);
let activeTab = $ref(tabs[0].value);
const age = computed(() => getAgeByIdCard(userInfo?.idCard || ''));

onMounted(async () => {
  const { data } = await getUserInfo(id);
  userInfo = data;
});
</script>

<style lang="less" scoped>
.self-info {
  :deep(.el-card__body) {
    height: 100%;
    padding-right: 0;

    .el-tabs__header {
      padding-right: var(--el-card-padding);
    }

    .el-tabs__content {
      height: calc(100% - var(--el-tabs-header-height) - 15px);
      overflow-y: auto;
      padding-right: var(--el-card-padding);
    }
  }
}
</style>
