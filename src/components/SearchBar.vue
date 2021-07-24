<template>
  <div class="search-bar">
    <van-search
      v-model="value"
      placeholder="超甜大西瓜1.9一斤"
      shape="round"
      class="search-btn"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="less" scoped>
.search-bar {
  width: 375px;
}
</style>
