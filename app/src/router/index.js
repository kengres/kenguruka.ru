import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '../layouts/Default.vue'
import PassportLayout from "../layouts/Passport.vue";
import Home from '../pages'
import DepenseId from '../pages/_depenseId/index.vue'
import Currencies from '../pages/currencies/index.vue'
import Categories from '../pages/categories/index.vue'
import Settings from "../pages/settings/index.vue";
import { checkUserInterceptor } from './interceptors';

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
        meta: {
          userRequired: true,
        },
      },
      {
        path: "/depenses/:id",
        name: "DepenseId",
        component: DepenseId,
        meta: {
          userRequired: true,
        },
      },
      {
        path: "/currencies",
        name: "Currencies",
        component: Currencies,
        meta: {
          userRequired: true,
        },
      },
      {
        path: "/categories",
        name: "Categories",
        component: Categories,
        meta: {
          userRequired: true,
        },
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
          userRequired: true,
        },
      },
    ],
  },
  {
    path: "/passport/login",
    component: PassportLayout,
    children: [
      {
        path: "/passport/login",
        name: "PassportLogin",
        component: () => import(/* webpackChunkName: "login" */ "../pages/passport/login.vue"),
        meta: {
          title: "Login",
        },
      },
      {
        path: "/passport/signup",
        name: "PassportSignup",
        component: () => import(/* webpackChunkName: "signup" */ "../pages/passport/signup.vue"),
        meta: {
          title: "Sign up",
        },
      },
    ],
  },
  {
    path: "/passport/welcome",
    name: "PassportWelcome",
    component: () => import(/* webpackChunkName: "welcome" */ "../pages/passport/welcome.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(checkUserInterceptor);

export default router
