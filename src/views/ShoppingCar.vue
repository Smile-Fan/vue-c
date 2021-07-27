<template>
  <div class="shopping-car">
    <h1 class="header">购物车</h1>
    <div class="content">
      <ShoppingCard v-for="(c, index) in this.list" :key="index" :info="c" />
    </div>
    <van-submit-bar
      :price="this.$store.state.sumMoney * 100"
      button-text="提交订单"
      class="submit-bar"
    />
  </div>
</template>
<script>

import ShoppingCard from '../components/ShoppingCard.vue';

export default {
  data() {
    return {
      list: {},
    };
  },
  created() {
    this.list = Object.keys(JSON.parse(localStorage.getItem('list')));
    this.$store.commit('resetMoney');
  },
  mounted() {
  },
  methods: {
  },
  components: {
    ShoppingCard,
  },
  computed: {
  },
};
</script>

<style lang="less" scoped>
.shopping-car {
  width: 375px;
  height: 617px;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    z-index: 10;
    background-color: #fff;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 527px;
    top: 50px;
    overflow: auto;
  }
  .submit-bar {
    position: fixed;
    bottom: 50px;
  }
}
</style>
