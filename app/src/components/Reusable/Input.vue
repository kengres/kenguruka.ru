<template>
  <div :class="['ytt-input', { 'is-disabled': disabled, 'is-passport': passport, 'is-noedit': noEdit }]">
    <input
      v-bind="$attrs"
      class="input"
      :value="value"
      @input="handleInput"
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
    noEdit: {
      type: Boolean,
      default: false,
    },
    passport: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput (event) {
      // console.log(`$attrs`, this.$attrs)
      const isTypeNumber = !!this.$attrs && !!this.$attrs.type && this.$attrs.type === 'number'
      const val = event.target.value
      this.$emit('input', isTypeNumber ? `${+val}` : val)
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
  &.is-passport {
    .input {
      background-color: #fff;
      border-color: #fff;
      color: #08BE51;
      border-radius: 0;

      &::placeholder {
        color: inherit;
      }
    }
  }
  &.is-noedit {
    .input {
      // background-color: #fff;
      // border-color: #fff;
      // color: #08BE51;
      // border-radius: 0;
      cursor: not-allowed;
      user-select: none;
      pointer-events: none;

      &::placeholder {
        color: inherit;
      }
    }
  }
}
.input {
  -webkit-appearance: none;
  background-color: inherit;
  background-image: none;
  // border-radius: 4px;
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