<template>
  <div class="myInfo">
    <van-button type="danger" round class="logout" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>
<script>
import { delCookie } from '../util/userCookie';

export default {
  methods: {
    logout() {
      delCookie();
      window.location.reload();
    },
  },
};
</script>
<style lang="less" scoped>
.logout {
  width: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
