<template>
  <select
    class="select"
    placeholder="currency"
    aria-placeholder="currency"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
    <option value=""></option>
    <template v-for="(item, i) in options">
      <option :key="i" :value="item.id">{{ item.abbreviation }}</option>
    </template>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    handleChange (ev) {
      console.log(`on change: `, ev)
    }
  },
}
</script>

<style lang="scss">
.select {
  width: 100%;
  min-height: 30px;
}
</style>