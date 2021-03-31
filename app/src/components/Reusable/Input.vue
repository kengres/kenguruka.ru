<template>
  <input
    type="text"
    class="input"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>

<style lang="scss">
.input {
  min-height: 30px;
}
</style>