<template>
  <div class="categories">
    <h1 class="categories__title">Categories</h1>
    <ka-app-loader v-if="isLoading" />
    <ka-app-empty v-if="!isLoading && categories.length === 0" />
    <ul class="categories__list">
      <template v-for="(cat, i) in categories">
        <li :class="['categories__item', `is-${colors[i % colors.length]}`]" :key="cat.id" @click="onUpdateStart(cat)">{{ cat.name }}</li>
      </template>
    </ul>
    <div class="categories__add" v-show="!modalVisible">
      <ka-button @click="modalVisible = true" type="primary" icon circle>
        <ka-icon name="add_circle" />
      </ka-button>
    </div>

    <ka-modal :visible="modalVisible" @close="modalVisible = false">
      <ka-alert outlined type="warning" canClose v-show="error" class="mb-16">
        <p>{{ error | formatGraphqlError }}</p>
      </ka-alert>
      <ka-input v-model="categoryName" placeholder="category name...." @keyup.enter="onSubmit" />
      <template v-slot:footer>
        <div class="categories__footer">
          <ka-button type="success" @click="onSubmit" :disabled="!categoryName">Submit</ka-button>
          <ka-button type="danger" @click="onDelete" v-if="isEditMode">Delete</ka-button>
        </div>
      </template>
    </ka-modal>
  </div>
</template>

<script>
import { CATEGORIES_QUERY, CATEGORIES_CREATE_MUTATION, CATEGORIES_UPDATE_MUTATION, CATEGORIES_DELETE_MUTATION } from '@/graphql/categories';
export default {
  name: "Categories",
  metaInfo: {
    title: 'Categories',
  },
  data () {
    return {
      categories: [],
      colors: ['green', 'blue', 'orange', 'violet', 'green2', 'yellow', 'purple', 'violet2', 'orange2', 'blue2', 'purple2', 'yellow2'],
      modalVisible: false,
      categoryName: "",
      categoryEdit: null,
      error: "",
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
  created () {
    if (this.$route.query.add === "1") {
      this.modalVisible = true
    }
  },
  methods: {
    async onSubmit () {
      this.error = ""
      const variables = {
        id: "",
        name: this.categoryName && this.categoryName.trim(),
      };
      if (this.isEditMode) {
        variables.id = this.categoryEdit.id;
      }
      try {
        await this.$apollo.mutate({
          mutation: this.isEditMode ?  CATEGORIES_UPDATE_MUTATION : CATEGORIES_CREATE_MUTATION,
          variables
        })
        this.modalVisible = false
        if (this.$route.query.back === "1") {
          return this.$router.back()
        }
        this.categoryName = ""
        this.categoryEdit = null
        this.refetch()
      } catch (error) {
        this.error = error.message
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
        this.error = error.message;
      }
    },
    onUpdateStart (cat) {
      this.error = ""
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
    --gap-size: 16px;
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding-left: var(--gap-size);
    padding-right: var(--gap-size);
  }
  &__item {
    width: calc(50% - var(--gap-size) / 2);
    color: #010101;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    font-weight: 700;
    font-size: 18px;
    border-radius: 10px;
    padding: 16px;
    &::before {
      content: "";
      background-color: currentColor;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.12;
      border-radius: inherit;
    }
    &.is-green {
      color: rgb(12, 122, 25);
    }
    &.is-violet {
      color: rgb(204, 38, 204);
    }
    &.is-orange {
      color: rgb(226, 152, 13);
    }
    &.is-blue {
      color: rgb(13, 13, 208);
    }
    &.is-purple {
      color: rgb(157, 6, 162);
    }
    &.is-yellow {
      color: rgb(187, 187, 7);
    }
    &.is-green2 {
      color: rgb(15, 191, 35);
    }
    &.is-violet2 {
      color: rgb(128, 12, 128);
    }
    &.is-orange2 {
      color: rgb(159, 106, 7);
    }
    &.is-blue2 {
      color: rgb(10, 10, 138);
    }
    &.is-purple2 {
      color: rgb(75, 5, 101);
    }
    &.is-yellow2 {
      color: rgb(169, 235, 15);
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