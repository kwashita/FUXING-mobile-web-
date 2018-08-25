<template>
  <div class='weflare_manage'>
    <div class='swiper-container' id='radioSwiper'>
      <i src='' alt="" class='radio_img'></i>
      <ul class="radio_content swiper-wrapper">
        <li class='radio_li swiper-slide' v-for='items in radioMessage' :key='items.id'>
          {{items.nickname}}{{items.billingType}}
          <span class='radio_span'>{{items.coinsNum}}</span>
          个福币
        </li>
      </ul>
    </div>
    <div class='classify'>
      <div class='classify_div' @click='routeMyFriends()'>
        <img src="../assets/weflare_manage/mine.png" alt="">
        <span>我的福粉</span>
      </div>
      <div class='classify_div' @click='routeMessage()'>
        <img src="../assets/weflare_manage/message.png" alt="">
        <span>消息通知</span>
      </div>
      <div class='classify_div' @click='routeMyIcon()'>
        <img src="../assets/weflare_manage/icon.png" alt="">
        <span>我的福币</span>
      </div>
    </div>
    <div class='banner'></div>
    <div class='welfare_date'>
      <div class='myIcon'>
        <span>我的福币</span>
        <div class="iconNum">
          共
          <span>{{allIcons}}</span>
          福币
          <i>去炫耀</i>
        </div>
      </div>
      <div class="icon_countOuer">
        <div id="icon_count">
          <!-- <span>共
            <i>{{this.iconValue.length}}</i>
          种</span> -->
        </div>
        <ul class='count_ul'>
          <li>您通过分享获得<span>{{iconValue[0]}}</span>福币</li>
          <li>您的福粉<span>{{iconValue[1]}}</span>福币</li>
          <li>您通过签到获得<span>{{iconValue[2]}}</span>福币</li>
          <li>您通过点击获得<span>{{iconValue[3]}}</span>福币</li>
          <li>您通过其他获得<span>{{iconValue[4]}}</span>福币</li>
        </ul>
        <div class='count_classify'>
          <span class='share countSpan'>
            <i></i>
            分享获得福币
          </span>
          <span class='friends countSpan'>
            <i></i>
            福粉贡献
          </span>
          <span class='sign countSpan'>
            <i></i>
            签到获得福币
          </span>
          <span class='click countSpan'>
            <i></i>
            点击获福币
          </span>
          <span class='other countSpan'>
            <i></i>
            其他
          </span>
        </div>
        <div class="manage"  @click='routeMyIcon()'>去管理</div>
      </div>
    </div>
    <div class="myFriends">
      <div class='myIcon friends_title'>
        <span>我的福粉</span>
        <div class="all_friends" @click='routeMyFriends()'>
          全部福粉
          <i></i>
        </div>
      </div>
      <p>看看是谁为您贡献了最多的福币</p>
      <div class="swiper-container" id='friendsSwiper'>
        <ul class="swiper-wrapper friends_ul">
          <li class='swiper-slide' v-for='(items, index) in myFriendsDate' :key='items.id' @click='changeHead(index)'>
            <span>{{items.nick_name}}</span>
            <div class='headDefault' :class="index === headCount? 'head_Bg': null">
              <img :src="items.user_icon_url" alt="" class='head'>
            </div>
          </li>
        </ul>
      </div>
      <div class='friends_content' v-for='(items, index) in myFriendsDate' :key='items.id' v-show='index === headCount ? true : false'>
        <div class='content_left'>
          <p class='leftTitle'>{{items.nick_name}}</p>
          <p class='leftDetails'>小星星于<span>{{items.create_Time}}</span>成为了您的福粉，在成为您福粉的日子里总共为您贡献了<span>{{items.sumCoins}}</span>个福币。</p>
        </div>
        <div class='content_right'>
          <img :src="items.user_icon_url" alt="">
        </div>
      </div>
    </div>
    <bottom-gray></bottom-gray>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  mounted () {
    this.$nextTick(function () {
      this.welfareData = this.$store.state.allGoodsData
      this.adminId = this.$store.state.adminId
      this.domainName = this.$store.state.domainName
      this.userInfo = this.$store.state.userInfo
      this.domainNameImg = this.$store.state.domainNameImg
      this.userId = this.$store.state.userId
      this.getMyIconData()
      this.getMyFriendsData()
      this.getRaidoMessage()
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
      var swiper2 = new Swiper('#friendsSwiper', {
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
      console.log(swiper, swiper2)
    })
  },
  methods: {
    routeMyFriends () {
      this.$router.push('/myFriends')
    },
    routeMyIcon () {
      window.location.href = this.domainNameImg + '/manage/center/fubiDetailed?adminId=' + this.adminId + 'userId=' + this.userId
    },
    routeMessage () {
      window.location.href = this.domainNameImg + '/manage/welfareIndex/messageCenter?adminId=' + this.adminId
    },
    async getMyIconData () {
      var data = await fetch(`${this.domainName}mode=13&userId=${this.userId}&adminId=${this.adminId}`).then(data => data.json())
      this.myIconDate = data.data
      this.allIcons = data.data.totalCoinsNum
      console.log(this.myIconDate)

      // this.allIcons = data.data.totalCoinsNum
      this.myIconDate.picture.forEach(e => {
        // series[0].data
        this.icon_option.series[0].data.push({
          value: e.value, 'name': e.name
        })
      })
      this.echarts_init()
      this.icon_option.series[0].data.forEach(i => {
        this.iconValue.push(i.value)
      })
    },
    async getMyFriendsData () {
      // console.log(`${this.domainName}mode=12&userId=${this.$store.state.userId}&adminId=${this.$store.state.adminId}`)
      var data = await fetch(`${this.domainName}mode=12&userId=${this.userId}&adminId=${this.adminId}`).then(data => data.json())
      this.myFriendsDate = data.data.ffTop
      // console.log(this.myFriendsDate)
    },
    async getRaidoMessage () {
      // console.log(`${this.domainName}mode=3&queryType=queryCoins&userId=4028819665511e4201655136f2c80000`)
      var data = await fetch(`${this.domainName}mode=3&queryType=queryCoins&userId=${this.userId}`).then(data => data.json())
      this.radioMessage = data.data.data.crDtoList
      // console.log(this.radioMessage)
    },
    changeHead (n) {
      this.headCount = n
    },
    echarts_init () {
      // console.log(this.shareData)
      var iconCount = this.$echarts.init(document.getElementById('icon_count'))
      iconCount.setOption(this.icon_option)
    }
  },
  data () {
    return {
      headCount: 0,
      radioMessage: null,
      allIcons: null,
      adminId: null,
      domainName: null,
      userInfo: null,
      domainNameImg: null,
      userId: null,
      iconValue: [],
      iconData: [],
      myFriendsDate: [],
      icon_option: {
        tooltip: {
          trigger: 'item',
          padding: 2,
          position: 'right',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: ['#4fa7f9', '#fecc1e', '#8768f6', '#fb6e97', '#1dd0bc'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'normal'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.weflare_manage{
  background #F2F2F2;
  background-image url('../assets/weflare_manage/bg.png');
  background-size 10rem 2.68rem;
  background-repeat no-repeat;
}
#radioSwiper{
  // width 100%;
  height .8rem;
  background #fcf3df;
  display flex;
  // justify-content center;
  align-items center;
  margin-bottom .266667rem;
  padding-left 0.43rem;
  .radio_img{
    background url('../assets/weflare_manage/radio.png') no-repeat;
    width .373333rem;
    height .346667rem;
    background-size 100% 100%;
    display inline-block;
    border 0;
  }
  .radio_content{
    color #5b420a;
    font-size .32rem;
    line-height 0.8rem;
    text-align start;
    padding-left 0.267rem;
    .radio_li{
      line-height 0.8rem;
      display flex;
      align-items center;
    }
  }
}
.classify{
  width: 9.333333rem;
  height: 2.133333rem;
  background-color: #fff;
  border-radius: 20px;
  margin 0 auto;
  display flex;
  justify-content space-around;
  align-items center;
  margin-bottom .266667rem;
  .classify_div{
    text-align center;
    img{
      display block;
      width 1.066667rem;
      height 1.066667rem;
      margin 0 auto;
      margin-bottom .226667rem;
    }
    span{
      font-size .32rem;
      color #666;
    }
  }
}
.banner{
  width 9.466667rem;
  height 1.866667rem;
  margin 0 auto;
  margin-bottom .266667rem;
  background url('../assets/weflare_manage/banner.png') no-repeat;
  background-size 100% 100%;
}
.welfare_date{
  background #fff;
  padding-top .2rem;
  margin-bottom .266667rem;
  padding-bottom .533333rem;
}
.myIcon{
  display flex;
  justify-content space-between;
  margin-left .266667rem;
  span{
    font-size .48rem;
    color #1c1b20;
  }
  .iconNum{
    width: 3.546667rem;
    height: .666667rem;
    background-color: #f55f0d;
    border-radius: .333333rem 0 0 .333333rem;
    color #fff;
    text-align center;
    font-size .266667rem;
    line-height 0.66667rem;
    margin-bottom .266667rem;
    span{
      font-size .373333rem;
      color #fff;
    }
    i{
      font-style normal;
    }
  }
}
.icon_countOuer{
  width: 9.333333rem;
  height: 7.866667rem;
  background-color: #ffffff;
  border-radius: .133333rem;
  box-shadow: 0px 0px 10px #ccc;
  margin 0 auto;
  display flex;
  flex-wrap wrap;
  justify-content space-around;
  #icon_count{
    float left;
    width 4rem;
    height 4rem;
    margin-top .433333rem;
    display flex;
    justify-content center;
    align-items center;
    span {
      font-size .266667rem;
      color #000;
      i{
        font-style normal;
        font-size 34px;
        color #000;
      }
    }

  }
  .count_ul{
    float left;
    width 4.266667rem;
    height 3.066667rem;
    margin-left .7rem;
    list-style disc;
    margin-top .933333rem;
    li{
      color #444444;
      font-size .346667rem;
    }
  }
  .count_classify{
    float left;
    width 8rem;
    display flex;
    flex-wrap wrap;
    margin-top -0.3rem;
    margin-bottom .4rem;

    .countSpan{
      color #000;
      font-size .32rem;
      flex-basis 33.3%;
      i{
        width .373333rem;
        height .373333rem;
        border-radius 50%;
        display inline-block;
      }
    }
    .share{
      i{
        background #4fa7f9;
        vertical-align middle;
      }
    }
    .friends{
      i{
        background #fecc1e;
        vertical-align middle;
      }
    }
    .sign{
      i{
        background #8768f6;
        vertical-align middle;
      }
    }
    .click{
      i{
        background #fb6e97;
        vertical-align middle;
      }
    }
    .other{
      i{
        background #1dd0bc;
        vertical-align middle;
      }
    }
  }
  .manage{
    float left;
    width: 8rem;
    height: .933333rem;
    background-color: #ffe3dd;
    border-radius: .466667rem;
    border: solid 1px #ff7457;
    color #fa4822;
    font-size .453333rem;
    line-height .933333rem;
    text-align center;
  }
}
.myFriends{
  background #fff;
  color #666;
  font-size .373333rem;
  padding-left .266667rem;
  padding-right .266667rem;
  padding-bottom .533333rem;
  .friends_title{
    height 1.066667rem;
    border-bottom 1px solid #F8F8F8;
    margin-left 0;
    line-height 1.066667rem;

    .all_friends{
      i{
        display inline-block;
        background url('../assets/weflare_manage/right.png') no-repeat;
        background-size 100% 100%;
        width .213333rem;
        height .373333rem;
        vertical-align middle;
      }
    }
  }
  p{
    font-size .32rem;
    margin-bottom .4rem;
  }
  .friends_ul{
    // display flex;
    margin-bottom .4rem;
    li{
      width 1.306667rem;
      text-align center;
      margin-right .88rem;
      position relative;
      height 2.2rem;

      span{
        font-size .32rem;
        width 1.306667rem;
        color #999;
        display block;
        margin-bottom .213333rem;
      }
      // .headImg{
      //   display flex;
      //   justify-content center;
      //   align-items center;
      // }
      .head{
        width 1.2rem;
        height 1.2rem;
        border-radius 50%;
        display block;
        position absolute;
        top 0.05rem;
        z-index 99;
      }
      .headDefault{
        width 1.306667rem;
        height 1.453333rem
        position absolute;
        z-index 98;
        display flex;
        justify-content center;
      }
      .head_Bg{

        background url('../assets/weflare_manage/headImg.png') no-repeat;
        background-size 100% 100%;

        // align-items center;
      }
    }
  }
   .friends_ul ::-webkit-scrollbar {
      display: none;
    }
  .friends_content{
    width 9.333333rem;
    height 2.266667rem;
    background #f2f2f2;
    border-radius .133333rem;
    padding .266667rem;
    .content_left{
      float left;
      width 6.066667rem;
      .leftTitle{
        margin-bottom 0;
        font-size .346667rem;
        color #333;
      }
      .leftDetails{
        font-size .293333rem;
        color #666;
      }
    }
    img{
      width 1.6rem;
      height 1.6rem;
      border-radius 50%;
      display inline-block;
      float right;
    }
  }
}
</style>
