<template>
  <div class="layout">
    <div class="layout__nav">
      <nav-menu />
    </div>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavMenu from '@/components/nav/NavMenu'

export default {
  name: "LayoutDefault",
  components: {
    NavMenu
  },
}
</script>

<style lang="scss" scoped>
.layout {
  background: #fff;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  position: relative;

  &__nav {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>