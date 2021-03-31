<template>
  <input
    type="text"
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>
