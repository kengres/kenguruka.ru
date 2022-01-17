<template>
  <div class="home">
    <gk-container>
      <section class="depenses">
        <h1 class="depenses__heading">
          <span class="depenses__title">Depenses</span>
        </h1>
        <div class="depenses__total">
          <swiper :options="swiperOptions" ref="mySwiper" @slideChange="handleSlideChange">
            <template v-for="(item, i) in monthsAfterOct2021">
              <swiper-slide :key="i">
                <h2 class="depenses__subtitle">{{ getCurrentMonth(item)}}</h2>
                <div class="depenses__amount" :class="{'is-loading': $apollo.loading}">{{ total | amountFilter }}</div>
              </swiper-slide>
            </template>
            <div class="swiper-button-prev" slot="button-prev">
              <yotta-button icon circle type="primary">
                <yotta-icon name="arrow_back" />
              </yotta-button>
            </div>
            <div class="swiper-button-next" slot="button-next">
              <yotta-button icon circle type="primary">
                <yotta-icon name="arrow_forward" />
              </yotta-button>
            </div>
          </swiper>
        </div>
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
            />
          </li>
        </ul>
      </section>
      <div class="depenses__add">
        <yotta-button @click="onAdd" type="primary" icon circle>
          <yotta-icon name="add_circle" />
        </yotta-button>
      </div>
    </gk-container>

    <modal :visible="modalVisible" @close="modalVisible = false">
      <depenses-add ref="add" @close="onAfterSubmit" :depense-edit="depenseEdit" />
      <template v-slot:footer>
        <yotta-button type="success" @click="onSubmit">Submit</yotta-button>
      </template>
    </modal>
    <gk-popup :visible="popVisible" @close="popVisible = false">
      <div class="depenses__action-item" @click="handleOpen">Open</div>
      <div class="depenses__action-item" @click="handleEdit">Edit</div>
      <div class="depenses__action-item" @click="handleDelete">Delete</div>
    </gk-popup>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { DEPENSES_QUERY, DEPENSES_DELETE_MUTATION } from "@/graphql/depenses";
import GkContainer from '@/components/Reusable/GkContainer.vue';
import DepensesItem from '@/components/Depenses/DepensesItem.vue';
import Modal from '@/components/Reusable/Modal.vue';
import DepensesAdd from '@/components/Depenses/DepensesAdd.vue';
import YottaButton from '@/components/Reusable/Button'
import YottaIcon from '@/components/Reusable/Icon'
import { moneyFilter, dateTimeFilter } from '@/utils/filters'
import { getMonthCount, getMonthFirstDay } from '@/utils/utils'
import { MONTH_LIST } from '@/utils/constants'
import GkPopup from '../components/Reusable/Popup.vue';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  name: 'Home',
  metaInfo: {
    title: 'Home',
  },
  directives: {
    swiper: directive,
  },
  components: {
    GkContainer,
    DepensesItem,
    Modal,
    DepensesAdd,
    YottaButton,
    YottaIcon,
    GkPopup,
    Swiper,
    SwiperSlide,
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
      activeMonth: null,
      popVisible: false,
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
        return { monthDate : this.activeMonth }
      },
    },
  },
  mounted () {
    document.body.classList.add("page");
    this.swiper.slideTo(3, 1000, false)
  },
  computed: {
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
        return `${MONTH_LIST[new Date(date).getMonth()].split(":")[0]} ${new Date(date).getFullYear()}`
      }
    }
  },
  methods: {
    handleSlideChange() {
      this.fetchMonthData(this.swiper.activeIndex)
    },
    fetchMonthData (index = 0) {
      console.log(`fetch for ${index}`, this.monthsAfterOct2021[index])
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
      console.log(`on delet: `, item)
      try {
        await this.$apollo.mutate({
          mutation: DEPENSES_DELETE_MUTATION,
          variables: {
            id: item.id,
          }
        })
        this.onAfterSubmit()
      } catch (error) {
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
  },
}
</script>

<style lang="scss">
.is-loading {
  color: transparent;
}
.depenses {
  width: 100%;
  padding-bottom: 100px;
  &__heading {
    text-align: center;
    padding: 10px;
    margin-bottom: 12px;
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