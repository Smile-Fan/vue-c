<template>
  <div class="card-content">
    <van-card
      :price="info.price_off || info.price"
      :origin-price="info.price_off ? info.price : null"
      :desc="info.desc"
      :title="info.title"
      :thumb="imgUrl"
    >
      <template #num>
        <span class="inventory sum">库存 {{ info.inventory }} 件</span>
        <span class="sale sum"
          >销量
          {{
            info.sale >= 10000
              ? Math.floor(info.sale / 10000) + '万+'
              : info.sale
          }}
        </span>
      </template>
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(c, index) in info.tags"
          :key="index"
          >{{ c }}</van-tag
        >
      </template>
      <template #footer>
        <van-button
          size="mini"
          round
          :disabled="info.number === 0"
          @click="popNum"
          >-</van-button
        >
        {{ info.number }}
        <van-button
          size="mini"
          round
          @click="addNum"
          :disabled="info.number === info.inventory"
          >+</van-button
        >
      </template>
    </van-card>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  data() {
    return {
      info: [],
      numTip: null,
    };
  },
  props: ['dataInfo'],
  created() {
    if (localStorage.getItem(this.dataInfo.id)) {
      const data = JSON.parse(localStorage.getItem(this.dataInfo.id));
      this.info = { ...this.dataInfo, number: data.number };
    } else {
      this.info = { ...this.dataInfo, number: 0 };
    }
  },
  watch: {
    dataInfo(newVal) {
      if (localStorage.getItem(newVal.id)) {
        const data = JSON.parse(localStorage.getItem(newVal.id));

        this.info = { ...newVal, number: data.number };
      } else {
        this.info = { ...newVal, number: 0 };
      }
    },
  },
  computed: {
    imgUrl() {
      return this.info.images[0];
    },
  },
  methods: {
    addNum() {
      this.info.number += 1;
      this.$store.commit('add');
      if (localStorage.getItem('sum')) { localStorage.setItem('sum', store.state.shoppingNum); }
      const data = JSON.stringify({ ...this.info, number: this.info.number });
      localStorage.setItem(this.info.id, data);
      this.$store.commit('addList', this.info.id);
      localStorage.setItem('list', JSON.stringify(store.state.shoppingList));
      localStorage.setItem('sum', store.state.shoppingNum);
      this.$bus.$emit('handelRefresh');
    },
    popNum() {
      this.info.number -= 1;
      this.$store.commit('pop');
      localStorage.setItem('sum', store.state.shoppingNum);
      if (this.info.number === 0) {
        localStorage.removeItem(this.info.id);
        this.$store.commit('removeList', this.info.id);
        localStorage.setItem('list', JSON.stringify(store.state.shoppingList));
      } else {
        const data = JSON.stringify({ ...this.info, number: this.info.number });
        localStorage.setItem(this.info.id, data);
      }
      this.$bus.$emit('handelRefresh');
      this.$bus.$emit('refreshBuy');
    },
  },
};
</script>

<style lang="less" scoped>
.card-content {
  box-sizing: border-box;
  margin: 2px 0px;
  .sum {
    font-size: 8px;
    margin-left: 5px;
  }
}
</style>
