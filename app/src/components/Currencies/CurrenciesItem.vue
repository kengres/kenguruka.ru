<template functional>
  <div class="curr-item">
    <div class="curr-item__heading">
      <div class="curr-item__title">{{ $options.capitalizeFirstLetter(props.name) }}</div>
      <div class="curr-item__abbrev">{{ props.abbreviation }}</div>
    </div>
    <!-- <div class="curr-item__info">
      <div class="curr-item__item">0.003 $</div>
      <div class="curr-item__item">0.03 kes</div>
      <div class="curr-item__item">0.03 kes</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "CurrenciesItem",
  props: {
    name: {
      type: String,
      default: ""
    },
    abbreviation: {
      type: String,
      default: ''
    }
  },
  capitalizeFirstLetter (val) {
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
  }
};
</script>

<style lang="scss">
.curr-item {
  width: 100%;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  position: relative;
  box-sizing: border-box;
  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    // border-bottom: 1px solid #c1c1c1;
    // padding-bottom: .75rem;
  }
  &__title {
    // font-weight: 700;
    display: inline-flex;
  }
  &__abbrev {
    font-size: 14px;
    display: inline-flex;
  }
  &__info {
    color: var(--color-primary);
    margin-top: .75rem;
  }
  &__item {
    margin-top: 10px;
  }
}
</style>
