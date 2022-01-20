<template>
  <div>
    <h1>currencies</h1>
    <ka-app-loader v-if="isLoading" />
    <div>
      <div v-for="curr in currencies" :key="curr.id">{{ curr.name }}</div>
    </div>
    <div>
      <button type="primary">button</button>
    </div>
  </div>
</template>

<script>
import { CURRENCIES_QUERY } from '@/graphql/currencies';
export default {
  name: "Currencies",
  metaInfo: {
    title: 'Currencies',
  },
  data () {
    return {
      currencies: []
    }
  },
  apollo: {
    currencies: CURRENCIES_QUERY
  },
  computed: {
    isLoading () {
      return this.currencies.length === 0 && this.$apollo.loading
    },
  },
}
</script>