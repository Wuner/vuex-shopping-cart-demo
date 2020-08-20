/**
 * @author Wuner
 * @date 2020/8/21 0:34
 * @description
 */
import Vue from 'vue';

let Local = {};
Local.get = key => {
  let value = localStorage.getItem(key);
  let data;
  if (typeof value === 'string') {
    try {
      data = JSON.parse(value);
    } catch (e) {
      data = value;
    }
  } else {
    data = value;
  }
  return data;
};
Local.set = (key, value) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
Local.remove = key => {
  localStorage.removeItem(key);
};

Vue.prototype.$Local = Local;

export default Local;
