<template>
  <div class="shopping-car">
    <h1 class="header">购物车</h1>
    <div class="delete" @click="deleteSelected">删除已选</div>
    <div class="content" v-if="this.list.length > 0">
      <ShoppingCard
        v-for="(c, index) in this.list"
        :key="index"
        :info="c"
        @select="isSelected"
      />
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
      seletedList: [],
    };
  },
  created() {
    this.list = Object.keys(JSON.parse(localStorage.getItem('list')));
    this.$store.commit('resetMoney');
  },
  mounted() {
    this.$bus.$on('popArr', this.popArr);
  },
  methods: {
    popArr(val) {
      this.seletedList.forEach((item) => {
        const value = item;
        if (val === item.id) {
          value.id = null;
        }
      });
    },
    isSelected(val) {
      if (!val) {
        return;
      }
      this.seletedList.push({ id: val });
    },
    deleteSelected() {
      this.$dialog.confirm({
        title: '删除商品',
        message: '确认删除选中商品吗？',
      })
        .then(() => {
          const dataArr = Object.keys(this.seletedList);
          dataArr.forEach((item) => {
            if (this.seletedList[item].id) {
              const { number } = JSON.parse(localStorage.getItem(this.seletedList[item].id));
              localStorage.setItem('sum', localStorage.getItem('sum') * 1 - number);
              const list = JSON.parse(localStorage.getItem('list'));
              this.$delete(list, this.seletedList[item].id);
              localStorage.setItem('list', JSON.stringify(list));
              localStorage.removeItem(this.seletedList[item].id);
            }
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  .delete {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    z-index: 12;
    position: absolute;
    color: rgb(119, 144, 255);
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
