<template>
  <div class="signup">
    <template v-if="!codeMode">
      <div class="signup__item">
        <yotta-input passport v-model.trim="name" placeholder="Name..." />
      </div>
      <div class="signup__item">
        <yotta-input :type="usernameType" passport v-model.trim="username" placeholder="Email or phone..." />
      </div>
      <div class="signup__item">
        <yotta-input passport type="password" v-model.trim="password" placeholder="Password..." />
      </div>
      <div class="signup__item is-actions">
        <yotta-btn type="primary" passport @click="onLogin" :disabled="formDisabled">Sign up</yotta-btn>
      </div>
      <div class="signup__item is-actions">
        <yotta-btn type="primary" passport :style="signupStyles" @click="$router.push('/passport/login')">or Login</yotta-btn>
      </div>
    </template>
    <div class="signup__code" v-else>
      <div class="signup__code-inputs">
        <passport-code v-model="code" @submit="onVerifyCode" :disabled="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import YottaInput from '@/components/Reusable/Input'
import YottaBtn from '@/components/Reusable/Button'
import PassportCode from '@/components/passport/PassportCode'
import { CREATE_ACCOUNT_MUTATION, VERIFY_CODE_MUTATION } from '@/graphql/users'
import { onLogin } from '@/plugins/vue-apollo'
export default {
  name: 'PassportSignup',
  components: {
    YottaInput,
    YottaBtn,
    PassportCode,
  },
  data () {
    return {
      name: "",
      username: "",
      password: "",
      codeMode: false,
      isLoading: false,
      code: '',
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
  methods: {
    async onLogin () {
      const variables = {
        name: this.name,
        username: this.username,
        password: this.password,
      }
      console.log(`variables`, variables)
      try {
        this.loading = true;
        const { data } = await this.$apollo.mutate({
          mutation: CREATE_ACCOUNT_MUTATION,
          variables
        })
        console.log('data', data);
        this.codeMode = true
      } catch (error) {
        console.log(`error: `, error)
        this.errorLogin = error.message
      } finally {
        this.loading = false;
      }
    },
    async onVerifyCode () {
      console.log(`verify`)
      const obj = {
        username: this.username,
        code: `${this.code.slice(0, 3)}-${this.code.slice(3)}`,
      }
      console.log('obj', obj);
      try {
        this.isLoading = true
        const { data } = await this.$apollo.mutate({
          mutation: VERIFY_CODE_MUTATION,
          variables: obj,
        })
        const { token, refreshToken } = data.verifyCode
        await onLogin(this.$apolloProvider.defaultClient, token, refreshToken);
        if (this.firstLogin) {
          console.log(`first signup...`)
          localStorage.setItem("U:FL:U", 1)
          this.$router.push(`/?ac=frst-lgn`)
        } else {
          console.log(`not first signup...`)
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