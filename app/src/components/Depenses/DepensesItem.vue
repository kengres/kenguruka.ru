<template>
  <div class="depense-item">
    <button class="depense-item__delete" @click="$props.delete">X</button>
    <div class="depense-item__title">{{ $props.title }}</div>
    <div class="depense-item__date">{{ $props.date }}</div>
    <div class="depense-item__price">
      <span class="depense-item__amount">{{ $props.amount }}</span>
      <span class="depense-item__currency" v-show="$props.currency">{{
        $props.currency
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepensesItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    currency: {
      type: String,
      default: ""
    },
    amount: {
      type: [Number, String],
      default: 0
    },
    delete: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.depense-item {
  background-color: rgba(185, 221, 236, 0.748);
  width: 100%;
  border-radius: 6px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  position: relative;
  box-sizing: border-box;

  &__delete {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
