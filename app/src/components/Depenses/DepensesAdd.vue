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
    <div class="depenses-add__item">
      <input type="datetime-local" min="2021-10-01T00:00" :max="`${thisYear}-12-31T00:00`" v-model="form.date" />
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/Reusable/Input";
import MySelect from "@/components/Reusable/Select";
import { CURRENCIES_QUERY } from '@/graphql/currencies';
import { CATEGORIES_QUERY } from '@/graphql/categories';
import { DEPENSES_UPDATE_MUTATION, DEPENSES_ADD_MUTATION } from '@/graphql/depenses';
import { formtDateToLocal } from '@/utils/utils'

export default {
  name: "DepensesAdd",
  components: {
    MyInput,
    MySelect,
  },
  props: {
    depenseEdit: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      form: {
        name: "",
        amount: 0,
        currency: "",
        category: "",
        date: formtDateToLocal(new Date()),
      },
      currencies: [],
      categories: [],
      thisYear: new Date().getFullYear()
    };
  },
  apollo: {
    currencies: {
      query: CURRENCIES_QUERY,
      update (data) {
        if (data.currencies) {
          this.form.currency = data.currencies[0]
        }
        return data.currencies
      }
    },
    categories: CATEGORIES_QUERY,
  },
  computed: {
    isEditMode () {
      return !!this.depenseEdit && !!this.depenseEdit.id
    }
  },
  watch: {
    isEditMode: {
      handler: 'updateForm',
      immediate: true,
    }
  },
  methods: {
    updateForm (isEdit) {
      console.log(`isEditMode watch: `, isEdit)
      if (isEdit) {
        this.form.name = this.depenseEdit.name;
        this.form.amount = this.depenseEdit.amount;
        this.form.currency = this.depenseEdit.currency;
        this.form.category = this.depenseEdit.category;
        this.form.date = formtDateToLocal(this.depenseEdit.date);
      }
    },
    async onSubmit() {
      const variables = {
        name: this.form.name,
        amount: +this.form.amount,
        currencyId: this.form.currency && this.form.currency.id,
        categoryId: this.form.category && this.form.category.id,
        date: this.form.date,
      };
      if (this.isEditMode) {
        variables.id = this.depenseEdit.id;
      }
      console.log(`newItem: `, variables);
      try {
        await this.$apollo.mutate({
          mutation: this.isEditMode ? DEPENSES_UPDATE_MUTATION : DEPENSES_ADD_MUTATION,
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
