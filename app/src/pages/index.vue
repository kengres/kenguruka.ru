<template>
  <div class="home">
    <gk-container>
      <section class="depenses">
        <h1 :class="['depenses__heading', {'is-centered': !activeCategory}]">
          <div class="depenses__back" v-if="activeCategory">
            <ka-button icon circle type="primary" @click="$router.push('/')">
              <ka-icon name="arrow_back" />
            </ka-button>
          </div>
          <span class="depenses__title">Depenses</span>
        </h1>
        <div class="depenses__total">
          <swiper :options="swiperOptions" ref="mySwiper" @slideChange="handleSlideChange">
            <template v-for="(item, i) in monthsAfterOct2021">
              <swiper-slide :key="i">
                <h2 class="depenses__subtitle">
                  <span v-if="activeCategory" class="tt-c">{{ activeCategory.name }} &nbsp;</span>
                  <span :class="{'fz-16': !!activeCategory}">{{ getCurrentMonth(item)}}</span>
                </h2>
                <div class="depenses__amount" :class="{'is-loading': $apollo.loading}">{{ total | amountFilter }}</div>
              </swiper-slide>
            </template>
            <div class="swiper-button-prev" slot="button-prev">
              <ka-button icon circle type="primary">
                <ka-icon name="arrow_back" />
              </ka-button>
            </div>
            <div class="swiper-button-next" slot="button-next">
              <ka-button icon circle type="primary">
                <ka-icon name="arrow_forward" />
              </ka-button>
            </div>
          </swiper>
        </div>
        <ka-app-loader v-if="isLoading" />
        <ul class="depenses__list">
          <li class="depenses__empty" v-if="!$apollo.loading && depenses.length === 0">
            <div class="depenses__empty-inner">
              No data available for that period!
            </div>
          </li>
          <li class="depenses__item" v-for="(dep, i) in depenses" :key="i" @click="handlePopup(dep)">
            <depenses-item
              :title="dep.name"
              :amount="moneyFilterVal(dep.amount)"
              :category-name="dep.category && dep.category.name"
              :date="dateFilterVal(dep.date)"
              :on-category="() => handleCategory(dep)"
            />
          </li>
        </ul>
      </section>
      <section class="depenses__welcome" v-if="showAddExpenses">
        <depenses-welcome
          @addCurrency="$router.push('/currencies?add=1&back=1')"
          @addCategory="$router.push('/categories?add=1&back=1')"
          :can-add-category="showAddCategory"
          :can-add-currency="showAddCurrency"
          :can-add-depense="showPlusButton"
        />
      </section>
      <div class="depenses__add" v-show="showPlusButton">
        <ka-button @click="onAdd" type="primary" icon circle>
          <ka-icon name="add_circle" />
        </ka-button>
      </div>
    </gk-container>

    <ka-modal :visible="modalVisible" @close="modalVisible = false">
      <depenses-add ref="add" @close="onAfterSubmit" :depense-edit="depenseEdit" />
      <template v-slot:footer>
        <ka-button type="success" @click="onSubmit">Submit</ka-button>
      </template>
    </ka-modal>
    <ka-popup :visible="popVisible" @close="popVisible = false">
      <div class="depenses__action-item" @click="handleOpen">Open</div>
      <div class="depenses__action-item" @click="handleEdit">Edit</div>
      <div class="depenses__action-item" @click="handleDelete">Delete</div>
    </ka-popup>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { DEPENSES_QUERY, DEPENSES_DELETE_MUTATION } from "@/graphql/depenses";
