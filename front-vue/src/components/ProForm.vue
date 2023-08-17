<template>
  <el-form v-bind="form" ref="ruleFormRef" :model="modelValue">
    <template v-for="item in columns" :key="item.prop">
      <el-form-item v-bind="item.formItem">
        <!-- <component
          :is="element[changeName(`el-${item.attrs.typeName}`)]"
          v-bind="item.attrs"
          v-model="modelValue[item.formItem.prop]"
        /> -->
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="operation"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
// import * as element from 'element-plus';
import { ElForm, ElFormItem, FormInstance } from 'element-plus';

// 将连字符转化为大驼峰
const changeName = (name: string): string => {
  const arr = name.split('-');
  return arr.reduce(
    (prev, cur) => prev + cur[0].toUpperCase() + cur.slice(1),
    ''
  );
};

interface IColumn {
  formItem: InstanceType<typeof ElFormItem> & { prop: string };
  attrs: any & { typeName: string };
}

interface Props {
  form: InstanceType<typeof ElForm>;
  columns: IColumn[];
  modelValue: object;
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({}) as InstanceType<typeof ElForm>,
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const ruleFormRef = $ref<FormInstance>();

const valueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};

// 表单重置方法
const resetForm = () => {
  ruleFormRef?.resetFields();
};

defineExpose({
  resetForm,
});
</script>

<style lang="less" scoped></style>
