<template>
  <div>
    <h1>currencies</h1>
    <c-box bg="purple" p="4" color="white">
      <div v-for="curr in currencies" :key="curr.id">{{ curr.name }}</div>
    </c-box>
    <div>
      <c-button type="primary">button</c-button>
    </div>
  </div>
</template>

<script>
import { CURRENCIES_QUERY } from '@/graphql/queries';
import { CBox, CButton } from '@chakra-ui/vue'
export default {
  name: "Currencies",
  components: {
    CBox,
    CButton
  },
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