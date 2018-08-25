<template>
  <div id='mine'>
    <div class='qr_black' v-if='qrLock' ></div>
     <div class="banner">
       <div class="banner-info">
        <div class="my-avatar">
          <img :src="userIconUrl" alt="" />
        </div>
        <div class="my-info">
          <p class="my-name">
            <span>{{nickName}}</span>
            <i class="icon-edit" @click='routeUserInfo()'></i>
          </p>
          <p class="star-level">
            <i class="icon-start"></i>
            <i class="icon-start"></i>
            <i class="icon-start"></i>
          </p>
          <!-- <p class="score-tips">
            <span>亲，您只要用50个积分即可神级为二星福星等级</span>
            <a href="">获取积分</a>
          </p> -->
          <div class="ecode" @click='showQR()'>
            <i class="icon-ecode"></i>
            <span>公众号</span>
          </div>
          <div class="qr_frame" v-if='qrLock'>
            <p class='frame_p'>第二分社</p>
            <img :src="domainNameImg + QRImg" alt="">
            <i @click='closeQR()'></i>
          </div>
        </div>
      </div>
      <div class="banner-position">
      <div class="quick" @click='putForward()'></div>
        <div class="banner-position-lf">
          <img src="../assets/mine/coin.png" alt="" class="cion"/>
          <div class="coin-box">
            <span class="coin-text">福币数</span>
            <span class="coin-num" id="coin-num">1500</span>
            </div>
          </div>
        <div class="banner-position-rg" @click='routeIconShop()'>
          <div class="position-rg-box">
            <div>
              <img src="../assets/mine/center-cart.png" class="center-cart"/>
              <span class="fubishop">福币商城</span>
            </div>
          <p class="shop-tips">赶快去福币商城看看吧~~~</p>
        </div>
        <img src="../assets/mine/shop.png" alt="" class="icon-shop"/>
        </div>
      </div>
    </div>
    <img src="../assets/mine/play.png" alt="" class="play" @click='routePlay()'/>
    <div class="necessary">
      <p class="personal-title">必备功能</p>
      <ul class="personal-list">
        <!-- <li class="necessary-item" @click='routeMyOrder()'>
          <i class="necessary-icon icon-order"></i>
          <span>我的订单</span>
        </li> -->
        <li class="necessary-item">
          <i class="necessary-icon icon-discount" @click='routeCupon()'></i>
          <span>优惠卡券</span>
        </li>
        <li class="necessary-item" @click='routeMyIcon()'>
          <i class="necessary-icon icon-fubi"></i>
          <span>我的福币</span>
        </li>
        <li class="necessary-item" @click='routeIconShop()'>
          <i class="necessary-icon icon-fubishop"></i>
          <span>福币商城</span>
        </li>
        <li class="necessary-item" @click='myLevel()'>
          <i class="necessary-icon icon-superior"></i>
          <span>我的福星</span>
        </li>
      </ul>
      <div class="news">
        <div class="news-content">
          <p class="news-title">最新福币动态</p>
          <!-- <div class="news-item">
            <div class="news-avatar"><img src="../assets/mine/icon-focus.png" alt="" /></div>
            <div class="news-center">
              <p class="news-top">嘻嘻哈**<span>新增100</span>福币</p>
              <p class="news-bottom">福粉<span>妮妮**</span>贡献</p>
            </div>
            <div class="news-right">2018-04-12</div>
          </div> -->
          <div class='swiper-container' id='radioSwiper'>
            <div class='swiper-wrapper'>
              <div class=' news-item swiper-slide' v-for='items in iconMessage' :key='items.id'>
                <div class="news-avatar"><img :src="items.icon" alt="" /></div>
                <div class="news-center">
                  <p class="news-top">{{items.nickName}}<span>获得{{items.coinsNum}}</span>福币</p>
                  <p class="news-bottom"><span>{{items.gname}}</span>{{items.billingType | filterBillingType(items.gname)}}</p>
                </div>
                <div class="news-right">{{items.createTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="assist">
      <p class="personal-title">辅助功能</p>
      <ul class="assist-list">
        <li class="assist-item" @click='routeSignIn()'>
          <i class="assist-icon icon-sign"></i>
          <span>签到</span>
        </li>
        <li class="assist-item" @click='routeInvite()'>
          <i class="assist-icon icon-inviting"></i>
          <span>邀请卡</span>
        </li>
        <li class="assist-item" @click='routeMyShare()'>
          <i class="assist-icon icon-myshare"></i>
          <span>我的分享</span>
        </li>
        <li class="assist-item" @click='routeMyLike()'>
          <i class="assist-icon icon-focus"></i>
          <span>我的喜欢</span>
        </li>
        <li class="assist-item" @click='routeUnopened()'>
          <i class="assist-icon icon-group"></i>
          <span>我的福群</span>
        </li>
        <li class="assist-item" @click='routeMyMessage()'>
          <i class="assist-icon icon-msg"></i>
          <span>我的消息</span>
        </li>
        <li class="assist-item" @click='routeUnopened()'>
          <i class="assist-icon icon-view"></i>
          <span>意见反馈</span>
        </li>
        <li class="assist-item" @click='routeUnopened()'>
          <i class="assist-icon icon-help"></i>
        <span>帮助中心</span>
        </li>
      </ul>
    </div>
    <div class='levelShow' v-if='showLock'>{{putForwardHtml}}</div>
    <div class='laterShow levelShow' v-if='laterShowLock'>稍后推出，敬请期待</div>
    <div class='laterShow levelShow' v-if='myLevelLock'>无上级福星</div>
    <div class="superior-alert" id="myStar" v-if='myLevelLock'>
			<div class="superior-alert-content">
				<i class="superior-close" @click='closeMyLevel()'></i>
				<div class="superior-info">
					<img src="../assets/mine/superior-bg.png" class="superior-bg" />
					<div class="superior-avatar">
						<img id="touxiang" :src='myLevelData.share'/>
					</div>
					<div class="name-sex">
						<span class="superior-name" id="myName">{{myLevelData.shareName}}</span>
						<i id="sex" class="icon-sex" :class='items.sex === 2 ? "female" : "male"'></i>
					</div>
					<div class="time-count">
						<div class="time">
							<p class="time-count-text">我成为福星的时间</p>
							<p class="time-count-value" id="createTime">{{myLevelData.createTime | changeTime}}</p>
						</div>
						<div class="count">
							<p class="time-count-text">我为上级贡献福币总数</p>
							<p class="time-count-value" id="coins">{{myLevelData.shareTotal}}</p>
						</div>
					</div>
					<a  class="iwant" onclick="invitationstar()">我也要收福粉，躺赚福币！！！</a>
				</div>
			</div>
		</div>
    <bottom-gray></bottom-gray>
    <footer></footer>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  filters: {
    changeTime: function (value) {
      var date = value
      var n = date.valueOf()
      var date2 = new Date(n)
      return date2.toLocaleString()
    },
    filterBillingType: function (value, name) {
      // console.log(value, name)
      if (value == '1') {
        return '有效线上报名产生'
      } else if (value == '2') {
        return '有效点击计费产生'
      } else if (value == '3') {
        return '浏览展现计费产生'
      } else if (value == '4') {
        return '邀请产生'
      } else if (value == '5') {
        return '签到产生'
      } else if (value == '7') {
        return '成为平台福星 奖励'
      } else if (value == '8') {
        return '贡献'
      } else if (value == '9') {
        return '核销卡劵产生'
      } else if (value == '10') {
        return '领取优惠券'
      } else if (value == '11') {
        return '连续签到'
      } else if (value == '12') {
        return '购买产生'
      } else if (value == '13') {
        return '票券产生'
      } else if (value == '15') {
        return '点击产生福币'
      } else if (value == '16') {
        return '好友均分获得'
      }
    }
  },
  data () {
    return {
      qrLock: false,
      QRImg: null,
      showLock: false,
      putForwardData: null,
      putForwardHtml: null,
      iconMessage: null,
      iconMessageHtml: null,
      laterShowLock: false,
      userIconUrl: '',
      nickName: '',
      myLevelLock: false,
      myLevelData: null,
      adminId: null,
      domainName: null,
      userInfo: null,
      domainNameImg: null,
      userId: null

    }
  },
  mounted () {
    this.$nextTick(function () {
      // console.log(this.$store.state.userInfo.userIconUrl)
      this.userIconUrl = this.$store.state.userInfo.userIconUrl
      this.nickName = this.$store.state.userInfo.nickName
      this.domainName = this.$store.state.domainName
      this.domainNameImg = this.$store.state.domainNameImg
      this.userId = this.$store.state.userId
      this.adminId = this.$store.state.adminId
      this.getIconMessage()
      var swiper = new Swiper('#radioSwiper', {
        loop: true,
        autoplay: true,
        observer: true,
        observeParents: true,
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    })
  },
  methods: {
    closeMyLevel () {
      this.myLevelLock = false
    },
    // 我的福星
    async myLevel () {
      console.log(`${this.domainNameImg}manage/center/findhigherStar?userId=${this.userId}&adminId=${this.adminId}`)
      var data = await fetch(`${this.domainNameImg}manage/center/findhigherStar?userId=${this.userId}&adminId=${this.adminId}`).then(data => data.json())
      this.myLevelData = data
      if (data == null || data.statu == 'noExist') {
        alert('无上级福星')
      } else {
        this.myLevelLock = true
      }
      // console.log(this.myLevelData)
    },
    // 我的喜欢
    routeMyLike () {
      this.$router.push('/myLike')
    },
    // 我的福群 意见反馈 帮助中心
    routeUnopened () {
      this.laterShowLock = true
      var lock = setTimeout(() => {
        // console.log(this.laterShowLock)
        this.laterShowLock = false
        clearTimeout(lock)
      }, 1000)
    },
    // 我的消息
    routeMyMessage () {
      window.location.href = this.domainNameImg + '/manage/welfareIndex/messageCenter?adminId=' + this.adminId
    },
    // 邀请卡
    routeInvite () {
      if (this.userInfo.customIconUrl == '' || this.userInfo.customIconUrl == null) {
        window.location.href = `${this.domainNameImg}/manage/web/fuxingcard?id=${this.userId}&nickName=${this.nickName}&userIconUrl=${this.userIconUrl}&adminId=${this.adminId}&openID=${this.userInfo.openID}`
      } else {
        window.location.href = `${this.domainNameImg}/manage/web/fuxingcard?id=${this.userId}&nickName=${this.nickName}&userIconUrl=${this.userIconUrl}&adminId=${this.adminId}&openID=${this.userInfo.openID}`
      }
    },
    // 优惠卡券
    routeCupon () {
      window.location.href = `${this.domainNameImg}/external/ecard/ecardList?userId=${this.userId}`
    },
    // 玩转攻略
    routePlay () {
      window.location.href = `${this.domainNameImg}/manage/center/togonglue?adminId=${this.adminId}`
    },
    // 我的订单跳转
    routeMyOrder () {
    },
    // 我的分享跳转
    routeMyShare () {
      window.location.href = `${this.domainNameImg}manage/shareRecords/toShareRecords?adminId=${this.adminId}`
    },
    // 我的福币跳转
    routeMyIcon () {
      window.location.href = `${this.domainNameImg}manage/center/fubiDetailed?adminId=${this.adminId}&userId=${this.userId}`
    },
    // 签到跳转
    routeSignIn () {
      window.location.href = `${this.domainNameImg}terminal/sign/querySign?adminId=${this.adminId}&tbUserId=${this.userId}`
    },
    // 个人信息
    routeUserInfo () {
      window.location.href = `${this.domainNameImg}manage/center/information?adminId=${this.adminId}`
    },
    // 福币商城
    routeIconShop () {
      window.location.href = `${this.domainNameImg}terminal/tostore?adminId=${this.adminId}&userId=${this.userId}`
    },
    // 兑现
    async putForward () {
      var data = await fetch(`${this.domainName}mode=4&queryType=quickCash&userId=${this.userId}`).then(data => data.json())
      this.putForwardData = data.result
      if (this.putForwardData == 'no') {
        this.showLock = true
        this.putForwardHtml = '系统异常'
      } else if (this.putForwardData == 'NO') {
        this.putForwardHtml = '余额不足'
      } else if (this.putForwardData == 'OK') {
        this.putForwardHtml = '恭喜提现成功!赶快去零钱查看'
      } else if (this.putForwardData == 'NO') {
        this.putForwardHtml = '距离下次快速提现还剩' + this.putForwardData.surplus
      }
      var lock = setTimeout(() => {
        this.showLock = false
      }, 1500)
      clearTimeout(lock)
      // console.log(data)
    },
    // 二维码
    async showQR () {
      this.qrLock = !this.qrLock
      var data = await fetch(`${this.domainName}mode=1&queryType=queryCode&adminId=${this.adminId}`).then(data => data.json())
      this.QRImg = data.data.adminUser.wxQrcode
    },
    closeQR () {
      this.qrLock = false
    },
    async getIconMessage () {
      var data = await fetch(`${this.domainName}mode=4&queryType=queryFlowRecords&adminId=${this.adminId}`).then(data => data.json())
      this.iconMessage = data.data.data
      // console.log(this.iconMessage)
    }
  }
}
</script>

<style lang='stylus' scoped>
.superior-alert-content{
  width: 7.5rem;
  height: 10.45rem;
  position: absolute;
  top: 2.36rem;
  left: 50%;
  margin-left: -3.75rem;
  background: #fff;
  border-radius: 0.15rem;
}
.superior-close{
	width: 1.12rem;
	height: 1.12rem;
	background: url('../assets/mine/less-close.png') no-repeat center;
	background-size: 100%;
	border-radius: 50%;
	position: absolute;
	top: -0.33rem;
	right: -0.27rem;
}
.superior-bg{
	width: 100%;
}
.superior-avatar{
	text-align: center;
	margin-top: -1.12rem;
}
.superior-avatar img{
	width: 1.73rem;
	border-radius: 50%;
	border: 0.08rem solid #fab6b4;
}
.name-sex{
	margin-top: .4rem;
	text-align: center;
}
.superior-name{
	font-size: .4rem;
	color: #626161;
}
.icon-sex{
	display: inline-block;
	width: .36rem;
	height: .36rem;
	margin-left: 0.28rem;
}
.icon-sex.female{
	background: url('../assets/mine/female.png') no-repeat center;
	background-size: 100%;
}
.icon-sex.male{
	background: url('../assets/mine/male.png') no-repeat center;
	background-size: 100%;
}
.time-count{
	margin-top: .74rem;
	text-align: center;
	height: auto;
	overflow: hidden;
}
.time,.count{
	width: 50%;
	float: left;
}
.time{
	border-right: 1px solid #cdcbcb;
}
.time-count-text{
	font-size: .3rem;
	color: #626161;
}
.time-count-value{
	font-size: .28rem;
	color: #fb560a;
}
.iwant{
	clear: both;
	display: block;
	width: 6.4rem;
	height: 0.92rem;
	background: #f45552;
	color: #fff;
	margin: 0 auto;
	text-align: center;
	line-height: 0.92rem;
	margin-top: 1.2rem;
	border-radius: 0.18rem;
}
#mine {
  background: #F2F2F2;
}
.banner {
  width: 100%;
  height: auto;
  position: relative;
}
#radioSwiper{
  height 1rem;
}
.qr_frame{
  width 7.2rem;
  height 8.266667rem;
  background url('../assets/home/QR_bg.png') no-repeat;
  background-size 100% 100%;
  position fixed;
  bottom 0;
  right 0;
  top 0;
  left 0;
  margin auto;
  z-index 999;
  color #fff;
  text-align center;
  .frame_p{
    font-size .6rem;
    margin-top 1.5rem;
    margin-bottom .25rem;
  }
  img{
    display block;
    width 4rem;
    height 4rem;
    margin 0 auto;
  }
  i{
    display block;
    background url('../assets/home/closeQR.png') no-repeat;
    width .6rem;
    height .6rem;
    background-size 100% 100%;
    position absolute;
    bottom -1.2rem;
    left 50%;
    margin-left -0.3rem;
  }
}
.qr_black{
  width 100%;
  height 100%;
  position absolute;
  top 0;
  left 0;
  background rgba(0, 0, 0, 0.6);
  z-index 998
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
  z-index 10
}
.banner-info {
  width: 100%;
  height: 4.27rem;
  background: url('../assets/mine/banner.png') no-repeat center;
  background-size: 100%;
  padding: 0.4rem;
  display: flex;
}

.my-avatar {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  overflow: hidden;
}

.my-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 0.075rem solid #ffecaa;
}

