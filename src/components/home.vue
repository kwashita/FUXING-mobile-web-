<template>
  <div id='home'>
    <!-- 二维码弹框 -->
    <div class="qr_frame" v-if='qrLock'>
      <p class='frame_p'>第二分社</p>
      <img :src="domainNameImg + QRImg" alt="">
      <i @click='closeQR()'></i>
    </div>
    <div class='qr_black' v-if='qrLock' ></div>
    <div class="shop_title" id='topAnchor'>
      <div class="title_head">
        <span class='qr' @click='showQR()'>
          <i class='qr_i'></i>
        </span>
        <div class="search">
          <form action="" id="myform">
            <input type="search" class='head_input' placeholder="搜索福利" @focus="routeAllGoods()">
          </form>
          <!-- <input type="text" class='head_input' placeholder="搜索福利"> -->
          <i class='head_i'></i>
        </div>
        <span class='message' @click='routeMyMessage()'>
          <i class='message_i'></i>
          <span class='newMessage' v-if='homeMessageLock'>{{homeMessage}}</span>
        </span>
      </div>
    </div>
    <div id='swiper1' class="swiper-container shop_banner">
      <div class="swiper-wrapper banner_outer">
        <div class="swiper-slide banner_img" v-for='(items, index) in bannerImg' :style='{backgroundImage: `url(${domainNameImg}${items.imgPath})`}' :key='items.id'>
          <span class="banner-num">{{index + 1}}/{{bannerImg.length}}</span>
        </div>
      </div>
    </div>
    <div class="shop_radio" @click='routeIconDynamic()'>
      <div class="radio_name">
        <span class="radio_title"></span>
      </div>
      <i class='radio_message'></i>
      <div class='swiper-container' id='radioSwiper'>
        <ul class="radio_content swiper-wrapper">
          <li class='radio_li swiper-slide' v-for='items in radioMessage' :key='items.id'>
            <img src="" alt="" class='radio_img'>
            恭喜{{items.name}}兑换
            <span class='radio_span'>{{items.count}}</span>
            个福币
          </li>
        </ul>
      </div>
      <span class='enter_more'></span>
    </div>
    <p class='black_gray'></p>
    <div class="shop_classify">
      <div class="class_title" v-for='items in functionList' :key='items.id' @click='classifyRoute(items.relationUrl, items.jumpType, items.relationName)'>
        <img :src="items.channelImg" alt="">
        <span class='lee'>{{items.channelName}}</span>
      </div>
    </div>
    <p class='black_gray'></p>
    <div class="invite"></div>
    <p class='black_gray'></p>
    <div class="shop_entertainment">
      <div class="enter_title" @click='routeFlashSale1()'>
        <div>
          <span class='enter_content'>限时抢购</span>
          <span class='enter_tips'>FLASH &nbsp;SALE</span>
        </div>
        <span class='enter_more'></span>
      </div>
      <div id='swiper2' class="swiper-container" >
        <div class="swiper-wrapper enter_show" >
          <!-- v-getTimeDate='{items, timer}' -->
          <div @click='routeFlashSale(items.detail_two_dimension)' class="swiper-slide enter_img" v-for='items in falseSaleData' :key='items.id' :id='items.id' v-getTimeDate='{items, timer, day, hours, minutes, seconds}'>
            <img :src="items.welfare_img" alt="">
            <div class="enter_count">
              <p class='count_p'>{{items.welfare_name}}</p>
              <span class='count_span'>赚{{items.card_coins + items.welfare_reward_coin}}福币</span>
              <p>
                <span class='count_sale'>¥
                  <i class='saleNum'>{{items.paymoney}}</i>
                </span>
                <span class='count_price'>¥
                  <i class='priceNum'>{{items.price}}</i>
                </span>
                <span class='count_rob'>抢</span>
              </p>
              <div class='timer'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class='black_gray'></p>
    <!-- 123 -->
    <div class="shop_entertainment recommend">
      <div class="enter_title" @click='routeRecommend()'>
        <div>
          <span class='enter_content'>掌柜推荐</span>
          <span class='enter_tips'>RECOMMEND</span>
        </div>
        <span class='enter_more' ></span>
      </div>
      <div id='swiper3' class="swiper-container">
        <div class="swiper-wrapper recommend_show">
          <div class="swiper-slide recommend_img" v-for='items in recommendData' :key='items.id'>
            <img :src="items.welfare_img" alt="" class='recommendImg1' @click='routeFlashSale(items.detail_two_dimension)'>
            <div class='recommend_outer'>
              <p class='recommend_p'>{{items.welfare_name}}</p>
              <span class='recommend_span'>赚{{items.welfare_reward_coin+items.card_coins}}福币</span>
              <p class='recommend_p2'>
                <span class='recommend_sale'>¥
                  <i class='saleNum'>{{items.paymoney}}</i>
                </span>
                <span class='recommend_price'>
                  <i class='personNum'>{{items.receive_num + items.welfare_virtual_num}}</i>人购买
                </span>
              </p>
            </div>
            <div class='recommend_foot'>
              <img :src="items.companyLogo" alt="" class='recommendImg2'>
              <span class='foot_name'>{{items.companyName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class='black_gray'></p>
    <!-- 最新福利 -->
    <div class="new_welfare">
      <div class='welfare_wrap'>
        <div class="welfare_title" @click='routeAllGoods()'>
          <span class='welfare_titleSpan'></span>
          <span class='welfare_more' ></span>
        </div>
        <div class="swiper-container welfare_navOuter" id='welfare_navWrap'>
          <div class="swiper-wrapper welfare_nav ">
            <span class='swiper-slide' :class='index === welfareNavCount ? "spanCur" : null'  v-for='(items, index) in newWelfare' :key='items.id' @click='changeWelfareNav(index)'>{{items.name}}</span>
          </div>
        </div>
      </div>
      <div class="showOuter">
        <!-- :style=' welfareDetailsLength <= 5 ? visibility : null' -->
        <div class="welfare_show" v-for='items in welfareDetails' :key='items.id' >
          <img :src="items.welfare_img" alt="" @click='routeNewWelfare(items.detail_two_dimension)'>
          <div class="welfare_details">
            <p class='details_p'>{{items.welfare_name}}</p>
            <div>
              <p>
              <span class='welfare_local'></span>
              <span class='welfare_localName'>{{items.region | regionFilter}}</span>
              </p>
              <div class='welfare_p2'>
                <div class='welfare_p2_Outer'>
                  <span class='welfare_sale'>¥
                  <i class='welfare_saleNum'>{{items.paymoney}}</i>
                  </span>
                  <span class='welfare_price'>
                    <i class='welfare_personNum'>{{items.receive_num + items.welfare_virtual_num}}</i>人购买
                  </span>
                </div>
                <span class='welfare_span'>赚{{items.welfare_reward_coin+items.card_coins}}福币</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="welfare_foot"></div>
    </div>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
    <p class='black_gray'></p>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import SEARCH from '../assets/home/search.png'
import SEARCH_WHITE from '../assets/home/search_white.png'
export default {
  filters: {
    regionFilter: function (value) {
      if (value === null) {
        return ''
      }
      var str = value
      var str1 = str.replace(/-undefined-/g, '')
      var str2 = str1.replace(/-undefined/g, '')
      var str3 = str2.replace(/-请选择-/g, '')
      var str4 = str3.replace(/请选择/g, '')
      var str5 = str4.replace(/- -/g, '')
      var str6 = str5.replace(/--/g, '')
      return str6
    }
    // choiceImg: function (value, _this) {
    //   if (!value) {
    //     return ''
    //   }
    //   if (value.indexOf('welfareImg_') < 0) {
    //     return `${_this.domainNameImg}/files/data/${_this.adminId}/image/750/${value}`
    //   } else {
    //     var welfareImgList = JSON.parse(value)
    //     for (var k in welfareImgList) {
    //       if (k.indexOf('welfareImg_') >= 0) {
    //         var img = _this.domainNameImg + welfareImgList[k]
    //         return img
    //       }
    //     }
    //   }
    // }
  },
  updated () {
    this.classTitle()
  },
  mounted () {
    this.$nextTick(function () {
      this.adminId = this.$store.state.adminId
      this.domainName = this.$store.state.domainName
      this.userInfo = this.$store.state.userInfo
      this.domainNameImg = this.$store.state.domainNameImg
      this.userId = this.$store.state.userId
      // $('#myform').bind('search', function (e) {
      //   // this.searchData = e.target.value
      //   console.log(e.target.value)
      //   // this.$store.dispatch('getAllGoodsSearch', e.target.value)
      //   // console.log(this.searchData)
      // })
      setTimeout(() => {
        this.getFunctionList()
        this.getRecommend()
        this.getNewWelfare()
        this.getRaidoMessage()
        this.getBannerImg()
        // this.countDownTitle()
        this.getFlashSale()
        this.getHomeMessage()
      }, 1)
      var swiper1 = new Swiper('#swiper1', {
        loop: true,
        observer: true,
        observeParents: true
      })
      var swiper2 = new Swiper('#swiper2', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
      var swiper3 = new Swiper('#swiper3', {
        slidesPerView: 'auto',
        spaceBetween: 12,
        freeMode: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
      var swiper4 = new Swiper('#swiper4', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
      var swiper5 = new Swiper('#radioSwiper', {
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
      var swiper6 = new Swiper('#welfare_navWrap', {
        slidesPerView: 'auto',
        // spaceBetween: 30,
        freeMode: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
      // console.log(swiper1, swiper2, swiper3, swiper4, swiper5)
      $(document).scroll(function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop // 滚动条的垂直偏移

        if (scrollT < 40) {
          $('.title_head').css('backgroundColor', 'rgba(255, 255, 255, 0)')
          $('.head_input').css('backgroundColor', '#fff')
          $('.head_i').css('backgroundImage', 'url(' + SEARCH + ')')
          $('.head_input').removeClass('invalid')
          $('.title_head').css('box-shadow', '')
        } else {
          $('.title_head').css('backgroundColor', '#fff')
          $('.head_input').css('backgroundColor', '#ddd')
          $('.head_i').css('backgroundImage', 'url(' + SEARCH_WHITE + ')')
          $('.head_input').addClass('invalid')
          $('.title_head').css('box-shadow', '1px 2px 4px 0px rgba(196, 195, 195, 0.35)')
        }
        try {
          // 首页下滑吸顶
          this.newWelfareTop = $('.new_welfare').offset().top
          // console.log(newWelfareTop, scrollT)
          if (this.newWelfareTop <= scrollT + 40) {
            $('.welfare_wrap').css({
              'position': 'fixed',
              'top': '1.06667rem',
              'left': '0',
              'width': '100%',
              'height': '2.4rem',
              'border-bottom': '1px solid #F8F8F8',
              'background': '#fff',
              'z-index': '4'
            })
          } else if (this.newWelfareTop >= scrollT + 40) {
            $('.welfare_wrap').css({
              'position': 'relative',
              'top': 0,
              'height': '2.4rem',
              'border-bottom': '1px solid #F8F8F8',
              'background': '#fff',
              'z-index': '4'
            })
          }
        } catch (error) {
        }
      })
      $('.showOuter')[0].addEventListener('touchstart', function (e) {
        this.startX = e.targetTouches[0].clientX
        this.startY = e.targetTouches[0].clientY
      }.bind(this), false)
      $('.showOuter')[0].addEventListener('touchend', function (e) {
        this.moveEndX = e.changedTouches[0].clientX
        this.moveEndY = e.changedTouches[0].clientY
        this.X = this.moveEndX - this.startX// 判断左右
        this.Y = this.moveEndY - this.startY// 判断上下
        if (Math.abs(this.X) > 60 || Math.abs(this.Y) > 60) { // 判断是滑动，不是点击
          if (Math.abs(this.X) > Math.abs(this.Y)) {
            /* 判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下 */
            if (this.X > 0) {
              // console.log('右')
              if (this.welfareNavCount === 0) {
                // this.welfareNavCount = 0
                return false
              } else {
                this.welfareNavCount -= 1
              }
              this.changeWelfareNav(this.welfareNavCount)
            } else {
              // console.log('左')
              if (this.welfareNavCount === this.newWelfare.length - 1) {
                // this.welfareNavCount = this.classifyData.length - 1
                return false
              } else {
                this.welfareNavCount += 1
              }
              this.changeWelfareNav(this.welfareNavCount)
            }
          }
        }
      }.bind(this))
    })
  },
  // computed: {
  //   getUserInfo () {
  //     this.userInfo = this.$store.state.userInfo
  //     return this.userInfo
  //   },
  //   getDomainName () {
  //     return this.domainName = this.$store.state.domainName
  //   }
  // },
  methods: {
    routeIconDynamic () {
      window.location.href = `${this.domainNameImg}/manage/welfareIndex/fubiDetail?adminId=${this.adminId}`
    },
    routeFlashSale1 () {
      this.$router.push('/flashSale')
    },
    routeRecommend () {
      this.$router.push('/recommend')
    },
    routeFlashSale (value) {
      window.location.href = value
    },
    routeFormAllGoods () {
      // this.$store.dispatch('getAllGoodsSearch', e.target.value)
      // this.$store.dispatch('getAllGoodsSearch', this.searchData)
      this.$router.push('/allGoods')
    },
    routeMyMessage () {
      // console.log(this.$store.state.domainNameImg + '/manage/welfareIndex/messageCenter?adminId=' + this.$store.state.adminId)
      window.location.href = this.domainNameImg + '/manage/welfareIndex/messageCenter?adminId=' + this.adminId
    },
    _thisFn () {
      return this
    },
    // 首页分类跳转
    classifyRoute (urlOrId, type, name) {
      console.log(urlOrId, type, name)
      if (Number(type) === 1) {
        console.log('跳转')
        if (name == '我的分享') {
          window.location.href = `http://test1.kexinapp.com/manage/shareRecords/toShareRecords?adminId=${this.adminId}`
        } else if (name == '福星榜单') {
          window.location.href = `http://test1.kexinapp.com/manage/welfareIndex/fuxingList?adminId=${this.adminId}`
        } else if (name == '我的卡券') {
          window.location.href = `http://test1.kexinapp.com/external/ecard/ecardList?userId=${this.userId}`
        } else if (name == '消息中心') {
          window.location.href = `http://test1.kexinapp.com/manage/welfareIndex/messageCenter?adminId=${this.adminId}`
        } else if (name == '我的福币') {
          window.location.href = `http://test1.kexinapp.com/manage/center/fubiDetailed?adminId=${this.adminId}&userId=${this.userId}`
        } else if (name == '天天领福币') {
          window.location.href = `http://test1.kexinapp.com/terminal/sign/querySign?tbUserId=${this.userId}`
        } else if (name == '福币商城') {
          window.location.href = `http://test1.kexinapp.com/terminal/tostore?adminId=${this.adminId}&userId=${this.userId}`
        }
      } else if (Number(type) === 2) {
        console.log(urlOrId)

        this.$router.push({
          path: '/allGoods',
          query: {
            id: urlOrId
          }})
      }
    },
    // 跳转全部商品
    routeAllGoods () {
      this.$router.push('/allGoods')
    },
    // 最新福利商品图片跳转
    routeNewWelfare (path) {
      window.location.href = path
    },
    // 首页消息通知数量
    async getHomeMessage () {
      var data = await fetch(`${this.domainName}mode=1&queryType=queryCount&userId=${this.userId}`).then(data => data.json())
      this.homeMessage = data.data.counts
      if (this.homeMessage === 0) {
        this.homeMessageLock = false
      } else {
        this.homeMessageLock = true
      }
      // console.log(this.homeMessage)
    },
    // 首页图标分类
    async getFunctionList () {
      // console.log(`${this.domainName}mode=1&queryType=functionList&adminId=${this.adminId}`)
      var data = await fetch(`${this.domainName}mode=1&queryType=functionList&adminId=${this.adminId}`).then(data => data.json())
      this.functionList = data.data.functionList
    },
    // 掌柜推荐
    async getRecommend () {
      var data = await fetch(`${this.domainName}mode=1&queryType=recommend&adminId=${this.adminId}`).then(data => data.json())
      this.recommendData = data.data.recommendList
      // console.log(this.recommendData)
    },
    // 最新福利分类商品
    async changeWelfareNav (n) {
      this.welfareNavCount = n
      var data = await fetch(`${this.domainName}mode=1&queryType=welfareList&classificationId=${this.newWelfare[n].id}`).then(data => data.json())
      this.welfareDetails = data.data.welfareList
      console.log(`${this.domainName}mode=1&queryType=welfareList&classificationId=${this.newWelfare[n].id}`)
      console.log(this.welfareDetails)
      this.welfareDetailsLength = this.welfareDetails.length
      if (this.welfareDetails.length === 5) {
        $('.showOuter').append(`<div style="height: 2.7333rem"></div>`)
      } else if (this.welfareDetails.length === 4) {
        $('.showOuter').append(`<div style="height: 5.46666rem"></div>`)
      } else if (this.welfareDetails.length === 3) {
        $('.showOuter').append(`<div style="height: 8.1999rem"></div>`)
      } else if (this.welfareDetails.length === 2) {
        $('.showOuter').append(`<div style="height: 10.93332rem"></div>`)
      } else if (this.welfareDetails.length === 1) {
        $('.showOuter').append(`<div style="height: 13.66665rem"></div>`)
      } else if (this.welfareDetails.length === 0) {
        $('.showOuter').append(`<div style="height: 16.3998rem"></div>`)
      }
    },
    // 最新福利导航分类
    async getNewWelfare () {
      // console.log(this.adminId)
      // console.log(`${this.domainName}mode=1&queryType=classification&adminId=${this.adminId}`)
      var data = await fetch(`${this.domainName}mode=1&queryType=classification&adminId=${this.adminId}`).then(data => data.json())
      this.newWelfare = data.data.classificationList
      this.ids = []
      this.newWelfare.forEach(e => {
        this.ids.push(e.id)
      })
      // console.log(`${this.domainName}mode=1&queryType=welfareList&classificationId=${this.newWelfare[0].id}`)
      var data1 = await fetch(`${this.domainName}mode=1&queryType=welfareList&classificationId=${this.newWelfare[0].id}`).then(data => data.json())
      this.welfareDetails = data1.data.welfareList
      // console.log(this.welfareDetails)
    },
    // 限时抢购
    async getFlashSale () {
      // console.log(`${this.domainName}mode=1&queryType=flashSale&adminId=${this.$store.state.adminId}`)
      var data = await fetch(`${this.domainName}mode=1&queryType=flashSale&adminId=${this.adminId}`).then(data => data.json())
      this.falseSaleData = data.data.flashSaleList
      // console.log(this.falseSaleData)
    },
    // 广播信息
    async getRaidoMessage () {
      var data = await fetch(`${this.domainName}mode=1&queryType=fubiList&adminId=${this.adminId}`).then(data => data.json())
      this.radioMessage = data.data.fubiList
    },
    // banner图
    async getBannerImg () {
      var data = await fetch(`${this.domainName}mode=1&queryType=queryBanner&adminId=${this.adminId}`).then(data => data.json())
      this.bannerImg = data.data.listBanner
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
    timer: (timeStr, item, startTime, endTime, id) => {
      // console.log('进timer了')
      var timeNow = new Date().getTime()
      // console.log(timeStr, 'startTime' + startTime, 'endTime' + endTime, 'timeNow' + timeNow, 'id:' + id)
      if (timeNow < Number(startTime)) {
        // console.log('进未开始了')
        $('#' + id).find('.timer').html(`活动未开始`)
        return
      }
      if (timeNow > endTime) {
        // console.log('进结束了')
        $('#' + id).find('.timer').html(`活动已结束`)
        return
      }
      if (startTime < timeNow < endTime) {
        // console.log('进倒计时了')
        if (endTime < new Date().getTime()) return// 设置的时间小于现在时间退出
        var me = this.a.methods
        setInterval(function () {
          let nowTime = new Date(timeStr) - new Date()
          let minutes = parseInt(nowTime / 1000 / 60 % 60, 10)// 计算剩余的分钟
          let seconds = parseInt(nowTime / 1000 % 60, 10)// 计算剩余的秒数
          minutes = me.checkTime(minutes)
          seconds = me.checkTime(seconds)
          if (item === 'day') {
            let days = parseInt(nowTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
            let hours = parseInt(nowTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
            days = me.checkTime(days)
            hours = me.checkTime(hours)
            // document.getElementById(id).innerHTML = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            $('#' + id).find('.timer').html(`<span class='timer_span'>${days}</span><i class='timer_i'>&nbsp;:&nbsp;</i><span class='timer_span'>${hours}</span><i class='timer_i'>&nbsp;:&nbsp;</i><span class='timer_span'>${minutes}</span><i class='timer_i'>&nbsp;:&nbsp;</i><span class='timer_span'>${seconds}</span>`)
            $('.timer_span').css({
              'width': '.533333rem',
              'height': '.4rem',
              'border-radius': '.053333rem',
              'background-color': '#333',
              'display': 'inline-block',
              'color': '#fff',
              'text-align': 'center',
              'line-height': '.4rem'
            })
            $('.timer_i').css({
              'font-size': '.32rem',
              'color': '#333',
              'font-style': 'normal'
            })
          } else {
            let hours = parseInt(nowTime / (1000 * 60 * 60), 10) // 计算剩余的小时
            hours = me.checkTime(hours)
            // document.getElementById(id).innerHTML = hours + '小时' + minutes + '分' + seconds + '秒'
            $('#' + id).find('.timer').html(`<span class='timer_span'>${hours}</span><i class='timer_i'>&nbsp;:&nbsp;</i><span class='timer_span'>${minutes}</span><i class='timer_i'>&nbsp;:&nbsp;</i><span class='timer_span'>${seconds}</span>'秒'`)
          }
        }, 1000)
      }
    },
    checkTime (i) { // 将0-9的数字前面加上0，例1变为01
      // console.log('进checktime了')
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    classTitle () {
      var length = $('.class_title').length
      if (length === 6) {
        console.log(666)

        $('.class_title').css('flexBasis', '33.33%')
      } else if (length === 7) {
        $('.class_title').css('flexBasis', '25%')
        $('.shop_classify').append(`
          <div class="class_title" style="flex-basis: 25%"></div>
        `)
      } else if (length === 8) {
        $('.class_title').css('flexBasis', '25%')
      } else if (length === 9) {
        $('.class_title').css('flexBasis', '20%')
        $('.shop_classify').append(`
          <div class="class_title" style="flex-basis: 20%"></div> 
        `)
      }
    }
  },
  directives: {
    getTimeDate: {
      inserted: (el, binding) => {
        var startTime = binding.value.items.start_time
        var endTime = binding.value.items.end_time
        var id = binding.value.items.id
        // console.log('startTime:' + startTime, 'endTime:' + endTime)
        var date = endTime
        var n = date.valueOf()
        var date2 = new Date(n)
        // console.info(date.valueOf());
        // console.info(date2.toLocaleString());
        var year = date2.getFullYear()
        var month = date2.getMonth()
        var day1111 = date2.getDate()
        var hoursAAAA = date2.getHours()
        var minutesAAAA = date2.getMinutes()
        var secondsAAAA = date2.getSeconds()
        // console.log(binding.value.leftTimer)
        binding.value.timer(`${year}/${month + 1}/${day1111} ${hoursAAAA}:${minutesAAAA}:${secondsAAAA}`, 'day', startTime, endTime, id)
      }
    }
  },
  // computed: {
  //   adminId: function () {
  //     console.log(this.$store.state.adminId)
  //     return this.$store.state.adminId
  //   },
  //   domainName: function () {
  //     return this.$store.state.domainName
  //   },
  //   userInfo: function () {
  //     return this.$store.state.userInfo
  //   },
  //   domainNameImg: function () {
  //     return this.$store.state.domainNameImg
  //   }
  // },
  data () {
    return {
      count: 0,
      windowTop: 0,
      start_time: new Date('2018/06/01').getTime(),
      time_end: new Date('2018/09/01').getTime(),
      ordertimer: null,
      qrLock: false,
      startX: 0,
      startY: 0,
      moveEndX: 0,
      moveEndY: 0,
      X: 0,
      Y: 0,
      newWelfareTop: 0,
      domainNameImg: null,
      userInfo: null,
      domainName: null,
      adminId: null,
      userId: null,
      QRImg: null,
      bannerImg: [],
      radioMessage: '',
      falseSaleData: null,
      newWelfare: null,
      welfareNavCount: 0,
      welfareDetails: null,
      welfareRegion: null,
      ids: [],
      recommendData: null,
      functionList: null,
      searchData: null,
      homeMessage: null,
      homeMessageLock: false,
      welfareDetailsLength: null,
      visibility: {
        'visibility': 'hidden'
      }
    }
  }

}
</script>
<style lang='stylus' scoped>
#home{
  position relative;
}
.shop_top #topAnchor {
  display: block;
  width: 100%;
  height: 100%;
}

.black_gray {
  height: 8px;
  background: #F2F2F2;
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
.title_head{
  height 1.066667rem;
  position fixed;
  top 0;
  z-index 20;
  width 100%;
  // background white;
  display flex;
  justify-content space-between;
  align-items center;
  padding 0 .24rem 0 0.24rem;
  transition: background-color, box-shadow 1s ease 0.1s;
  .qr, .message{
    width .8rem;
    height .8rem;
    background rgba(0, 0, 0, 0.6);
    display inline-block;
    border-radius 50%;
  }
  .qr{
    display flex;
    flex-wrap wrap;
    justify-content space-around;
    .qr_i{
      width .56rem;
      height .56rem;
      background url('../assets/home/eq.png') no-repeat;
      background-size 100% 100%;
      display block;
      margin-top 0.1rem;
    }
  }
  .message{
    display flex;
    flex-wrap wrap;
    justify-content space-around;
    position relative;
    .message_i{
      width .46rem;
      height .66664rem;
      background url('../assets/home/newMessage.png') no-repeat;
      background-size 100% 100%;
      display block;
      margin-top 0.1rem;
    }
    .newMessage{
      width .4rem;
      height .32rem;
      background #fa0229;
      border-radius .16rem;
      color white;
      text-align center;
      position absolute;
      top 0px;
      right -4px;
      line-height 0.32rem;
    }
  }
  .search {
    display flex;
    align-items center;
    justify-content center;
    width 7.466667rem;
    position relative;
    #myform{
      width 100%;
    }
    .head_input{
      width 100%;
      border-radius .4rem;
      outline none;
      border 0;
      height .8rem;
      transition: background-color 1s ease 0.1s;
    }
    .invalid:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #fff;
      transition: color 1s ease 0.1s;

    }

    .invalid::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #fff;
      transition: color 1s ease 0.1s;

    }

    input.invalid:-ms-input-placeholder{
      color: #fff;
      transition: color 1s ease 0.1s;

    }

    input.invalid::-webkit-input-placeholder {
      color: #fff;
      transition: color 1s ease 0.1s;

    }
    .head_input::-ms-input-placeholder{
      text-align center;
      font-size .346667rem;
      transition: color 1s ease 0.1s;

    }
    .head_input::-webkit-input-placeholder{
      text-align: center;
      font-size .346667rem;
      transition: color 1s ease 0.1s;

    }
    .head_i{
      display inline-block;
      width .346667rem;
      height .346667rem;
      background-image url('../assets/home/search.png');
      background-repeat no-repeat;
      background-size 100% 100%;
      position absolute;
      right 62%;
      top 50%;
      margin-top -0.17335rem;
      transition: all 1s ease 0.1s;
    }
  }
}
.shop_banner {
  width: 100%;
  position: relative;
}

.shop_banner .banner_outer {
  height: 4.666667rem;
}

.shop_banner .banner_img {
  // background-image url('../assets/home/banner.png');
  background-repeat no-repeat;
  background-size: 100% 100%;
  color #fff;
}

.shop_banner .banner-num {
  width: 0.93rem;
  height: 0.453rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0.27rem;
  right: 0.27rem;
  line-height: 0.453rem;
  color: white;
  text-align: center;
  z-index: 3;
}

.shop_classify {
  padding: 0.5rem 0.43rem 0.1rem 0.43rem;
  display: flex;
  justify-content: space-around;
  flex-wrap wrap;
}

.shop_classify .class_title {
  text-align: center;
  flex-basis: 20%;
  margin-bottom 0.43rem;
}

.shop_classify .class_title img {
  width: 1.146667rem;
  height: 1.146667rem;
  background-size: 100% 100%;
  display: block;
  margin-bottom: 0.2rem;
  margin 0 auto;
  margin-bottom 0.2rem;
}

.shop_classify .class_title .lee {
  width: 1.27rem;
  height: 0.3067rem;
  margin-top: 2rem;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}

.shop_radio {
  height: 0.987rem;
  display flex;
  align-items center;
  /* padding: 0.293rem 0.4rem 0.293rem 0.4rem; */
  position relative;
  .enter_more{
    width: .213333rem;
    height: .373333rem;
    position absolute;
    right 0.267rem;
    background url('../assets/home/right_light.png') no-repeat;
    background-size 100% 100%;
  }
}
.shop_radio .radio_name {
  width 1.8rem;
  height .346667rem;
  margin-left: .266667rem;
  margin-right: 0.3rem;
  border-right: 1px solid #E3E3E3;
}
.shop_radio .radio_title {
  float: left;
  width 1.506667rem;
  height .346667rem;

  display block;
  background url('../assets/home/iconStatus.png') no-repeat;
  background-size 100% 100%;
  // padding-right: 1.2rem;
}

.shop_radio .radio_content {
  // float: left;
  // height: 0.8rem;
  position: relative;
  display flex;
  align-items center;
  height .533333rem;
}

.shop_radio .radio_message {
  background: url('../assets/home/message.png') no-repeat;
  background-size: 100% 100%;
  width: 0.32rem;
  height: 0.293rem;
  display: inline-block;
}

.shop_radio .radio_content .radio_li {
  // position: relative;
  color: #666666;
  z-index 99;
  display flex;
  align-items center;
  border 1px solid rgba(255, 255, 255, 0);
  .radio_img{
    width .533333rem;
    height .533333rem;
    display inline-block;
    margin-right 0.15rem;
  }
}
#radioSwiper{
  margin 0;
  margin-left 0.2rem;
}
.shop_radio .radio_content .radio_span {
  color: #fc4f69;
  font-size: .293333rem;
  // margin-left: 0.16rem;
  display: inline-block;
}
.invite{
  width 9.733333rem;
  margin 0 auto;
  height 1.866667rem;
  background url('../assets/home/invite.png') no-repeat;
  background-size 100% 100%;
}
.shop_entertainment {
  height: 4.253333rem;
}
.shop_entertainment .enter_title {
  height: 1.186667rem;
  display flex;
  align-items center;
  justify-content space-between;
  padding 0 0.267rem 0 0.267rem;
}

.shop_entertainment .enter_title .enter_content {
  float: left;
  font-size: .40rem;
  height .5rem;
  color: #070707;
  display inline-block;
  line-height 0.5rem;
  width 1.9rem;
  border-right: 1px solid #E3E3E3;
  margin-right 0.25rem;
}
.shop_entertainment .enter_title .enter_tips{
  font-size .38rem;
  color #666666;
  letter-spacing 1px;
  line-height 0.5rem;
}
.shop_entertainment .enter_title .enter_more {
  width: .213333rem;
  height: .373333rem;
  float: right;
  background url('../assets/home/right_light.png') no-repeat;
  background-size 100% 100%;
  // background-position center right;
  // margin-right: 0.267rem;
}

.shop_entertainment .swiper-container {
  height: 2.666667rem;
}

.shop_entertainment .swiper-container .enter_show {
  padding-left: 0.27rem;
}

.shop_entertainment .swiper-container .enter_show .enter_img .enter_details {
  padding: 0.267rem;
  border: 1px solid #F2F2F2;
  border-radius: 6px;
  overflow: hidden;
}

.shop_entertainment .swiper-container .enter_show .enter_img {
  float left;
  position: relative;
  width: 8.666667rem !important;
  height: 2.666667rem;
  background-color #ffffff;
  border-radius: 4px;
  border: solid 1px #eee;
  margin-right: 0.267rem !important;
  padding .25rem;
  // display flex;

  .enter_count{
    float left;
    margin-left: 0.267rem;
    position relative;
    .count_p{
      width 4.373333rem;
      font-size .35rem;
      color #333333;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      margin-bottom .05rem;
    }
    .count_span{
      display inline-block;
      padding-left 0.1rem;
      padding-right 0.1rem;
      // width 1.8rem;
      border-radius: 2px;
      border: solid 0.5px #fc4f69;
      color #fc4f69;
      font-size: .24rem;
      text-align center;
    }
    .count_sale{
      color #ff1616;
      font-size .32rem;

      .saleNum{
        font-style normal;
        font-size .453333rem;
      }
    }
    .count_price{
      color #666;
      font-size .373333rem;
      margin-left 0.2rem;
      .priceNum{
        font-style normal;
        text-decoration line-through;
      }
    }
    .count_rob{
      // float right;
      position absolute;
      top 50%;
      right -6%;
      margin-top -0.4rem;
      width .8rem;
      height .8rem;
      background #fc4f69;
      border-radius .133333rem;
      text-align center;
      line-height .8rem;
      color #fff;
      font-size .4rem;
    }
  }
  .timer{
    // float left;
    width 3.133333rem;
    display flex;
    align-items flex-end;
    .timer_span{
      width .533333rem;
      height .4rem;
      border-radius .053333rem;
      background-color #333;
      display inline-block;
      color #fff;
    }
    .timer_i{
      font-size .32rem;
      color #333;
      font-style normal;
    }
  }
}

.shop_entertainment .swiper-container .enter_show .enter_img img {
  width: 3.2rem;
  height: 2.133333rem;
  // background: green;
  display: inline-block;
  margin-bottom: 0.25rem;
  float left;
  border-radius .053333rem;
}

.recommend{
  height 6.38667rem;
  #swiper3{
    height 5.2rem;
    padding-left 0.27rem;
    .recommend_img{
      width: 3.6rem !important;
      border-radius 0.0533rem !important;
      height: 4.9rem;
      background-color: #ffffff;
      border-radius: .053333rem;
      box-shadow 1px 2px 4px 0px rgba(196, 195, 195, 0.2);
      border: solid 1px #eee;
      color #333333;
      .recommend_outer{
        padding 0.1rem 0.1rem 0rem 0.1rem;
      }
      .recommendImg1{
        border-radius 0.0533rem 0.0533rem 0 0 ;
        width 100%;
        height 2.266667rem;
        display block;
      }
      .recommend_p{
        font-size .35rem;
        margin-bottom .146667rem;
        height .42rem;
        padding-left 0.05rem;
      }
      .recommend_span{
        // width: 1.7rem;
        height: .4rem;
        margin-left 0.05rem;
        padding-left 0.1rem;
        padding-right 0.1rem;
        background-color: #ffffff;
        border-radius: 2px;
        border: solid 0.5px #fc4f69;
        display inline-block;
        text-align center;
        line-height .4rem;
        color #fc4f69;
        font-size .24rem;
      }
      .recommend_p2{
        display flex;
        justify-content space-between;
        align-items flex-end;
        height .75rem;
        margin-left 0.05rem;
        // padding-bottom 0.2rem;
        // box-sizing border-box;
      }
      .recommend_sale{
        color #ff1616;
        font-size .32rem;
        line-height .6rem;
        .saleNum{
          font-style normal;
          font-size .453333rem;
        }
      }
      .recommend_price{
        color #666;
        font-size .266667rem;
        float right;
        line-height .6rem;
        margin-right 0.05rem;
        .personNum{
          font-style normal;
        }
      }
      .recommend_foot{
        height .786667rem
        border-top 1px solid #f1f1f1;
        display flex;
        align-items center;
        padding 0 0.1rem 0 0.15rem;
        img{
          width .506667rem;
          height .506667rem;
          display inline-block;
          background red;
          border-radius 50%;
        }
        .foot_name{
          font-size .266667rem;
          margin-left .133333rem;
        }
      }
    }
  }
}
.new_welfare{
  position relative;
  .welfare_wrap{
    height 2.4rem;
  }
  .welfare_title{
    height 1.186667rem;
    border-bottom 1px solid #F8F8F8;
    display flex;
    align-items center;
    // justify-content center;
    position relative;
    background #fff;
    z-index 4;

    .welfare_titleSpan{
      background url('../assets/home/newWelfare.png') no-repeat;
      width 3.746667rem;
      height .693333rem;
      display inline-block;
      background-size 100% 100%;
      position absolute;
      top 50%;
      left 50%;
      margin-top -0.346665rem;
      margin-left -1.873335rem;
    }
    .welfare_more{
      background url('../assets/home/right_light.png') no-repeat;
      width .213333rem;
      height .373333rem;
      display inline-block;
      background-size 100% 100%;
      // background-position center right;
      position absolute;
      // top 50%;
      right 0.267rem;
    }
  }
  .welfare_navOuter{
    height 1.2rem;
    background #fff;
    // transition all 1s ease 0s;
    .welfare_nav{
      white-space:nowrap
      height 1.2rem;
      border-bottom 1px solid #F8F8F8;
      padding 0 .266667rem 0 .266667rem;
      // overflow-x scroll;
      // overflow scroll;
      span{
        width 2.5rem;
        padding-left 0.2667rem;
        padding-right 0.2667rem;
        height 1.2rem;
        display inline-block;
        line-height 1.2rem;
        text-align center;
        font-size .4rem;
        color #666;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        // overflow:hidden;
        // text-overflow:ellipsis;
        // white-space:nowrap;
      }
      .spanCur{
        border-bottom 1px solid #f86f4d;
        color #f86f4d;
      }
    }
  }
  .welfare_show{
    padding .266667rem;
    height 2.733333rem;
    img {
      float left;
      width 3.586667rem;
      height 2.24rem;
      border-radius 4px;
      margin-right 0.2rem;
    }
    .welfare_details{
      float left;
      width 5.546667rem;
      font-size .32rem;
      .details_p{
        font-size .38rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        margin-bottom .6rem;
      }

      .welfare_local{
        background url('../assets/home/localstation.png') no-repeat;
        background-size 100% 100%;
        width .32rem;
        height .32rem;
        display inline-block;
        vertical-align sub;
      }
      .welfare_localName{
        font-size .293333rem;
        color #666666;
        margin-left 0.1rem;
      }
      .welfare_p2{
        // margin-top 0.1rem;
        color #ff1616;
        display flex;
        justify-content space-between;
        align-items center;
        .welfare_p2_Outer{
          .welfare_sale{
          font-size .4rem;
          }
          .welfare_saleNum{
            font-style normal;
            font-size .506667rem;
            margin-right 0.2rem;
          }
          .welfare_price{
            color #666;
            font-size .293333rem;

            .welfare_personNum{
              font-style normal;
            }
          }
        }
        .welfare_span{
          background-color: #ffffff;
          border-radius: 2px;
          border: solid 0.5px #fc4f69;
          font-size .266667rem;
          padding-left 0.1rem;
          font-size .32rem;
          padding-right 0.1rem;
        }
      }
    }
  }
}
</style>
