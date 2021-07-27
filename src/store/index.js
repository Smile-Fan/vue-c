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
    shoppingList: {},
    sumMoney: 0,
  },
  mutations: {
    startList(state) {
      state.shoppingList = {
        ...JSON.parse(localStorage.getItem('list')),
      };
    },
    addMoney(state, info) {
      state.sumMoney += info;
    },
    popMoney(state, info) {
      state.sumMoney -= info;
    },
    resetMoney(state) {
      state.sumMoney = 0;
    },
    add(state, info) {
      if (info) {
        state.shoppingNum += info;
      } else {
        state.shoppingNum += 1;
      }
    },
    pop(state) {
      if (state.shoppingNum - 1 < 0) {
        return;
      }
      state.shoppingNum -= 1;
    },
    addList(state, info) {
      Vue.set(state.shoppingList, `${info}`, `${info}`);
    },
    removeList(state, info) {
      Vue.delete(state.shoppingList, info);
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
