<template>
  <div class="settings">
    <div class="settings__heading">
      <yotta-button icon circle type="primary" class="settings__back" @click="$router.back()">
        <yotta-icon name="arrow_back" />
      </yotta-button>
      <div class="settings__title">Settings</div>
    </div>
    <div class="settings__content">
      <div class="settings__avatar is-success--text">
        <yotta-icon name="person" :size="60" />
      </div>
      <div class="settings__items">
        <div class="settings__item">
          <div class="settings__form-item">
            <div class="settings__label">name:</div>
            <div class="settings__input">
              <yotta-input passport value="Edgard Doukay Ndiho" no-edit />
            </div>
          </div>
        </div>
        <div class="settings__item">
          <div class="settings__form-item">
            <div class="settings__label">email:</div>
            <div class="settings__input">
              <yotta-input passport value="Edgard Doukay Ndiho" no-edit />
            </div>
          </div>
        </div>
        <div class="settings__item" v-show="false">
          <div class="settings__setting">
            <div class="settings__setting-name">Change password</div>
            <div class="settings__setting-icon">
              <yotta-icon name="keyboard_arrow_right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YottaButton from '@/components/Reusable/Button'
import YottaIcon from '@/components/Reusable/Icon'
import YottaInput from '@/components/Reusable/Input'

export default {
  name: 'PageSettings',
  components: {
    YottaButton,
    YottaIcon,
    YottaInput,
  },
}
</script>

<style lang="scss" scoped>
.settings {
  background-color: #DBFFEA;
  min-height: 100vh;
  &__heading {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    font-size: 18px;
  }
  &__avatar {
    --size: 100px;
    height: var(--size);
    width: var(--size);
    border-radius: var(--size);
    box-shadow: 2px 4px 50px 0px rgba(0, 0, 0, 0.09);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto 0;
  }
  &__items {
    padding: 0 16px;
    margin-top: 24px;
  }
  &__item {
    margin-bottom: 24px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &__label {
    margin-bottom: 8px;
    color: #0A642E;
  }
  &__setting {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 16px;
    cursor: pointer;
    transition: 0.3s;
    color: #0A642E;
    &:hover {
      background-color: #f8f8f8;
    }
    &-icon {
      margin-left: auto;
      color: #0A642E;
    }
  }
}
</style>