<template>
  <div>
    <div class="tag">
      <span class="all" :class="{'active':myType===2}" @click="select(2)">{{desc.all}}<span class="num">{{ratings.length}}</span></span>
      <span class="positives" :class="{'active':myType===0}" @click="select(0)">{{desc.pos}}<span class="num">{{posRatings.length}}</span></span>
      <span class="negatives" :class="{'active':myType===1}" @click="select(1)">{{desc.neg}}<span class="num">{{negRatings.length}}</span></span>
    </div>
    <div class="hastext" :class="{'light':mytext}" @click="toggleText">
      只看有内容的评价
    </div>
  </div>
</template>

<script lang="babel" type="text/ecmascript-6">
  const all = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      ratingType: {
        type: Number,
        default: all
      },
      hastext: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '满意',
            pos: '推荐',
            neg: '吐槽'
          }
        }
      }
    },
    data () {
      return {
        myType: this.ratingType,
        mytext: this.hastext
      }
    },
    computed: {
      posRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0
        })
      },
      negRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1
        })
      }
    },
    methods: {
      select (type) {
        this.myType = type
        this.$emit('changeType', type)
      },
      toggleText () {
        this.mytext = !this.mytext
        this.$emit('changeText', this.mytext)
      }
    }
  }
</script>

<style scoped>
  .tag{
    margin: 0 18px;
    padding-bottom: 18px;
    font-size: 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tag .all,.tag .positives,.tag .negatives{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    font-size: 12px;
    line-height: 16px;
    color: rgb(77,85,93);
  }
  .tag .num {
    font-size: 8px;
    margin-left: 4px;
  }
  .tag .all{
    background-color: rgba(0,160,220,0.5);
  }
  .tag .positives{
    background-color: rgba(0,160,220,0.2);
  }
  .tag .negatives{
    background-color: rgba(7,85,93,0.2);
  }
  .tag .active{
    background-color: rgba(0,160,220,1);
    color: #fff;
  }
  .hastext{
    padding: 12px 18px;
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.2);
  }
  .light{
    color: rgba(0,160,220,1)
  }
</style>
