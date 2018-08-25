<template>
  <div class='welfareWrap'>
    <search-city></search-city>
    <div class="swiper-container" id='welfareSwiper'>
      <ul class="swiper-wrapper welfare_ul">
        <li class="swiper-slide" v-for='(items, index) in $store.state.welfareClassify' :key='items.id' @click='changeWelfareClassify(index)'>
          <span :class='index=== welfareClassifyNum ? "spanCur" : null'>{{items.name}}</span>
        </li>
      </ul>
    </div>
    <div class='welfare' v-for='items in welfareGoods' :key='items.id'>
      <!-- {{items.welfare_img}} -->
      <div class='welfare_img' v-bind:style='{backgroundImage: "url("+items.welfare_img+")"}' @click='routeWelfareDetails(items.share_level, $store.state.userInfo.level, items.php_id, items.detail_two_dimension)'>
        <span class='country'>
          <i></i>
          {{items.region | filterRegion}}
        </span>
        <span class='people'>
          <i></i>
          <!-- 可能为null -->
          <span>{{items.welfare_virtual_num + items.receive_num }}</span>
          份已领取
        </span>
        <span class='watch'>
          <i></i>
          {{items.view_count + (items.welfare_virtual_num * 9)}}
        </span>
        <p class='banner'>
          开始时间：
          <span>{{items.start_time | changeTime}}</span>
          --
          <span>{{items.end_time | changeTime}}</span>
        </p>
      </div>
      <div class="details">
        <p class='details_title'>{{items.welfare_name}}</p>
        <p class='details_name'>{{items.address}}</p>
      </div>
      <div class='button'>
        <span class='star'>一星福星以上</span>
        <span class='make'>赚{{items.welfare_reward_coin + items.card_coins}}福币</span>
        <span class='nolimited'>不限制</span>
        <span class='share'>分享赢福币</span>
      </div>
    </div>
    <div class="blankOuter" v-if='blankLock'>
      <div class='blank' ></div>
      <p>暂无，等待商家发售哦～</p>
    </div>
    <div class='levelShow' v-if='levelLock'>您目前等级不够参与该福利</div>
    <bottom-gray></bottom-gray>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      welfareClassify: null,
      welfareClassifyNum: 0,
      welfareData: null,
      levelLock: false,
      blankLock: false,
      adminId: null,
      domainName: null,
      userInfo: null,
      domainNameImg: null,
      userId: null
    }
  },
  filters: {
    filterRegion: function (value) {
      console.log(value)
      var regionBak = value
      var strs = [] // 定义一数组
      strs = regionBak.split('-') // 字符分割
      for (var x = strs.length - 1; x >= 0; x--) {
        if (strs[x] === '' || strs[x] === 'undefined') {
          continue
        } else {
          regionBak = strs[x]; break
        }
      }
      if (regionBak === '' || regionBak === '全国') {
        // html += '<span class="gdt_map">全国</span>'
        return '全国'
      } else {
        // html += '<span class="gdt_map">' + data[i].distance + ' - ' + regionBak + '</span>'
        return regionBak.distance + '-' + regionBak
      }
    },
    changeTime: function (value) {
      var date = value
      var n = date.valueOf()
      var date2 = new Date(n)
      return date2.toLocaleString()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.welfareData = this.$store.state.allGoodsData
      this.adminId = this.$store.state.adminId
      this.domainName = this.$store.state.domainName
      this.userInfo = this.$store.state.userInfo
      this.domainNameImg = this.$store.state.domainNameImg
      this.userId = this.$store.state.userId
      this.getWelfareClassify()
      this.getAllGoods()
      var swiper1 = new Swiper('#welfareSwiper', {
        slidesPerView: 'auto',
        // spaceBetween: 25,
        freeMode: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    })
  },
  computed: {
    welfareGoods () {
      // console.log(length)
      if (this.$store.state.welfareData == '') {
        this.blankLock = true
      } else {
        this.blankLock = false
        return this.$store.state.welfareData
      }
    }
  },
  methods: {
    routeWelfareDetails (shareLevel, userLevel, phpId, dimension) {
      if (phpId === '' || phpId === null || phpId === 'null' || typeof phpId === 'number') {
        window.location.href = dimension
      } else {
        // 暂时先空着
        // window.location.href = dimension
      }
    },
    // 首次加载得到全部商品
    getAllGoods () {
      this.$store.dispatch('getWelfareGoods')
    },
    // 点击分类得到商品
    async changeWelfareClassify (n) {
      this.welfareClassifyNum = n
      if (n === 0) {
        this.getAllGoods()
      } else {
        // console.log(`${this.$store.state.domainName}mode=7&type=2&welfareId=${this.welfareClassify[n].id}&adminId=${this.$store.state.adminId}`)
        // var data = await fetch(`${this.$store.state.domainName}mode=7&type=2&welfareId=${this.welfareClassify[n].id}&adminId=${this.$store.state.adminId}`).then(data => data.json())
        // this.welfareData = data.data.welfareList.content
        // console.log(this.welfareData)
        this.$store.dispatch('getWelfareGoodsDetails', n)
      }
      // console.log(this.welfareClassify[n].id)
    },
    // 得到所有分类
    getWelfareClassify () {
      // console.log(`${this.$store.state.domainName}mode=7&type=1&adminId=${this.$store.state.adminId}`)

      // var data = await fetch(`${this.$store.state.domainName}mode=7&type=1&adminId=${this.$store.state.adminId}`).then(data => data.json())
      // this.welfareClassify = data.data.classList
      this.$store.dispatch('getWelfareClassify')
    }
  }
}
</script>
<style scoped lang='stylus'>
.welfareWrap{
  position relative;
}
#welfareSwiper{
  margin-top: 1.066667rem;
  height 1.3rem;
  li{
    display flex;
    align-items center;
    width auto !important;
    margin-right 0.567rem;
    span{
      position relative;
      font-size .32rem;
      color #B6B6B6;
      display inline-block;
      padding-left 0.2rem;
      padding-right 0.2rem;
      height 0.6rem;
    }
    i{
      line-height 0.333rem;
      font-style normal;
      font-size .186667rem;
      background #FF7464;
      width .4rem;
      height .3333rem;
      display inline-block;
      position absolute;
      top: -0.1rem;
      right: -0.166667rem;
      border-radius .133333rem;
      color #fff;
    }
  }
}
.spanCur{
  color #FF7464 !important;
}
.welfare{
  margin-top: 0.3rem;
  width: 9.2rem;
  margin: auto;
  height: 7.66rem;
  margin-bottom .666667rem;
  // border: 1px solid #eee;
}
.welfare_img{
  height 4.93rem;
  position relative;
  background-repeat no-repeat;
  background-size 100% 100%;
  .country{
  background: url('../assets/welfare/map.png') no-repeat center left #f75322;
  background-size: 0.25rem 0.32rem;
  background-position-x: 0.4rem;
  padding: 0.14rem 0.14rem;
  color: #fff;
  font-size: 0.25rem;
  border-radius: 0.12rem;
  position: absolute;
  left: -0.2rem;
  padding-left: 0.78rem;
  top: 0.29rem;
  }
  .people{
    background: url('../assets/welfare/people.png') no-repeat center left rgba(0,0,0,0.6);
    background-size: 0.32rem 0.26rem;
    background-position-x: 0.16rem;
    padding: 0.15rem 0.14rem;
    color: #fff;
    font-size: 0.25rem;
    border-radius: 0.12rem;
    position: absolute;
    right: -0.1rem;
    padding-left: 0.6rem;
    padding-right: 0.2rem;
    top: 0.29rem;
  }
  .watch{
    background: url('../assets/welfare/liulan.png') no-repeat center left rgba(0,0,0,0.6);
    background-size: 0.32rem 0.18rem;
    background-position-x: 0.16rem;
    padding: 0.15rem 0.14rem;
    color: #fff;
    font-size: 0.25rem;
    border-radius: 0.12rem;
    position: absolute;
    right: -0.1rem;
    padding-left: 0.6rem;
    padding-right: 0.2rem;
    top: 1.24rem;
  }
  p{
    height: 0.8rem;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.25rem;
    width: 100%;
    padding-left: 2%;
  }
}
.details{
  height: 2.4rem;
  box-shadow: 0 0 0.06rem #ccc;
  padding: 0.2rem;
  .details_title{
    font-size: 0.33rem;
    color: #333333;
    font-weight: 500;
    margin-top: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .details_name{
    font-size: 0.25rem;
    color: #333333;
    margin-top: 0.1rem;
  }
}
.button{
  span{
    font-size: 0.23rem;
    display: inline-block;
    text-align: center;
    line-height: 0.53rem;
    margin-top: 0.18rem;
  }
  .star{
    width: 2rem;
    height: 0.53rem;
    background: url('../assets/welfare/xing.png') no-repeat;
    background-size: 2rem 0.53rem;
    margin-right: 0.2rem;
    color: #f22f32;
  }
  .make{
    width: 1.6rem;
    height: 0.53rem;
    background: url('../assets/welfare/fbi.png') no-repeat;
    background-size: 1.6rem 0.53rem;
    margin-right: 0.2rem;
    color: #b157f6;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nolimited{
    width: 1.2rem;
    height: 0.53rem;
    background: url('../assets/welfare/diq.png') no-repeat;
    background-size: 1.2rem 0.53rem;
    color: #f45752;
  }
  .share{
    width: 2.13rem;
    height: 0.6rem;
    text-indent: 0.5rem;
    background: url('../assets/welfare/go_share.png') no-repeat center left;
    background-size: 2.13rem 0.6rem;
    text-align: center;
    color: #fff;
    text-indent: 0;
    font-size: 0.32rem;
    float: right;
    margin-top: 0.12rem;
    line-height: 0.6rem;
  }
}
.levelShow{
  width 6rem;
  height 1.8rem !important;
  background rgba(0, 0, 0, 0.8);
  border-radius .213333rem;
  position fixed;
  top: 50%;
  left 50%;
  color #fff;
  font-size .39rem;
  text-align center;
  line-height 1.8rem;
  margin-top -0.9rem;
  margin-left -3rem;
}
.blankOuter{
  margin 0 auto;
  text-align center;
  margin-top 1.2rem;
    .blank{
      background url('../assets/search/blank.png') no-repeat;
      width 2.773333rem;
      height 2.773333rem;
      background-size 100% 100%;
      margin 0 auto;
    }
  p{
    font-size .373333rem;
    color #666;
  }

}

</style>
