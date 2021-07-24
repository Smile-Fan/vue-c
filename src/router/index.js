import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/Classify',
  name: 'Classify',
  component: () => import('../views/Classify.vue'),
},
{
  path: '/ShoppingCar',
  name: 'ShoppingCar',
  component: () => import('../views/ShoppingCar.vue'),
},
{
  path: '/MyInfo',
  name: 'MyInfo',
  component: () => import('../views/MyInfo.vue'),
},
{
  path: '/Login',
  name: 'Login',
  component: Login,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') {
    next();
  } else if (store.state.userInfo.appkey) {
    next();
  } else {
    alert('请先登陆');
    next('/Login');
  }
});

export default router;
