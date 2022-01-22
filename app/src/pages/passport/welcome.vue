<template>
  <div class="welcome">
    <h1 class="welcome__title is-primary--text">Welcome</h1>
    <swiper :options="swiperOptions" ref="mySwiper">
      <template v-for="(item, i) in slides">
        <swiper-slide :key="i" class="welcome__slide wl-slide">
          <div class="wl-slide__img-wrapper">
            <img src="@/assets/images/expenses-list.svg" alt="expenses list" class="wl-slide__img" />
          </div>
          <h2 class="wl-slide__title">{{ item.title }}</h2>
          <p class="wl-slide__description">
            <span class="wl-slide__name">Kando Finances</span> {{ item.description }}
          </p>
        </swiper-slide>
      </template>
      <div class="swiper-pagination wl-slide__pagination" slot="pagination"></div>
    </swiper>
    <div class="welcome__actions">
      <div class="welcom__btn">
        <ka-button type="primary" passport @click="onSignup">Sign up</ka-button>
      </div>
      <div class="welcom__btn">
        <ka-button type="text" passport @click="onLogin">or Login</ka-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { SEEN_WELCOME } from '@/utils/constants'

export default {
  name: "PassportWelcome",
  components: { Swiper, SwiperSlide },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      slides: [
        {
          title: 'Your finances in one place',
          description: 'makes managing personal finances as easy as possible!',
        },
        {
          title: 'Get totals each month',
          description: 'groups your expenses by month!',
        },
        {
          title: 'Currency and category support',
          description: 'adds currency to expenses and groups them by category!',
        },
      ],
    }
  },
  methods: {
    saveSeen () {
      localStorage.setItem(SEEN_WELCOME, 1)
    },
    onLogin () {
      this.saveSeen()
      this.$router.push('/passport/login')
    },
    onSignup () {
      this.saveSeen()
      this.$router.push('/passport/signup')
    },
  },
}
</script>

<style lang="scss">
.welcome {
  --swiper-theme-color: var(--color-primary);
  .swiper-wrapper {
    padding-bottom: 28px;
  }
}
</style>

<style lang="scss" scoped>
.welcome {
  --padding-size: 16px;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  background-color: #E8FEF1;
  position: relative;

  &__title {
    font-size: 36px;
    padding: var(--padding-size);
    margin-bottom: 16px;
    text-align: center;
  }

  &__slide {
    min-height: 100px;
  }
  &__actions {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 var(--padding-size) 20px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
}
.wl-slide {
  min-height: 200px;
  padding: 0 var(--padding-size);
  text-align: center;
  &__img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    &-wrapper {
      width: 95%;
      margin: 0 auto;
      background-color: #fff;
      padding: 12px;
      border-radius: 12px;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.09);
      margin-bottom: 32px;
    }
  }
  &__title {
    font-weight: 700;
    margin-bottom: 24px;
    color: #333333;
  }
  &__description {
    font-weight: 400;
    margin-bottom: 24px;
    color: #5D5D5D;
  }
  &__name {
    color: #FFA631;
  }
}
</style>