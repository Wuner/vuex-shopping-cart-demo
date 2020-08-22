/**
 * @author Wuner
 * @date 2020/8/20 16:39
 * @description
 */
import Local from '../../utils/local';

const state = {
  // 购物车商品数组
  productionsCart: Local.get('productionsCart') || [],
};
const getters = {
  /**
   * 是否选中所有商品
   * @param state
   * @returns {boolean}
   */
  isAllChecked(state) {
    let result = true;
    for (let production of state.productionsCart) {
      // 当购物车中有一个商品未选中，就返回false
      if (!production.isChecked) {
        result = false;
        break;
      }
    }
    return result;
  },
  /**
   * 商品总数
   * @param state
   * @returns {number}
   */
  totalCount(state) {
    return state.productionsCart.reduce((sum, { count }) => sum + count, 0);
  },
  /**
   * 选中商品的总数
   * @param state
   * @returns {number}
   */
  checkedCount(state) {
    return state.productionsCart.reduce(
      (sum, { count, isChecked }) => (isChecked ? sum + count : sum),
      0,
    );
  },
  /**
   * 选中商品的价格合计
   * @param state
   * @returns {number}
   */
  checkedPrice(state) {
    return state.productionsCart.reduce(
      (sum, { totalPrice, isChecked }) =>
        isChecked ? sum + totalPrice * 100 : sum,
      0,
    );
  },
};
const mutations = {
  /**
   * 更新商品的选中状态
   * @param state
   * @param payload
   */
  updateProductionChecked(state, payload) {
    // 全选
    if (payload.all) {
      state.productionsCart.forEach(
        production => (production.isChecked = payload.isChecked),
      );
    } else {
      // 单选
      let production = state.productionsCart.find(
        value => value.id === payload.id,
      );
      production && (production.isChecked = !payload.isChecked);
    }
  },
  /**
   * 更新购物车中的商品数据
   * @param state
   * @param payload
   */
  updateProduction(state, payload) {
    let production = state.productionsCart.find(
      value => value.id === payload.id,
    );
    production.count = payload.count;
    production.totalPrice = (production.count * production.price).toFixed(2);
  },
  /**
   * 将商品添加到购物车
   * @param state
   * @param payload
   */
  addToCarts(state, payload) {
    let production = state.productionsCart.find(
      value => value.id === payload.id,
    );
    // 1. productionsCart 中没有该商品，把该商品添加到数组，并增加 count，isChecked，totalPrice
    // 2. cartProducts 有该商品，让商品的数量加payload.count，选中，计算小计
    // 3. 计算小计时，保留两位小数
    if (production) {
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
  /**
   * 移除购物车中的商品
   * @param state
   * @param payload
   */
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
