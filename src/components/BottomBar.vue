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

export default {
  data() {
    return {
      num: 0,
      list: [
        {
          name: '首页', icon: 'home-o', badge: '', router: { name: 'Home' },
        },
        {
          name: '分类', icon: 'apps-o', badge: '', router: { name: 'Classify' },
        },
        {
          name: '购物车', icon: 'cart-o', badge: '', router: { name: 'ShoppingCar' },
        },
        {
          name: '我的', icon: 'user-circle-o', badge: '', router: { name: 'MyInfo' },
        },
      ],
    };
  },
  created() {
    if (localStorage.getItem('sum') * 1 !== 0) {
      this.$store.commit('add', localStorage.getItem('sum') * 1);
      this.refresh();
    }
  },
  mounted() {
    this.$bus.$on('handelRefresh', this.refresh);
  },
  computed: {
  },
  methods: {
    refresh() {
      this.num = localStorage.getItem('sum');
    },
  },
};
</script>

<style>
</style>
