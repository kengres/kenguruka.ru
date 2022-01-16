<template>
  <div>
    <h1>currencies</h1>
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
  data () {
    return {
      currencies: []
    }
  },
  apollo: {
    currencies: CURRENCIES_QUERY
  },
}
</script>