<template>
  <div class="home">
    <gk-container>
      <section class="depenses">
        <h2 class="depenses__heading">
          <span class="depenses__title">Depenses</span>
          <span class="depenses__total">{{ total }}</span>
          <button class="depenses__add" @click="modalVisible = true">
            Add
          </button>
        </h2>

        <ul class="depenses__list">
          <li class="depenses__item" v-for="(dep, i) in depenses" :key="i">
            <depenses-item
              :title="dep.name"
              :amount="dep.displayedAmount"
              :date="dep.createdAt"
              :delete="() => onDelete(dep)"
            />
          </li>
        </ul>
      </section>
    </gk-container>

    <modal :visible="modalVisible" @close="modalVisible = false">
      <depenses-add ref="add" @close="onAfterSubmit" />
      <template v-slot:footer>
        <button class="depenses__button" @click="onSubmit">submit</button>
      </template>
    </modal>
  </div>
</template>

<script>
import { DEPENSES_QUERY } from "@/graphql/queries";
import { DEPENSES_DELETE_MUTATION } from "@/graphql/mutations";
import GkContainer from '@/components/Reusable/GkContainer.vue';
import DepensesItem from '@/components/Depenses/DepensesItem.vue';
import Modal from '@/components/Reusable/Modal.vue';
import DepensesAdd from '@/components/Depenses/DepensesAdd.vue';
export default {
  components: { GkContainer, DepensesItem, Modal, DepensesAdd },
  name: 'Home',
  data () {
    return {
      modalVisible: false,
      depenses: [],
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
    }
  },
  methods: {
    onSubmit() {
      this.$refs.add.onSubmit();
    },
    onAfterSubmit() {
      this.updateData();
      this.modalVisible = false;
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
        this.updateData()
      } catch (error) {
        console.log(`delete error: `, error)
      }
    },
    updateData () {
      if (this.$apollo.queries.depenses) {
        this.$apollo.queries.depenses.refetch()
      }
    }
  },
}
</script>

<style lang="scss">
.depenses {
  width: 100%;
  padding: 0 1.2rem;
  &__heading {
    display: flex;
    align-items: center;
  }
  &__total {
    margin-left: 1rem;
  }
  &__add {
    margin-left: auto;
  }
  &__list {
    list-style-type: none;
    padding: 0;
  }
  &__item {
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>