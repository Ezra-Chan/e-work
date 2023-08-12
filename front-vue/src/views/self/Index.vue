<template>
  <el-row :gutter="20" class="self-info h-100%">
    <el-col :lg="6" :md="8">
      <el-card :body-style="{ 'padding-top': '4rem' }">
        <div class="flex flex-col items-center gap-8">
          <ework-avatar
            :size="180"
            :src="avatar"
            class="cursor-pointer hover:scale-110 transition-all-300"
            title="点击修改头像"
          />
          <span class="font-500 text-8">
            {{ realName }}
          </span>
          <span class="text-6">
            {{ role?.name }}
          </span>
          <span class="text-6">
            {{ deptName }}
          </span>
          <div class="text-6 flex gap-8">
            <span>{{ sex }}</span>
            <span>{{ age }}岁</span>
          </div>
          <el-button type="primary" @click="faceDialogVisible = true">
            {{ buttonName }}
          </el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :lg="18" :md="16" class="h-100%">
      <el-card class="h-100%">
        <el-tabs v-model="activeTab" class="h-100%">
          <el-tab-pane
            v-for="tab in tabs"
            :label="tab.label"
            :name="tab.value"
            class="h-100%"
          >
            <KeepAlive>
              <component :is="tab.comp" />
            </KeepAlive>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-dialog
      v-model="faceDialogVisible"
      :title="buttonName"
      width="40rem"
      modal-class="add-face"
      destroy-on-close
      :before-close="closeFaceDialog"
    >
      <take-photo ref="camera" @open="isOpenCamera = true" />
      <template #footer>
        <div class="flex justify-center" v-if="isOpenCamera">
          <el-button type="primary" @click="closeCamera">关闭摄像头</el-button>
          <el-button type="primary" @click="shoot">拍摄</el-button>
          <el-button v-if="!!base" type="primary" @click="uploadFace">
            上传
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-row>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store';
import { getUserInfo, getUserFaces, createFace } from 'api/modules/user';
import { getAgeByIdCard } from 'utils/timeFunc';
import SelfInfo from './SelfInfo.vue';
import TakePhoto from '@/components/TakePhoto.vue';

defineOptions({
  name: 'Self',
});

const globalStore = GlobalStore();
const { id, realName, role, avatar, deptName, sex, idCard } = $(
  globalStore.userInfo
);
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
let userFaces = $ref([]);
let faceDialogVisible = $ref(false);
let isOpenCamera = $ref(false);
let base = $ref<string | undefined>();
const camera = $ref<InstanceType<typeof TakePhoto> | null>(null);
const age = computed(() => getAgeByIdCard(idCard));
const buttonName = computed(() => (userFaces.length ? '添加人脸' : '注册人脸'));

onMounted(() => {
  getUserInfoApi();
  getUserFacesApi();
});

const getUserInfoApi = async () => {
  const { data } = await getUserInfo(id);
  globalStore.setGlobalState({ userInfo: data });
};

const closeCamera = () => {
  camera?.stop();
  isOpenCamera = false;
};

const closeFaceDialog = () => {
  isOpenCamera = false;
  faceDialogVisible = false;
};

const shoot = () => {
  base = camera?.getBase();
};

const getUserFacesApi = async () => {
  try {
    const { data } = await getUserFaces();
    userFaces = data;
  } catch (error) {
    console.error(error);
  }
};
const uploadFace = () => {
  console.log(base);
};
</script>

<style lang="less" scoped>
.self-info {
  :deep(.el-card__body) {
    height: 100%;
    padding-right: 0;

    .el-tabs__content {
      height: calc(100% - var(--el-tabs-header-height) - 15px);
    }
  }
  :deep(.add-face) {
    .el-dialog__footer {
      padding-top: 0;
      height: 52px;
    }
  }
}
</style>
