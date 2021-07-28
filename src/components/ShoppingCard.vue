<template>
  <div class="shopping-card">
    <van-checkbox v-model="selected" class="checkbox"></van-checkbox>
    <van-card
      :num="dataInfo.number"
      :price="dataInfo.price_off || dataInfo.price"
      :desc="dataInfo.desc"
      :title="dataInfo.title"
      :thumb="this.imgUrl"
    >
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(c, index) in dataInfo.tags"
          :key="index"
        >
          {{ c }}</van-tag
        >
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: {},
      selected: true,
    };
  },
  props: ['info'],
  created() {
    this.dataInfo = JSON.parse(localStorage.getItem(this.info));
    if (this.dataInfo.price_off && this.selected) {
      this.$store.commit('addMoney', this.dataInfo.price_off * this.number);
    } else if (this.dataInfo.price && this.selected) {
      this.$store.commit('addMoney', this.dataInfo.price * this.number);
    }
    this.$emit('select', this.info);
  },
  computed: {
    imgUrl() {
      return this.dataInfo.images[0];
    },
    number() {
      return this.dataInfo.number;
    },
  },
  watch: {
    selected(newVal) {
      if (!newVal) {
        // 不选中
        this.$bus.$emit('popArr', this.info);
      }
      if (newVal) {
        this.$emit('select', this.info);
      } else {
        this.$emit('select', '');
      }
      if (!newVal) {
        if (this.dataInfo.price_off) {
          this.$store.commit('popMoney', this.dataInfo.price_off * this.number);
        } else {
          this.$store.commit('popMoney', this.dataInfo.price * this.number);
        }
      } else if (this.dataInfo.price_off) {
        this.$store.commit('addMoney', this.dataInfo.price_off * this.number);
      } else {
        this.$store.commit('addMoney', this.dataInfo.price * this.number);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.shopping-card {
  position: relative;
  padding-left: 40px;
  border: 1px solid #eee;
  box-sizing: border-box;
  .checkbox {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
}
</style>
