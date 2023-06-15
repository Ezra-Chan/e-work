<template>
  <i :title="tip">
    <svg :class="classList" aria-hidden="true">
      <use :xlink:href="iconName" rel="external nofollow" fill="currentColor" />
    </svg>
  </i>
</template>
<script setup lang="ts">
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
  },
  hoverColor: {
    type: String,
  },
  size: {
    type: String,
    default: '20px',
  },
  pointer: {
    type: Boolean,
    default: false,
  },
  tip: {
    type: String,
  },
});
const classList = computed(() => ['icon', props.className || '']);
const iconName = computed(() => `#${props.iconClass}`);
</script>
<style scoped lang="less">
.icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  font-size: v-bind('props.size');
  position: relative;
  vertical-align: -2px;
  cursor: v-bind("props.pointer ? 'pointer' : 'inherit'");
  color: v-bind('props.color');
  &:hover {
    color: v-bind('props.hoverColor ? props.hoverColor : props.color');
  }
}
</style>
