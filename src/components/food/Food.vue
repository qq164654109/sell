<template>
  <transition name="leftslide">
    <div class="food" v-show="foodFlag">
      <div class="food-content">
        <div class="food-img">
          <img :src="food.image" width="100%" height="325" alt="">
          <div class="back" @click="hide"><</div>
        </div>
        <div class="food-detail">
          <div class="food-name">{{food.name}}</div>
          <div class="sell-info">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="nowPrice">
            <span class="price">￥{{food.price}}</span>
            <span class="oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="carctr-wrapper" v-show="food.num>=1">
            <carctr :food="food"></carctr>
          </div>
          <div class="buy" v-show="!food.num" @click="addOne">
            <span>放入购物车</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="food-info" v-show="food.info">
        <div class="title">商品介绍</div>
        <p class="text">{{food.info}}</p>
      </div>
      <div class="line" v-show="food.info"></div>
      <div class="food-rating">
        <div class="rating-header">
          <div class="title">商品评价</div>
        </div>
        <ratingselect @changeType="changeType" @changeText="changeText" :rating-type="ratingType" :hastext="hastext" :desc="desc" :ratings="food.ratings"></ratingselect>
        <div class="rating-content">
          <ul v-show="food.ratings">
            <li class="ratings-item" v-for="item in food.ratings" v-show="needShow(item.rateType,item.text)">
              <div class="info">
                <div class="time">{{item.rateTime | oDate}}</div>
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <img :src="item.avatar" width="12" height="12" alt="">
                </div>
              </div>
              <div class="text">{{item.text}}</div>
            </li>
          </ul>
          <div class="empty-ratings" v-show="!food.ratings">
            暂无评价~~~
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="babel" type="text/ecmascript-6">
  import Vue from 'vue'
  import carctr from '../carctr/Carctr'
  import ratingselect from '../ratingselect/Ratingselect'

  const all = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        foodFlag: false,
        ratingType: all,
        hastext: false,
        desc: {
          all: '满意',
          pos: '推荐',
          neg: '吐槽'
        }
      }
    },
    components: {
      carctr,
      ratingselect
    },
    methods: {
      changeText (text) {
        this.hastext = text
      },
      changeType (type) {
        this.ratingType = type
      },
      foodShow () {
        this.foodFlag = true
      },
      hide () {
        this.foodFlag = false
      },
      addOne () {
        if (!this.food.num) {
          Vue.set(this.food, 'num', 1)
        } else {
          this.food.num ++
        }
      },
      needShow (type, text) {
        if (this.hastext && !text) {
          return false
        }
        if (this.ratingType === all) {
          return true
        } else {
          return type === this.ratingType
        }
      }
    },
    filters: {
      oDate (value) {
        let oD = new Date(value)
        let Ye = oD.getFullYear()
        let Mo = oD.getMonth() > 9 ? oD.getMonth() : '0' + oD.getMonth()
        let Da = oD.getDay() > 9 ? oD.getDay() : '0' + oD.getDay()
        let Ho = oD.getHours() > 9 ? oD.getHours() : '0' + oD.getHours()
        let Mi = oD.getMinutes() > 9 ? oD.getMinutes() : '0' + oD.getMinutes()
        return Ye + '-' + Mo + '-' + Da + ' ' + Ho + ':' + Mi
      }
    }
  }
</script>

<style scoped>
  .food{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    overflow: auto;
    z-index: 10;
    background: #fff;
  }
  .leftslide-enter-active,.leftslide-leave-active{
    transition: all .3s;
    transform: translateX(0);
  }
  .leftslide-enter,.leftslide-leave-to{
    transform: translateX(100%);
  }
  .line{
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: #f3f5f7;
    height: 16px;
  }
  .food::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .food-content .food-img{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .food-content .food-img img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .food-content .food-img .back{
    position: absolute;
    top: 18px;
    left: 18px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  .food-content .food-detail{
    position: relative;
    padding: 18px;
  }
  .food-content .food-detail .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    height: 24px;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 10px;
    color: rgb(255,255,255);
    line-height: 12px;
    background-color: rgb(0,160,220);
    box-sizing: border-box;
  }
  .food-content .food-detail .carctr-wrapper{
    position: absolute;
    right: 18px;
    bottom: 21px;
  }
  .food-content .food-name{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .food-content .sell-info{
    padding: 8px 0 18px;
    font-size: 0;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .food-content .sellCount{
    display: inline-block;
    margin-right: 12px;
    vertical-align: top;
    font-size: 10px;
  }
  .food-content .rating{
    display: inline-block;
    font-size: 10px;
    vertical-align: top;
  }
  .food-content .price{
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .food-content .oldPrice{
    font-size: 10px;
    font-weight: normal;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .food-info{
    padding: 18px;
  }
  .food-info .title{
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .food-info .text{
    padding: 0 8px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(77,85,93);
    line-height: 24px;
  }
  .buy{
    position: absolute;
  }
  .food-rating{
    padding: 18px 0;
  }
  .food-rating .title{
    margin-bottom: 18px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .food-rating .title{
    padding: 0 18px;
  }
  .rating-content{
    padding: 0 18px;
  }
  .rating-content .empty-ratings{
    text-align: center;
    font-size: 12px;
    color: rgb(147,153,159);
    padding-top: 18px;
  }
  .rating-content .ratings-item{
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .rating-content .info{
    height: 12px;
    margin-bottom: 6px;
  }
  .rating-content .info .time{
    float: left;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
  }
  .rating-content .info .user{
    float: right;
    font-size: 0;
  }
  .rating-content .info .name{
    vertical-align: top;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
    margin-right: 6px;
  }
  .rating-content .text{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 16px;
  }
</style>
