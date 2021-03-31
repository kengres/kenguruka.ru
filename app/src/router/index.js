import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LayoutDefault from '../layouts/Default'

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
