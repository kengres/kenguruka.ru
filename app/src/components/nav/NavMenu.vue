<template>
  <nav class="nav-menu">
    <div class="nav-menu__links">
      <template v-for="link in navLinks">
        <router-link :exact="!!link.exact" active-class="is-active" class="nav-menu__link" :to="link.path" :key="link.title">{{ link.title }}</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavMenu",
  data () {
    return {
      navLinks: [
        { title: 'Home', path: '/', exact: true },
        { title: 'Currencies', path: '/currencies' },
        { title: 'Categories', path: '/categories' },
        { title: 'Settings', path: '/settings' },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-menu {
  background-color: #fff;
  box-shadow: 1px -4px 40px 0px rgba(11, 74, 37, 0.102);
  overflow-x: hidden;

  &__links {
    display: flex;
    column-gap: 16px;
    padding: 20px 16px 12px;
    overflow-x: auto;
    // * HIDE SCROLLBAR
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__link {
    display: inline-flex;
    text-decoration: none;
    padding: 8px 16px;
    background-color: transparent;
    color: #08BE51;
    border: 1px solid #08BE51;
    transition: .3s;
    &:hover {
      opacity: 0.8;
    }
    &.is-active {
      background-color: #08BE51;
      color: #e6e6e6;
      border-color: #08BE51;
    }
  }
}
</style>