<template>
  <div class="wraper_dynamic">
    <div class="dynamic_fubi">
      <img src="../assets/Jellyfish.jpg" alt="">
      <img src="../assets/Jellyfish.jpg" alt="">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" id="blue">Slide 1</div>
          <div class="swiper-slide" id="green">Slide 2</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
    }
  },
  mounted () {
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentumRatio: 0.2,
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      mousewheel: true,
      autoplay: true
    })
    console.log(swiper)
  }
}
</script>
<style scoped>
.wraper_dynamic{
  width: 100%;
  height: 0.97rem;
  border-bottom: 0.13rem solid #f2f2f2;
  margin-top: -0.01rem;
  align-items:center;
  padding:.266667rem;
  display: flex;
}
.dynamic_fubi{
  display:flex;
  align-items:center;
}
.dynamic_fubi>img:first-of-type{
  width: 1.746667rem;
  height: .453333rem;
  padding-right: .266667rem;
  padding-top: .04rem;
  padding-bottom: .04rem;
  border-right: 1px solid #dedbdd;
}
.dynamic_fubi>img:nth-of-type(2){
  width: .373333rem;
  height: .32rem;
  margin-left: .2rem;
  vertical-align: middle;
}
.dynamic_fubi div{
  vertical-align: middle;
}
.dynamic_fubi div img{
  width: .533333rem;
  height: .533333rem;
  margin: 0 .093333rem;
  border-radius: 2px;
  vertical-align: middle;
}
.dynamic_fubi span{
  font-size: .253333rem;
  /* line-height: 0.97rem; */
  vertical-align: middle;
}
.dynamic_fubi span span{
  color: #fc4f69;
}
.swiper-wrapper{
  height: .546667rem!important;
  overflow: hidden;
}
.swiper-slide {
  height: .546667rem!important;
}
</style>
