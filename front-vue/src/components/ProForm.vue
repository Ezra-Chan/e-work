<template>
  <component :is="'el-form'" v-bind="form" ref="proFormRef" :model="model">
    <template v-for="item in columns" :key="item.prop">
      <component :is="'el-form-item'" v-bind="item.formItem">
        <component
          :is="`el-${item.attrs.typeName}`"
          v-bind="item.attrs"
          v-model="model[item.formItem.prop]"
        />
      </component>
    </template>
    <el-form-item>
      <slot name="operation"></slot>
    </el-form-item>
  </component>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem } from 'element-plus';

interface IColumn {
  formItem: InstanceType<typeof ElFormItem>;
  attrs: any & { typeName: string };
}

interface Props {
  form: InstanceType<typeof ElForm>;
  columns: InstanceType<typeof ElFormItem>[];
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({} as InstanceType<typeof ElForm>),
  columns: () => [],
});
</script>

<style lang="less" scoped></style>