.my-info {
  flex: 1;
  margin-left: 0.267rem;
  padding-top: 0.3rem;
  color: #fff;
  position: relative;
}

.my-name {
  font-size: 0.45rem;
}

.icon-edit {
  display: inline-block;
  width: 0.43rem;
  height: 0.4rem;
  background: url('../assets/mine/edit.png') no-repeat center;
  background-size: 100%;
  margin-left: 0.4rem;
}

.star-level {
  margin-bottom: 0.04rem;
  margin-top: 0.04rem;
}

.icon-start {
  display: inline-block;
  width: 0.36rem;
  height: 0.4rem;
  background: url('../assets/mine/me_xing.png') no-repeat center;
  background-size: 100%;
  margin-right: 0.1rem;
}

.score-tips {
  font-size: 0.27rem;
}

.score-tips a {
  text-decoration: none;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.3rem;
  padding: 0.12rem 0.16rem;
}

.ecode {
  position: absolute;
  top: 0.4rem;
  right: 0rem;
}

.icon-ecode {
  display: block;
  width: 0.453rem;
  height: 0.43rem;
  background: url('../assets/mine/ecode.png') no-repeat center;
  background-size: 100%;
  margin: 0 auto;
}

.banner-position {
  width: 9.35rem;
  height: 1.73rem;
  background: url('../assets/mine/center-banner.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 50%;
  margin-left: -4.7rem;
  bottom: -0.8rem;
  display: flex;
}

.quick {
  width: 3rem;
  height: 1rem;
  background: url('../assets/mine/quick.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 1.78rem;
  top: -0.8rem;
}

.banner-position-lf {
  float: left;
  width: 2.5rem;
}

.cion {
  width: 0.88rem;
  object-fit: cover;
  vertical-align: middle;
  margin-top: 0.53rem;
  margin-left: 0.26rem;
}

.coin-box {
  float: right;
  text-align: center;
  padding-top: 0.4rem;
}

.coin-text {
  display: block;
  font-size: 0.32rem;
  color: #666;
}

.coin-num, .fubishop {
  font-size: 0.56rem;
  color: #f6805a;
}

.banner-position-rg {
  margin-top: 0.4rem;
  flex: 1;
  padding-left: 0.8rem;
  display: flex;
}

.position-rg-box {
  flex: 1;
}

.center-cart {
  width: 1.6rem;
  margin-right: 0.53rem;
}

.shop-tips {
  color: #a6a3a3;
  font-size: 0.3rem;
}

.icon-shop {
  width: 0.93rem;
  height: 0.84rem;
  margin-right: 0.23rem;
}

.play {
  display: block;
  width: 9.33rem;
  margin: 0 auto;
  margin-top: 1.33rem;
}

.necessary, .assist {
  width: 9.33rem;
  height: auto;
  overflow: hidden;
  background: #fff;
  margin: 0 auto;
  margin-top: 0.53rem;
  border-radius: 0.51rem;
}

.personal-title {
  color: #393939;
  font-size: 0.35rem;
  padding: 0.3rem 0.4rem 0.2rem;
  border-bottom: 1px solid #ededed;
}

.personal-list {
  padding-top: 0.4rem;
  display flex;
  justify-content space-around;
}
.necessary-item {
  width: 20%;
  float: left;
  text-align: center;
}

.necessary-icon {
  display: block;
  width: 0.64rem;
  height: 0.6rem;
  margin: 0 auto;
  margin-bottom: 0.17rem;
}

.icon-order {
  background: url('../assets/mine/icon-order.png') no-repeat center;
  background-size: 100%;
}

.icon-discount {
  background: url('../assets/mine/icon-discount.png') no-repeat center;
  background-size: 100%;
}

.icon-fubi {
  background: url('../assets/mine/icon-fubi.png') no-repeat center;
  background-size: 100%;
}

.icon-fubishop {
  background: url('../assets/mine/icon-fubishop.png') no-repeat center;
  background-size: 100%;
}

.icon-superior {
  background: url('../assets/mine/icon-superior.png') no-repeat center;
  background-size: 100%;
}

.necessary-item span {
  color: #666;
  font-size: 0.3rem;
}

.news {
  clear: both;
  padding: 0.4rem;
}

.news-content {
  width: 100%;
  height: 1.83rem;
  background: #f2f2f2;
  border-radius: 0.35rem;
  padding: 0.27rem;
}

.news-title {
  color: #666;
  font-size: 0.27rem;
}

.news-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.27rem;
  // margin-top: 0.17rem;
}

.news-avatar {
  width: 0.83rem;
  height: 0.83rem;
  border-radius: 0.25rem;
  overflow: hidden;
}

.news-avatar img {
  width: 100%;
  height: 100%;
}

.news-center {
  flex: 1;
  color: #666;
  padding-left: 0.3rem;
}

.news-top span, .news-bottom span {
  color: #fb560a;
}

.news-right {
  width: 1.73rem;
  color: #acabab;
  text-align: right;
}

.assist {
  padding-bottom: 0.68rem;
}

.assist-list {
  width: 100%;
  height: auto;
  text-align: center;
}

.assist-item {
  width: 25%;
  float: left;
  margin-top: 0.6rem;
}

.assist-icon {
  display: block;
  width: 0.93rem;
  height: 0.84rem;
  margin: 0 auto;
}

.icon-sign {
  background: url('../assets/mine/icon-sign.png') no-repeat center;
  background-size: 100%;
}

.icon-inviting {
  background: url('../assets/mine/icon-inviting.png') no-repeat center;
  background-size: 100%;
}

.icon-myshare {
  background: url('../assets/mine/icon-myshare.png') no-repeat center;
  background-size: 100%;
}

.icon-focus {
  background: url('../assets/mine/icon-focus.png') no-repeat center;
  background-size: 100%;
}

.icon-group {
  background: url('../assets/mine/icon-group.png') no-repeat center;
  background-size: 100%;
}

.icon-msg {
  background: url('../assets/mine/icon-msg.png') no-repeat center;
  background-size: 100%;
}

.icon-view {
  background: url('../assets/mine/icon-view.png') no-repeat center;
  background-size: 100%;
}

.icon-help {
  background: url('../assets/mine/icon-help.png') no-repeat center;
  background-size: 100%;
}
</style>
