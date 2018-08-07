<template>
  <div>
    <div class='home'>
      <router-link to='/home'>首页</router-link>
      <router-link to='/welfare'>福利</router-link>
      <router-link to='/friends'>福友</router-link>
      <router-link to='/order'>订单</router-link>
      <router-link to='/mine'>我的</router-link>
    </div>
  <div>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped lang='stylus'>
.home{
  position fixed;
  display flex;
  justify-content space-around;
  height 1.30667rem;
  bottom 0;
  width 100%;
  line-height 1.30667rem;
  font-size 0.32rem;
}
</style>
