<template>
  <div class="star-wrapper" :class="starType">
    <span :class="starClass" class="star" v-for="starClass in starClasses"></span>
  </div>
</template>

<script lang="babel">
  export default {
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      starClasses () {
        let result = []
        let onNum = Math.floor(this.score)
        let hasDecimal = this.score % 1 !== 0
        for (let i = 0; i < onNum; i++) {
          result.push('starOn')
        }
        if (hasDecimal) {
          result.push('starHalf')
        }
        while (result.length < 5) {
          result.push('starOff')
        }
        return result
      }
    }
  }
</script>

<style>
  .star-wrapper{
    font-size: 0;
  }
  .star{
    display: inline-block;
    background-repeat: no-repeat;
  }
  .star-48 .star{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }
  .star-48 .star:last-child{
    margin-right: 0;
  }
  .star-48 .starOn{
    background-image: url("star48_on@2x.png");
  }
  .star-48 .starOff{
    background-image: url("star48_off@2x.png");
  }
  .star-48 .starHalf{
    background-image: url("star48_half@2x.png");
  }
  .star-36 .star{
    width: 15px;
    height: 15px;
    margin-right: 8px;
    background-size: 15px 15px;
  }
  .star-36 .star:last-child{
    margin-right: 0;
  }
  .star-36 .starOn{
    background-image: url("star36_on@2x.png");
  }
  .star-36 .starOff{
    background-image: url("star36_off@2x.png");
  }
  .star-36 .starHalf{
    background-image: url("star36_half@2x.png");
  }
  .star-24 .star{
    width: 10px;
    height: 10px;
    margin-right: 4px;
    background-size: 10px 10px;
  }
  .star-24 .star:last-child{
    margin-right: 0;
  }
  .star-24 .starOn{
    background-image: url("star24_on@2x.png");
  }
  .star-24 .starOff{
    background-image: url("star24_off@2x.png");
  }
  .star-24 .starHalf{
    background-image: url("star24_half@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
    .star-48 .starOn{
      background-image: url("star48_on@3x.png");
    }
    .star-48 .starOff{
      background-image: url("star48_off@3x.png");
    }
    .star-48 .starHalf{
      background-image: url("star48_half@3x.png");
    }
    .star-36 .starOn{
      background-image: url("star36_on@3x.png");
    }
    .star-36 .starOff{
      background-image: url("star36_off@3x.png");
    }
    .star-36 .starHalf{
      background-image: url("star36_half@3x.png");
    }
    .star-24 .starOn{
      background-image: url("star24_on@3x.png");
    }
    .star-24 .starOff{
      background-image: url("star24_off@3x.png");
    }
    .star-24 .starHalf{
      background-image: url("star24_half@3x.png");
    }
  }
</style>
