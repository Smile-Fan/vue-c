<template>
  <div class="NavList">
    <div
      v-for="(c, index) in listData"
      :key="index"
      class="title"
      @click="handleClick(index, c)"
      :class="active === index ? 'active' : ''"
    >
      {{ index === 0 ? '全部' : c }}
    </div>
  </div>
</template>

<script>
import { getProInfo } from '../api/request';

export default {
  props: ['listData'],
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    listData() {
      this.active = 0;
    },
  },
  methods: {
    async handleClick(index, c) {
      this.active = index;
      const data = await getProInfo({ type: c }).then((res) => res);
      this.$emit('data', { data, c });
    },
  },
};
</script>

<style lang="less" scoped>
.NavList {
  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    box-sizing: border-box;
  }
  .active {
    background-color: #fea;
    color: red;
    border-left: 3px solid red;
  }
}
</style>
