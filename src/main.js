

import Vue from 'vue'

import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSwal from 'vue-swal';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router';
import store from './store/store';
import ApiService from './services/api.service';
import { VueMaskDirective } from 'v-mask';
import { VMoney } from 'v-money';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Loading);
Vue.use(VueSwal);
Vue.directive('mask', VueMaskDirective);
Vue.directive('v-money', VMoney);

ApiService.init();
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
