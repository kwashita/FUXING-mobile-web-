<template>
  <div>
    <div class="body"></div>
    <div class="like" style="display:block;">
      <div class="like_header">
        <div class="like_contentBox">
          <div class="like_content">
            <ul class="like_content_header">
              <li :class="idx == likeData.topTabIdx?'active':''" @click="topTabClick(idx)" v-for="(item,idx) in likeData.likeTopTab" :key="idx">
                {{item}}
              </li>
            </ul>
            <ul class="like_content_footer">
              <li v-if="likeData.topTabIdx == 0" v-for="(item,idx) in likeData.likeArr" :key="idx" @click="likeTab(idx)" :class="idx == likeData.index ? 'active':''">
                <img :src="item.imgSrc" alt="">
                {{item.text}}
              </li>
              <li v-if="likeData.topTabIdx == 1" v-for="(item, idx) in likeData.likeArrClass" @click="topTabList(idx)" :key="idx" :class="idx == likeData.topTabListIdx ? 'active':''">
                <img :src="item.imgSrc" alt="">
                {{item.text}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="browseList" v-if="likeData.topTabIdx == 0">
        <div class="likeFuliTabDom">
          <div class="browseListContent" v-for="(item, idx) in likeData.allfuliArr" :key="idx" @click="toa(item.detail_two_dimension)">
            <img :src="loadwelfareImg(item.welfare_img)" alt="">
            <span>{{item.welfare_name}}</span>
            <span>赚{{item.welfare_reward_coin + item.card_coins}}福币</span>
            <p>
              <span>￥</span>
              <span>{{item.paymoney}}</span>
              <span>{{item.receive_num + item.welfare_virtual_num}}人买</span>
            </p>
          </div>
        </div>
      </div>
      <div class="browseList" v-else>
        <div class="likeFuliTabDom">
          <div class="browseListContent topTabDom" @click.stop="obussdetail(item.id)" v-for="item in likeData.allqiyeArr" :key="item.id">
            <img :src="item.company_logo" alt="">
            <span>{{item.company_name}}</span>
            <span><img src="../assets/like/clonseImg.png" alt="">企业认证</span>
            <span>福利数量：{{item.welfareNum}}件</span>
            <div>
              <a @click.stop="toTel(item.company_phone)"><img src="../assets/like/like_tel.png" alt=""></a>
              <i></i>
              <img src="../assets/like/like_code.png" @click.stop="getCode(item.id)" alt="">
              <i></i>
              <img v-if="likeData.topTabListIdx === 1" src="../assets/like/aixin_xuan.png" @click.stop="isAixin(item.id)" alt="">
              <img v-if="likeData.topTabListIdx !== 1" :src="item.statu == 0 ? likeData.aixinwei : likeData.aixinxuan" @click.stop="isAixin(item.id)" alt="">
            </div>
            <div class="topTabFooter">
              <img :src="item.welfareImgFirst" alt="">
              <img :src="item.welfareImglSec" alt="">
            </div>
          </div>
        </div>
        <div style="height: 1.306667rem;"></div>
      </div>
      <!-- 取消收藏成功 -->
      <div class="like_alert" v-show="likeData.isClose">
        <div class="alert_content animated">
          <p>
            <img src="../assets/like/a.png" @click="likeClose" alt="">
          </p>
          <img src="../assets/like/success.png" alt="">
          <br>
          {{likeData.likeDataText}}
        </div>
      </div>
      <!-- 二维码 -->
      <div class="likeCode like_alert" v-show="likeData.isCode">
        <div class="code">
          <p>
            <img src="../assets/like/a2.png" alt="" @click="likeData.isCode = false">
          </p>
          <span>GUM旗舰店</span>
          <!-- <img src="../assets/like/code.png" alt=""> -->
          <div id="codeImg" style="width: 3.3rem;margin: 0.4rem auto;">
            
          </div>
          <span>长按二维码，关注企业公众号</span>
        </div>
      </div>
      <div class="blank" v-show="likeData.isNode">
        <img src="../assets/search/blank.png" alt="">
        {{likeData.noText}}
      </div>
    </div>
  </div>
</template>

<script>
import BROWSE from '../assets/like/like_browse.png'
import COLLECTION from '../assets/like/like_collection.png'
import BUY from '../assets/like/like_buy.png'
import LIKENEW from '../assets/like/like_new.png'
import AIXINXUAN from '../assets/like/aixin_xuan.png'
import AIXINWEI from '../assets/like/aixin_wei.png'
import JQUERYMiN from '../../static/jquery.qrcode.min.js'

export default {
  data () {
    return {
      likeData: {
        likeTopTab: ['福利', '企业'],
        likeArr: [
          {
            text: '浏览',
            imgSrc: BROWSE
          },
          {
            text: '收藏',
            imgSrc: COLLECTION
          },
          {
            text: '买过',
            imgSrc: BUY
          }
        ],
        likeArrClass: [
          {
            text: '浏览',
            imgSrc: BROWSE
          },
          {
            text: '收藏',
            imgSrc: COLLECTION
          },
          {
            text: '买过',
            imgSrc: BUY
          },
          {
            text: '新店',
            imgSrc: LIKENEW
          }
        ],
        index: 0,
        topTabIdx: 0,
        topTabListIdx: 1,
        isClose: false,
        likeDataText: '取消收藏成功',
        isCode: false,
        adminId: null,
        userId: null,
        domainName: null,
        domainNameImg: null,
        xianshiArr: [],
        soonArr: [],
        allfuliArr: null,
        isText: '浏览',
        allqiyeArr: null,
        noText: '',
        aixinxuan: AIXINXUAN,
        aixinwei: AIXINWEI,
        isNode: false
      }
    }
  },
  methods: {
    likeTab (idx) {
      this.likeData.index = idx
      if (idx === 0) {
        this.likeFn('view')
      } else if (idx === 1) {
        this.likeFn('collection')
      } else if (idx === 2) {
        this.likeFn('buy')
      }
      this.likeData.isNode = false
    },
    topTabClick (idx) {
      this.likeData.topTabIdx = idx
      this.likeData.isNode = false
      if (idx === 1) {
        this.likeData.topTabListIdx = 1
        this.enterpriseFn('collection')
      }
    },
    toa (url) {
      window.location.href = url
    },
    topTabList (idx) {
      if (idx != 0) {
        this.likeData.topTabListIdx = idx
        console.log(this.likeData.topTabListIdx)
        if (idx == 1) {
          this.enterpriseFn('collection')
        } else if (idx == 2) {
          this.enterpriseFn('buy')
        } else if (idx == 3) {
          this.enterpriseFn('newCompany')
        }
      } else {
        alert('此功能暂时没有')
      }
      this.likeData.isNode = false
    },
    // 拨打电话
    toTel (phone) {
      window.location.href = 'tel:' + phone
    },
    likeClose () {
      this.likeData.isClose = false
    },
    //生成二维码
    getCode (id) {
      this.likeData.isCode = true
      this.toUse(this.likeData.domainNameImg+"/manage/web/tocompanyInfo?companyId="+id+"&adminId="+this.likeData.adminId)
    },
    //生成二维码
    toUse (orderNumber) {
      console.log(orderNumber)
      $('#codeImg').empty()
      $('#codeImg').qrcode({
        render : 'table', //table方式
        width : 250, //宽度
        height : 250, //高度
        text : orderNumber
        //二维码内容
      })
    },
    //福利请求
    async likeFn (istype) {
      var data = await fetch(`${this.likeData.domainName}mode=1&queryType=welfareAttention&queryStyle=${istype}&userId=${this.likeData.userId}`).then(data => data.json())
      console.log(data, '喜欢')
      if (istype === 'view') {
        if (data.data.welfareList.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有浏览的'
        }
      } else if (istype === 'collection') {
        if (data.data.welfareList.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有收藏的'
        }
      } else if (istype === 'buy') {
        if (data.data.welfareList.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有买过的'
        }
      }
      this.likeData.allfuliArr = data.data.welfareList
    },
    // 企业列表跳转
    obussdetail (companyId, adminId) {
			window.location.href=this.likeData.domainNameImg+"/manage/web/tocompanyInfo?companyId="+companyId+"&adminId="+this.likeData.adminId;
		},
    //企业请求
    async enterpriseFn (istype) {
      var data = await fetch(`${this.likeData.domainName}mode=1&queryType=companyAttention&queryStyle=${istype}&userId=${this.likeData.userId}`).then(data => data.json())
      this.likeData.allqiyeArr = data.data.companyLists
      if (istype === 'collection') {
        if (data.data.companyLists.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有收藏的'
        }
      } else if (istype === 'buy') {
        if (data.data.companyLists.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有买过的'
        }
      } else if (istype === 'newCompany') {
        if (data.data.companyLists.length === 0) {
          this.likeData.isNode = true
          this.likeData.noText = '暂时还没有新店哦~'
        }
      }
      console.log(data.data, '企业请求')
    },
    loadwelfareImg (welfareImg) {
      if (welfareImg.indexOf('welfareImg_') < 0) {
        return welfareImg
      } else {
        var welfareImgList = JSON.parse(welfareImg)
        for (var k in welfareImgList) {
          if (k.indexOf('welfareImg_') >= 0) {
            var img = this.likeData.domainNameImg + welfareImgList[k]
            return img
          }
        }
      }
    },
    formatDate (now) {
      var year = now.getYear()
      var month = now.getMonth()+1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      return month+'月'+date+"日 "+hour+':'+minute
    },
    // 取消收藏的
    async isAixin (id) {
      var data = await fetch(`${this.likeData.domainName}mode=1&queryType=abolishConcern&companyid=${id}&userId=${this.likeData.userId}`).then(data => data.json())
      if (data.result === 'ok') {
        this.likeData.isClose = true
      }
      console.log(data, '取消收藏')
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.likeData.adminId = this.$store.state.adminId
        this.likeData.userId = this.$store.state.userId
        this.likeData.domainName = this.$store.state.domainName
        this.likeData.domainNameImg = this.$store.state.domainNameImg
        this.likeFn('view')
      }, 1)
    })
  }
}
</script>

