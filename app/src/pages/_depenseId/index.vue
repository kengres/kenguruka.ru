<template>
  <div class="dep-id">
    <div class="dep-id__heading">
      <button class="dep-id__back" @click="$router.back()">&larr;</button>
      <div class="dep-id__title">Détails de la dépense</div>
    </div>
    <div class="dep-id__content" v-if="depense">
      <div class="dep-id__name">{{ depense.name }}</div>
      <div class="dep-id__item">
        <div class="dep-id__label">prix</div>
        <div class="dep-id__detail is-price">{{ depense.amount | amountFilter }} <span class="dep-id__curr" v-if="depense.currency">{{ depense.currency.abbreviation }}</span></div>
      </div>
      <div class="dep-id__item" v-if="depense.category">
        <div class="dep-id__label">category</div>
        <div class="dep-id__detail is-category">{{ depense.category.name }}</div>
      </div>
      <div class="dep-id__item">
        <div class="dep-id__label">date</div>
        <div class="dep-id__detail">{{ depense.createdAt | dateFilter }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { SINGLE_DEPENSE_QUERY } from '@/graphql/depenses'
import { moneyFilter, dateTimeFilter } from '@/utils/filters'

export default {
  name: 'DepenseDetails',
  metaInfo: {
    title: 'Details Depense',
  },
  filters: {
    amountFilter (val) {
      return moneyFilter(val)
    },
    dateFilter (val) {
      return dateTimeFilter(val)
    },
  },
  data () {
    return {
      depense: null
    }
  },
  apollo: {
    depense: {
      query: SINGLE_DEPENSE_QUERY,
      variables () {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dep-id {
  background-color: #DBFFEA;
  min-height: 100vh;
  &__heading {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    font-size: 18px;
  }
  &__back {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    outline: none;
    position: relative;
    user-select: none;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    transition: 0.3s;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 6px;
    font-weight: 500;
    font-size: 18px;
    color: #000;
    background-color: transparent;
    width: 48px;
    height: 48px;
    justify-content: center;
    border-radius: 50%;
  }
  &__content {
    padding-left: 24px;
  }
  &__name {
    margin-bottom: 48px;
    font-size: 24px;
    text-transform: capitalize;
  }
  &__item {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &__label {
    color: #8c8c8c;
    font-size: 14px;
  }
  &__detail {
    font-size: 24px;

    &.is-price {
      font-size: 48px;
    }
    &.is-category {
      font-size: 36px;
      color: #08BE51;
      text-transform: capitalize;
    }
  }
  &__curr {
    font-size: 18px;
  }
}
</style>