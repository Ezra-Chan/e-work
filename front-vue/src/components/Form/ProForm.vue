<template>
  <el-form v-bind="form" :model="modelValue" ref="formRef">
    <el-collapse v-if="form.group" v-model="activeNames">
      <el-collapse-item
        v-for="group in (columns as IGroup[])"
        :key="group.title"
        :title="group.title"
        :name="group.title"
      >
        <template v-for="item in group.children" :key="item.prop">
          <el-form-item v-bind="item.formItem">
            <component
              :is="item.component"
              v-bind="item.attrs"
              v-model="modelValue[item.formItem.prop]"
            />
          </el-form-item>
        </template>
      </el-collapse-item>
    </el-collapse>
    <template v-else v-for="item in (columns as IColumn[])" :key="item.prop">
      <el-form-item v-bind="item.formItem">
        <component
          :is="item.component"
          v-bind="item.attrs"
          v-model="modelValue[item.formItem.prop]"
        />
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="operation"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormItemInstance } from 'element-plus';

interface IColumn {
  formItem: Partial<FormItemInstance> & { prop: string };
  attrs: any;
  component: any;
}
interface IGroup {
  title: string;
  children: IColumn[];
}

interface Props {
  form: Partial<
    FormInstance & {
      group: boolean;
      defaultExpandAll: boolean;
      expandItem: string[];
    }
  >;
  columns: IGroup[] | IColumn[];
  modelValue: Recordable;
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({}),
  columns: () => [],
  modelValue: () => ({}),
});

const formRef = $ref<FormInstance>();
let activeNames = $ref<string[]>([]);

onMounted(() => {
  const { form } = props;
  if (form.group) {
    if (form.defaultExpandAll) {
      activeNames = (props.columns as IGroup[]).map(i => i.title);
    } else if (form.expandItem) {
      activeNames = form.expandItem;
    }
  }
});
</script>

<style lang="less" scoped></style>
