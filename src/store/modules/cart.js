/**
 * @author Wuner
 * @date 2020/8/20 16:39
 * @description
 */
import Local from '../../utils/local';

const state = {
  productionsCart: Local.get('productionsCart') || [],
};
const getters = {
  isAllChecked(state) {
    let result = true;
    for (let production of state.productionsCart) {
      if (!production.isChecked) {
        result = false;
        break;
      }
    }
    return result;
  },
  totalCount(state) {
    return state.productionsCart.reduce((sum, { count }) => sum + count, 0);
  },
  checkedCount(state) {
    return state.productionsCart.reduce(
      (sum, { count, isChecked }) => (isChecked ? sum + count : sum),
      0,
    );
  },
  checkedPrice(state) {
    return state.productionsCart.reduce(
      (sum, { totalPrice, isChecked }) =>
        isChecked ? sum + totalPrice * 100 : sum,
      0,
    );
  },
};
const mutations = {
  updateProductionChecked(state, payload) {
    if (payload.all) {
      state.productionsCart.forEach(
        production => (production.isChecked = payload.isChecked),
      );
    } else {
      let production = state.productionsCart.find(
        value => value.id === payload.id,
      );
      production && (production.isChecked = !payload.isChecked);
    }
  },
  updateProduction(state, payload) {
    let production = state.productionsCart.find(
      value => value.id === payload.id,
    );
    production.count = payload.count;
    production.totalPrice = (production.count * production.price).toFixed(2);
  },
  addToCarts(state, payload) {
    let production = state.productionsCart.find(
      value => value.id === payload.id,
    );
    if (production) {
      // 1. productionsCart 中没有该商品，把该商品添加到数组，并增加 count，isChecked，totalPrice
      // 2. cartProducts 有该商品，让商品的数量加1，选中，计算小计
      production.count = production.count += payload.count;
      production.isChecked = true;
      production.totalPrice = (production.price * production.count).toFixed(2);
    } else {
      state.productionsCart.push({
        ...payload,
        isChecked: true,
        totalPrice: (payload.price * payload.count).toFixed(2),
      });
    }
  },
  removeFromCarts(state, payload) {
    let index = state.productionsCart.findIndex(value => value.id === payload);
    index >= 0 && state.productionsCart.splice(index, 1);
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
