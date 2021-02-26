<template>
  <div class="home">
    <section class="depenses">
      <h2 class="depenses__heading">
        <span class="depenses__title">Depenses</span>
        <span class="depenses__total">{{ total }}</span>
        <button class="depenses__add" @click="modalVisible = true">Add</button>
      </h2>

      <ul class="depenses__list">
        <li class="depenses__item" v-for="(dep, i) in depenses" :key="i">
          <depenses-item
            :title="dep.title"
            :amount="dep.price"
            :date="dep.createdAt"
            :delete="() => onDelete(dep)"
          />
        </li>
      </ul>
      <modal :visible="modalVisible" @close="modalVisible = false">
        <depenses-add ref="add" @close="onAfterSubmit" />
        <template v-slot:footer>
          <button class="depenses__button" @click="onSubmit">submit</button>
        </template>
      </modal>
    </section>
  </div>
</template>

<script>
import LForage from "localforage";
// @ is an alias to /src
import DepensesItem from "@/components/Depenses/DepensesItem.vue";
import Modal from "../components/Reusable/Modal.vue";
import DepensesAdd from "../components/Depenses/DepensesAdd.vue";

export default {
  name: "Home",
  components: {
    DepensesItem,
    Modal,
    DepensesAdd
  },
  data() {
    return {
      modalVisible: false,
      depenses: []
    };
  },
  computed: {
    total() {
      return this.depenses
        .map(i => i.price)
        .reduce((a, b) => {
          return a + b;
        }, 0);
    }
  },
  mounted() {
    document.body.classList.add("page");
    this.updateData();
  },
  methods: {
    onSubmit() {
      this.$refs.add.onSubmit();
    },
    onDelete(item) {
      LForage.getItem("depenses").then(val => {
        if (val) {
          const depenses = val.filter(i => i.id !== item.id);
          LForage.setItem("depenses", depenses).then(() => {
            this.depenses = depenses.map(i => {
              return {
                ...i,
                price: +i.price
              };
            });
          });
        }
      });
    },
    onAfterSubmit() {
      this.updateData();
      this.modalVisible = false;
    },
    updateData() {
      LForage.getItem("depenses").then(val => {
        if (val) {
          this.depenses = val.map(i => {
            return {
              ...i,
              price: +i.price
            };
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.depenses {
  width: 280px;
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
