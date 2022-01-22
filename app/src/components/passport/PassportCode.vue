<template>
  <div class="pass-code">
    <yotta-input
      ref="code0"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(0)"
      placeholder="0"
      :disabled="disabled"
      @paste.prevent="handlePaste"
      @change="handleCodeChange($event, 0)"
    />
    <yotta-input
      ref="code1"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(1)"
      placeholder="0"
      :disabled="disabled"
      @change="handleCodeChange($event, 1)"
    />
    <yotta-input
      ref="code2"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(2)"
      placeholder="0"
      :disabled="disabled"
      @change="handleCodeChange($event, 2)"
    />
    <div class="pass-code__divider is-primary--bg" />
    <yotta-input
      ref="code3"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(3)"
      placeholder="0"
      :disabled="disabled"
      @change="handleCodeChange($event, 3)"
    />
    <yotta-input
      ref="code4"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(4)"
      placeholder="0"
      :disabled="disabled"
      @change="handleCodeChange($event, 4)"
    />
    <yotta-input
      ref="code5"
      passport
      code
      class="pass-code__item"
      input-class="pass-code__input"
      :value="getCodeValue(5)"
      placeholder="0"
      :disabled="disabled"
      @change="handleCodeChange($event, 5)"
    />
  </div>
</template>

<script>
import YottaInput from '@/components/Reusable/Input'
export default {
  name: 'PassportCode',
  components: {
    YottaInput,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    length: {
      type: Number,
      default: 6,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getCodeValue(index) {
      return this.value[index] || ''
    },
    handlePaste(ev) {
      let pasteText = ev.clipboardData && ev.clipboardData.getData('text')
      if (pasteText) {
        if (pasteText.indexOf('-') > 0) {
          pasteText = pasteText.slice(0, 3) + pasteText.slice(4)
        }
        this.$emit('input', pasteText.toUpperCase())
        if (pasteText.length >= this.length) {
          setTimeout(() => {
            this.$emit('submit')
          }, 1000)
        }
      }
    },
    handleCodeChange(val, index) {
      let code = this.value.slice()
      code = `${code.slice(0, index)}${val}`.slice(0, this.length)
      const thisInput = this.$refs[`code${index}`]
      const nextInput = this.$refs[`code${index + 1}`]
      if (nextInput && nextInput.$el) {
        const input = nextInput.$el.querySelector('input')
        typeof input.focus === 'function' && input.focus()
      }
      this.$emit('input', code.toUpperCase())
      if (code.length >= this.length) {
        const inputLast = thisInput.$el.querySelector('input')
        typeof inputLast.blur === 'function' && inputLast.blur()
        setTimeout(() => {
          this.$emit('submit')
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pass-code {
  display: flex;
  align-items: center;
  column-gap: 8px;
  &__item {
    max-width: 45px;
  }
  &__input {
    text-align: center;
  }
  &__divider {
    flex: 0 0 10px;
    height: 3px;
    border-radius: 2px;
    margin-right: 8px;
  }
}
</style>
