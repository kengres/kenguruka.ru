<template>
  <div class="categories">
    <h1 class="categories__title">Categories</h1>
    <ka-app-loader v-if="isLoading" />
    <ul class="categories__list">
      <template v-for="(cat, i) in categories">
        <li :class="['categories__item', `is-${colors[i % colors.length]}`]" :key="cat.id" @click="onUpdateStart(cat)">{{ cat.name }}</li>
      </template>
    </ul>
    <div class="categories__add" v-show="!modalVisible">
      <add-button @click="modalVisible = true" />
    </div>

    <ka-modal :visible="modalVisible" @close="modalVisible = false">
      <ka-input v-model="categoryName" />
      <template v-slot:footer>
        <div class="categories__footer">
          <ka-button type="success" @click="onSubmit">submit</ka-button>
          <ka-button type="danger" @click="onDelete" v-if="isEditMode">delete</ka-button>
        </div>
      </template>
    </ka-modal>
  </div>
</template>

<script>
import { CATEGORIES_QUERY, CATEGORIES_CREATE_MUTATION, CATEGORIES_UPDATE_MUTATION, CATEGORIES_DELETE_MUTATION } from '@/graphql/categories';
import AddButton from '../../components/Reusable/AddButton.vue';
export default {
  name: "Categories",
  metaInfo: {
    title: 'Categories',
  },
  components: {
    AddButton,
  },
  data () {
    return {
      categories: [],
      colors: ['green', 'violet', 'orange', 'blue', 'purple', 'yellow'],
      modalVisible: false,
      categoryName: "",
      categoryEdit: null,
    }
  },
  apollo: {
    categories: CATEGORIES_QUERY
  },
  computed: {
    isEditMode () {
      return !!this.categoryEdit && !!this.categoryEdit.id
    },
    isLoading () {
      return this.categories.length === 0 && this.$apollo.loading
    },
  },
  methods: {
    async onSubmit () {
      const variables = {
        name: this.categoryName && this.categoryName.trim(),
      };
      if (this.isEditMode) {
        variables.id = this.categoryEdit.id;
      }
      // console.log(`newItem: `, variables);
      try {
        await this.$apollo.mutate({
          mutation: this.isEditMode ?  CATEGORIES_UPDATE_MUTATION : CATEGORIES_CREATE_MUTATION,
          variables
        })
        this.modalVisible = false
        this.categoryName = ""
        this.categoryEdit = null
        this.refetch()
      } catch (error) {
        // eslint-disable-next-line
        console.log(`error add: `, error);
      }
    },
    async onDelete () {
      if (!this.isEditMode) return
      const variables = {
        id: this.categoryEdit.id,
      };
      try {
        await this.$apollo.mutate({
          mutation: CATEGORIES_DELETE_MUTATION,
          variables
        })
        this.modalVisible = false
        this.categoryName = ""
        this.categoryEdit = null
        this.refetch()
      } catch (error) {
        // eslint-disable-next-line
        console.log(`error add: `, error);
      }
    },
    onUpdateStart (cat) {
      this.categoryEdit = cat
      this.categoryName = cat.name
      this.modalVisible = true
    },
    refetch() {
      this.$apollo.queries.categories && this.$apollo.queries.categories.refetch()
    }
  },
}
</script>

<style lang="scss" scoped>
.categories {
  padding-bottom: 100px;
  &__title {
    text-align: center;
    padding: 10px;
    margin-bottom: 12px;
  }
  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
  &__item {
    width: calc(50% - 24px);
    color: #010101;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1px;
    border-radius: 10px;
    text-transform: capitalize;
    &::before {
      content: "";
      background-color: currentColor;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.2;
      border-radius: inherit;
    }
    &.is-green {
      color: rgb(12, 122, 25);
    }
    &.is-violet {
      color: rgb(204, 38, 204);
    }
    &.is-orange {
      color: orange;
    }
    &.is-blue {
      color: rgb(13, 13, 208);
    }
    &.is-purple {
      color: rgb(102, 11, 135);
    }
    &.is-yellow {
      color: rgb(187, 187, 7);
    }
  }
  &__add {
    position: fixed;
    bottom: 40px;
    right: 20px;
    font-size: 36px;
    z-index: 100;
  }
  &__footer {
    display: flex;
    column-gap: 20px;
  }
}
</style>