<style scoped lang='stylus'>
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
.rob_qiang {
  .dataList_content{
    .content_right{
      >p:last-of-type{
        float left;
        color #666666;
        line-height .413333rem;
        span {
          float left !important;
        }
      }
      .qiangStep{
        width 2.666667rem;
        height .32rem;
        overflow hidden;
        background-color: #d4d4d4;
        border-radius .16rem;
        float left;
        margin-top: 0.28rem;
        margin-left .133333rem;
        div{
          height 100%;
          background-color: #fc4f69;
          order-radius: 12px;
        }
      }
    }
  }
}

.body {
  width 100%;
  height 100%;
  position fixed;
  left 0;
  top 0;
  background-color #f2f2f2;
  z-index -1;
}
.like {
  .like_header{
    width 100%;
    height 2.693333rem;
    background-image url('../assets/like/like_bg.png');
    background-size 100% 100%;
    background-repeat no-repeat;
    z-index 1;
    background-position center;
    position fixed;
    top 0;
    left 0;
    .like_contentBox{
      width 9.2rem;
      height 3.466667rem;
      background-color #ffffff;
      position absolute;
      top .426667rem;
      left 50%;
      transform translateX(-50%);
      border-radius .2rem;
      box-shadow: 0px 4px 10px 0px rgba(248, 97, 74, 0.1);
      .like_content{
        width 5.893333rem;
        height auto;
        margin: .4rem auto;
        .like_content_header{
          width 3.333333rem;
          height .666667rem;
          margin: .2rem auto .48rem auto;
          display flex;
          justify-content space-between;
          li{
            font-size .426667rem;
            color: #000000;
            padding-bottom .133333rem;
            padding-left .1333333rem;
            padding-right .1333333rem;
          }
          li.active{
            color: #fb6e79;
            border-bottom 2px solid #fb6e79;
          }
        }
        .like_content_footer{
          display flex;
          justify-content space-between;
          li{
            color: #666666;
            text-align center;
            img {
              width 1.066667rem;
              height 1.066667rem;
              display block;
            }
          }
          li.active {
            color #fb6e79;
          }
        }
      }
    }
  }
  .browseList{
    width 9.2rem;
    height auto;
    margin-top 4.20rem;
    margin-left 50%;
    transform translateX(-50%);
    .likeFuliTabDom{
      display flex;
      justify-content space-between;
      flex-wrap: wrap;
      .browseListContent{
        width 4.4rem;
        height 4.96rem;
        margin-bottom .4rem;
        border-radius .053333rem;
        background-color #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(196, 195, 195, 0.35);
        overflow hidden;
        >img{
          width:100%;
          height 2.773333rem;
        }
        >span:nth-of-type(1){
          font-size .32rem;
          margin-top .32rem;
          display block;
          color: #000000;
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
        >p {
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
    .topTabDom{
      padding .306667rem .266667rem;
      width 4.4rem !important;
      height 6.066667rem !important;
      >img:nth-of-type(1){
        width 1.466667rem;
        height 1.466667rem;
        display block;
        border-radius 50%;
        margin 0 auto;
      }
      span{
        display block !important;
      }
      >span:nth-of-type(1){
        text-align center;
        line-height .906667rem;
        margin-top 0!important;
        margin-left 0!important;
      }
      >span:nth-of-type(2){
        width 1.733333rem;
        height .506667rem;
        display flex !important;
        justify-content center;
        align-items center;
        background-color: #fc9c53;
        border:none!important;
        color #ffffff !important;
        border-radius .253333rem !important;
      }
      >span:nth-of-type(2){
        margin 0 auto;
        img{
          width .32rem;
          height .32rem;
          margin-right .04rem;
        }
      }
      >span:nth-of-type(3){
        text-align center;
        margin-left 0rem !important;
      }
      >div{
        display flex;
        justify-content center;
        align-items center;
        >a>img{
          width .373333rem;
          height .373333rem;
        }
        >img:nth-of-type(1){
          width .346667rem;
          height .346667rem;
        }
        >img:nth-of-type(2){
          width .386667rem;
          height .373333rem;
        }
        i{
          font-style normal;
          width .026667rem
          height .293333rem;
          margin 0 .133333rem;
          background-color #e5e4e4;
        }
      }
      .topTabFooter {
        margin-top .266667rem;
        display flex;
        justify-content space-between;
        img{
          width 1.813333rem !important;
          height 1.146667rem !important;
          border-radius .053333rem !important;
        }
      }
    }
  }
  .like_alert{
    width 100%;
    height 100%;
    position fixed;
    left 0;
    top 0;
    background-color rgba(0,0,0,0.5);
    z-index 10;
    .alert_content{
      width 6.933333rem;
      height 3.733333rem;
      border-radius .266667rem;
      background-color #ffffff;
      text-align center;
      font-size .4rem;
      color #000000;
      position absolute;
      top 0;
      left 0;
      right 0;
      bottom 0;
      margin auto;
      padding .28rem .24rem;
      >p:nth-of-type(1){
        text-align right;
        img{
          width .346667rem;
          height .346667rem;
        }
      }
      >img{
        width 1.2rem;
        height 1.2rem;
        margin-bottom .32rem;
      }
    }
  }
  .likeCode {
    .code{
      width 6.933333rem;
      height 7.3rem;
      position absolute;
      top 0;
      left 0;
      right 0;
      bottom 0;
      margin auto;
      background: -webkit-linear-gradient(#fb8972, #fc5b73);
      background: -o-linear-gradient(#fb8972, #fc5b73);
      background: -moz-linear-gradient(#fb8972, #fc5b73);
      background: linear-gradient(#fb8972, #fc5b73);
      border-radius 15px;
      text-align center;
      color #ffffff;
      font-weight 600;
      >p:nth-of-type(1) {
        text-align right;
        padding .28rem;
        padding-bottom 0px;
        img{
          width .36rem;
          height .36rem;
        }
      }
      span:first-of-type {
        font-size .426667rem;
      }
      >img {
        width 4rem;
        height 4rem;
        display block;
        margin .466667rem auto;
      }
    }
  }
}

</style>
