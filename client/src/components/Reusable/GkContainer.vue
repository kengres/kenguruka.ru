<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GkContainer"
};
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto;

  @media screen and(min-width: 600px) {
    max-width: 600px;
  }
}
</style>
