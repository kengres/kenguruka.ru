<template functional>
  <div class="ka-empty">
    {{ props.title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No available data!'
    }
  }
}
</script>
<style lang="scss" scoped>
.ka-empty {
  padding: 20px 32px;
  color: var(--color-warning);
  background-color: #f0f0f0;
  margin: 32px 16px;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    background-color: currentColor;
    opacity: 0.091;
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
  }
}
</style>