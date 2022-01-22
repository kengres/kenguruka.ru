<template>
  <transition name="fadeIn">
    <div v-if="visible" :class="getThemClasses">
      <div class="ka-alert__content">
        <slot></slot>
      </div>
      <div
        v-if="canClose"
        class="ka-alert__icon is-close"
        @click="handleClose"
      >
        <ka-icon name="close" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'KaAlert',
  props: {
    type: {
      type: String,
      default: '',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    canClose: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: this.value,
    }
  },
  computed: {
    getThemClasses() {
      const classes = ['ka-alert']
      if (this.raised) classes.push('is-raised')
      if (this.outlined) classes.push('is-outlined')
      if (this.flat) classes.push('is-flat')
      if (this.border) classes.push('is-border')
      if (this.type) classes.push(`is-${this.type}`)
      return classes.join(' ')
    },
  },
  methods: {
    handleClose() {
      const newVal = !this.visible
      this.visible = newVal
      this.$emit('input', newVal)
    },
  },
}
</script>

<style lang="scss" scoped>
.ka-alert {
  position: relative;
  background: var(--color-default);
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  color: #fff;
  transition: all 0.4s ease-in-out;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    pointer-events: none;
    border-radius: inherit;
    background-color: transparent;
  }

  &.is-raised {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1), 0px 8px 24px rgba(0, 0, 0, 0.16);
  }
  &.is-primary {
    background: var(--color-primary);
  }
  &.is-success {
    background: var(--color-success);
  }
  &.is-info {
    background: var(--color-info);
  }
  &.is-warning {
    background: var(--color-warning);
  }
  &.is-danger {
    background: var(--color-danger);
  }
  &.is-outlined {
    border: thin solid;
  }
  &.is-outlined,
  &.is-border {
    background-color: transparent;
    &::before {
      background-color: currentColor;
      opacity: 0.1;
    }
    &.is-primary {
      color: var(--color-primary);
    }
    &.is-success {
      color: var(--color-success);
    }
    &.is-info {
      color: var(--color-info);
    }
    &.is-warning {
      color: var(--color-warning);
    }
    &.is-danger {
      color: var(--color-danger);
    }
  }
  &.is-flat {
    border-radius: 0;
  }
  &.is-border {
    border-left: 5px solid currentColor;
  }

  &:hover {
    opacity: 0.75;
  }
  &__content {
    flex-grow: 1;
    margin-right: 1.5rem;
  }
  &__icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-close {
      margin-right: 0;
      margin-left: auto;
      cursor: pointer;
    }
  }
}
</style>
