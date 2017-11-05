<template>
  <div class="ratings-wrapper">
    <div class="ratings-header">
      <div class="seller-score">
        <p class="score">{{seller.score}}</p>
        <p class="text">综合评分</p>
        <p class="rank">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="seller-server">
        <p class="serviceScore">
          <span class="text">服务态度</span>
          <span class="star-wrapper">
            <star :score="seller.serviceScore" :size="36"></star>
          </span>
          <span class="num">{{seller.serviceScore}}</span>
        </p>
        <p class="serviceScore">
          <span class="text">服务态度</span>
          <span class="star-wrapper">
            <star :score="seller.serviceScore" :size="36"></star>
          </span>
          <span class="num">{{seller.serviceScore}}</span>
        </p>
        <p class="deliveryTime">
          <span class="text">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </p>
      </div>
    </div>
    <div class="line"></div>
    <div class="ratings-content">
      <ratingselect @changeType="changeType" @changeText="changeText" :rating-type="ratingType" :hastext="hastext" :desc="desc" :ratings="ratings"></ratingselect>
      <ul>
        <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
          <div class="header">
            <div class="left">
              <img :src="rating.avatar" width="28" height="28" alt="">
              <div class="name">
                <p>{{rating.username}}</p>
                <star :size="24" :score="rating.score"></star>
              </div>
            </div>
            <div class="right">
              <span class="time">{{rating.rateTime | oDate}}</span>
            </div>
          </div>
          <p class="content">
            {{rating.text}}
          </p>
          <div class="recommend" v-show="rating.recommend">
            <span v-for="item in rating.recommend">{{item}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="babel">
  import star from '../star/Star'
  import ratingselect from '../ratingselect/Ratingselect'
  const all = 2
  export default {
    props: {
      seller: {
        type: Object
      },
      ratings: {
        type: Array
      }
    },
    data () {
      return {
        ratingType: all,
        hastext: false,
        desc: {
          all: '满意',
          pos: '推荐',
          neg: '吐槽'
        }
      }
    },
    methods: {
      changeText (text) {
        this.hastext = text
      },
      changeType (type) {
        this.ratingType = type
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
    components: {
      star,
      ratingselect
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
  .line{
    clear: both;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: #f3f5f7;
    height: 16px;
  }
  .ratings-wrapper{
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .ratings-wrapper::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .ratings-header{
    display: flex;
    padding: 12px 12px;
  }
  .seller-score{
    flex: 0 0 135px;
    width: 135px;
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .seller-score p{
    width: 100%;
  }
  .seller-score .score{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
    margin-bottom: 6px;
    text-align: center;
  }
  .seller-score .text{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    text-align: center;
    margin-bottom: 8px;
  }
  .seller-score .rank{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    text-align: center;
    margin-bottom: 6px;
  }
  .seller-server{
    flex: 1;
    padding-left: 12px;
  }
  .seller-server .serviceScore,.seller-server .deliveryTime{
    margin-bottom: 8px;
    font-size: 0;
  }
  .seller-server .text{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-right: 8px;
  }
  .seller-server .star-wrapper{
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
  }
  .seller-server .num{
    display: inline-block;
    font-size: 12px;
    color: rgb(255,153,0);
    line-height: 18px;
  }
  .seller-server .deliveryTime .time{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 18px;
  }
  .ratings-content{
    padding: 18px 0;
  }
  .ratings-content ul{
    padding: 0 18px;
  }
  .ratings-content .rating-item{
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .ratings-content .header{
    height: 28px;
    margin-bottom: 6px;
  }
  .ratings-content .header .left{
    float: left;
    font-size: 0;
  }
  .ratings-content .header .left img{
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
    border-radius: 50%;
  }
  .ratings-content .header .left .name{
    display: inline-block;
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 12px;
  }
  .ratings-content .header .left .name p{
    margin-bottom: 4px;
  }
  .ratings-content .header .right{
    float: right;
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height: 12px;
  }
  .ratings-content .content{
    padding-left: 40px;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-bottom: 8px;
  }
  .ratings-content .recommend{
    padding-left: 40px;
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ratings-content .recommend span{
    display: inline-block;
    padding: 0 6px;
    font-size: 9px;
    color: rgb(147,153,159);
    line-height: 16px;
    border: 1px solid rgba(7,17,27,0.1);
    border-radius: 1px;
    margin-right: 8px;
  }
</style>
