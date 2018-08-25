<template>
  <div class="body">
    <!-- <search-city></search-city> -->
    <div v-if="hasLoading" class="box_merchant">
      <div v-show="xiangqingShow" class="fl_xiangqing" url="http://test1.kexinapp.com/fuliShare/files/data/1/fuli/4028819665379e92016537d93f260005/402881966540bdad016540c4711c0013Detail.html" id="welfare_layer" style="">
        <div class="cw_fx">
          <img class="cw_fxido" @click="toZhaoMuLing" src="../assets/myPowder/cw_fxido.png">
          <img class="cw_fxiclose" @click="xiangqingShow = false" src="../assets/myPowder/cw_fxiclose.png">
        </div>
      </div>
      <div class="merchant_header">
        <div class="header_scroll">
          <div class="scroll_top">
            <div class="header_content" :style="{width:lengthNum * 200 / 75 + 'rem'}">
              <div v-for="(item, idx) in qiyeData" :key="idx" @click="tobussdetail(item.id)">
                <img :src="domainNameImg + item.company_logo" alt="">
                <span>{{item.company_name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>商户好福利 <router-link to="/allCustomer"><span>全部商户</span></router-link></p>
      <div v-for="(item, idx) in qiyeFuliArr" :key="idx" class="swiper-container enterpriseSwiper">
        <div class="swiper_top">
          <div class="qiye_name">
            <div class="nameLeft">
              <img :src="domainNameImg + item.company_logo" alt="">
              <span>
                {{item.company_name}}
                <div>
                  <img src="../assets/merchant/qiye.png" alt="">
                  企业认证
                </div>
              </span>
            </div>
            <div class="nameRight" @click="tobussdetail(item.id)">
              查看
            </div>
          </div>
        </div>
        <div class="slideDiv">
          <div class="swiper-wrappera recommend_show" :style="{width: item.welfareList.length * 270 / 75 +'rem'}">
            <div class="swiper-slidea likeFuliTabDom" v-for="(items, i) in item.welfareList" :key="i" @click="toHtml(item.detail_two_dimension)">
              <div class="browseListContent">
                <img :src="domainNameImg + items.welfare_img" alt="">
                <span>浏览九十九蒸芝麻芝麻丸</span>
                <span>赚{{items.welfare_gold_coins}}福币</span>
                <p>
                  <span>￥</span>
                  <span>{{items.welfare_paymoney}}</span>
                  <span>{{items.welfare_virtual_num + items.receive_num}}人买</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-else style="width: 0.66666rem;height: 0.66666rem;display:block;position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;" src="../assets/myPowder/loading_circle_40b82ef.gif" alt="">
    <div style="height: 1.306667rem;"></div>
  </div>
</template>

<script>
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'

export default {
  data () {
    return {
      adminId: this.$store.state.adminId,
      userId: this.$store.state.userId,
      content: '',
      domainName: this.$store.state.domainName,
      domainNameImg: this.$store.state.domainNameImg,
      qiyeData: null,
      qiyeFuliArr: null,
      lengthNum: 0,
      hasLoading: false,
      xiangqingShow: false
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.fn()
    })
  },
  methods: {
    async fn () {
      var data = await fetch(`${this.domainName}page=0&mode=9&adminId=${this.adminId}`).then(data => data.json())
      console.log(data, '数据 ')
      this.qiyeData = data.data.recommendCompanyList
      this.lengthNum = data.data.recommendCompanyList.length
      this.qiyeFuliArr = data.data.companyList.content
      this.hasLoading = true
    },
    heckState (phpId, url, shareLevel) {
      // var userType = getUser().userType
      // var userLevel = getUser().level
      // if (userType === '0') {
      //   $('#welfare_layer').attr('url',url)
      //   $('#welfare_layer').show()
      // } else if (userLevel < shareLevel) {
      //   alert('您目前等级不够参与该福利')
      //   return
      // } else if (phpId === '' || phpId === null || phpId === 'null') {
      //   window.location.href = url
      // }
    },
    toHtml (url) {
      window.location.href = url
    },
    toZhaoMuLing () {},
    tobussdetail (companyId, adminId) {
      // alert(companyId)
      // alert(this.adminId)
      window.location.href = this.domainNameImg+'/manage/web/tocompanyInfo?companyId='+companyId+'&adminId='+this.$store.state.adminId
    },
  }
}
</script>

<style scoped lang='stylus'>
.fl_xiangqing {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.cw_fx {
  width: 7.2rem;
  height: 8.92rem;
  background: url(../assets/myPowder/cw_fxbg.png) no-repeat;
  background-size: 100% 100%;
  margin: 2.66rem auto;
  position: relative;
  z-index: 1000;
}
.cw_fx .cw_fxido {
  width: 4.1rem;
  position: absolute;
  bottom: 6%;
  left: 20%;
}
.cw_fxiclose {
  width: 0.64rem;
  position: absolute;
  bottom: -14%;
  left: 46%;
}
.box_merchant{
  .merchant_header{
    width 100%;
    box-sizing border-box;
    background-image url('../assets/merchant/top_bg.png');
    background-size 100%;
    background-color white;
    background-repeat no-repeat;
    .header_scroll{
      overflow-y scroll;
    }
    .header_content{
      padding-top .986667rem;
      display flex;
      flex-wrap: wrap;
      max-width 18.666667rem;
      padding-bottom .133333rem;
      height auto;
      >div{
        width 2.533333rem;
        height 2.533333rem;
        background-color #ffffff;
        box-shadow: 1px 2px 10px 0px rgba(159, 156, 156, 0.82);
        border-radius: 4px;
        box-sizing border-box;
        padding-top .413333rem;
        margin-left .133333rem;
        margin-bottom .133333rem;
        img{
          display block;
          width 1.066667rem;
          height 1.066667rem;
          margin: 0 auto .266667rem auto;
        }
        span {
          display block;
          width 2rem;
          text-align center;
          overflow hidden;
          text-overflow ellipsis;
          white-space nowrap;
          margin: 0 auto;
        }
      }
    }
  }
}
.body {
  width 100%;
  height 100%;
  position absolute;
  left 0;
  top 0;
  background-color #f2f2f2;
}

.enterpriseSwiper{
  background-color #ffffff;
  margin-bottom .333333rem;
  box-sizing initial;
  .slideDiv{
    width 100%;
    overflow-x scroll;
  }
  .recommend_show{
    display flex;
  }
  .likeFuliTabDom{
    width 3.6rem;
    margin-left .266667rem;
    margin-right 0rem!important;
    margin-bottom .2rem;
    .browseListContent{
      height 4rem;
      float left;
      border-radius .053333rem;
      background-color #ffffff;
      box-shadow 1px 1px 5px 0px rgba(159, 156, 156, 0.82);
      overflow hidden;
      >img{
        width:100%;
        height 2.266667rem;
      }
      >span:nth-of-type(1){
        width 2.666667rem;
        font-size .32rem;
        display block;
        color: #000000;
        overflow hidden;
        text-overflow ellipsis;
        white-space nowrap;
      }
      >span, >p{
        margin-left .266667rem;
      }
      >span:nth-of-type(2){
        font-size .24rem;
        color: #fc4f69;
        border: solid 1px #fc4f69;
        border-radius 2px;
        display inline-block;
        line-height .266667rem;
        margin-bottom .15rem;
        padding: .033333rem .106667rem;
      }
      >p{
        color: #ff1616;
        span:nth-of-type(1){
          font-size .24rem;
        }
        span:nth-of-type(2){
          font-size .32rem;
        }
        span:nth-of-type(3){
          float right;
          margin-right .266667rem;
          color #666666;
        }
      }
    }
  }
}
.box_merchant{
  >p:nth-of-type(1){
    display flex;
    justify-content space-between;
    height 1.173333rem;
    line-height 1.173333rem;
    padding 0 .266667rem;
    border-bottom 1px solid #f3f2f2;
    font-size .453333rem;
    color #000000;
    span{
      font-size .373333rem;
      padding-right .333333rem;
      background-image url('../assets/merchant/tiaozhuan.png');
      background-size .186667rem .32rem;
      background-position center right;
      background-repeat no-repeat;
      color #999999;
    }
  }
}
.swiper_top{
  background-color #ffffff;
  height auto;
  .qiye_name{
    width 9.466667rem;
    height 2.133333rem;
    margin .266667rem auto;
    background-color #f2f2f2;
    border-radius .053333rem;
    display flex;
    justify-content space-between;
    align-items center;
    box-sizing border-box;
    padding 0 .266667rem;
    .nameLeft{
      display flex;
      align-items center;
      >img{
        width 1.333333rem;
        height 1.333333rem;
        box-shadow 1px 2px 10px 0px rgba(159, 156, 156, 0.82);
        border-radius 4px;
        margin-right .2rem;
      }
      >span{
        display block;
        line-height .7rem;
        div{
          display flex;
          align-items center;
        }
        img {
          width .346667rem;
          height .4rem;
          margin-right .133333rem;
        }
      }
    }
    .nameRight{
      width 1.2rem;
      height .533333rem;
      background-color #f8614a;
      border-radius 20px;
      font-size .266667rem;
      text-align center;
      line-height .533333rem;
      color #ffffff;
    }
  }
}

</style>
