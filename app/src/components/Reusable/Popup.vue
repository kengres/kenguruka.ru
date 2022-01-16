<template>
  <transition name="fade">
    <div class="gk-popup" v-if="visible" @click="$emit('close')">
      <div class="gk-popup__inner" @click.stop>
        <div class="gk-popup__header">
          <slot name="header"></slot>
        </div>
        <div class="gk-popup__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GkPopup",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.visible) document.body.appendChild(this.$el);
  },
  unmounted() {
    if (this.$el && this.$el.parentNode)
      this.$el.parentNode.removeChild(this.$el);
  }
};
</script>

<style lang="scss">
.gk-popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  align-items: flex-end;

  &__inner {
    background-color: #fff;
    max-width: 400px;
    width: 95%;
    margin: 0 auto;
    border-radius: 14px 14px 0 0;
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.15);
    position: relative;
  }
  &__body {
    padding-top: 16px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
