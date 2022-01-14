<template>
  <nav class="nav-menu">
    <div class="gk-container">
      <div class="nav-menu__links">
        <router-link active-class="is-active" class="nav-menu__link" to="/">Home</router-link>
        <router-link active-class="is-active" class="nav-menu__link" to="/currencies">Currencies</router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-menu {
  background-color: #fff;
  box-shadow: 1px -4px 40px 0px rgba(11, 74, 37, 0.102);

  &__links {
    display: flex;
    column-gap: 20px;
    padding: 12px;
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