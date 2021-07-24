<template>
  <div class="bottom-bar">
    <van-tabbar fixed route>
      <van-tabbar-item
        :to="c.router"
        :icon="c.icon"
        v-for="(c, index) in list"
        :key="index"
        :badge="c.name === '购物车' ? num : ''"
        >{{ c.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  data() {
    return {
      list: [
        {
          name: '首页', icon: 'home-o', badge: '', router: '/',
        },
        {
          name: '分类', icon: 'apps-o', badge: '', router: '/Classify',
        },
        {
          name: '购物车', icon: 'cart-o', badge: '', router: '/ShoppingCar',
        },
        {
          name: '我的', icon: 'user-circle-o', badge: '', router: '/MyInfo',
        },
      ],
    };
  },
  computed: {
    num() {
      return store.state.shoppingNum;
    },
  },
};
</script>

<style>
</style>
