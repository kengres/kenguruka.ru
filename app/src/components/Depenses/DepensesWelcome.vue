<template>
  <div class="dep-wlc">
    <div class="dep-wlc__item is-curr" v-show="canAddCurrency">
      <div class="dep-wlc__title">Currencies</div>
      <div class="dep-wlc__subtitle">First create a currency</div>
      <div class="dep-wlc__action">
        <ka-button icon circle type="primary" @click="$emit('addCurrency')">
          <ka-icon name="add_circle" />
        </ka-button>
      </div>
    </div>
    <div class="dep-wlc__item is-cat" v-show="canAddCategory">
      <div class="dep-wlc__title">Categories (optional)</div>
      <div class="dep-wlc__subtitle">Create your first category</div>
      <div class="dep-wlc__action">
        <ka-button icon circle type="warning" @click="$emit('addCategory')">
          <ka-icon name="add_circle" />
        </ka-button>
      </div>
    </div>
    <div class="dep-wlc__item is-exp" v-show="canAddDepense">
      <div class="dep-wlc__title">Expenses</div>
      <div class="dep-wlc__subtitle">To add your first item, click the plus button below</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepensesWelcome',
  props: {
    canAddDepense: {
      type: Boolean,
      default: false,
    },
    canAddCurrency: {
      type: Boolean,
      default: false,
    },
    canAddCategory: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.dep-wlc {
  padding: 12px;

  &__item {
    padding: 16px 20px;
    color: #0A642E;
    position: relative;
    border-radius: 8px;
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: currentColor;
      opacity: 0.1;
    }

    &.is-curr {
      color: var(--color-success--dark);
    }
    &.is-cat {
      color: var(--color-warning--dark);
    }
    &.is-exp {
      color: var(--color-info--dark);
    }
  }
  &__title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  &__subtitle {
    color: #b0b0b0;
  }
  &__action {
    position: absolute;
    right: 16px;
    top: 16px;
  }
}
</style>