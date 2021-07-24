<template>
  <div class="card-item" @click="handelClick">
    <van-image
      round
      :src="src"
      class="image"
      width="60px"
      height="60px"
      :class="this.active ? 'active' : ''"
    />
    <span class="text" :class="this.active ? 'active-text' : ''">{{
      this.text
    }}</span>
  </div>
</template>

<script>
export default {
  props: ['src', 'text', 'index', 'active'],
  methods: {
    handelClick() {
      const obj = {
        index: this.index,
        text: this.text,
      };
      this.$emit('click', obj);
    },
  },
};
</script>

<style lang="less" scoped>
.card-item {
  text-align: center;
  box-sizing: border-box;
  .image {
    box-sizing: inherit;
  }
  .active {
    border: 3px solid #a11;
  }
  .active-text {
    color: #fff;
    background-color: #5a0;
  }
}
</style>
