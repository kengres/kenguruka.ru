import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '../layouts/Default'
import Home from '../pages'
import Currencies from '../pages/Currencies.vue'
import Categories from '../pages/categories'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: LayoutDefault,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/currencies",
        name: "Currencies",
        component: Currencies,
      },
      {
        path: "/categories",
        name: "Categories",
        component: Categories,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
