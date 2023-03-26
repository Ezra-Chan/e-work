<template>
  <svg :class="classList" aria-hidden="true">
    <use :xlink:href="iconName" rel="external nofollow" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
import { DEFAULT_PRIMARY } from '@/config/config';
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: DEFAULT_PRIMARY,
  },
  size: {
    type: String,
    default: '20px',
  },
});
const classList = computed(() => {
  return ['icon', props.className || ''];
});
const iconName = computed(() => {
  return `#${props.iconClass}`;
});
</script>
<style scoped>
.icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  position: relative;
  vertical-align: -2px;
  fill: currentColor;
}
</style>
