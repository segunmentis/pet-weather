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
    key: "AIzaSyA29W_mShNk-CeyfzgBGwo4jEqJ9zK-u4o",
    libraries: "places", // necessary for places input
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
