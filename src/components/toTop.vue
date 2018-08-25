<template>
  <a class="to_top"></a>
</template>

<script>
export default {
  data () {
    return {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      $('.to_top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 700)
        $('.to_top').fadeOut()
      })
      document.addEventListener('touchstart', function (ev) {
        this.startX = ev.touches[0].pageX
        this.startY = ev.touches[0].pageY
      }.bind(this), false)
      document.addEventListener('touchend', function (ev) {
        this.endX = ev.changedTouches[0].pageX
        this.endY = ev.changedTouches[0].pageY
        var direction = this.GetSlideDirection(this.startX, this.startY, this.endX, this.endY)
        switch (direction) {
          case 0:
            break
          case 1:
            // 向上
            $('.to_top').fadeIn()
            break
          case 2:
            // 向下
            $('.to_top').fadeOut()
            break
          default:
        }
      }.bind(this), false)
    })
  },
  methods: {
    GetSlideDirection (startX, startY, endX, endY) {
      var dy = startY - endY
      // var dx = endX - startX;
      var result = 0
      if (dy > 0) { // 向上滑动
        result = 1
      } else if (dy < 0) { // 向下滑动
        result = 2
      } else {
        result = 0
      }
      return result
    }
  }

}
</script>

<style scoped>
.to_top {
  background: url('../assets/home/top.png') no-repeat;
  background-size: 100% 100%;
  width: 0.8rem;
  height: 0.8rem;
  position: fixed;
  bottom: 1.533rem;
  right: 0.2667rem;
  display: none;
  z-index: 6;
}
</style>
