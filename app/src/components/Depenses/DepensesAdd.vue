<template>
  <div class="depenses-add">
    <div class="depenses-add__item">
      <ka-input v-model.trim="form.name" />
    </div>
    <div class="depenses-add__item">
      <ka-input type="number" v-model="form.amount" />
    </div>
    <div class="depenses-add__item">
      <ka-select :options="categories" v-model="form.category" label="name" />
    </div>
    <div class="depenses-add__item">
      <ka-select :options="currencies" v-model="form.currency" label="abbreviation" />
    </div>
    <div class="depenses-add__item">
      <input class="depenses-add__datetime" type="datetime-local" min="2021-10-01T00:00" :max="`${thisYear}-12-31T00:00`" v-model="form.date" />
    </div>
    <div class="depenses-add__item">
      <ka-textarea v-model.trim="form.notes" />
    </div>
  </div>
</template>

<script>
import { CURRENCIES_QUERY } from '@/graphql/currencies';
import { CATEGORIES_QUERY } from '@/graphql/categories';
import { DEPENSES_UPDATE_MUTATION, DEPENSES_ADD_MUTATION } from '@/graphql/depenses';
import { formtDateToLocal } from '@/utils/utils'

export default {
  name: "DepensesAdd",
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
        notes: "",
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
  created () {
    if (this.$apollo.queries.currencies) {
      this.$apollo.queries.currencies.refetch()
    }
    if (this.$apollo.queries.categories) {
      this.$apollo.queries.categories.refetch()
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
        this.form.notes = this.depenseEdit.notes;
      }
    },
    async onSubmit() {
      const variables = {
        name: this.form.name && this.form.name.trim(),
        amount: +this.form.amount,
        currencyId: this.form.currency && this.form.currency.id,
        categoryId: this.form.category && this.form.category.id,
        date: this.form.date,
        notes: this.form.notes,
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
  &__datetime {
    background-color: transparent;
    background-image: none;
    appearance: none;
    font-size: 14px;
    font-family: inherit;
    display: flex;
    width: 100%;
    padding: 0 14px;
    border-radius: 0px;
    border: 1px solid var(--color-primary);
    color: #606266;
    height: 40px;
    left: 40px;
    outline: none;
    transition: border-color 0.3s;

    &:hover, &:focus {
      border-color: var(--color-primary--dark);
    }
  }
}
</style>
