<template>
  <div class="signup">
    <template v-if="!codeMode">
      <div class="signup__item">
        <ka-input passport v-model.trim="name" placeholder="Name..." />
      </div>
      <div class="signup__item">
        <ka-input :type="usernameType" passport v-model.trim="username" placeholder="Email or phone..." />
      </div>
      <div class="signup__item">
        <ka-input passport type="password" v-model.trim="password" placeholder="Password..." />
      </div>
      <div class="signup__item is-actions">
        <ka-button type="primary" passport @click="onSignup" :disabled="formDisabled">Sign up</ka-button>
      </div>
      <div class="signup__item is-actions">
        <ka-button type="primary" passport :style="signupStyles" @click="$router.push('/passport/login')">or Login</ka-button>
      </div>
    </template>
    <div class="signup__code" v-else>
      <div class="signup__code-sent">Code sent to: {{ username }}</div>
      <div class="signup__code-inputs">
        <passport-code v-model="code" @submit="onVerifyCode" :disabled="isLoading" />
      </div>
      <div class="signup__code-expires">Code will expire in {{ remainingTime | formatCodeTime }}</div>
    </div>
  </div>
</template>

<script>
import PassportCode from '@/components/passport/PassportCode'
import { CREATE_ACCOUNT_MUTATION, VERIFY_CODE_MUTATION } from '@/graphql/users'
import { onLogin } from '@/plugins/vue-apollo'

const fillZero = (num) => (num > 9 ? num : `0${num}`)

export default {
  name: 'PassportSignup',
  components: {
    PassportCode,
  },
  filters: {
    formatCodeTime(time) {
      let minutes = 0
      let seconds = time
      if (time > 59) {
        seconds = time % 60
        minutes = (time - seconds) / 60
      }
      return `${fillZero(minutes)}:${fillZero(seconds)}`
    },
  },
  data () {
    return {
      name: "",
      username: "",
      password: "",
      codeMode: false,
      isLoading: false,
      code: '',
      remainingTime: 0,
      lastLoadedTime: 0,
      counts: 0,
      intervalId: null,
    }
  },
  computed: {
    usernameType () {
      return this.username.includes('@') ? 'email' : 'text'
    },
    signupStyles () {
      return {
        backgroundColor: 'rgba(241, 173, 56, 0.27)',
        color: '#0A642E',
      }
    },
    formDisabled () {
      return !this.username || !this.password
    },
    firstLogin () {
      return localStorage.getItem('U:FL:U') !== "1"
    },
  },
  watch: {
    remainingTime: 'handleRemainingTime',
  },
  methods: {
    handleRemainingTime(time) {
      if (time <= 0) {
        clearInterval(this.intervalId)
        // this.lastLoadedTime = 0
      }
    },
    handleShowCode() {
      this.remainingTime = 120
      this.counts = this.counts + 1
      this.lastLoadedTime = this.lastLoadedTime * 20
      this.codeMode = true
      this.intervalId = setInterval(() => {
        this.remainingTime = this.remainingTime - 1
      }, 1000)
    },
    async onSignup () {
      const variables = {
        name: this.name,
        username: this.username,
        password: this.password,
      }
      // console.log(`variables`, variables)
      try {
        this.loading = true;
        await this.$apollo.mutate({
          mutation: CREATE_ACCOUNT_MUTATION,
          variables
        })
        // console.log('data', data);
        this.handleShowCode()
      } catch (error) {
        console.log(`error: `, error)
        this.errorLogin = error.message
      } finally {
        this.loading = false;
      }
    },
    async onVerifyCode () {
      // console.log(`verify`)
      const obj = {
        username: this.username,
        code: `${this.code.slice(0, 3)}-${this.code.slice(3)}`,
      }
      // console.log('obj', obj);
      try {
        this.isLoading = true
        const { data } = await this.$apollo.mutate({
          mutation: VERIFY_CODE_MUTATION,
          variables: obj,
        })
        const { token, refreshToken } = data.verifyCode
        await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
        if (this.firstLogin) {
          // console.log(`first signup...`)
          localStorage.setItem("U:FL:U", 1)
          this.$router.push(`/?ac=frst-lgn`)
        } else {
          // console.log(`not first signup...`)
          this.$router.push(`/`)
        }
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.signup {
  min-height: calc(100vh - 400px);
  &__item {
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: 0;
    }
    &.is-actions {
      margin-top: 50px;
    }
  }
  &__code {
    color: #08BE51;

    &-sent, &-inputs {
      margin-bottom: 24px;
    }
    &-expires {
      text-align: right;
    }
  }
}
</style>