<template functional>
  <div class="depense-item">
    <div class="depense-item__heading">
      <div class="depense-item__title">{{ $options.capitalizeFirstLetter(props.title) }}</div>
      <div class="depense-item__amount">{{ props.amount }}</div>
    </div>
    <div class="depense-item__footer">
      <div class="depense-item__date">{{ props.date }}</div>
      <div class="depense-item__category" v-if="props.categoryName" @click.stop="props.onCategory">{{ props.categoryName }}</div>
    </div>
    <div class="depense-item__price">
      <span class="depense-item__currency" v-show="props.currency">{{
        props.currency
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
    categoryName: {
      type: String,
      default: ""
    },
    onCategory: {
      type: Function,
      default: () => {}
    },
    amount: {
      type: [Number, String],
      default: 0
    }
  },
  capitalizeFirstLetter (val) {
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
  }
};
</script>

<style lang="scss">
.depense-item {
  width: 100%;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
  &__heading {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    align-items: flex-start;
    padding: 8px 12px;
    font-weight: 300;
  }
  &__title {
    font-weight: 700;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: flex-start;
    padding: 2px 12px;
    color: #BEBEBE;
  }
  &__category {
    color: #FFA631;
    text-transform: capitalize;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #a5640e;
    }
  }
}
</style>
