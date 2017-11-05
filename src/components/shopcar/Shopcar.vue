<template>
  <div class="shopcar-wrapper">
    <div class="shopcar" @click="toggleList">
      <div class="leftinfo">
        <div class="car-wrapper">
          <div class="car" :class="{'highLight':totalPrice}"></div>
          <div class="num" v-show="totalNum">{{totalNum}}</div>
        </div>
        <div class="text">
          <div class="totalPrice" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
          <div class="deliveryPrice" v-show="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
        </div>
      </div>
      <div class="rightbtn" :class="payClass" @click.stop="pay">
        <span v-show="minPrice">{{disPrice}}</span>
      </div>
    </div>
    <transition name="up">
      <div class="shoplist" v-show="spread">
        <div class="list-header">
          <div class="title">购物车</div>
          <div class="empty" @click="empty">清空</div>
        </div>
        <div class="list-content">
          <ul class="list-menu">
            <li class="list-item" v-for="food in sellectFood">
              <div class="text">{{food.name}}</div>
              <div class="price">￥{{food.price*food.num}}</div>
              <div class="carctr-wrapper">
                <carctr :food="food"></carctr>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="shopcar-bg" v-show="spread" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script lang="babel" type="text/ecmascript-6">
  import carctr from '../carctr/Carctr'
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      sellectFood: {
        type: Array
      }
    },
    data () {
      return {
        fold: true
      }
    },
    components: {
      carctr
    },
    methods: {
      toggleList () {
        if (!this.totalNum) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.sellectFood.forEach((food) => {
          food.num = 0
        })
      },
      pay () {
        if (this.minPrice < this.totalPrice) {
          window.alert(`需支付${this.totalPrice}元`)
        }
      }
    },
    computed: {
      disPrice () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`
        } else if (this.minPrice - this.totalPrice > 0) {
          let dis = this.minPrice - this.totalPrice
          return `还差￥${dis}起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.minPrice) {
          if (this.minPrice - this.totalPrice > 0) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        }
      },
      totalNum () {
        let result = 0
        this.sellectFood.forEach((food) => {
          if (!food.num) {
            result = 0
          } else {
            result += food.num
          }
        })
        return result
      },
      totalPrice () {
        let result = 0
        this.sellectFood.forEach((food) => {
          if (!food.num) {
            result = 0
          } else {
            result += food.num * food.price
          }
        })
        return result
      },
      spread () {
        if (!this.totalNum) {
          this.fold = true
          return false
        }
        let result = !this.fold
        return result
      }
    }
  }
</script>
<style scoped>
  .shopcar-wrapper{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;

    z-index: 40;
  }
  .shopcar{
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    color: rgba(255,255,255,0.4);
    background: #141d27;
  }
  .leftinfo{
    flex: 1;
    padding: 12px 12px 12px 80px;
    box-sizing: border-box;
  }
  .leftinfo .car-wrapper{
    position: absolute;
    left: 12px;
    bottom: 2px;
    width: 56px;
    height: 56px;
    padding: 6px;
    border-radius: 50%;
    background: #141d27;
    box-sizing: border-box;
  }
  .leftinfo .car-wrapper .car{
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 50%;
    background: #2b333b;
  }
  .leftinfo .car-wrapper .highLight{
    color: #fff;
    background: rgb(0,160,250);
  }
  .leftinfo .car-wrapper .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    font-size: 9px;
    font-weight: 700;
    text-align: center;
    color: rgb(255,255,255);
    line-height: 16px;
    border-radius: 14px;
    background-color: rgb(240,20,20);
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
  }
  .leftinfo .text{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .leftinfo .totalPrice{
    flex:0;
    padding-right: 12px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .leftinfo .active{
    color: #fff;
  }
  .leftinfo .deliveryPrice{
    flex:1;
    padding:0 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    box-sizing: border-box;
  }
  .rightbtn{
    flex: 0 0 105px;
    padding: 12px;
    width: 105px;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    box-sizing: border-box;
    background: #2b333b;
  }
  .not-enough{
    background: #2b333b;
  }
  .enough{
    color: #fff;
    background: #00b43c;
  }
  .shopcar-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(7,17,27,0.6);
    z-index:-2;
    transition: opacity .4s;
  }
  .fade-enter-active,.fade-leave-active{
    opacity: 1;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .shoplist{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    transform: translate3D(0,-100%,0);

  }
  .up-enter-active,.up-leave-active{
    transition: all .4s;
    transform: translate3D(0,-100%,0);
  }
  .up-enter,.up-leave-to{
    transform: translate3D(0,0,0);
  }
  .shoplist .list-header{
    height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    box-sizing: border-box;
  }
  .shoplist .list-header .title{
    float: left;
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 40px;
  }
  .shoplist .list-header .empty{
    float: right;
    font-size: 12px;
    color: rgb(0,160,220);
    line-height: 40px;
  }
  .shoplist .list-content{
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: auto;
  }
  .shoplist .list-content::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .shoplist .list-content .list-item{
    position: relative;
    padding: 12px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .shoplist .list-content .list-item .text{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .shoplist .list-content .list-item .price{
    position: absolute;
    top:12px;
    right: 60px;
    height: 24px;
    padding: 0 12px 0 18px;
    font-size: 10px;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .shoplist .list-content .carctr-wrapper{
    position: absolute;
    top:15px;
    right: 0;
  }
</style>
