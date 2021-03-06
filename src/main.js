import Vue from 'vue';
import Vant from 'vant';
import 'lib-flexible';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vant/lib/index.css';

Vue.prototype.$bus = new Vue({});
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
