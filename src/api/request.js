import Axios from 'axios'; // 原生的用来解决登陆问题
import axios from './axios';
// 获取二级导航
export async function getSecNav(value) {
  const data = await axios.get('/getsidebar', {
    params: {
      type: value,
    },
  });
  return data;
}
// 获取数据
export async function getProInfo(value) {
  const data = await axios.get('/getGoodsList', {
    params: {
      type: value.type,
      page: value.page || 1,
      size: value.size || 10,
      sort: value.sort || 'all',
    },
  });
  return data;
}
// 登陆
export async function login(email, password) {
  const data = await Axios.post('https://mallapi.duyiedu.com/passport/login', {
    email,
    password,
  });
  return data;
}
