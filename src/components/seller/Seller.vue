<template>
  <div class="seller-wrapper">
    <div class="seller-header">
      <div class="header">
        <p class="name">{{seller.name}}</p>
        <p class="score">
          <star :size="36" :score="seller.score"></star>
        </p>
        <div class="collect">
          <div class="icon" :class="{'fav':fav}" @click="toggleFav">心</div>
          <div class="text">{{favText}}</div>
        </div>
      </div>
      <div class="info">
        <div class="item">
          <p class="title">起送价</p>
          <p class="num">{{seller.minPrice}}<span class="cor">元</span></p>
        </div>
        <div class="item">
          <p class="title">商家配送</p>
          <p class="num">{{seller.deliveryPrice}}<span class="cor">元</span></p>
        </div>
        <div class="item">
          <p class="title">平均配送时间</p>
          <p class="num">{{seller.deliveryTime}}<span class="cor">分钟</span></p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="seller-bulletin">
      <div class="title">公告和活动</div>
      <p class="bulletin">{{seller.bulletin}}</p>
    </div>
    <div class="line"></div>
    <div class="seller-pics">
      <div class="title">商家实景</div>
      <div class="pic-wrapper">
        <div class="pics-menu" ref="picsMenu">
          <img class="pic-item" v-for="url in seller.pics" :src="url" width="120" height="90" alt="">
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="seller-infos">
      <div class="title">商家信息</div>
      <ul>
        <li class="info-item" v-for="info in seller.infos">{{info}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="babel" type="text/ecmascript-6">
  import star from '../star/Star'
  export default {
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      star
    },
    data () {
      return {
        fav: false
      }
    },
    methods: {
      toggleFav () {
        this.fav = !this.fav
      },
      setMethod () {
        this.$nextTick(() => {
          let picsMenu = this.$refs.picsMenu
          let picItem = picsMenu.getElementsByClassName('pic-item')
          let oW = 0
          for (let i = 0; i < picItem.length; i++) {
            oW += picItem[i].offsetWidth
          }
          picsMenu.style.width = oW + 6 * (picItem.length - 1) + 'px'
        })
      }
    },
    computed: {
      favText () {
        if (!this.fav) {
          return '收藏'
        } else {
          return '已收藏'
        }
      }
    },
    mounted () {
      this.setMethod()
    },
    updated () {
      this.setMethod()
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
  .seller-wrapper{
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: auto;
  }
  .seller-wrapper::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .seller-header{
    border-top: 1px solid rgba(7,17,27,0.1);
    padding: 0 18px;
  }
  .seller-header .header{
    position: relative;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding: 18px 0;
  }
  .seller-header .header .name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .seller-header .header .collect{
    position: absolute;
    width: 40px;
    right: 0;
    bottom: 18px;
    text-align: center;
  }
  .seller-header .header .collect .icon{
    font-size: 24px;
    color: rgb(77,85,93);
    line-height: 24px;
    margin-bottom: 4px;
  }
  .seller-header .header .collect .fav{
    color: rgb(240,20,20);
  }
  .seller-header .header .collect .text{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 10px;
  }
  .seller-header .info{
    display: flex;
    padding: 18px 0;
  }
  .seller-header .info .item{
    flex: 1;
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
  }
  .seller-header .info .item:last-child{
    border: none;
  }
  .seller-header .info .item .title{
    margin-bottom: 4px;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .seller-header .info .item .num{
    font-size: 24px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .seller-header .info .item .num .cor{
    font-size: 10px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .seller-bulletin{
    padding: 18px;
  }
  .seller-bulletin .title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .seller-bulletin .bulletin{
    padding: 8px 12px 0 12px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .seller-pics .title,.seller-infos .title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 12px;
  }
  .seller-pics,.seller-infos{
    padding: 18px;
  }
  .seller-pics .pic-wrapper{
    width: 100%;
    height: 90px;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .seller-pics .pic-wrapper::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .seller-pics .pics-menu{
    height: 90px;
  }
  .seller-pics .pics-menu .pic-item{
    margin-right: 6px;
  }
  .seller-pics .pics-menu .pic-item:last-child{
    margin: 0;
  }
  .seller-infos .info-item{
    border-top: 1px solid rgba(7,17,27,0.1);
    padding: 16px 12px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
  }
</style>
