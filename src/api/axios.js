import axios from 'axios';
import store from '@/store/index';
import {
  setCookie,
} from '@/util/userCookie';

const ins = axios.create();
ins.defaults.baseURL = 'https://mallapi.duyiedu.com/goods/';
// 配置拦截器
ins.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.userInfo.appkey,
    },
  };
}, (err) => {
  Promise.project(err);
});
ins.interceptors.response.use((res) => {
  const result = res.data;
  if (result.status === 'success' && result.msg === '登陆成功') {
    setCookie(result.data);
  }
  return result;
});

export default ins;
