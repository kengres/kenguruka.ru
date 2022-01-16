<template>
  <div class="home">
    <gk-container>
      <section class="depenses">
        <h1 class="depenses__heading">
          <span class="depenses__title">Depenses</span>
        </h1>
        <div class="depenses__total">
          <h2 class="depenses__subtitle">Total</h2>
          <div class="depenses__amount">{{ total | amountFilter }}</div>
        </div>
        <ul class="depenses__list">
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
        <add-button @click="onAdd" />
      </div>
    </gk-container>

    <modal :visible="modalVisible" @close="modalVisible = false">
      <depenses-add ref="add" @close="onAfterSubmit" :depense-edit="depenseEdit" />
      <template v-slot:footer>
        <yotta-button type="success" @click="onSubmit">submit</yotta-button>
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
import { DEPENSES_QUERY, DEPENSES_DELETE_MUTATION } from "@/graphql/depenses";
import GkContainer from '@/components/Reusable/GkContainer.vue';
import DepensesItem from '@/components/Depenses/DepensesItem.vue';
import Modal from '@/components/Reusable/Modal.vue';
import DepensesAdd from '@/components/Depenses/DepensesAdd.vue';
import YottaButton from '@/components/Reusable/Button'
import { moneyFilter, dateTimeFilter } from '@/utils/filters'
import AddButton from '../components/Reusable/AddButton.vue';
import GkPopup from '../components/Reusable/Popup.vue';
export default {
  components: {
    GkContainer,
    DepensesItem,
    Modal,
    DepensesAdd,
    YottaButton,
    AddButton,
    GkPopup, 
  },
  name: 'Home',
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
      modalVisible: false,
      depenses: [],
      depenseEdit: null,
      popVisible: false,
    }
  },
  apollo: {
    depenses: DEPENSES_QUERY
  },
  mounted () {
    document.body.classList.add("page");
  },
  computed: {
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
    }
  },
  methods: {
    onAdd() {
      this.modalVisible = true;
      console.log(`on add....`)
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
.depenses {
  width: 100%;
  padding-bottom: 100px;
  &__heading {
    text-align: center;
    padding: 10px;
    margin-bottom: 12px;
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
}
</style>