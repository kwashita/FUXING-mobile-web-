<template>
  <div>
    <section class="view">
      <!--奖励规则按钮-->
      <!-- <a><img class="me_rewardbtn" src="../assets/myPowder/mx_reward.png"/></a> -->
      <!--邀请福星按钮-->
      <a><img class="me_yaoqingbtn" src="../assets/myPowder/right.png"/></a>
      <!--banner区域-->
      <div class="me_ximgbanner">
        <a><img class="mx_alink" @click="toa" src="../assets/myPowder/me_yaoqingbtn.png" /></a>
        <!--福币信息-->
        <div class="me_ximgfubi">
						<p @click="showstarDetail = true">
							<span id="starpeople">{{yesAwakenArrLength == null ? '0' : yesAwakenArrLength}}</span>
							<span>已发展福粉人数
								<img class="" src="../assets/myPowder/awksymbol.png" style="display:inline-block;vertical-align:middle;width:0.32rem;height:0.32rem;object-fit:cover;">
							</span>
						</p>
						<p @click="showhowToReadDetail = true">
							<span id="coinsTotal">{{admissionNum}}</span>
							<span>
								已入账福币
								<img class="" src="../assets/myPowder/awksymbol.png" style="display:inline-block;vertical-align:middle;width:0.32rem;height:0.32rem;object-fit:cover;">
							</span>

						</p>
						<p @click="awaken = true">
							<span id="futrCoins">{{soonNum}}</span>
							<span>即将入账福币
								<img class="" src="../assets/myPowder/awksymbol.png" style="display:inline-block;vertical-align:middle;width:0.32rem;height:0.32rem;object-fit:cover;">
							</span>
						</p>
					</div>
      </div>
      <!-- tab选项卡区域 -->
      <div class="me_xingtab">
        <a href="javascript:void(0)"><img src="../assets/myPowder/mx_awaken.png" @click="awaken = true" alt="" class="mx_awaken"></a>
        <ul class="me_xingtab_header">
          <li @click="isTab = true" :class="isTab == true ? 'active': ''"><span>我的福星</span></li>
          <li @click="isTab = false" :class="isTab == false ? 'active': ''"><span>唤醒福星</span></li>
        </ul>
        <!-- 我的福星block -->
        <ul class="me_xingtab_content myfx" v-if="isTab">
          <li class="me_xingtab_item" v-for="item in yesAwakenArr" :key="item.id">
            <!-- {{admissionFn(item.coins_reward, item.coins_own)}} -->
            <div class="thumb-box">
              <img :src="item.user_icon_url">
            </div>
            <p class="user-name">
              {{item.nick_name}}<i class="name_star"></i><i class="name_star"></i>
            </p>
            <p class="gain">
              邀请奖励{{item.coins_reward}}福币
            </p>
            <p class="mx_date">
              {{item.create_time.split(' ')[0]}}成为福粉
            </p>
            <div class="me_fubi">
              <img src="../assets/myPowder/bi.png">进贡{{item.coins_own}}福币
            </div>
          </li>
        </ul>
        <!-- 唤醒福星block -->
        <ul class="me_xingtab_content awakefx" v-else>
          <li class="me_xingtab_item" v-for="item in noAwakenArr" :key="item.id">
            <div class="thumb-box">
              <img :src="item.user_icon_url">
            </div>
            <p class="user-name">
              {{item.nick_name}}<i class="name_star"></i><i class="name_star"></i>
            </p>
            <p class="gain">
              即将获得{{item.coins_reward}}福币
            </p>
            <p class="mx_date">
              {{item.create_time.split(' ')[0]}}成为福粉
            </p>
            <div class="btnbox">
              <button type="button" class="remind">唤醒TA</button>
            </div>
          </li>
        </ul>
      </div>
    <!--me列表-->
      <!-- <div class="me_none">
        <p>还没有好友接受你的邀请~</p>
      </div> -->
      <!-- 已发展福粉 -->
      <div class="fans-alert" id="starDetail" v-if="showstarDetail">
        <div class="fans-alert-content" style="display:block;">
          <i class="fans-close" @click="showstarDetail = false"></i>
          <div class="fans-head"></div>
          <div class="fans-body">
            <strong>
              <p class="fans-count">已唤醒福粉： <span id="alreadyAwake">{{yesAwakenArrLength == null ? '0' : yesAwakenArrLength}}</span>个<i class="seize"></i>  未唤醒福粉：<span id="unalreadyAwake">{{noAwakenArrLength == null ? '0' : noAwakenArrLength}}</span> 个</p>
              <p class="fans-sum">总发展福粉人数：<span id="totalAlreadyAwake">{{yesAwakenArrLength + noAwakenArrLength}}</span> 人</p>
            </strong>
            <p class="fans-tips">扩张福粉规模，<span style="color:rgb(236,159,0)">一旦发展终身拥有</span>, 每成功邀请一位福粉且唤醒TA你就立即获得<span style="color:rgb(255,0,0)">{{inviterCoin}}福币</span>奖励，除邀请奖励外只要TA消费或做任务，你就<span style="color:rgb(236,159,0)">永远</span>轻松躺赚进贡福币啦!!!</p>
            <a class="develop" @click="toa">立即发展福粉赚福币</a>
            <a class="awake-fans" @click="qiehuan">唤醒福粉</a>
          </div>
        </div>
      </div>
      <!-- 什么是赚福币 -->
      <div class="what-alert" id="howToReadDetail" v-if="showhowToReadDetail">
				<div class="what-alert-content">
					<i class="what-close" @click="showhowToReadDetail = false"></i>
					<div class="what-head"></div>
					<div class="what-body">
						<p class="what-count">已赚福币数：<span id="alreadAccount">4786.6</span>个</p>
						<p class="what-title"> 已赚福币</p>
						<p class="what-title">是邀请福粉且已唤醒福粉获得的邀请福币 <br>奖励和所有福粉做任务上贡福币的总和</p>
						<a class="awake-what" @click="toa"></a>
					</div>
				</div>
		  </div>
      <!-- 如何唤醒福星 -->
      <div class="awaken_alert_mask" v-if="awaken">
        <div class="awaken_alert">
          <div class="awaken_title"></div>
          <div class="awaken_close" @click="awaken = false"></div>
          <div class="awaken_alert_content">
            成功唤醒福星您可得<span>{{inviterCoin}}</span>福币，福星可得<span>{{invitedCoin}}</span>福币，唤醒福星越多，奖励越多
          </div>
          <div class="awaken_alert_tips">
            <p>• 福星需点击“唤醒TA”按钮，并通过微信发送链接给好友</p>
            <p>• 好友需点击福星的链接，并登录福币商城</p>
            <p>• 好友需有效分享福利</p>
          </div>
          <button type="button" @click="getFufen" class="partakebtn">立即参与</button>
        </div>
      </div>
      <div style="height: 1.306667rem;"></div>
    </section>
  </div>
