<template>
  <div class="carctr">
    <transition name="move">
      <span class="sub" v-show="food.num" @click.stop="subNum()">－</span>
    </transition>
    <transition name="fade">
      <span class="num" v-if="food.num">{{food.num}}</span>
    </transition>
    <span class="add" @click.stop="addNum()">＋</span>
  </div>
</template>

<script lang="babel">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addNum () {
        if (!this.food.num) {
          Vue.set(this.food, 'num', 1)
        } else {
          this.food.num ++
        }
      },
      subNum () {
        if (this.food.num) {
          this.food.num --
        }
      }
    }
  }
</script>

<style scoped>
  .carctr{
    height: 18px;
    font-size: 0;
  }
  .sub,.num,.add{
    vertical-align: top;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    text-align: center;
  }
  .sub,.add{
    width: 18px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 50%;
    background: rgb(0,160,250);
    color: #fff;
  }
  .num{
    width: 24px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .move-enter-active,.move-leave-active{
    transition: all .4s;
    opacity: 1;
    transform:translateX(0) rotate(0deg);
  }
  .move-leave-to,.move-enter{
    transform:translateX(24px) rotate(180deg);
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    opacity: 1;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
</style>
