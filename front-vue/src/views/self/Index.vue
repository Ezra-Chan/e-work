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
          <span
            class="font-500 text-8 truncate w-100% text-center"
            :title="realName"
          >
            {{ realName }}
          </span>
          <span class="text-6" title="职位">
            {{ position?.name || '-' }}
          </span>
          <span class="text-6" title="部门">
            {{ deptName }}
          </span>
          <div class="text-6 flex gap-8">
            <span title="性别">{{ sex }}</span>
            <span title="年龄">{{ age }}岁</span>
          </div>
          <el-text
            class="text-6 w-100% flex! flex-wrap items-center justify-center gap-2"
            title="个性签名"
            v-if="!isInput"
          >
            {{ signature || '编辑签名' }}
            <el-icon class="cursor-pointer" @click="switchInput" title="编辑">
              <EditPen />
            </el-icon>
          </el-text>
          <el-input
            v-else
            class="w-100%"
            type="textarea"
            ref="signatureRef"
            v-model="newSignature"
            :rows="3"
            :max="150"
            @blur="changeSignature"
            show-word-limit
          />
          <el-button type="primary" @click="faceDialogVisible = true">
            {{ buttonName }}
          </el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :lg="18" :md="16" class="h-100%">
      <el-card class="h-100%" :body-style="{ 'padding-right': 0 }">
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
  </el-row>
  <upload-face
    :visible="faceDialogVisible"
    :title="buttonName"
    @upload="onUpload"
    @close="onClose"
  />
</template>

<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import { ElInput } from 'element-plus';
import { GlobalStore } from '@/store';
import { getUserInfo, getUserFaces, updateUser } from 'api/modules/user';
import { getAgeByIdCard } from 'utils/timeFunc';
import { useCompRef } from 'utils/useCompRef';
import ChangePwd from './ChangePwd.vue';
import SelfInfo from './SelfInfo.vue';
// import SelfInfo from './Self.vue';

defineOptions({
  name: 'Self',
});

const globalStore = GlobalStore();
const { id, realName, avatar, deptName, sex, idCard, position, signature } = $(
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
    comp: ChangePwd,
  },
]);
let activeTab = $ref(tabs[0].value);
let userFaces = $ref<(string | IFaceInfo)[]>([]);
let faceDialogVisible = $ref(false);
let isInput = $ref(false);
let newSignature = $ref(signature);
const signatureRef = $(useCompRef(ElInput));
const age = computed(() => getAgeByIdCard(idCard));
const buttonName = computed(() => (userFaces.length ? '添加人脸' : '注册人脸'));

onMounted(() => {
  getUserFacesApi();
});

const getUserInfoApi = async () => {
  const { data } = await getUserInfo(id);
  globalStore.setGlobalState({ userInfo: data });
};

const getUserFacesApi = async () => {
  try {
    const { data } = await getUserFaces();
    userFaces = data?.face_list;
  } catch (error) {
    console.error(error);
  }
};

const switchInput = () => {
  isInput = !isInput;
};

const changeSignature = async (e: any) => {
  const val = e.target?.value;
  if (val !== signature && (val || signature)) {
    const { success, message } = await updateUser(id, { signature: val });
    if (!success) {
      ElMessage.error(message);
      newSignature = signature;
      return;
    }
    getUserInfoApi();
  }
  switchInput();
};

const onUpload = (data: IFaceInfo) => {
  userFaces.push(data.face_token);
  ElMessage.success(buttonName.value + '成功');
};

const onClose = () => {
  faceDialogVisible = false;
};

watchEffect(() => {
  if (isInput) {
    signatureRef?.focus();
  }
});
</script>

<style lang="less" scoped>
.self-info {
  :deep(.el-card__body) {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - var(--el-tabs-header-height) - 15px);
    }
  }
}
</style>
