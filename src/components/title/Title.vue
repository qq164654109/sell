<template>
  <div class="title-wrapper">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script lang="babel">
  export default {
    props: ['text']
  }
</script>

<style scoped>
 .title-wrapper{
   display: flex;
   width: 80%;
   margin: 0 auto 24px;
 }
  .line{
    position: relative;
    top: -6px;
    flex: 1;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .text{
    padding: 0 12px;
  }
</style>
