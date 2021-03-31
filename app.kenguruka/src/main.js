import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/styles/index.scss";

console.log(`[MAIN]..`)

createApp(App)
  .use(router)
  .mount("#app");
