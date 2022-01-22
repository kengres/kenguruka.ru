<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="modal__inner">
        <div class="modal__header">
          <slot name="header"></slot>
          <div class="modal__close">
            <ka-button size="xs" icon circle raised type="primary" @click="$emit('close')">
              <ka-icon name="close" :size="18" />
            </ka-button>
          </div>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
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
.modal {
  --padding-size: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;

  &__inner {
    background-color: #fff;
    max-width: 600px;
    width: 99%;
    margin: 0 auto;
    margin-top: 5vh;
    border-radius: 6px;
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  &__header {
    padding: 1.25rem var(--padding-size);
  }
  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &__footer,
  &__body {
    padding: 16px var(--padding-size);
  }
  &__footer {
    border-top: 1px solid #f3f7a2;
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
