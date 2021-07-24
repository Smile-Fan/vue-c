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
        <span class="sale">库存 {{ info.sale }} 件</span>
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
        <van-button size="mini" :disabled="number === 0" @click="popNum"
          >-</van-button
        >
        {{ number }}
        <van-button size="mini" @click="addNum" :disabled="number === info.sale"
          >+</van-button
        >
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
    };
  },
  props: ['info'],
  computed: {
    imgUrl() {
      return this.info.images[0];
    },
  },
  methods: {
    addNum() {
      this.number += 1;
      this.$store.commit('add');
    },
    popNum() {
      this.number -= 1;
      this.$store.commit('pop');
    },
  },
};
</script>

<style lang="less" scoped>
.card-content {
  box-sizing: border-box;
  margin: 2px 0px;
  .sale {
    font-size: 8px;
  }
}
</style>
