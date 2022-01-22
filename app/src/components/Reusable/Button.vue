<template>
  <button :class="btnClasses" :style="cptStyles" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'KaButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    bgColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    borderColor: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      },
    },
    icon: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    passport: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClasses() {
      let classes = ['kg-btn']
      classes.push(`kg-btn--${this.size}`)
      if (this.type) classes.push(`is-${this.type}`)
      if (this.icon) classes.push('is-icon')
      if (this.circle) classes.push('is-circle')
      if (this.raised) classes.push('is-raised')
      if (this.passport) classes.push('is-passport')
      return classes.join(' ')
    },
    cptStyles() {
      const obj = {}
      if (this.bgColor) obj.backgroundColor = this.bgColor
      if (this.color) obj.color = this.color
      if (this.borderColor) obj.borderColor = this.borderColor
      return obj
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>

<style lang="scss" scoped>
.kg-btn {
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
  border: 1px solid transparent;
  padding: 12px 20px;
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
  &:disabled {
    background-color: var(--color-disabled);
    border-color: var(--color-disabled);
  }
  &:disabled {
    cursor: no-drop;
    user-select: none;
  }

  &--lg {
    // padding: 12px 20px;
    padding: 15px 24px;
    // border-radius: 6px;
    border-radius: 8px;
    font-size: 16px;
    line-height: 20px;

    &.is-icon {
      padding: 15px;
    }
    &.is-circle {
      padding: 15px;
    }
  }
  &--sm {
    // padding: 12px 20px;
    padding: 9px 15px;
    // border-radius: 6px;
    border-radius: 5px;
    font-size: 13px;
    line-height: 18px;

    &.is-icon {
      padding: 9px;
    }
    &.is-circle {
      padding: 9px;
    }
  }
  &--xs {
    // padding: 12px 20px;
    // padding: 9px 15px;
    padding: 7px 13px;
    // border-radius: 6px;
    // border-radius: 5px;
    border-radius: 4px;
    // font-size: 13px;
    font-size: 12px;
    // line-height: 18px;
    line-height: 15px;

    &.is-icon {
      padding: 6px;
    }
    &.is-circle {
      padding: 6px;
    }
  }
  &__spinner {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
.active {
  opacity: 0.5;
}
.is-icon {
  padding: 11px;
}
.is-circle {
  padding: 11px;
  border-radius: 50%;
}
.is-raised {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
}
.is-primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
.is-success {
  background-color: var(--color-success);
  border-color: var(--color-success--light);
  color: #fff;
}
.is-warning {
  background-color: var(--color-warning);
  border-color: var(--color-warning--light);
  color: #fff;
}
.is-info {
  background-color: var(--color-info);
  border-color: var(--color-info--light);
  color: #fff;
}
.is-danger {
  background-color: var(--color-danger);
  border-color: var(--color-danger--light);
  color: #fff;
}
.is-admin {
  background-color: var(--color-text);
  border-color: var(--color-text);
  color: #fff;
}
.is-passport {
  border-radius: 0;
  width: 100%;
  text-align: center;
  justify-content: center;
  font-size: 16px;

  &:disabled {
    background-color: rgba(8, 190, 81, 0.449);
    border-color: var(--color-disabled);
  }
}
.is-text {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-primary);
}
.is-loading {
  transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: Loading 1s linear infinite alternate;
  user-select: none;
  pointer-events: none;

  .icon:not(.yotta-btn__spinner) {
    display: none;
  }
}
.spinner {
  margin-right: 8px;
  fill: none;
  animation: loading-rotate 2s linear infinite;
}
.spinner path {
  stroke: currentColor;
}
.loading .dl-icon:not(.spinner) {
  display: none;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(2turn);
  }
}
.icon {
  margin-right: 8px;
}
.is-icon .icon {
  margin-right: 0;
}
@keyframes Loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
