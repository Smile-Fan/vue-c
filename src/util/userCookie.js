import Cookie from 'js-cookie';

function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookie.set(arr[i][0], arr[i][1]);
  }
  return info;
}

function getCookie() {
  return {
    username: Cookie.get('username'),
    appkey: Cookie.get('appkey'),
    role: Cookie.get('role'),
    email: Cookie.get('email'),
  };
}

function delCookie() {
  return {
    username: Cookie.remove('username'),
    appkey: Cookie.remove('appkey'),
    role: Cookie.remove('role'),
    email: Cookie.remove('email'),
  };
}

export {
  setCookie,
  getCookie,
  delCookie,
};
