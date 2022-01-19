<template>
  <div class="login">
    <div class="login__item">
      <yotta-input passport v-model.trim="username" placeholder="Email or phone..." />
    </div>
    <div class="login__item">
      <yotta-input passport type="password" v-model.trim="password" placeholder="Password..." />
    </div>
    <div class="login__item is-actions">
      <yotta-btn type="primary" passport @click="onLogin" :disabled="formDisabled">Login</yotta-btn>
    </div>
    <div class="login__item is-actions">
      <yotta-btn type="primary" passport :style="signupStyles" @click="$router.push('/passport/signup')">or Sign up</yotta-btn>
    </div>
  </div>
</template>

<script>
import YottaInput from '@/components/Reusable/Input'
import YottaBtn from '@/components/Reusable/Button'
import { LOG_USER_IN_MUTATION } from '@/graphql/users'
import { onLogin } from '@/plugins/vue-apollo'
export default {
  name: 'PassportLogin',
  components: {
    YottaInput,
    YottaBtn,
  },
  data () {
    return {
      username: "",
      password: "",
    }
  },
  computed: {
    signupStyles () {
      return {
        backgroundColor: 'rgba(241, 173, 56, 0.27)',
        color: '#0A642E',
      }
    },
    formDisabled () {
      return !this.username || !this.password
    },
  },
  methods: {
    async onLogin () {
      const variables = {
        username: this.username,
        password: this.password,
      }
      console.log(`variables`, variables)
      try {
        this.loading = true;
        const { data: { logUserIn: { token, refreshToken } } } = await this.$apollo.mutate({
          mutation: LOG_USER_IN_MUTATION,
          variables
        })
        await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
        if (this.firstLogin) {
          console.log(`first login...`)
          this.$router.push(`/?ac=frst-lgn`)
        } else {
          console.log(`not first login...`)
          this.$router.push(`/`)
        }
      } catch (error) {
        console.log(`error: `, error)
        this.errorLogin = error.message
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  &__item {
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: 0;
    }
    &.is-actions {
      margin-top: 50px;
    }
  }
}
</style>