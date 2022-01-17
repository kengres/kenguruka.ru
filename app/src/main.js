import Vue from 'vue'
import VueMeta from "vue-meta";
import App from './App.vue'
import "./assets/styles/index.scss"
import './registerServiceWorker'
import router from './router'
import { createProvider } from './plugins/vue-apollo'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

export const apolloProvider = createProvider();

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
