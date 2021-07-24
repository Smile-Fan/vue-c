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
export async function getProInfo(value) {
  const data = await axios.get('/getGoodsList', {
    params: {
      type: value.type,
      page: value.page || 1,
      size: value.size || 10,
      sort: value.sort || null,
    },
  });
  return data;
}
// 登陆
export async function login(email, password) {
  axios.defaults.baseURL = ' https://mallapi.duyiedu.com/';
  const data = await axios.post('/passport/login', {
    email,
    password,
  });
  return data;
}
