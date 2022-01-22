<template>
  <div
    :class="[
      'ka-switch',
      { 'is-checked': value, 'is-disabled': disabled },
      color ? `is-${color}` : '',
    ]"
    role="switch"
    @click.prevent="switchValue"
  >
    <input
      ref="input"
      type="checkbox"
      class="ka-switch__input"
      :value="value"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span v-if="label" class="ka-switch__label">{{ label }}</span>
    <span class="ka-switch__core"></span>
  </div>
</template>

<script>
export default {
  name: 'KaSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    switchValue() {
      !this.disabled && this.handleChange()
    },
    handleChange() {
      this.$emit('input', !this.value)
      this.$emit('change', !this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.ka-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 21px;
  height: 21px;
  vertical-align: middle;

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  &__label {
    margin-right: 8px;
  }

  &__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 100%;
    outline: none;
    border-radius: 10px;
    border: 1px solid var(--color-text--light);
    background: var(--color-text--light);
    cursor: pointer;
    vertical-align: middle;
    transition: border-color 0.3s, background-color 0.3s;

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }

  &.is-checked {
    .ka-switch__core {
      background-color: var(--color-primary);
      border-color: var(--color-primary);

      &::after {
        left: 100%;
        transform: translateX(-17px);
      }
    }
    &.is-success {
      .ka-switch__core {
        background-color: var(--color-success);
        border-color: var(--color-success);
      }
    }
    &.is-info {
      .ka-switch__core {
        background-color: var(--color-info);
        border-color: var(--color-info);
      }
    }
    &.is-danger {
      .ka-switch__core {
        background-color: var(--color-danger);
        border-color: var(--color-danger);
      }
    }
  }
}
</style>
