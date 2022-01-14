import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '../layouts/Default'
import Home from '../pages/Home.vue'
import Currencies from '../pages/Currencies.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LayoutDefault,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/currencies',
        name: 'Currencies',
        component: Currencies,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
