<template>
  <div class="depenses-add">
    <div class="depenses-add__item">
      <my-input v-model="form.name" />
    </div>
    <div class="depenses-add__item">
      <my-input type="number" v-model="form.amount" />
    </div>
    <div class="depenses-add__item">
      <my-select :options="categories" v-model="form.category" label="name" />
    </div>
    <div class="depenses-add__item">
      <my-select :options="currencies" v-model="form.currency" label="abbreviation" />
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/Reusable/Input";
import MySelect from "@/components/Reusable/Select";
import { CURRENCIES_QUERY } from '@/graphql/queries';
import { CATEGORIES_QUERY } from '@/graphql/categories';
import { DEPENSES_ADD_MUTATION } from '@/graphql/mutations';

export default {
  name: "DepensesAdd",
  components: {
    MyInput,
    MySelect,
  },
  data() {
    return {
      form: {
        name: "",
        amount: 0,
        currency: "",
        category: "",
      },
      currencies: [],
      categories: [],
    };
  },
  apollo: {
    currencies: CURRENCIES_QUERY,
    categories: CATEGORIES_QUERY,
  },
  methods: {
    async onSubmit() {
      const variables = {
        name: this.form.name,
        currencyId: this.form.currency && this.form.currency.id,
        categoryId: this.form.category && this.form.category.id,
        amount: +this.form.amount,
      };
      console.log(`newItem: `, variables);
      try {
        await this.$apollo.mutate({
          mutation: DEPENSES_ADD_MUTATION,
          variables
        })
        this.$emit('close')
      } catch (error) {
        console.log(`error add: `, error);
      }
    }
  }
};
</script>

<style lang="scss">
.depenses-add {
  position: relative;
  &__item {
    margin-bottom: 1rem;
  }
}
</style>
