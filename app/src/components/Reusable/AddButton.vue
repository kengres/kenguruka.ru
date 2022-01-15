<template>
  <button :class="['btn', type]" @click="handleClick">
    <span class="add">+</span>
  </button>
</template>

<script>
export default {
  name: 'AddButton',
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
  --btn-size: 48px;
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
  height: var(--btn-size);
  width: var(--btn-size);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #08843A;
  border-radius: 50%;
  font-weight: 500;
  line-height: 1;
  font-size: 36px;
  color: #fff;
  background-color: #08843A;
  box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
  &:active,
  &.active {
    opacity: 0.5;
  }
}
</style>
