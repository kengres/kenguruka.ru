<template>
  <div class="currencies">
    <h1 class="currencies__title">currencies</h1>
    <ka-app-loader v-if="isLoading" />
    <ul class="currencies__list">
      <li class="currencies__item" v-for="curr in currencies" :key="curr.id" @click="onUpdateStart(curr)">
        <currencies-item v-bind="curr" />
      </li>
    </ul>
    <div class="currencies__add" v-show="!modalVisible">
      <add-button @click="modalVisible = true" />
    </div>

    <ka-modal :visible="modalVisible" @close="onModalClose">
      <div class="currencies__form-item">
        <ka-input placeholder="ex. Franc Burundais" v-model="form.name" />
      </div>
      <div class="currencies__form-item">
        <ka-input v-model="form.abbreviation" placeholder="ex Fbu..." />
      </div>
      <template v-slot:footer>
        <div class="currencies__footer">
          <ka-button type="success" @click="onSubmit">Submit</ka-button>
          <ka-button type="danger" @click="onDelete" v-if="isEditMode">Delete</ka-button>
        </div>
      </template>
    </ka-modal>
  </div>
</template>

<script>
import { CURRENCIES_QUERY, CURRENCIES_UPDATE_MUTATION, CURRENCIES_CREATE_MUTATION, CURRENCIES_DELETE_MUTATION } from '@/graphql/currencies';
import CurrenciesItem from '@/components/Currencies/CurrenciesItem.vue';
export default {
  name: "Currencies",
  metaInfo: {
    title: 'Currencies',
  },
  components: { CurrenciesItem },
  data () {
    return {
      currencies: [],
      modalVisible: false,
      form: {
        name: "",
        abbreviation: ""
      },
      currencyEdit: null,
    }
  },
  apollo: {
    currencies: CURRENCIES_QUERY
  },
  computed: {
    isLoading () {
      return this.currencies.length === 0 && this.$apollo.loading
    },
    isEditMode () {
      return !!this.currencyEdit && !!this.currencyEdit.id
    },
  },
  methods: {
    async onSubmit () {
      const variables = {
        id: "",
        name: this.form.name,
        abbreviation: this.form.abbreviation,
      };
      console.log('variables', variables);
      
      if (this.isEditMode) {
        variables.id = this.currencyEdit.id;
      }
      try {
        await this.$apollo.mutate({
          mutation: this.isEditMode ?  CURRENCIES_UPDATE_MUTATION : CURRENCIES_CREATE_MUTATION,
          variables
        })
        this.modalVisible = false
        this.resetForm()
        this.currencyEdit = null
        this.refetch()
      } catch (error) {
        // eslint-disable-next-line
        console.log(`error add: `, error);
      }
    },
    onUpdateStart (currency) {
      this.currencyEdit = currency
      this.form.name = currency.name
      this.form.abbreviation = currency.abbreviation
      this.modalVisible = true
    },
    async onDelete () {
      if (!this.isEditMode) return
      const variables = {
        id: this.currencyEdit.id,
      };
      try {
        await this.$apollo.mutate({
          mutation: CURRENCIES_DELETE_MUTATION,
          variables
        })
        this.modalVisible = false
        this.resetForm()
        this.currencyEdit = null
        this.refetch()
      } catch (error) {
        // eslint-disable-next-line
        console.log(`error add: `, error);
      }
    },
    resetForm () {
      this.currencyEdit = null
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          this.form[key] = ""
        }
      }
    },
    refetch() {
      this.$apollo.queries.currencies && this.$apollo.queries.currencies.refetch()
    },
    onModalClose() {
      this.modalVisible = false;
      this.resetForm()
    },
  },
}
</script>

<style lang="scss" scoped>
.currencies {
  &__title {
    text-align: center;
    padding: 10px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
  &__list {
    list-style: none;
    padding: 0;
  }
  &__item {
    display: flex;
    align-items: center;
    background-color: #F7F7F7;

    &:nth-of-type(even) {
      background-color: transparent;
    }
  }
  &__add {
    position: fixed;
    bottom: 40px;
    right: 20px;
    font-size: 36px;
    z-index: 100;
  }
  &__form-item {
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &__footer {
    display: flex;
    column-gap: 20px;
  }
}
</style>