import Vue from 'vue';
import Vuex from 'vuex';
import {
  getCookie,
  setCookie,
  delCookie,
} from '../util/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: getCookie(),
    shoppingNum: 0,
  },
  mutations: {
    add(state) {
      state.shoppingNum += 1;
    },
    pop(state) {
      state.shoppingNum -= 1;
    },
    userSetCookie(state, info) {
      state.userInfo = info;
    },
    userDelCookie(state, info) {
      state.userInfo = info;
    },
  },
  actions: {
    setUserInfo({
      commit,
    }, info) {
      commit('userSetCookie', info);
      setCookie(info);
    },
    delUserInfo({
      commit,
    }) {
      // 改store的数据
      commit('userDelCookie', delCookie());
      // 改cookie数据
    },
  },
  modules: {},
});
