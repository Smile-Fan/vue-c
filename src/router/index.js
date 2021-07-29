import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import App from '../App.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Classify from '../views/Classify.vue';
import ShoppingCar from '../views/ShoppingCar.vue';
import MyInfo from '../views/MyInfo.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/vue-wabapp',
  component: App,
  children: [

    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/vue-wabapp/Classify',
      name: 'Classify',
      component: Classify,
    },
    {
      path: '/vue-wabapp/ShoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar,
    },
    {
      path: '/vue-wabapp/MyInfo',
      name: 'MyInfo',
      component: MyInfo,
    },
    {
      path: '/vue-wabapp/Login',
      name: 'Login',
      component: Login,
    },
  ],
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next();
  } else if (store.state.userInfo.appkey) {
    next();
  } else {
    alert('请先登陆');
    next({
      name: 'Login',
    });
  }
});

export default router;
