<template>
  <vue-select
    class="yotta-select"
    :options="options"
    :label="label"
    :value="value"
    :aria-placeholder="placeholder"
    :placeholder="placeholder"
    @input="onSelect"
    :disabled="disabled"
    :components="selectComps"
  />
</template>

<script>
import VueSelect from 'vue-select'
import SelectClear from "@/components/Select/SelectClear"
import SelectIndicator from "@/components/Select/SelectIndicator"

export default {
  name: "KaSelect",
  components: {
    VueSelect,
  },
  props: {
    value: {
      type: [Number, String, Object],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Choisir..."
    },
    disabled: {
      type: Boolean,
      default: false
    },
    canClear: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      Deselect: SelectClear,
      OpenIndicator: SelectIndicator,
    }
  },
  computed: {
    selectComps () {
      const obj = {
        Deselect: null,
        OpenIndicator: SelectIndicator,
      }
      if (this.canClear) {
        obj.Deselect = SelectClear
      }
      return obj
    },
  },
  methods: {
    onSelect (value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
//  Global Component Variables
$vs-component-line-height: 30px !default;
$vs-component-placeholder-color: var(--color-text--light) !default;

//  Active State
$vs-state-active-bg: var(--color-primary) !default;
$vs-state-active-color: #fff !default;

//  Disabled State
$vs-state-disabled-bg: var(--color-disabled) !default;
$vs-state-disabled-color: var(--color-disabled--dark) !default;
$vs-state-disabled-controls-color: var(--color-disabled--dark) !default;
$vs-state-disabled-cursor: not-allowed !default;

//  Borders
$vs-border-width: 1px !default;
$vs-border-style: solid !default;
$vs-border-radius: 0px !default;
$vs-border-color: var(--color-primary) !default;

//  Component Controls: Clear, Open Indicator
$vs-controls-color: var(--color-primary) !default;
$vs-controls-size: 1 !default;
$vs-controls-deselect-text-shadow: 0 1px 0 #fff;

//  Selected
$vs-selected-bg: #f0f0f0 !default;
$vs-selected-border-color: $vs-border-color !default;
$vs-selected-border-style: $vs-border-style !default;
$vs-selected-border-width: $vs-border-width !default;

//  Dropdown
$vs-dropdown-z-index: 1000 !default;
$vs-dropdown-min-width: 160px !default;
$vs-dropdown-max-height: 350px !default;
$vs-dropdown-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1) !default;
$vs-dropdown-bg: #fff !default;

@import "vue-select/src/scss/vue-select.scss";

.yotta-select {
  font-size: 14px;
}
</style>