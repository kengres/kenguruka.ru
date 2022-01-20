<template>
  <div :class="textareaClasses">
    <span
      v-if="suffixIcon"
      class="ka-textarea__icon ka-textarea__suffix"
      :class="suffixClass"
      @click="$emit('click:suffix')"
    >
      <ka-icon :name="suffixIcon" :size="iconSize" />
    </span>
    <span
      v-if="prefixIcon"
      class="ka-textarea__icon ka-textarea__prefix"
      :class="prefixClass"
      @click="$emit('click:prefix')"
    >
      <ka-icon :name="prefixIcon" :size="iconSize" />
    </span>
    <textarea
      class="textarea"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners"
    />
  </div>
</template>

<script>
export default {
  name: 'YottaTextarea',
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
    inputClass: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    suffixColor: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    prefixColor: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: 18,
    },
  },
  computed: {
    inputListeners: function () {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          const val = event.target.value
          vm.$emit('input', val)
          vm.$emit('change', val)
        },
        change: function (event) {
          const val = event.target.value
          vm.$emit('input', val)
          vm.$emit('change', val)
        },
      })
    },
    suffixClass() {
      let classes = []
      if (this.suffixColor) {
        classes.push(`is-${this.suffixColor}--text`)
      }
      return classes.join(' ')
    },
    prefixClass() {
      let classes = []
      if (this.prefixColor) {
        classes.push(`is-${this.prefixColor}--text`)
      }
      return classes.join(' ')
    },
    textareaClasses() {
      const classes = ['ka-textarea']
      if (this.disabled) {
        classes.push('is-disabled')
      }
      if (this.suffixIcon) {
        classes.push('is-suffixed')
      }
      if (this.prefixIcon) {
        classes.push('is-prefixed')
      }
      return classes.join(' ')
    },
  },
  mounted() {
    if (this.iconSize !== 18) {
      const input = this.$refs.input
      if (input) {
        input.style.setProperty('--icon-size', `${this.iconSize}px`)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.ka-textarea {
  position: relative;
  min-height: 40px;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  --icon-size: 18px;
  --padding-top-v: 10px;

  &.is-disabled {
    .textarea {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  &.is-suffixed {
    .textarea {
      padding-right: calc(var(--icon-size) * 2);
    }
  }
  &.is-prefixed {
    .textarea {
      padding-left: calc(var(--icon-size) * 2);
    }
  }
  &__icon {
    cursor: pointer;
    position: absolute;
    z-index: 3;
    width: var(--icon-size);
    height: var(--icon-size);
    top: var(--padding-top-v);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.8;
    }
  }
  &__suffix {
    right: calc(var(--icon-size) * 0.45);
    left: auto;
  }
  &__prefix {
    left: calc(var(--icon-size) * 0.45);
    right: auto;
  }
}
.textarea {
  background-color: inherit;
  background-image: none;
  border-radius: 0px;
  border: 1px solid var(--color-primary);
  color: #606266;
  display: block;
  resize: vertical;
  overflow: auto;
  font-size: inherit;
  font-family: inherit;
  line-height: 1.5;
  outline: none;
  padding: var(--padding-top-v) 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  &:focus {
    border: 1px solid var(--color-primary--dark);
  }
}
</style>
