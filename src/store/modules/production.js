/**
 * @author Wuner
 * @date 2020/8/20 16:39
 * @description
 */
const state = {
  // 商品数组
  productions: [],
};
const getters = {};
const mutations = {
  /**
   * 设置商品数组
   * @param state
   * @param payload
   */
  setProductions(state, payload) {
    state.productions = payload.map(val => {
      // 价格保留两位小数
      val.price = val.price.toFixed(2);
      return val;
    });
  },
};
const actions = {
  /**
   * 调用接口获取商品
   * @param commit
   * @returns {Promise<void>}
   */
  async getProductions({ commit }) {
    const result = await this._vm.$http.get(
      `http://${process.env.HOST}:3000/products`,
      {},
    );
    commit('setProductions', result);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
