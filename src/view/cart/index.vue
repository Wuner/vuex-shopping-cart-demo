<template>
  <div class="cart">
    <van-nav-bar
        left-arrow
        @click-left="$router.back()"
        title="购物车"
        fixed
        placeholder
    />
    <div
        v-for="item in productionsCart"
        :key="item.id"
        class="cart-card">

      <van-swipe-cell>
        <van-card
            :num="item.num"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.thumb"
        >
          <template slot="footer">
            <div class="cart-card-footer">
              <div class="cart-card-footer-left">
                <van-checkbox
                    @click="updateProductionChecked(item)"
                    :value="item.isChecked"
                    :name="item.id" />
                <span class="total-price">小计: ￥{{item.totalPrice}}</span>
              </div>
              <van-stepper
                  @change="onChange($event, item.id)"
                  :default-value="item.count"/>
            </div>
          </template>
        </van-card>
        <template slot="right">
          <van-button
              @click="removeFromCarts(item.id)"
              square
              text="删除"
              type="danger"
              class="delete-button"/>
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="checkedPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox
          @click="updateProductionChecked({ all: true, isChecked: !isAllChecked })"
          :value="isAllChecked"
      >
        全选
      </van-checkbox>
      <template slot="tip">
        <span>已选 <span>{{ checkedCount }}</span> 件商品</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    // 使用 mutation 辅助函数
    // 映射 this.updateProduction() 为 this.$store.commit('cart/updateProduction')
    // 映射 this.updateProductionChecked() 为 this.$store.commit('cart/updateProductionChecked')
    // 映射 this.removeFromCarts() 为 this.$store.commit('cart/removeFromCarts')
    ...mapMutations('cart', [
      'updateProduction',
      'updateProductionChecked',
      'removeFromCarts',
    ]),
    onSubmit() {},
    // 监听步进器数据改变，更新购物车中的商品数据
    onChange(count, id) {
      typeof count === 'number' && this.updateProduction({ count, id });
    },
  },
  created() {},
  mounted() {},
  computed: {
    // 使用 state 辅助函数
    // 映射 this.productionsCart 为 this.$store.state.cart.productionsCart
    ...mapState('cart', ['productionsCart']),
    // 使用 getter 辅助函数
    // 映射 this.isAllChecked 为 this.$store.getters['cart/isAllChecked']
    // 映射 this.checkedCount 为 this.$store.getters['cart/checkedCount']
    // 映射 this.checkedPrice 为 this.$store.getters['cart/checkedPrice']
    ...mapGetters('cart', ['isAllChecked', 'checkedCount', 'checkedPrice']),
  },
};
</script>
<style scoped lang="less">
.cart {
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
      justify-content: space-between;

      &-left {
        display: flex;
        align-items: center;

        .total-price {
          margin-left: 16px;
          color: #ee0a24;
          font-size: 14px;
        }
      }
    }

    .delete-button {
      height: 100%;
    }
  }
}
</style>