import { USER_COUNTS_QUERY } from "@/graphql/users";
import { SINGLE_CATEGORY_QUERY } from "@/graphql/categories";
import DepensesAdd from '@/components/Depenses/DepensesAdd.vue';
import DepensesItem from '@/components/Depenses/DepensesItem.vue';
import GkContainer from '@/components/Reusable/GkContainer.vue';
import { moneyFilter, dateTimeFilter } from '@/utils/filters'
import { getMonthCount, getMonthFirstDay } from '@/utils/utils'
import { MONTH_LIST } from '@/utils/constants'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import DepensesWelcome from '@/components/Depenses/DepensesWelcome.vue';
export default {
  name: 'Home',
  metaInfo: {
    title: 'Home',
  },
  components: {
    DepensesAdd,
    DepensesItem,
    GkContainer,
    Swiper,
    SwiperSlide,
    DepensesWelcome,
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
      loading: true,
      modalVisible: false,
      depenses: [],
      depenseEdit: null,
      activeCategory: null,
      activeMonth: null,
      popVisible: false,
      userCounts: null,
      swiperOptions: {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  apollo: {
    depenses: {
      query: DEPENSES_QUERY,
      skip () {
        return !this.activeMonth
      },
      variables () {
        return {
          monthDate : this.activeMonth,
          categoryId : this.$route.query.categoryId,
        }
      },
      update (data) {
        this.checkDataCount(data.depenses)
        return data.depenses
      }
    },
    activeCategory: {
      query: SINGLE_CATEGORY_QUERY,
      skip () {
        return !this.$route.query.categoryId
      },
      variables () {
        return { id: this.$route.query.categoryId }
      },
      update (data) {
        return data.category
      }
    },
  },
  mounted () {
    document.body.classList.add("page");
    this.swiper.slideTo(3, 10, false)
    this.checkDataCount(this.depenses)
  },
  computed: {
    isLoading () {
      return this.depenses.length === 0 && this.$apollo.loading
    },
    shouldAddCurr () {
      return !this.userCounts || this.userCounts.currencies === 0
    },
    showPlusButton () {
      return !this.modalVisible && !this.shouldAddCurr
    },
    showAddCategory () {
      return this.userCounts && this.userCounts.categories === 0
    },
    showAddCurrency () {
      return this.userCounts && this.userCounts.currencies === 0
    },
    showAddExpenses () {
      return this.userCounts && this.depenses.length === 0
    },
    monthsAfterOct2021 () {
      const count = getMonthCount("2021-11-01", new Date())
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.unshift(getMonthFirstDay(new Date().setMonth(-i)))
      }
      return arr
    },
    total() {
      return this.depenses
        .map(i => i.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0);
    },
    moneyFilterVal () {
      return val => {
        return moneyFilter(val)
      }
    },
    dateFilterVal () {
      return val => {
        return dateTimeFilter(val)
      }
    },
    isEditMode () {
      return !!this.depenseEdit && !!this.depenseEdit.id
    },
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    getCurrentMonth () {
      return (date) => {
        const val = `${MONTH_LIST[new Date(date).getMonth()].split(":")[0]} ${new Date(date).getFullYear()}`
        return this.activeCategory ? `(${val})` : val
      }
    },
  },
  watch: {
    '$route.query.categoryId': 'onCategoryIdChange'
  },
  methods: {
    onCategoryIdChange(val) {
      if (!val) this.activeCategory = null
    },
    handleSlideChange() {
      this.fetchMonthData(this.swiper.activeIndex)
    },
    fetchMonthData (index = 0) {
      this.activeMonth = this.monthsAfterOct2021[index]
    },
    onAdd() {
      this.modalVisible = true;
    },
    onSubmit() {
      this.$refs.add.onSubmit();
    },
    onAfterSubmit() {
      this.updateData();
      this.modalVisible = false;
      this.depenseEdit = null;
      this.popVisible = false;
    },
    handlePopup (depense) {
      this.depenseEdit = depense
      this.popVisible = true
    },
    handleDelete() {
      if (!this.isEditMode) return
      // todo: confirm popup
      this.onDelete(this.depenseEdit)
    },
    async onDelete(item) {
      try {
        await this.$apollo.mutate({
          mutation: DEPENSES_DELETE_MUTATION,
          variables: {
            id: item.id,
          }
        })
        this.onAfterSubmit()
      } catch (error) {
        // eslint-disable-next-line
        console.log(`delete error: `, error)
      }
    },
    updateData () {
      if (this.$apollo.queries.depenses) {
        this.$apollo.queries.depenses.refetch()
      }
    },
    handleEdit() {
      if (!this.isEditMode) return
      this.modalVisible = true
      this.popVisible = false
    },
    handleOpen() {
      if (!this.isEditMode) return
      this.popVisible = false
      this.$router.push(`/depenses/${this.depenseEdit.id}`)
    },
    handleCategory(dep) {
      if (!dep.category) return
      this.$router.push(`/?categoryId=${dep.category.id}`)
    },
    async checkDataCount (depenses) {
      const activeMonth = new Date(new Date(this.activeMonth).setDate(1)).setHours(0, 0, 0, 0)
      const todayMonth = new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)
      if (activeMonth === todayMonth && depenses.length === 0) {
        try {
          if (this.$apollo.queries.userCounts) {
            return this.$apollo.queries.userCounts.refetch()
          }
          await this.$apollo.addSmartQuery('userCounts', {
            query: USER_COUNTS_QUERY,
          })
        } catch (error) {
          // eslint-disable-next-line
          console.log('error', error);
        }
      }
    },
  },
}
</script>

<style lang="scss">
.is-loading {
  color: transparent;
}
.home {
  padding-bottom: 100px;
}
.depenses {
  width: 100%;
  &__heading {
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 10px;
    margin-bottom: 12px;

    &.is-centered {
      justify-content: center;
    }
  }
  .swiper-button-prev, .swiper-button-next {
    width: auto;
    right: 0;
    top: 20px;
    &::after {
      display: none;
    }
  }
  .swiper-button-prev {
    left: 0;
    right: auto;
  }
  .swiper-button-disabled {
    display: none;
  }
  &__total {
    background-color: #08BE51;
    border-radius: 4px;
    padding: 18px;
    color: #e6e6e6;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  &__amount {
    font-size: 48px;
    font-weight: 700;
    margin-top: 24px;
  }
  &__list {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
  }
  &__item {
    background-color: transparent;
    &:nth-of-type(even) {
      background-color: #F7F7F7;
    }
  }
  &__add {
    position: fixed;
    bottom: 40px;
    right: 20px;
    z-index: 100;
  }
  &__action-item {
    padding: 16px 32px;
    transition: 0.3s;
    cursor: pointer;
    &:nth-of-type(odd) {
      background-color: #F5F5F5;
    }
    &:hover {
      background-color: #ebebeb;
    }
  }
  &__empty {
    padding: 16px 10px;
    &-inner {
      color: var(--color-warning);
      position: relative;
      padding: 24px;
      border-radius: 8px;
      &::before {
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        background-color: currentColor;
        opacity: 0.1;
        border-radius: inherit;
      }
    }
  }
}
</style>