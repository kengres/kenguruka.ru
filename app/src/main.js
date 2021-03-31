import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createProvider } from './plugins/vue-apollo'

Vue.config.productionTip = false

export const apolloProvider = createProvider();

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
