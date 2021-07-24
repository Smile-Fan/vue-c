<template>
  <div class="NavList">
    <div
      v-for="(c, index) in listData"
      :key="index"
      class="title"
      @click="handleClick(index)"
      :class="active === index ? 'active' : ''"
    >
      {{ index === 0 ? '全部' : c }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['listData'],
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    handleClick(index) {
      this.active = index;
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
