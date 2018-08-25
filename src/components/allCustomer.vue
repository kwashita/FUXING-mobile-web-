<template>
  <div class="allCustomer">
    <search-city></search-city>
    <div style="height:1.066667rem;"></div>
    <div class="customer_content">
      {{a}}
      <div class="content_list" v-for="(item, idx) in dataArr" :key="idx" @click.stop="tobussdetail(item.id)">
        <div class="list_left">
          <img :src="domainNameImg + item.company_logo" alt="">
          <span>{{item.user_num}}人关注</span>
        </div>
        <div class="list_right">
          <p>{{item.company_name}}</p>
          <span>企业认证</span>
          <span>交易保障</span>
          <p>
            <img src="../assets/allCustomer/position.png" alt="">
            <span>{{adressReload(item.region) == '' ? '暂无位置' : adressReload(item.region)}}</span>
            <a @click.stop="toTel(item.company_phone)"><img src="../assets/allCustomer/tel.png" alt=""></a>
          </p>
          <p>
            <img src="../assets/allCustomer/hui.png" alt="">
            <span>
              {{item.welfare_name}}
            </span>
            <img src="../assets/allCustomer/right_light.png" alt="">
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="customer_content" v-else>
      <div class="content_list" v-for="(item, idx) in a" :key="idx" @click.stop="tobussdetail(item.id)">
        <div class="list_left">
          <img :src="domainNameImg + item.company_logo" alt="">
          <span>{{item.user_num}}人关注</span>
        </div>
        <div class="list_right">
          <p>{{item.company_name}}</p>
          <span>企业认证</span>
          <span>交易保障</span>
          <p>
            <img src="../assets/allCustomer/position.png" alt="">
            <span>{{adressReload(item.region) == '' ? '暂无位置' : adressReload(item.region)}}</span>
            <a @click.stop="toTel(item.company_phone)"><img src="../assets/allCustomer/tel.png" alt=""></a>
          </p>
          <p>
            <img src="../assets/allCustomer/hui.png" alt="">
            <span>
              {{item.welfare_name}}
            </span>
            <img src="../assets/allCustomer/right_light.png" alt="">
          </p>
        </div>
      </div>
    </div> -->
    <div class="blank" v-show="isNode">
      <img src="../assets/search/blank.png" alt="">
      没有这个企业
    </div>
    <img class="shop_ruzhu" @click="toShangHuRuZhu" src="../assets/myPowder/shangjia_ruzhu.png" alt="">
    <div style="height: 1.306667rem;"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      adminId: this.$store.state.adminId,
      userId: this.$store.state.userId,
      domainName: '',
      domainNameImg: this.$store.state.domainNameImg,
      dataArr: null,
      allShanghuArr: this.$store.state.allCustomer,
      isNode: false,
      allCustomer: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.adminId = this.$store.state.adminId
      this.userId = this.$store.state.userId
      this.domainName = this.$store.state.domainName
      this.domainNameImg = this.$store.state.domainNameImg
      this.allCustomer = this.$store.state.allCustomer
      this.jinzhiFn()
      this.fn()
    })
  },
  methods: {
    async fn () {
      var data = await fetch(`${this.domainName}page=0&mode=10&adminId=${this.adminId}&queryType=list`).then(data => data.json())
      this.dataArr = data.data.list.content
      // this.qiyeData = data.data
      // console.log(this.allShanghuArr)
      console.log(data.data)
    },
    adressReload (adress) {
      var str = String(adress)
      var str1 = str.replace(/-undefined-/g, '')
      var str2 = str1.replace(/-undefined/g, '')
      var str3 = str2.replace(/-请选择-/g, '')
      var str4 = str3.replace(/请选择/g, '')
      var str5 = str4.replace(/- -/g, '')
      var str6 = str5.replace(/--/g, '')
      return str6
    },
    jinzhiFn () {
      // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      //   WeixinJSBridge.call('hideOptionMenu')
      // })
    },
    tobussdetail (companyId, adminId) {
      // alert(companyId)
      // alert(this.adminId)
      window.location.href = this.domainNameImg+'/manage/web/tocompanyInfo?companyId='+companyId+'&adminId='+this.adminId
    },
    toShangHuRuZhu () {
      window.location.href = this.domainNameImg+'/manage/web/welfareBusinessesEnrolmen?adminId='+ this.$store.state.adminId
    },
    // 拨打电话
    toTel (phone) {
      window.location.href = 'tel:' + phone
    }
  },
  computed: {
    a () {
      if (this.$store.state.allCustomer == null) {
        console.log('刚进来')
      } else if (this.$store.state.allCustomer == ''){
        console.log('你给我出来啊打发斯蒂asdf芬')
        this.isNode = true
      } else {
        this.isNode = false
        console.log('你给我出来')
        return this.$store.state.allCustomer
      }
    }
  },
  watch: {
    allCustomer (val, newVal) {
      console.log(val, newVal , '搜索数据变了s')
    }
  }
}
</script>
<style scoped lang="stylus">
.blank {
  width 3rem;
  height 4rem;
  position fixed;
  top 0;
  left 0;
  right 0;
  bottom 0;
  margin auto;
  z-index 10;
  color #ccc;
  font-size .32rem;
  text-align center;
  line-height .533333rem;
  img{
    width 3rem;
    height 3rem;
  }
}
.allCustomer{
  .customer_content{
    padding .373333rem .2rem;
    border-top 1px solid #dddddd;
    margin-top .186667rem;
    .content_list{
      width 9.6rem;
      height 3.4rem;
      background #ffffff;
      box-shadow 1px 0px 5px rgba(0, 0, 0, 0.4);
      border-radius 5px;
      padding .266667rem .373333rem;
      margin 0 auto .373333rem auto;
      display flex;
      .list_left{
        width 2.866667rem;
        height auto;
        img{
          width 2.346667rem;
          height 2.106667rem;
        }
        span {
          display block;
          width 2.226667rem;
          height .413333rem;
          border-radius .2rem;
          background-color #fcf2e8;
          border 1px solid #fcb77e;
          margin-top .213333rem;
          text-align center;
          line-height .413333rem;
          font-size .24rem;
          color #fa7000;
        }
      }
      .list_right {
        width 5.586667rem;
        >p:first-of-type{
          width 100%;
          font-size .426667rem;
          color #1d1d1d;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom  .1rem;
        }
        >span{
          display inline-block;
          padding .02rem .07rem;
          font-size .213333rem;
          border-radius 5px;
          margin-right .066667rem;
        }
        >span:nth-of-type(1){
          color #1cc4fb;
          border 1px solid #1cc4fb;
        }
        >span:nth-of-type(2){
          color #fb6600;
          border 1px solid #fb6600;
        }
        >p:nth-of-type(2){
          font-size .24rem;
          color #8c8c8c;
          margin-top .2rem;
          position relative;
          border-bottom 1px dotted #e5e5e5;
          padding-bottom .15rem;
          img {
            width .32rem;
            height .32rem;
          }
          span {
            position relative;
            top .066667rem;
          }
          >a>img{
            width .613333rem;
            height .613333rem;
            position absolute;
            right 0;
            top -100%;
          }
        }
        >p:nth-of-type(3){
          font-size .28rem;
          margin-top .266667rem;
          img:nth-of-type(1){
            width .413333rem;
            height .413333rem;
            vertical-align middle;
          }
          span:first-of-type {
            display inline-block;
            color #242424;
            width 4.706667rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align middle;
          }
          img:nth-of-type(2){
            width .16rem;
            height .28rem;
            margin-left .133333rem;
          }
        }
      }
    }
  }
  .shop_ruzhu {
    position: fixed;
    width: 2rem;
    bottom: 1.86rem;
    right: 0;
    animation: zy 1.5s infinite 2s;
  }
  @keyframes zy {
    10% {
      transform: rotate(20deg) scale(1);
    }
    20% {
      transform: rotate(-20deg) scale(0.9);
    }
    30% {
      transform: rotate(20deg) scale(1);
    }
    40% {
      transform: rotate(-20deg) scale(0.9);
    }
    50%, 100% {
      transform: rotate(0deg) scale(1);
    }
  }
}
</style>
