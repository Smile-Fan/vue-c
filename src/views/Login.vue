<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '../api/request';
import '../store/index';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async onSubmit(values) {
      const data = await login(values.email, values.password)
        .then((res) => res);
      if (data.status === 'success') {
        this.$store.dispatch('setUserInfo', data.data).then(() => {
          this.$router.push('/Classify');
        }, (error) => {
          Promise.reject(error);
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 90%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .input {
    margin: 10px 0px;
  }
}
</style>
