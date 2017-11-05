<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller" :ratings="ratings"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/Header'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {},
        ratings: []
      }
    },
    components: {
      'v-header': header
    },
    methods: {
      getSeller () {
        this.$ajax({
          methods: 'get',
          url: '/api/seller'
        }).then((res) => {
          if (res.data.errno === ERR_OK) {
            this.seller = res.data.data
          }
        })
      },
      getRatings () {
        this.$ajax({
          methods: 'get',
          url: 'api/ratings'
        }).then((res) => {
          if (res.data.errno === ERR_OK) {
            this.ratings = res.data.data
          }
        })
      }
    },
    mounted () {
      this.getSeller()
      this.getRatings()
    }
  }
</script>

<style>
  @import "common/css/base.css";

  .tab{
    display: flex;
    height: 40px;
  }
  .tab-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
  }
  .router-link-active{
    color: rgb(240,20,20)
  }
</style>
