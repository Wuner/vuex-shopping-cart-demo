/**
 * @author Wuner
 * @date 2020/8/20 16:39
 * @description
 */
const state = {
  productions: [],
};
const getters = {};
const mutations = {
  setProductions(state, payload) {
    state.productions = payload.map(val => {
      val.price = val.price.toFixed(2);
      return val;
    });
  },
};
const actions = {
  async getProductions({ commit }) {
    const result = await this._vm.$http.get(
      'http://127.0.0.1:3000/products',
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
