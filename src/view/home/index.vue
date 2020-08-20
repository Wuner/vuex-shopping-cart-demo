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
    ...mapActions('production', ['getProductions']),
    ...mapMutations('cart', ['addToCarts']),
    addCart(item, index) {
      let count = this.nums[index];
      this.nums.splice(index, 1, 1);
      this.addToCarts({ ...item, count });
    },
  },
  created() {
    this.getProductions();
    this.productions.forEach(() => this.nums.push(1));
  },
  mounted() {},
  computed: {
    ...mapState('production', ['productions']),
    ...mapState('cart', ['productionsCart']),
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
