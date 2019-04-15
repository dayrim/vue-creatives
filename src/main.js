import Vue from "vue";
import App from "./App.vue";
import store from "./data/store";
import VeeValidate from "vee-validate";
import { ValidationProvider } from "vee-validate";

Vue.use(VeeValidate);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount("#app");