</template>
<script>
// import '../../static/MyStar.css'
export default {
  data () {
    return {
      showstarDetail: false,
      showhowToReadDetail: false,
      awaken: false,
      isTab: true,
      adminId: this.$store.state.adminId,
      userId: this.$store.state.userId,
      domainName: this.$store.state.domainName,
      domainNameImg: this.$store.state.domainNameImg,
      yesAwakenArr: null,
      noAwakenArr: null,
      yesAwakenArrLength: null,
      noAwakenArrLength: null,
      soonNum: 0,
      admissionNum: 0,
      inviterCoin: 0,
      invitedCoin: 0,
      numArr: []
    }
  },
  methods: {
    async stayFn (isType) {
      var data = await fetch(`${this.domainName}mode=3&queryType=queryFans&fuxingState=${isType}&userid=${this.userId}`).then(data => data.json())
      var num = 0
      var num2 = 0
      if (isType === 'IS') {
        this.yesAwakenArr = data.data.data
        this.yesAwakenArrLength = this.yesAwakenArr.length
        data.data.data.forEach((item, idx) => {
          num += (item.coins_reward + item.coins_own)
        })
        this.admissionNum = num
      } else {
        this.noAwakenArr = data.data.data
        this.noAwakenArrLength = this.noAwakenArr.length
        data.data.data.forEach((item, idx) => {
          num2 += (item.coins_reward + item.coins_own)
        })
        this.soonNum = num2
      }
      // console.log(data.data.data, '某个')
    },
    //
    qiehuan () {
      this.showstarDetail = false
      this.awaken = true
    },
    //立即邀请福星跳转
    toa () {
      window.location.href = `${this.domainNameImg}manage/center/tofuxingcard?adminId=${this.$store.state.adminId}`
    },
    async infoFn () {
      var data = await fetch(`${this.domainName}mode=1&queryType=querySystem&adminId=${this.$store.state.adminId}`).then(data => data.json())
      this.inviterCoin = data.data.data.inviterCoin
      this.invitedCoin = data.data.data.invitedCoin
      // console.log(data.data.data, 'info')
    },
    getFufen () {
      this.isTab = false
      this.awaken = false
    }
    // admissionFn (num, num2) {
    //   admissionNum += num
    //   admissionNum += num2
    //   console.log(admissionNum, num, num2)
    // }
  },
  mounted () {
    this.stayFn('IS')
    this.stayFn('NO')
    this.infoFn()
  },
  watch: {
    isTab (oldVal) {
      if (oldVal) {
        this.stayFn('IS')
      } else {
        this.stayFn('NO')
      }
    }
  },
  computed: {
    admissionFn (num, num2) {
      console.log(num, num2)
    }
  }
}
</script>
<style lang="stylus" scoped>
*{
  -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
          box-sizing: border-box;
}
body{
  background:#f5f5f5;
}
.me_none {
  width: 6rem;
  /* background: url(../assets/myPowder/xin01.png) no-repeat center; */
  background-size: 2.77rem 2.77rem;
  margin: 2rem auto;
  text-align: center;
  color: #999999;
  padding-top: 2.8rem;
  font-size: 0.28rem;
  height: 1.9rem;
}
.me_xingtopmsg{
  height:0.8rem ;
  width: 100%;
  overflow: hidden;
  text-align: center;
  background: #fef3dd;
  color: #333;
  position: fixed;
  top: 0;
  line-height: 0.8rem;
  z-index:9;
}
.me_xingtopmsg li{
  height: 0.8rem;
  font-size: 0.32rem;
}
.me_xingtopmsg li img{
  width: 0.5rem;
}
.me_ximgbanner{
  height: auto;
  width: 100%;
  background: url(../assets/myPowder/me_ximgbanner-gai2.png) no-repeat;
  background-size:100% 100%;
  background-position 0 -0.6rem;
  overflow: hidden;
}
.me_ximgbanner .mx_alink{
  width: 5.06rem;
  height: 1.06rem;
  display: block;
  margin-top:4.8rem ;
  margin-left:2.7rem ;
  margin-bottom: 0.24rem;
  z-index: 0;
}
.me_ximgfubi{
  height: 1.06rem;
  background: #8b270a;
}
.me_ximgfubi p{
  float: left;
  width: 33%;
  text-align: center;
  color: #fff;
  padding-top: .1rem;
  background: url(../assets/myPowder/me_xian.png) center  right no-repeat;
  background-size:0.05rem 0.72rem ;
  background-position-y:0.23rem ;
}.me_ximgfubi p:last-child{
  background: none;
}
.me_ximgfubi p span{
  display: block;
  font-size: 0.25rem;

}
.me_ximgfubi p span:nth-child(1){
  font-weight: bold;
  font-size: 0.3rem;
  padding-top: 0.1rem;
}
.me_yaoqingbtn{
  border:0;
  position: fixed;
  width: 2.02rem;
  right: 0;
  top: 1.25rem;
}
.me_rewardbtn{
  position: fixed;
  width: 2.02rem;
  left: 0;
  top: 1.25rem;
}
/*左右抖动*/
.mx_alink{
  animation: zX 1.5s infinite;
}
@-webkit-keyframes zX {
  10% {
    transform: scale(0.94);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(0.94);
  }
  40% {
    transform: scale(1);
  }
  50%,
  100% {
    transform: scale(0.94);
  }
}
.mx_awaken{
  position: fixed;
  top: 48%;
  right: 0;
  width: .65rem;
}
.me_xingtab_div{
  background:#f5f5f5;
}
.me_xingtab_header{
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background:#fff;
}
.me_xingtab_header li{
  width: 50%;
  float: left;
  color: #f75223;
  font-size:.3rem;
  font-weight:bold;
}
.me_xingtab_header li.active span{
  display: inline-block;
  width: 33%;
  border-bottom:3px solid #f75223;
}
.me_xingtab_content{
  width: 100%;
    clear: both;
    height: auto;
    overflow: hidden;
    padding: 0.1rem .4rem 0.12rem .28rem;
    background: #f5f5f5;
}
.me_xingtab_item{
  width: 48%;
    height: auto;
    overflow: hidden;
    float: left;
    text-align: center;
    padding: .2rem;
    margin-left: 0.12rem;
    background: #fff;
    border-radius: 4px;
    margin-bottom: .1rem;
}
.me_xingtab_item .thumb-box{
  width: 2rem;
  height: 2.28rem;
  background:url('../assets/myPowder/crown.png') no-repeat center;
  background-size:100%;
  text-align: center;
    line-height: 2.55rem;
    margin: 0 auto;
}
.thumb-box img{
  width: 93%;
    height: 80%;
    object-fit: cover;
    border-radius: 50%;
    vertical-align: middle;
}
.user-name{
  font-size:.35rem;
  color: #333;
  margin-top: .3rem;
}
.gain{
  font-size:.28rem;
  color: #666;
  margin-top: .2rem;
}
.mx_date{
  font-size:.25rem;
  color: #999;
  margin-top: .2rem;
}
  /* 福星新弹框 */
