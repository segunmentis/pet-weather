import Vue from "vue";
import App from "./App.vue";
import routes from "./router/index";
import VueRouter from "vue-router";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY,
    libraries: "places", 
  },
});

require("jquery");
require("bootstrap");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: new VueRouter(routes),
}).$mount("#app");
