<template>
  <div>
    <div class="goods-wrapper">
      <div class="nav">
        <ul class="nav-list">
          <li class="nav-item" v-for="(item,index) in goods" :class="{'current':currentIndex==index}" @click="chooseIndex(index)">
          <span class="text">
            <span class="icon" :class="'icon-'+item.type" v-if="item.type+1"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="goods" ref="goods">
        <div class="foods-list" v-for="item in goods">
          <div class="type" ref="type">{{item.name}}</div>
          <div class="foods-wrapper">
            <div class="food" v-for="food in item.foods" @click="choose(food)">
              <div class="image">
                <img :src="food.image" width="60" height="60">
              </div>
              <div class="detail" >
                <p class="name">{{food.name}}</p>
                <p class="description" v-if="food.description">{{food.description}}</p>
                <p class="sellInfo">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </p>
                <p class="nowPrice">
                  <span class="price">￥{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </p>
              </div>
              <div class="carctr-wrapper">
                <carctr :food="food"></carctr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopcar :sellectFood="sellectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    <food :food="chooseFood" ref="food"></food>
  </div>
</template>
<script lang="babel" type="text/ecmascript-6">
  import shopcar from '../shopcar/Shopcar'
  import carctr from '../carctr/Carctr'
  import food from '../food/Food'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        chooseFood: {},
        currentIndex: 0
      }
    },
    components: {
      shopcar,
      carctr,
      food
    },
    methods: {
      getGoods () {
        this.$ajax({
          method: 'get',
          url: '/api/goods'
        }).then((res) => {
          this.goods = res.data.data
          this.$nextTick(() => {
            this.getGoodsHeight()
          })
        })
      },
      getGoodsHeight () {
        this.listHeight = [0]
        let goods = this.$refs.goods
        let oHeight = 0
        let foodslist = goods.getElementsByClassName('foods-list')
        for (let i = 0; i < foodslist.length; i++) {
          oHeight += foodslist[i].clientHeight
          this.listHeight.push(oHeight)
        }
      },
      myScroll () {
        this.$nextTick(() => {
          var that = this
          let goods = this.$refs.goods
          goods.onscroll = function () {
            for (let i = 0; i < that.listHeight.length; i++) {
              if (this.scrollTop >= that.listHeight[i] && this.scrollTop < that.listHeight[i + 1]) {
                that.currentIndex = i
              }
            }
          }
        })
      },
      choose (food) {
        this.chooseFood = food
        this.$refs.food.foodShow()
      },
      chooseIndex (index) {
        this.currentIndex = index
        this.$refs.goods.scrollTop = this.listHeight[index]
      }
    },
    computed: {
      sellectFood () {
        let sFood = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.num) {
              sFood.push(food)
            }
          })
        })
        return sFood
      }
    },
    mounted () {
      this.getGoods()
      this.myScroll()
    }
  }
</script>

<style scoped>
  .goods-wrapper{
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    display: flex;
    border-top: 1px solid rgba(7,17,27,0.1);
    background: #f3f5f7;
  }
  .nav{
    flex: 0 0 80px;
    width: 80px;
    height: 100%;
    overflow: auto;
  }
  .nav::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .nav .nav-item{
    padding: 0 12px;
    display: table;
    width: 56px;
    height: 54px;
  }
  .nav .current{
    background: #fff;
  }
  .nav .text{
    display: table-cell;
    vertical-align: middle;
    font-size: 12px;
    line-height: 14px;
    color: rgb(7,17,27);
    font-weight: 200;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .nav .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .goods{
    flex:1;
    height: 100%;
    overflow: auto;
  }
  .goods::-webkit-scrollbar{
    width:0;
    height:0;
  }
  .goods .type{
    border-left: 2px solid #d9dde1;
    padding-left: 14px;
    font-size: 12px;
    color: rgb(147,153,159);
    height: 26px;
    line-height: 26px;
  }
  .goods .foods-wrapper{
    padding: 0 18px;
    background: #fff;
    box-sizing: border-box;
  }
  .goods .food{
    position: relative;
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .goods .food:last-child{
    border-bottom: none;
    margin-bottom: 0;
  }
  .goods .image{
    flex: 0 0 60px;
    font-size: 0;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  .goods .detail{
    flex: 1;
  }
  .goods .name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin: 2px 0 8px 0;
  }
  .goods .description{
    overflow: hidden;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
    text-overflow: ellipsis;
  }
  .goods .sellInfo{
    font-size: 0px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .goods .sellCount{
    font-size: 10px;
    margin-right: 12px;
  }
  .goods .rating{
    font-size: 10px;
  }
  .goods .nowPrice{
    font-size: 0;
  }
  .goods .price{
    font-size: 14px;
    color: rgb(240,20,20);
    font-weight: 700;
    line-height: 24px;
    margin-right: 8px;
  }
  .goods .oldPrice{
    font-size: 10px;
    color: rgb(147,153,159);
    font-weight: 700;
    line-height: 24px;
    text-decoration: line-through;
  }
  .goods .carctr-wrapper{
    position: absolute;
    right: 0;
    bottom: 18px;
    height: 18px;
  }
  .icon-0{
    background-image: url("decrease_3@2x.png");
  }
  .icon-1{
    background-image: url("discount_3@2x.png");
  }
  .icon-2{
    background-image: url("guarantee_3@2x.png");
  }
  .icon-3{
    background-image: url("invoice_3@2x.png");
  }
  .icon-4{
    background-image: url("special_3@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
    .icon-0{
      background-image: url("decrease_3@3x.png");
    }
    .icon-1{
      background-image: url("discount_3@3x.png");
    }
    .icon-2{
      background-image: url("guarantee_3@3x.png");
    }
    .icon-3{
      background-image: url("invoice_3@3x.png");
    }
    .icon-4{
      background-image: url("special_3@3x.png");
    }
  }
</style>