.btnbox{
  margin-top: .29rem;
  padding-top: 0.18rem;
  border-top:2px solid #f2f2f2;
}
.remind{
  -webkit-appearance: none;
    background: #fff;
    border: 2px solid #f8623e;
    color: #f8623e;
    border-radius: 8px;
    width: 60%;
  font-size:.28rem;
  padding: .1rem 0;
}
.awaken_alert_mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom:0;
  right:0;
  background:rgba(0,0,0,0.6);
  z-index: 99;
}
.awaken_alert_tips{
  width: 100%;
  height: auto;
  overflow: hidden;
  background:#f7f7f7;
  padding: 1.08rem .5rem 1rem;
  color: #9e9e9e;
  font-size:.35rem;
  line-height: .75rem;
  margin: .14rem 0.2rem;
}
.awaken_alert{
  position: fixed;
  width: 90.5%;
  height: 12.76rem;
  top: 50%;
  margin-top: -6.38rem;
  z-index: 10;
  background:#fff;
  left: 50%;
  margin-left: -45%;
  border-radius:.2rem;
  padding: .5rem;
}
.awaken_title{
  width: 5.62rem;
  height: 1.2rem;
  position: absolute;
  background:url('../assets/myPowder/awake.png') no-repeat center;
  background-size:100%;
  left: 50%;
    margin-left: -2.81rem;
    top: -0.26rem;
    color: #fff;
}
.awaken_close{
  width: .47rem;
  height: .47rem;
  background:url('../assets/myPowder/close.jpg') no-repeat center;
  background-size:100%;
  position: absolute;
    top: .24rem;
    right: .45rem;
}
.me_fubi img {
  width: 0.52rem;
  height: 0.42rem;
  padding: 0.02rem;
  padding-right: 0.1rem;
}
.awaken_alert_content{
  margin-top: 1rem;
  font-size:.5rem;
  color: #464646;
  letter-spacing:1px;
}
.awaken_alert_content span{
  color: #f75223;
}
.partakebtn{
  -webkit-appearance: none;
    background: #f75223;
    border: none;
    color: #fff;
      width: 84%;
    height: 1.1rem;
    line-height: 1.1rem;
    border-radius: .5rem;
    position: absolute;
    left: 50%;
    margin-left: -42%;
}
.pointToAkw{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:99;
}
.wx_zhiyin{
  width: 8.49rem;
  margin-left: 1.5rem;
  display: block;
  margin-top:-1rem;
}
.wx_zhiyinido{
  width: 2.93rem;
  display: block;
  margin: 1.33rem auto;
}
.name_star{
  display: inline-block;
  width: .3rem;
  height: .35rem;
  background: url('../assets/myPowder/star.gif') no-repeat center;
  background-size: 100% 100%;
  margin-left: 0.08rem;
  vertical-align: middle;
}
.fans-alert{
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.fans-alert-content{
  width: 7.96rem;
  height: 12.76rem;
  margin: 0 auto;
  margin-top: .67rem;
  position: relative;
}
.fans-close{
  display: block;
  width: .63rem;
  height: .63rem;
  background: url('../assets/myPowder/fans-close.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
.fans-head{
  width: 7.85rem;
  height: 5.373rem;
  background: url('../assets/myPowder/fans-head.png') no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  z-index: 999;
}
.fans-body{
  width: 7.2rem;
    height: 7.3rem;
  background: url('../assets/myPowder/fans-body.png') no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  padding-top: .53rem;
  margin-top: -2px;
  text-align: center;
}
.fans-count{
  font-size: .35rem;
  color: #000000;
  text-align: center;
}

.fans-count span{
  color: #ef2519;
}
.seize{
  display: inline-block;
  width: 0.28rem;
}
.fans-sum{
    margin-top: .1rem;
  font-size: .48rem;
  color: #ef2519;
}
.fans-tips{
  padding: 0 .4rem;
  font-size: 0.28rem;
  color: #626261;
  margin-top: 0.16rem;
}
.develop,.awake-fans{
  display: block;
  width: 5.93rem;
  height: 1.22rem;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  line-height: 1.22rem;
  font-size: .56rem;
  margin-top: .4rem;
}
.develop{
  background: url('../assets/myPowder/develop.png') no-repeat center;
  background-size: 100%;
}
.awake-fans{
  background: url('../assets/myPowder/alertawake.png') no-repeat center;
  background-size: 100%;
}
/* 	新弹框 */
.what-alert{
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
.what-alert-content{
  width: 7.73rem;
  height: 9.87rem;
  margin: 0 auto;
  margin-top: 1.72rem;
  position: relative;
  border-radius: .25rem;
}
.what-close{
  display: block;
  width: .93rem;
  height: .93rem;
  background: url('../assets/myPowder/what-close.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  top: -.3rem;
  right: -.3rem;
}
.what-head{
  width: 7.73rem;
  height: 5.82rem;
  background: url('../assets/myPowder/what-banner.png') no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  z-index: 999;
  margin-top: 3rem;
}
.what-body{
  width: 7.73rem;
  height: 4.04rem;
  background: #fff;
  margin: 0 auto;
  margin-top: -1px;
  text-align: center;
  border-radius: 0 0 .2rem .2rem;
}
.what-count{
  font-size: .37rem;
  color: #000000;
  text-align: center;
  font-weight:600;
  margin-bottom: .2rem;
}
.what-count span{
  color: #f0652f;
}
.what-title{
  font-size: .35rem;
  color: #000;
  line-height: .58rem;
    padding: 0 .5rem;
    margin-top: .1rem;
}
.awake-what{
  width: 100%;
  height: 1.04rem;
  background: url('../assets/myPowder/awake-what.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
}
.pointTitle{
  color: white;
  text-align: center;
  font-size: 0.38rem;
  margin-top: -1rem;
}
.me_xingtopmsg{
  height:0.8rem ;
  width: 100%;
  overflow: hidden;
  text-align: center;
  background: #fef3dd;
  color: #333;
  position: fixed;
  top: 0;
  line-height: 0.8rem;
}
.me_xingtopmsg li{
  height: 0.8rem;
  font-size: 0.32rem;
}
.me_xingtopmsg li img{
  width: 0.5rem;
}
.me_ximgbanner{
  height: auto;
  width: 100%;
  background-size:100% 100% ;
  overflow: hidden;
}
.me_ximgbanner .mx_alink{
  width: 5.06rem;
  height: 1.06rem;
  display: block;
  margin-top:4.49rem ;
  margin-left:2.7rem ;
  margin-bottom: 0.24rem;
}
.me_ximgfubi{
  height: 1.06rem;
  background: #8b270a;
}
.me_ximgfubi p{
  float: left;
  width: 33%;
  text-align: center;
  color: #fff;
  padding-top: .1rem;
  background: url(../assets/myPowder/me_xian.png) center  right no-repeat;
  background-size:0.05rem 0.72rem ;
  background-position-y:0.23rem ;
}.me_ximgfubi p:last-child{
  background: none;
}
.me_ximgfubi p span{
  display: block;
  font-size: 0.25rem;

}
.me_ximgfubi p span:nth-child(1){
  font-weight: bold;
  font-size: 0.3rem;
  padding-top: 0.1rem;
}
.me_yaoqingbtn{
  position: fixed;
  width: 2.02rem;
  right: 0;
  top: 1.25rem;
}
.me_rewardbtn{
  position: fixed;
  width: 2.02rem;
  left: 0;
  top: 1.25rem;
}
/*左右抖动*/
.mx_alink{
  animation: zX 1.5s infinite;
}
@-webkit-keyframes zX {
  10% {
      transform: scale(0.94);
  }
  20% {
      transform: scale(1);
  }
  30% {
      transform: scale(0.94);
  }
  40% {
      transform: scale(1);
  }
  50%,
  100% {
      transform: scale(0.94);
  }
}
.mx_awaken{
  position: fixed;
  top: 40%;
  right: 0;
  width: .65rem;
}
.me_xingtab_header{
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
}
.me_xingtab_header li{
  width: 50%;
  float: left;
  color: #f75223;
  font-size:.3rem;
}
.me_xingtab_header li.active span{
  display: inline-block;
  width: 33%;
  border-bottom:3px solid #f75223;
}
.me_xingtab_content{
  width: 100%;
  clear: both;
  height: auto;
  overflow: hidden;
  padding: 0.1rem .4rem 0.12rem .28rem;
  background: #f5f5f5;
}
.me_xingtab_item{
  width: 48%;
  float: left;
  text-align: center;
  padding: .2rem;
  margin-left: 0.12rem;
  background: #fff;
  border-radius: 4px;
  margin-bottom: .1rem;
}
.me_xingtab_item .thumb-box{
  width: 2rem;
  height: 2.28rem;
  background:url('../assets/myPowder/crown.png') no-repeat center;
  background-size:100%;
  text-align: center;
  line-height: 2.55rem;
  margin: 0 auto;
}
.thumb-box img{
  width: 93%;
  height: 80%;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: middle;
}
.user-name{
  font-size:.35rem;
  color: #333;
  margin-top: .3rem;
}
.gain{
  font-size:.28rem;
  color: #666;
  margin-top: .2rem;
}
.mx_date{
  font-size:.25rem;
  color: #999;
  margin-top: .2rem;
}
.btnbox{
  margin-top: .29rem;
  border-top:2px solid #f2f2f2;
}
.remind{
  -webkit-appearance: none;
  background: #fff;
  border: 2px solid #f8623e;
  color: #f8623e;
  border-radius: 5px;
  width: 60%;
  font-size:.28rem;
  padding: .1rem 0;
}
.awaken_alert_mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.3);
  z-index: 10;
}
.awaken_alert{
  position: fixed;
  width: 90.5%;
  height: 12.76rem;
  top: 50%;
  margin-top: -6.38rem;
  z-index: 99;
  background:#fff;
  left: 50%;
  margin-left: -45%;
  border-radius:.2rem;
  padding: .5rem;
}
.awaken_title{
  width: 5.62rem;
  height: 1.2rem;
  position: absolute;
  background:url('../assets/myPowder/awake.png') no-repeat center;
  background-size:100%;
  left: 50%;
  margin-left: -2.81rem;
  top: -0.26rem;
  color: #fff;
}
.awaken_close{
  width: .47rem;
  height: .47rem;
  background:url('../assets/myPowder/close.jpg') no-repeat center;
  background-size:100%;
  position: absolute;
  top: .24rem;
  right: .45rem;
}
.awaken_alert_content{
  margin-top: 1.5rem;
  font-size:.5rem;
  color: #464646;
  letter-spacing:1px;
}
.awaken_alert_content span{
  color: #f75223;
}
.awaken_alert_tips{
  width: 100%;
  height: auto;
  overflow: hidden;
  background:#f7f7f7;
  padding: 1.08rem .5rem 1.8rem;
  color: #9e9e9e;
  font-size:.35rem;
  line-height: .75rem;
}
.partakebtn{
  -webkit-appearance: none;
  background: #f75223;
  border: none;
  color: #fff;
  width: 84%;
  height: 1.1rem;
  line-height: 1.1rem;
  border-radius: .5rem;
  position: absolute;
  left: 50%;
  margin-left: -42%;
}
</style>
