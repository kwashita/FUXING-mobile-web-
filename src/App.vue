<template>
  <div>
    <div class='home'>
      <router-link v-for="(item,idx) in navArr" @click.native="navClick(idx)" :class="idx == index ? 'active': 'routerLinkdefault'" :key="idx" :to="item.routerLink">
        <img :src="idx == index ? item.routerActiveSrc: item.routerImgSrc" alt="" :class="item.routerClass">
        {{item.routerText}}
      </router-link>
      <to-top></to-top>
    </div>
  <div>
    <router-view v-if='$store.state.userInfo === null ? null : dataLock = true'></router-view>
  </div>
  </div>
</template>
<script>
import HOMEWEI from './assets/footnav/home_wei.png'
import HOMEWEIXUAN from './assets/footnav/home_xuan.png'
import WELFAREWEI from './assets/footnav/welfare_wei.png'
import WELFAREWEIXUAN from './assets/footnav/welfare_xuan.png'
import FRIENDSWEI from './assets/footnav/friends_wei.png'
import FRIENDSWEIXUAN from './assets/footnav/friends_xuan.png'
import ORDERWEI from './assets/footnav/order_wei.png'
import ORDERWEIXUAN from './assets/footnav/order_xuan.png'
import MINEWEI from './assets/footnav/mine_wei.png'
import MINEWEIXUAN from './assets/footnav/mine_xuan.png'

export default {
  data () {
    return {
      dataLock: '',
      navArr: [
        {
          routerLink: '/home',
          routerText: '首页',
          routerImgSrc: HOMEWEI,
          routerActiveSrc: HOMEWEIXUAN,
          routerClass: 'home_img'
        },
        {
          routerLink: '/welfare',
          routerText: '福利',
          routerImgSrc: WELFAREWEI,
          routerActiveSrc: WELFAREWEIXUAN,
          routerClass: 'welfare_img'
        },
        {
          routerLink: '/friends',
          routerText: '福友',
          routerImgSrc: FRIENDSWEI,
          routerActiveSrc: FRIENDSWEIXUAN,
          routerClass: 'friends_img'
        },
        {
          routerLink: '/order',
          routerText: '订单',
          routerImgSrc: ORDERWEI,
          routerActiveSrc: ORDERWEIXUAN,
          routerClass: 'order_img'
        },
        {
          routerLink: '/mine',
          routerText: '我的',
          routerImgSrc: MINEWEI,
          routerActiveSrc: MINEWEIXUAN,
          routerClass: 'mine_img'
        }
      ],
      index: 0,
      adminId: this.urlData('adminId'),
      userId: this.urlData('userId'),
      routerUrl: ''
    }
  },
  beforeMount () {
    this.$nextTick(function () {
      this.init()
      this.stopShare()
    })
  },
  mounted () {
    this.$nextTick(() => {
      $('.routerLinkdefault').each((idx, item) => {
        if ($('.routerLinkdefault').eq(idx).hasClass('router-link-active')) {
          this.index = idx + 1
        }
      })
    })
  },
  methods: {
    stopShare () {
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady () {
        WeixinJSBridge.call('hideOptionMenu')
      })
    },
    urlData (paraName) {
      // console.log('urlData')
      var str = 'http://test1.kexinapp.com/fuliShare/terminal/fuliShareMall?adminId=1&userId=4028819665321aa601653659f17d0080'
      var url = str
      // 上线时换掉
      // var url = document.location.toString()
      var arrObj = url.split('?')
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split('&')
        var arr
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split('=')
          if (arr != null && arr[0] === paraName) {
            return arr[1]
          }
        }
        return ''
      } else {
        return ''
      }
    },
    init (adminId = this.adminId, userId = this.userId) {
      // console.log('userInfo')
      // this.$store.dispatch('getUserInfo')
      this.$store.dispatch('getUserInfo', {adminId, userId})
    },
    navClick (idx) {
      this.index = idx
    }
  }
}
</script>
<style scoped lang='stylus'>
.home{
  position fixed;
  display flex;
  justify-content space-around;
  align-items center;
  height 1.306667rem;
  bottom 0;
  width 100%;
  font-size 0.32rem;
  z-index 100000;
  background #fff;
  text-align center;
  border-top 1px solid #eee;

  .home_img{
    width .56rem;
    height .48rem;
    display block;
    margin 0 auto;
  }

  .welfare_img{
    width .466667rem;
    height .466667rem;
    display block;
    margin 0 auto;
  }

  .friends_img, .order_img, .mine_img{
    width .48rem;
    height .48rem;
    display block;
    margin 0 auto;
  }
}
a.active{
  color #fb6e79;
}
</style>
