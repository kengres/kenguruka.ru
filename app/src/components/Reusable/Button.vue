<template>
  <button :class="['btn', type]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'YttButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  outline: none;
  position: relative;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: middle;
  transition: 0.3s;
  cursor: pointer;
  padding: 12px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-weight: 500;
  line-height: 1;
  font-size: 14px;
  line-height: 20px;
  color: #343434;
  background-color: #fff;

  &:hover {
    opacity: 0.8;
  }
  &:active,
  &.active {
    opacity: 0.5;
  }
}
.primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary--light);
  color: #fff;
}
.success {
  background-color: var(--color-success);
  border-color: var(--color-success--light);
  color: #fff;
}
.info {
  background-color: var(--color-info);
  border-color: var(--color-info--light);
  color: #fff;
}
.danger {
  background-color: var(--color-danger);
  border-color: var(--color-danger--light);
  color: #fff;
}
.text {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-primary);
}
.icon {
  margin-right: 8px;
}
</style>
