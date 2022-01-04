<template>
  <div :class="['ytt-input', { 'is-disabled': disabled }]">
    <input
      v-bind="$attrs"
      class="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'YttInput',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.ytt-input {
  position: relative;
  min-height: 40px;
  font-size: 14px;
  display: inline-block;
  width: 100%;

  &.is-disabled {
    .input {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.input {
  -webkit-appearance: none;
  background-color: inherit;
  background-image: none;
  border-radius: 4px;
  border: 1px solid var(--color-primary);
  color: #606266;
  display: inline-flex;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  &:focus {
    border: 1px solid var(--color-primary--dark);
  }
}
</style>