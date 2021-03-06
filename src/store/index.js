/**
 * @author Wuner
 * @date 2020/8/20 16:38
 * @description
 */
import Vuex from 'vuex';
import Vue from 'vue';
import production from './modules/production';
import cart from './modules/cart';

Vue.use(Vuex);
import Local from '../utils/local';

const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    // 缓存cart模块状态
    mutation.type.startsWith('cart/') &&
      Local.set('productionsCart', state.cart.productionsCart);
  });
};

const state = {};
const getters = {};
const mutations = {};
const actions = {};

const store = new Vuex.Store({
  // 非生产环境添加严格模式
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  // 模块
  modules: {
    production,
    cart,
  },
  // 插件
  plugins: [myPlugin],
});

export default store;
