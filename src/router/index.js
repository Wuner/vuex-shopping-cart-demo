import Vue from 'vue';
import Router from 'vue-router';
import Home from '../view/home';
import Cart from '../view/cart';

Vue.use(Router); // 启用router插件

// 以下是路由配置
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        title: '购物车',
      },
    },
  ],
});

export default router;
