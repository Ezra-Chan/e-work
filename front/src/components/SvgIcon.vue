<template>
  <i :title="tip" class="svg-icon">
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
    default: 'var(--ework-text-color)',
  },
  hoverColor: {
    type: String,
    default: 'var(--ework-text-color-hover)',
  },
  needHover: {
    type: Boolean,
    default: true,
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
.svg-icon {
  display: inline-flex;
  .icon {
    width: v-bind('props.size');
    height: v-bind('props.size');
    font-size: v-bind('props.size');
    position: relative;
    vertical-align: -2px;
    cursor: v-bind("props.pointer ? 'pointer' : 'inherit'");
    color: v-bind('props.color');
    &:hover {
      color: v-bind('props.needHover ? props.hoverColor : props.color');
    }
  }
}
</style>
