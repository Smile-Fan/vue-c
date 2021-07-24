<template>
  <div id="app">
    <router-view></router-view>
    <BottomBar v-show="flag" />
  </div>
</template>

<script>
import BottomBar from './components/BottomBar.vue';
import store from './store/index';

export default {
  data() {
    return {
    };
  },
  computed: {
    flag() {
      return store.state.userInfo.appkey;
    },
  },
  components: { BottomBar },
};
</script>
<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}
#app {
  width: 375px;
  height: 667px;
}
</style>
