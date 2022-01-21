<template>
  <div class="login">
    <div class="login__item">
      <ka-input passport v-model.trim="username" placeholder="Email or phone..." />
    </div>
    <div class="login__item">
      <ka-input passport type="password" v-model.trim="password" placeholder="Password..." @keyup.enter="onLogin" />
    </div>
    <div class="login__item is-actions">
      <ka-button type="primary" passport @click="onLogin" :disabled="formDisabled">Login</ka-button>
    </div>
    <div class="login__item is-actions">
      <ka-button type="primary" passport :style="signupStyles" @click="$router.push('/passport/signup')">or Sign up</ka-button>
    </div>
  </div>
</template>

<script>
import { LOG_USER_IN_MUTATION } from '@/graphql/users'
import { onLogin } from '@/plugins/vue-apollo'
import { SEEN_WELCOME } from '@/utils/constants'

export default {
  name: 'PassportLogin',
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
    seenWelcome () {
      return localStorage.getItem(SEEN_WELCOME) === '1'
    },
  },
  created () {
    if (!this.seenWelcome) {
      this.$router.push("/passport/welcome")
    }
  },
  methods: {
    async onLogin () {
      const variables = {
        username: this.username,
        password: this.password,
      }
      // console.log(`variables`, variables)
      try {
        this.loading = true;
        const { data: { logUserIn: { token, refreshToken } } } = await this.$apollo.mutate({
          mutation: LOG_USER_IN_MUTATION,
          variables
        })
        await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
        if (this.firstLogin) {
          // console.log(`first login...`)
          this.$router.push(`/?ac=frst-lgn`)
        } else {
          // console.log(`not first login...`)
          this.$router.push(`/`)
        }
      } catch (error) {
        // eslint-disable-next-line
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