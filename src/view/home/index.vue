<template>
  <div class="home">
    <van-nav-bar
        title="首页"
        fixed
        placeholder
    >
      <template slot="right">
        <van-icon
            size="24"
            name="cart-o"
            @click="$router.push('cart')"
            :badge="totalCount || ''" />
      </template>
    </van-nav-bar>
    <div
        v-for="(item,index) in productions"
        :key="item.id"
        class="home-card">
      <van-card
          :num="nums[index]"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.thumb"
      >
        <template slot="footer">
          <div class="home-card-footer">
            <van-stepper v-model="nums[index]"/>
            <van-button
                @click="addCart(item, index)"
                icon="cart-o"
                size="mini">
              加入购物车
            </van-button>
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      nums: [],
    };
  },
  methods: {
    // 使用 action 辅助函数
    // 映射 this.getProductions() 为 this.$store.dispatch('production/getProductions')
    ...mapActions('production', ['getProductions']),
    // 使用 mutation 辅助函数
    // 映射 this.addToCarts() 为 this.$store.commit('cart/addToCarts')
    ...mapMutations('cart', ['addToCarts']),
    // 添加商品到购物车
    addCart(item, index) {
      let count = this.nums[index];
      // 将商品数量置为1
      this.nums.splice(index, 1, 1);
      // 以载荷方式提交
      this.addToCarts({ ...item, count });
    },
    // 初始化商品数据
    initData() {
      // 获取商品列表数据
      this.getProductions();
      // 初始化商品步进器数值
      this.productions.forEach(() => this.nums.push(1));
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
  computed: {
    // 使用 state 辅助函数
    // 映射 this.productions 为 this.$store.state.production.productions
    ...mapState('production', ['productions']),
    // 使用 getter 辅助函数
    // 映射 this.totalCount 为 this.$store.getters['cart/totalCount']
    ...mapGetters('cart', ['totalCount']),
  },
};
</script>
<style scoped lang="less">
.home {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;

  &-card {
    margin: 10px 16px 0 16px;

    .van-card {
      border-radius: 8px;
    }

    &-footer {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
