<template>
  <div class="header">
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟后送达</div>
          <div class="supports" v-if="seller.supports">
            <span class="icon" :class="'icon-'+seller.supports[0].type"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span>{{seller.supports.length}}个</span>
        </div>
      </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailContrl">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <p class="name">{{seller.name}}</p>
            <div class="score-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <v-title text="优惠信息"></v-title>
            <ul class="detail-Supports">
              <li v-for="item in seller.supports">
                <span class="icon" :class="'icon-'+item.type"></span>
                <span class="detail-description">{{item.description}}</span>
              </li>
            </ul>
            <v-title text="商家公告"></v-title>
            <div class="detail-bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail"><i class="el-icon-close"></i></div>
      </div>
    </transition>
  </div>
</template>

<script lang="babel">
  import star from '../star/Star'
  import title from '../title/Title'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailContrl: false
      }
    },
    methods: {
      showDetail () {
        this.detailContrl = !this.detailContrl
      }
    },
    components: {
      star,
      'v-title': title
    }
  }
</script>

<style scoped>
  @import "../../common/css/base.css";

  .header{
    position: relative;
    color: #fff;
    background-color: rgba(7,17,27,0.5);
    overflow: hidden;
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    z-index: -1;
  }
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .content-wrapper .avatar{
    vertical-align: top;
    display: inline-block;
    border-radius: 2px;
    margin-right: 16px;
  }
  .content-wrapper .content{
    display: inline-block;
    font-size: 14px;
  }
  .content-wrapper .title{
    margin: 2px 0 8px 0;
    font-size: 0;
  }
  .content-wrapper .brand{
    vertical-align: top;
    display: inline-block;
    width: 30px;
    height: 18px;
    margin-right: 6px;
    background-image: url('brand@2x.png');
    background-size: 30px 18px;
  }
  .content-wrapper .name{
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
  }
  .content-wrapper .description{
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
  }
  .content-wrapper .supports{
    margin-bottom: 2px;
    font-size: 0;
  }
  .content-wrapper .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .icon-0{
     background-image: url("decrease_1@2x.png");
   }
  .icon-1{
    background-image: url("discount_1@2x.png");
  }
  .icon-2{
    background-image: url("guarantee_1@2x.png");
  }
  .icon-3{
    background-image: url("invoice_1@2x.png");
  }
  .icon-4{
    background-image: url("special_1@2x.png");
  }
  .content-wrapper .text{
    display: inline-block;
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
  }
  .content-wrapper .support-count{
    position: absolute;
    bottom: 18px;
    right: 12px;
    font-size: 10px;
    font-weight: 200;
    line-height: 10px;
    padding: 7px 8px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 14px;
  }
  .bulletin-wrapper{
    padding:0 24px 0 12px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: rgba(7,17,27,0.2);
  }
  .bulletin-wrapper .bulletin-icon{
    vertical-align: top;
    display: inline-block;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url('bulletin@2x.png');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .bulletin-wrapper .bulletin-text{
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity .4s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .detail{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7,17,27,0.8);
    overflow: auto;
    z-index: 200;
  }
  .detail .detail-wrap{
    width: 100%;
    min-height: 100%;
  }
  .detail .detail-main{
    width: 100%;
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail .detail-close{
    position: relative;
    text-align: center;
    margin-top: -64px;
    height: 64px;
    font-size: 16px;
    color: rgba(255,255,255,0.5);
  }
  .detail .name{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  }
  .detail .score-wrapper{
    text-align: center;
    margin: 16px 0 28px 0;
  }
  .detail .detail-Supports{
    width: 80%;
    padding: 0 12px;
    margin: 0 auto 28px;
    box-sizing: border-box;
  }
  .detail .detail-Supports li{
    font-size: 0;
    margin-bottom: 12px;
  }
  .detail .detail-description{
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
  }
  .detail .icon{
    position: relative;
    top: -2px;
    display: inline-block;
    vertical-align: top;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .detail .detail-bulletin{
    width: 80%;
    margin: 0 auto;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    box-sizing: border-box;
  }
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
    .content-wrapper .brand{
      background-image: url('brand@3x.png');
    }
    .icon-0{
      background-image: url("decrease_1@3x.png");
    }
    .icon-1{
      background-image: url("discount_1@3x.png");
    }
    .icon-2{
      background-image: url("guarantee_1@3x.png");
    }
    .icon-3{
      background-image: url("invoice_1@3x.png");
    }
    .icon-4{
      background-image: url("special_1@3x.png");
    }
    .bulletin-wrapper .bulletin-icon{
      background-image: url('bulletin@3x.png');
    }
  }
</style>
