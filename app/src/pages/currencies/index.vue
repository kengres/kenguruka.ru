<template>
  <div class="currencies">
    <h1 class="currencies__title">currencies</h1>
    <ka-app-loader v-if="isLoading" />
    <ka-app-empty v-if="!isLoading && currencies.length === 0" />
    <ul class="currencies__list">
      <li class="currencies__item" v-for="curr in currencies" :key="curr.id" @click="onUpdateStart(curr)">
        <currencies-item v-bind="curr" />
      </li>
    </ul>
    <div class="currencies__add" v-show="!modalVisible">
      <ka-button @click="modalVisible = true" type="primary" icon circle>
        <ka-icon name="add_circle" />
      </ka-button>
    </div>

    <ka-modal :visible="modalVisible" @close="onModalClose">
      <div class="currencies__form-item">
        <ka-input placeholder="ex. Franc Burundais" v-model="form.name" />
      </div>
      <div class="currencies__form-item">
        <ka-input v-model="form.abbreviation" placeholder="ex Fbu..." />
      </div>
      <div class="currencies__form-item">
        <ka-switch v-model="form.isPrimary" label="Primary" />
      </div>
      <div class="currencies__form-item" v-show="form.isPrimary">
        <h3 class="currencies__rate-title">Rates</h3>
        <template v-for="rate in form.rates">
          <div class="currencies__rate" :key="rate.currencyTo">
            <div class="currencies__rate-label">{{getCurrencyName(rate.currencyTo)}}:</div>
            <ka-input type="number" v-model="rate.amount" placeholder="ex. 230..." />
          </div>
        </template>
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
        abbreviation: "",
        isPrimary: false,
        rates: []
      },
      currencyEdit: null,
    }
  },
  apollo: {
    currencies: {
      query: CURRENCIES_QUERY,
      update (data) {
        data.currencies && this.updateRates(data.currencies)
        return data.currencies
      }
    }
  },
  computed: {
    isLoading () {
      return this.currencies.length === 0 && this.$apollo.loading
    },
    isEditMode () {
      return !!this.currencyEdit && !!this.currencyEdit.id
    },
    getCurrencyName () {
      return (id) => {
        const item = this.currencies.find(i => i.id === id)
        return item ? item.abbreviation : "currency"
      }
    },
  },
  created () {
    if (this.$route.query.add === "1") {
      this.modalVisible = true
    }
  },
  methods: {
    updateRates (currencies) {
      this.form.rates = currencies.map(({ id }) => ({ amount: "", currencyTo: id }))
    },
    async onSubmit () {
      const variables = {
        id: "",
        name: this.form.name,
        abbreviation: this.form.abbreviation,
        isPrimary: this.currencies.length <= 1 || this.form.isPrimary,
        rates: this.form.isPrimary ? this.form.rates.map(i => ({ ...i, amount: +i.amount })) : [] // todo: validate
      };
      
      if (this.isEditMode) {
        variables.id = this.currencyEdit.id;
      }
      try {
        await this.$apollo.mutate({
          mutation: this.isEditMode ?  CURRENCIES_UPDATE_MUTATION : CURRENCIES_CREATE_MUTATION,
          variables
        })
        this.modalVisible = false
        if (this.$route.query.back === "1") {
          return this.$router.back()
        }
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
      this.form.isPrimary = currency.isPrimary
      this.form.rates = this.currencies.filter(i => i.id !== currency.id).map(curr => {
        const exist = currency.rates.find(rate => rate.currencyTo.id === curr.id)
        return {
          amount: exist ? exist.amount : "",
          currencyTo: curr.id,
        }
      })
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
    bottom: 50px;
    right: 0px;
    font-size: 36px;
    z-index: 100;
    padding: 10px;
    background-color: var(--color-layout);
    border-radius: 50%;
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
  &__rate {
    margin-bottom: 16px;
    display: flex;
    column-gap: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }

    &-title {
      margin: 1.5rem 0;
      text-align: center;
    }

    &-label {
      min-width: 120px;
      text-align: right;
    }
  }
}
</style>