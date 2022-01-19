<template>
  <div class="p-layout">
    <div class="p-layout__content">
      <div class="p-layout__title">
        <span class="p-layout__title-inner">Login</span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutPassport",
}
</script>

<style lang="scss" scoped>
.p-layout {
  background: #E8FEF1;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 16px;

  &__content {
    background-color: rgba(241, 173, 56, 0.271);
    margin-top: 100px;
    min-height: 300px;
    position: relative;
    border-radius: 12px;
    padding: 25% 16px 80px;
  }
  &__title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: #E8FEF1;
    display: flex;
    padding: 16px;
    font-size: 24px;
    color: #0A642E;
  }
  &__title-inner {
    margin: auto;
    display: inline-flex;
    background-color: rgba(241, 173, 56, 0.271);
    width: 100%;
    height: 100%;
    border-radius: inherit;
    justify-content: center;
    align-items: center;
  }
}
</style>