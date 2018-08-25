<template>
  <div class="body">
    <div id="box">
      <div class="fubi_title" id='topExchange'>
        <div class="orderSerch" v-show="index == 0">
          <div>
            <img src="../assets/home/search.png" alt="">
            <input @keyup.enter="orderSerchFn(0)" type="text" v-model.trim="orderserch" placeholder="福利名称/企业名称/订单号">
          </div>
        </div>
        <div class="toExchange">
          <div @click="headerTab(idx)" :class="idx == index ? 'fubi_buy fubiCur' : 'fubi_buy'" v-for="(item,idx) in headerArr" :key="idx">
            <i class="buy_img" :style="{'background-image': idx == index ? 'url('+item.imgActiveSrc+')' : 'url('+item.imgSrc+')'}"></i>
            {{item.text}}
            <span class='fubi_li' v-if="idx != 2"></span>
          </div>
        </div>
      </div>
      <div style="height: 2.2rem;"></div>
      <div class="myOrder_content orderHome" v-if="index == 0">
        <div class="listTwo">
          <ul>
            <li v-for="(item, idx) in contentTopTab" :class="idx == contentTopIdx ? 'active' : ''" :key="idx" @click="contentTopFn(idx)">
              {{item}}
              <!-- <span v-if="idx != 0 && idx != 4 && idx != 5 && idx != 6">{{1}}</span> -->
              <span v-show="idx == 1 && waitPaynum != 0">{{waitPaynum}}</span>
              <span v-show="idx == 2 && payEndNum != 0">{{payEndNum}}</span>
              <span v-show="idx == 3 && sendNum != 0">{{sendNum}}</span>
              <span v-show="idx == contentTopTab.length - 1 && noUseNum != 0">{{noUseNum}}</span>
            </li>
          </ul>
        </div>
        <div style="height:1.3rem;"></div>
        <div class="scrollTop">
          <div class="contentList" v-show="hasShow" v-for="(item, idx) in myBuyArr" :key="idx">
            <div class="list_top">
              <div class="top_left">
                <img :src="domainNameImg + item.company_logo" alt="">
                {{item.company_name}}
                <img src="../assets/merchant/tiaozhuan.png" alt="">
              </div>
              <div class="top_right" v-for="(items, i) in orderStatusArr" v-if="item.order_status == items.statusNum" :key="i">
                {{items.text}}
              </div>
            </div>
            <div class="list_lipin" @click="toOrderDetail(item.id, item.company_logo, item.welfare_id)">
              <div class="lipin_left">
                <div class="left_img">
                  <img :src="loadwelfareImg(item.welfare_img)" alt="">
                </div>
                <p>
                  {{item.welfare_name}}
                  <span>￥{{item.total_price}}</span>
                </p>
              </div>
              <div class="lipin_right">
                x{{item.product_num}}
              </div>
            </div>
            <p>共一件商品合计￥{{item.total_price}}含运费（￥0.00）</p>
            <div class="list_operation">
              <div class="operation_left">
                <a :href="'tel:'+item.company_phone">
                  <img src="../assets/my_order/tel.png" alt="">
                  联系商家
                </a>
              </div>
              <div class="operation_right">
                <span class="span_caozuo" v-if="item.order_status == 0" @click="toPay(item.order_number)">去付款</span>
                <span class="span_caozuo" v-if="item.order_status == 1 && item.type == 1" @click="remindFn(item.order_number)">提醒发货</span>
                <span class="span_caozuo" v-if="item.order_status == 3">立即使用</span>
                <span class="span_hui" v-if="item.order_status == 1 && item.type == 1">申请退款</span>
                <span class="span_caozuo" v-if="item.order_status == 2 || item.order_status == 5" @click="showFlogistics(item.courier_number)">查看物流</span>
              </div>
            </div>
          </div>
        </div>
        <img v-show="isLoading" style="width: 0.66666rem;height: 0.66666rem;display:block;margin: 0 auto;" src="../assets/myPowder/loading_circle_40b82ef.gif" alt="">
        <div class="loadingDom" style="height: 1.2rem;"></div>
      </div>
      <div class="myOrder_content" v-else-if="index == 1">
        <div style="height: 1.2rem;"></div>
        <div class="btn" style="background-color:white;">
          <p :class="friendsShow ? 'isDingdan' : ''" @click="friendsTab('receive')">我领到的</p>
          <p :class="friendsShow ? '' : 'isDingdan'" @click="friendsTab('sendOut')">我送出的</p>
        </div>
        <div class="price" v-if="friendsShow &&  lingdaoArr != null">
          <p>
            <span>￥</span>{{lingdaoArr.list[0].totalPrice}}
          </p>
          <p>已领到{{lingdaoArr.list.length}}份礼物 价值</p>
        </div>
        <div class="content" v-if="friendsShow &&  lingdaoArr != null">
          <div class="refund" v-for="(item, idx) in lingdaoArr.content" :key="idx">
            <div>
              <div class="share">
                <p>
                  <img :src="item.user_icon_url" alt=""> {{item.nick_name}}送您一份</p>
                <p>{{item.type | receiveFilter({order_status: item.order_status})}}</p>
              </div>
              <div class="food" @click="toGiveOrderDetail(item.id, item.company_logo, item.welfare_id)">
                <div class="food_img">
                  <img :src="loadwelfareImg(item.welfare_img)" alt="">
                </div>
                <div class="food_txt">
                  <p>
                    {{item.welfare_name}}
                    <img src="../assets/my_order/next.png" alt="">
                  </p>
                  <p>
                    ￥{{item.pay_money}}
                    <span>X{{item.product_num}}</span>
                  </p>
                  <p>{{item.createTime}}</p>
                </div>
              </div>
              <div class="btn_refund" v-if="item.courier_number != null && item.courier_number != ''" @click="showFlogistics(item.courier_number)">
                查看物流
              </div>
              <div class="btn_refund" v-if="item.type == 2 && item.order_status=='3'" @click="toUse(item.order_number)">
                立即使用
              </div>
              <div class="btn_refund" v-if="item.type == 5 && item.order_status != '0' && item.order_status != '99'" @click="showScenic(item.logistics_info)">
                查看景区票券
              </div>
            </div>
          </div>
        </div>
        <div class="content" v-else>
          <div class="receive" v-for="(item, idx) in sendOutArr" :key="idx">
            <div>
              <div class="share">
                  <p>
                    <!-- 未领取完{{item.payment_type == 0 ? item.num + '/1' : item.num + '/' + item.product_num}}份 -->
                    {{item.payment_type | numFilter({product_num: item.product_num, num: item.num})}}
                    <span class="howMany">
                      {{item.payment_type == 1 ? '多人抢' : '送一人'}}
                    </span>
                  </p>
                  <p v-if="item.order_status != 99">
                    {{item.num == 0 ? '礼物未领完' : '礼物已领完'}}
                  </p>
              </div>
              <div class="food">
                  <div class="food_img">
                    <img :src="loadwelfareImg(item.welfare_img)" alt="">
                  </div>
                  <div class="food_txt">
                      <p>{{item.welfare_name}} <img src="../assets/my_order/next.png" alt=""></p>
                      <p>￥{{item.pay_money}}<span>X{{item.product_num}}</span> </p>
                      <p>{{item.createTime}}</p>
                  </div>
              </div>
              <div v-if="item.order_status != 99">
                <div v-if="item.num == 0">
                  <div class="btn_refund">退款</div>
                  <div class="btn_refund" @click="fenxiangFn(idx)">分享</div>
                </div>
                <div v-else-if="item.num != item.product_num && item.num != 0">
                  <div class="btn_refund" @click="fenxiangFn(idx, item.id)">分享</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gift" @click='routeWelfareHall()'>我要送礼</div>
        <div style="height: 2.306667rem;"></div>
      </div>
      <div class="myOrder_content" v-else>
        <div class="changeFubi fubiExchange fubiShow">
          <div class="all_content" v-for="(item, idx) in fortuneArr" :key="idx" @click="toUrl(item.id)">
            <div class="con_img">
              <img :src="mallUrl + '/' + item.product_img" alt="" class="serImg">
            </div>
            <div class="con_word">
              <p class="word_le">{{item.product_name}}</p>
              <span class="word_ci">{{item.formatDate}}</span>
              <span class="word_sp">-{{item.currency}}福币</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 查看物流布局 -->
      <div class="checkLogistics-alert" id="logistics" v-show="islogistics">
        <div class="checkLogistics-alert-content">
          <div class="logistics-company">
            <img class="close" src="../assets/myPowder/close.jpg" @click="islogistics = false" style="margin-left: 4rem;">
            <span id="name">{{wlName}}</span> <span class="order-number" id="orderNumber">{{wlNum}}</span>
          </div>
          <div id="myContent">
            <div class="logistics-info-item" v-for="(item, idx) in islogisticsArr" :key="idx" :style="{color: idx === 0 ? '#f97a00' : 'black'}">
              <div class="data">
                <div>
                  {{item.time}}
                </div>
              </div>
              <div class="status-addr">
                <div class="addr" v-html="item.context">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分享 -->
    <div class='awaken_alert_mask' id="wrap" v-show="hasSendOut">
      <div class="banner"></div>
      <div class="send-content">
        <div class="goods-info">
          <div class="goods-img">
            <img id="welfareImg" />
          </div>
          <div class="goods-right">
            <div class="goods-name" id="welfareName"></div>
            <div class="goods-num">18.8X2</div>
            <div class="goods-price"><span class="goods-price-text">合计：</span>￥<span id="totalPrice"></span></div>
          </div>
        </div>
        <p class="send-title">分享标语</p>
        <textarea id="title" class="send-textarea" name="" rows="" cols="" v-model="userName">
        </textarea>
        <p class="send-title">分享描述</p>
        <textarea id="desc" class="send-textarea" name="" rows="" cols="" v-model="miaoshuInfo"></textarea>
      </div>
      <div class="send-btn" @click="hasSendOutFn">发送给微信好友</div>
      <div class="send-tips">好友填写收货地址及联系方式即可领取礼物 </div>
    </div>
    <!-- 分享送礼物 -->
    <div id="zhiyin" v-show="tishiShow" class="pointToAkw" style="display: block;">
      <a href="javascript:(0)"><img @click="closeZhiyin()" class="wx_zhiyinido" src="../assets/myPowder/ikonw.png" id="zhidaole"></a>
    </div>
    <!-- 立即使用 -->
    <div id="core" class="div_ecode" style="">
      <div class="get_ecode">
        <div class="getTicket-title">二维码</div>
        <img class="close-code" src="../assets/myPowder/close-black.png">
        <div id='qrcode' class="ecode-box"></div>
        <p class="ecode-tips">长按或者截屏保存二维码，出示二维码给商家</p>
      </div>
    </div>
    <div class="blank" v-show="isNode">
      <img src="../assets/search/blank.png" alt="">
      {{noText}}
    </div>
  </div>
</template>
<script>
import BUY1 from '../assets/my_order/buy1.png'
import BUY2 from '../assets/my_order/buy2.png'
import SEND1 from '../assets/my_order/send1.png'
import SEND2 from '../assets/my_order/send2.png'
import EXCHANGE1 from '../assets/my_order/exchange1.png'
import EXCHANGE2 from '../assets/my_order/exchange2.png'
import JQUERYMiN from '../../static/jquery.qrcode.min.js'

export default {
  data () {
    return {
      headerArr: [
        {
          text: '自己购买',
          imgSrc: BUY1,
          imgActiveSrc: BUY2
        },
        {
          text: '赠送好友',
          imgSrc: SEND1,
          imgActiveSrc: SEND2
        },
        {
          text: '福币兑换',
          imgSrc: EXCHANGE1,
          imgActiveSrc: EXCHANGE2
        }
      ],
      contentTopTab: ['全部订单', '待支付', '已付款', '已发货', '已完成', '已退款', '票卷已核销', '票卷未核销'],
      contentTopIdx: 0,
      index: 0,
      friendsShow: true,
      adminId: this.$store.state.adminId,
      userId: this.$store.state.userId,
      domainName: this.$store.state.domainName,
      domainNameImg: this.$store.state.domainNameImg,
      myBuyArr: [],
      orderStatusArr: [
        {
          statusNum: 0,
          text: '待支付'
        },
        {
          statusNum: 1,
          text: '已付款'
        },
        {
          statusNum: 2,
          text: '已发货'
        },
        {
          statusNum: 3,
          text: '票券未核销'
        },
        {
          statusNum: 4,
          text: '票券已核销'
        },
        {
          statusNum: 5,
          text: '已完成'
        },
        {
          statusNum: 99,
          text: '已退货'
        }
      ],
      orderNum: 0,
      isNext: '',
      pageNum: 0,
      isLoading: true,
      hasShow: false,
      noUseNum: null,
      payEndNum: null,
      sendNum: null,
      waitPaynum: null,
      sendOutArr: null,
      hasSendOut: false,
      tishiShow: false,
      lingdaoArr: null,
      userName: 'A带你飞送给大家的心意礼物，已付款赶快领取吧！',
      miaoshuInfo: '小小礼物寄托着情谊，手快有~~手慢无~~',
      fortuneArr: null,
      fortuneHasnext: null,
      mallUrl: null,
      stayNum: null,
      orderserch: '',
      isNode: false,
      noText: '',
      hasAlert: false,
      islogistics: false,
      islogisticsArr: null,
      wlNum: '',
      wlName: '',
      userInfo: ''
    }
  },
  methods: {
    routeWelfareHall () {
      this.$router.push('/welfare')
    },
    headerTab (idx) {
      this.index = idx
      this.hasShow = false
      this.isNode = false
      this.hasAlert = false
      if (idx === 0) {
        this.pageNum = 0
        this.myFn(1, this.pageNum)
        this.contentTopIdx = 0
      } else if (idx === 1) {
        this.giveFn(2)
      } else if (idx === 2) {
        this.fortuneFn(10)
      }
    },
    friendsTab (isType) {
      if (isType == 'receive') {
        this.friendsShow = true
        this.giveFn(2)
      } else {
        this.friendsShow = false
        this.giveFn(3)
      }
    },
    // 查看物流请求
    async showFlogistics (num) {
      var data = await fetch(`${this.domainName}page=0&mode=8&adminId=${THIS.adminId}&queryType=5&userId=${this.userId}&courierNumber=${num}`).then(data => data.json())
      this.islogistics = true
      this.islogisticsArr = data.data.backMSG.data
      this.wlName = data.data.orderName
      this.wlNum = data.data.backMSG.nu
      console.log(data, '查看物流')
    },
    // 自己购买数据请求
    async myFn (isType, page) {
      var data = await fetch(`${this.domainName}page=${page}&mode=8&adminId=${this.adminId}&queryType=${isType}&userId=${this.userId}`).then(data => data.json())
      if (page) {
        data.data.orderList.content.forEach((item, idx) => {
          this.myBuyArr.push(item)
        })
      } else {
        this.myBuyArr = data.data.orderList.content
      }
      if (data.data.orderList.content == '' && page === 0) {
        this.noText = '暂无订单哦~'
        this.isNode = true
      }
      if (data.data.orderList.content == '') {
        this.isNext = ''
      } else {
        this.isNext = data.data.hasNext + 'all'
      }
      this.hasShow = true
      if (isType === 1 && data.data.num != undefined) {
        this.waitPaynum = data.data.num.waitPaynum
        this.noUseNum = data.data.num.noUseNum
        this.payEndNum = data.data.num.payEndNum
        this.sendNum = data.data.num.sendNum
      }
      console.log(data, '所有')
      this.isLoading = false
    },
    // 订单状态请求 非所有数据
    async stayFn (isType, page) {
      var data = await fetch(`${this.domainName}page=${page}&mode=8&adminId=${this.adminId}&queryType=1&userId=${this.userId}&orderStatus=${isType}`).then(data => data.json())
      console.log(data, '撒的发斯蒂芬水电费')
      if (page) {
        data.data.orderList.content.forEach((item, idx) => {
          this.myBuyArr.push(item)
        })
        console.log(data.data.orderList, '某个')
      } else {
        this.myBuyArr = data.data.orderList.content
        console.log(data, '不可分页的数据')
      }
      if (data.data.orderList.content == '' && page === 0) {
        this.noText = '暂无订单哦~'
        this.isNode = true
      }
      if (data.data.orderList.content == '') {
        this.isNext = ''
      } else {
        this.isNext = data.data.hasNext
      }
      if (isType === 1 && data.data.num != undefined) {
        this.waitPaynum = data.data.num.waitPaynum
        this.noUseNum = data.data.num.noUseNum
        this.payEndNum = data.data.num.payEndNum
        this.sendNum = data.data.num.sendNum
      }
      this.isLoading = false
      this.hasShow = true
    },
    // 赠送好友请求
    async giveFn (isType) {
      var data = await fetch(`${this.domainName}page=0&mode=8&adminId=${this.adminId}&queryType=${isType}&userId=${this.userId}`).then(data => data.json())
      if (isType === 2) {
        this.lingdaoArr = {}
        this.lingdaoArr.list = data.data.list
        this.lingdaoArr.content = data.data.orderList.content
        console.log(data.data, '我领到的')
      } else if (isType === 3) {
        this.sendOutArr = data.data.orderList.content
        console.log(data.data, '赠送好友')
      }
    },
    // 我送出的请求
    async shareFn (orderNumber) {
      var data = await fetch(`${this.domainName}page=0&mode=8&adminId=${this.adminId}&queryType=13&userId=${this.userId}&orderNumber=${orderNumber}`).then(data => data.json())
      if (data.data.welfareSharelogo !== '') {
        var sharelogo = this.domainNameImg + data.data.welfareSharelogo
      } else {
        var sharelogo = this.domainNameImg + '/images/fuli/sharePresentsLogo.jpg'
      }
      var urlCtx = this.domainNameImg
      this.initShareSucess(orderNumber, this.userName, sharelogo, this.domainNameImg + '/manage/shareRecords/reciblerUrl?orderNumber=' + orderNumber, this.miaoshuInfo, '0', this.domainNameImg + '/manage/center/toGivePresentsSuccesss?orderNumber=' + orderNumber + '&userId=' + this.userId + '&adminId=' + this.adminId, this.adminId, urlCtx)
      console.log(data, '分享')
    },
    loadwelfareImg (welfareImg) {
      if (welfareImg.indexOf('welfareImg_') < 0) {
        return welfareImg
      } else {
        var welfareImgList = JSON.parse(welfareImg)
        for (var k in welfareImgList) {
          if (k.indexOf('welfareImg_') >= 0) {
            var img = this.domainNameImg + welfareImgList[k]
            return img
          }
        }
      }
    },
    //
    toUrl (id) {
      window.location.href = this.mallUrl + '/external/lakala/query?id=' + id
    },
    // 福币兑换请求
    async fortuneFn (isType) {
      var data = await fetch(`${this.domainName}mode=8&queryType=10&page=0&userId=${this.userId}`).then(data => data.json())
      this.fortuneArr = data.data.records.list.content
      this.mallUrl = data.data.records.mallUrl
      console.log(data, '福币')
    },
    contentTopFn (idx) {
      this.contentTopIdx = idx
      this.pageNum = 0
      this.isNode = false
      this.hasAlert = false
      switch (idx) {
        case 0:
          this.myFn(1, this.pageNum)
          break
        case 1:
          this.stayFn(0, this.pageNum)
          this.stayNum = 0
          break
        case 2:
          this.stayFn(1, this.pageNum)
          this.stayNum = 1
          break
        case 3:
          this.stayFn(2, this.pageNum)
          this.stayNum = 2
          break
        case 4:
          this.stayFn(5, this.pageNum)
          this.stayNum = 5
          break
        case 5:
          this.stayFn(99, this.pageNum)
          this.stayNum = 99
          break
        case 6:
          this.stayFn(4, this.pageNum)
          this.stayNum = 4
          break
        case 7:
          this.stayFn(3, this.pageNum)
          this.stayNum = 3
          break
      }
      this.hasShow = false
      this.isLoading = true
    },
    // 分享方法
    fenxiangFn (idx, orderNumber, shareImg) {
      this.shareFn(this.sendOutArr[idx].order_number)
      this.hasSendOut = true
    },
    initShareSucess (orderNumber, shareTitle, shareImg, shareLink, des, initType, url, from, urlCtx) {
      // console.log(orderNumber, shareTitle, shareImg, shareLink, des, initType, url, from)
      $.post(urlCtx + 'manage/web/getShareInfo', {'url': window.location.href, 'adminId': this.adminId}, function (data, status) {
        alert(JSON.stringify(data))
        wx.config({
          debug: true,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        })
        wx.ready(function () {
          wx.onMenuShareTimeline({// 分享到朋友圈
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接
            desc: des, // 分享描述
            imgUrl: shareImg, // 分享图标
            success: function (data) {
              console.log(data)
              window.location.href = url
              $.ajax({
                url: this.domainNameImg + '/manage/shareRecords/addOrderShareRecord',
                data: { 'orderNumber': orderNumber},
                success: function (data) {
                }
              })
            }
          })
          wx.onMenuShareAppMessage({// 分享给朋友
            title: shareTitle,
            link: shareLink,
            desc: des,
            imgUrl: shareImg,
            success: function (data) {
              window.location.href = url

              $.ajax({
                url: this.domainNameImg + '/manage/shareRecords/addOrderShareRecord',
                data: { 'orderNumber': orderNumber},
                success: function (data) {
                }
              })
            }
          })
        })
      })
    },
    // 发送给好友
    hasSendOutFn () {
      this.hasSendOut = false
      this.tishiShow = true
    },
    closeZhiyin () {
      this.tishiShow = false
    },
    showScenic (url) {
      window.location.href = url
    },
    // 提醒发货请求
    async remindFn (orderNumber) {
      var data = await fetch(`${this.domainName}page=0&mode=8&adminId=${this.adminId}&queryType=4&userId=${this.userId}&orderNumber=${orderNumber}`).then(data => data.json())
      if (data.data.statu === 'Ok' || data.data.statu === 'sendOK') {
        alert('提醒发货成功')
      } else {
        alert('请您稍后试试')
      }
      console.log(data, '提醒发货')
    },
    // 生成二维码
    toUse (orderNumber) {
      console.log(orderNumber)
      $('#core').show()
      $('#qrcode').empty()
      $('#qrcode').qrcode({
        render: 'table', // table方式
        width: 200, // 宽度
        height: 200, // 高度
        text: orderNumber
        // 二维码内容
      })
    },
    // 订单详情
    toOrderDetail (id, company_logo, welfareId) {
      window.location.href = this.domainNameImg + '/manage/center/toOrderDetail?id=' + id + '&company_logo=' + company_logo + '&welfareId=' + welfareId
    },
    // 去付款
    toPay (id) {
      window.location.href = this.domainNameImg + '/manage/payment/toPay?orderNumber=' + id + '&wxCenterId=' + this.userInfo.wxCenterId + '&userId=' + this.userId + '&adminId=' + this.adminId
      // console.log(this.domainNameImg +"/manage/payment/toPay?orderNumber="+id+"&wxCenterId=4028819664fae5b00164fd37eb310002&userId="+this.userId+"&adminId="+this.adminId)
    },
    // 我送出的详情方法
    toGiveOrderDetail (id, company_logo, welfareId) {
      window.location.href = this.domainNameImg + '/manage/center/toSendOutOrderDetail?id=' + id + '&adminId=' + this.adminId + '&company_logo=' + company_logo + '&welfareId=' + welfareId
    },
    a () {
      // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      //   WeixinJSBridge.call('hideOptionMenu')
      // })
    },
    // 搜索
    async orderSerchFn (page) {
      var data = await fetch(`${this.domainName}page=${page}&mode=8&adminId=${this.adminId}&queryType=1&userId=${this.userId}&orderNumber=${this.orderserch}`).then(data => data.json())
      if (page) {
        data.data.orderList.content.forEach((item, idx) => {
          this.myBuyArr.push(item)
        })
      } else {
        this.myBuyArr = data.data.orderList.content
      }
      if (data.data.orderList.content == '') {
        this.isNext = ''
        if (this.hasAlert) {
          this.noText = '暂无订单哦~'
          this.isNode = true
        }
      } else {
        if (this.hasAlert) {
          this.noText = '暂无订单哦~'
          this.isNode = true
        }
        this.isNext = data.data.hasNext + 'all'
      }
      this.hasShow = true
      this.isLoading = false
      console.log(data, 'search')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.myFn(1, 0)
      this.userInfo = this.$store.state.userInfo
      window.onscroll = function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop // 滚动条的垂直偏移
        var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight // 元素的整体高度
        var clientH = document.documentElement.clientHeight || document.body.clientHeight // 元素的可见高度
        if (scrollT == scrollH - clientH) {
          console.log(this.isNext, '底部')
          if (this.isNext.includes('all')) {
            this.isLoading = true
            this.pageNum++
            this.myFn(1, this.pageNum)
            this.isNext = ''
          } else if (this.isNext.includes('yes')) {
            this.isLoading = true
            this.pageNum++
            this.stayFn(this.stayNum, this.pageNum)
            this.isNext = ''
          } else {
            this.hasAlert = true
            // console.log('没有数据了')
          }
        } else if (scrollT < scrollH - clientH) {
          return false
        }
      }.bind(this)
      $('.close-code').click(function () {
        $('#core').hide()
      })
    })
  },
  filters: {
    numFilter: function (paymentType, num) {
      if (paymentType === 0) {
        var surplusNum = num.num + '/1'
      } else {
        var surplusNum = num.num + '/' + num.product_num
      }
      if (num.num === 0) {
        return `未领取${surplusNum}`
      } else if (num.num == num.product_num) {
        return '已领完' + surplusNum + '份'
      }
    },
    receiveFilter (type, obj) {
      if (type === 1) {
        if (obj.order_status === '1') {
          return '买家已付款'
        }
        if (obj.order_status === '2') {
          return '已发货'
        }
        if (obj.order_status === '5') {
          return '已完成'
        }
      }
      if (type === 2) {
        if (obj.order_status === '3') {
          return '票券未核销'
        }
        if (obj.order_status === '4') {
          return '票券已核销'
        }
      }
      if (type === 5) {
        if (obj.order_status === '3') {
          return '未核销'
        }
        if (obj.order_status === '4') {
          return '已核销'
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
// .banner{
// 	height 4.787rem;
// }
.myOrder_content{
  background-color white;
  // margin-top .533333rem;
}
// #box{
//   position fixed;
//   left 0;
//   top 0;
//   width 100%;
//   height 100%;
//   background-color white;
//   z-index 40;
// }
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
.orderSerch{
  width 100%;
  height 1.24rem;
  background-color #f7f7f7;
  display flex;
  justify-content center;
  align-items center;
  >div {
    width 9.44rem;
    height .8rem;
    background-color white;
    border-radius 15px;
    padding 0.16rem 0.36rem;
    box-sizing border-box;
    img {
      width 0.44rem;
      height 0.44rem;
    }
    input {
      width 80%;
      border none;
      outline none;
      margin-left 0.1rem;
    }
  }
}
.banner {
  width 100%;
  height 4.78rem;
  background url('../assets/myPowder/send-banner.png');
  background-size 100%;
}
#zhiyin {
  width: 100vw;
  height: 100vh;
  background: url(../assets/myPowder/zhiyin-bg.png) no-repeat center;
  background-size: 100% 100%;
}
.pointToAkw {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.div_ecode {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display none;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
}
.get_ecode {
  width: 8rem;
  height: auto;
  overflow: hidden;
  background: #fff;
  border-radius: .185rem;
  position: absolute;
  left: 50%;
  margin-left: -4rem;
  top: 3rem;
  position: relative;
  padding-bottom: 0.53rem;
}
.wx_zhiyinido {
  width: 2.93rem;
  display: block;
  margin: 1.33rem auto;
}
.wx_zhiyinido {
  margin-top: 8.5rem;
}
.getTicket-title{
	width:100%;
	height:1.1rem;
	padding:0 0.4rem;
	line-height:1.1rem;
	font-size:0.426rem;
	color:#666;
	background:#fafafa
}
.close-code{
	width:0.45rem;
	height:0.45rem;
	position:absolute;
	top:0.3rem;
	right:0.4rem;
}
.ecode-box{
	margin: 0 auto;
	margin-left: 34%;
    margin-top: 0.53rem;

}
.ecode-tips{
	color:#666;
	font-size:0.24rem;
    margin-top: 0.4rem;
    text-align: center;
}
.send-content {
	width: 9.1rem;
	height: auto;
	overflow: hidden;
	margin: 0 auto;
	margin-top: -3.427rem;
	background: #fff;
	border-radius: 0.25rem;
	padding: .4rem .2rem;
	box-shadow: 1px 1px 6px #d4d2d2;
}
.goods-info {
	width: 100%;
	height: 3.45rem;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}
.goods-img {
	width: 3.45rem;
	height: 3.45rem;
	margin-right: 0.24rem;
}
.goods-img img {
	width: 100%;
	height: 100%;
	border-radius: 0.25rem;
}
.goods-right {
	flex: 1;
}
.goods-name {
	font-size: 0.4rem;
	color: #000;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-align: start;
}
.goods-num {
	font-size: 0.32rem;
	color: #999;
	text-align:left;
	margin-top: .34rem;
	margin-bottom: .35rem;
}
.goods-price {
	font-size: 0.35rem;
	color: #ff2b06;
	text-align: left;
}
.goods-price span {
	margin-right: 0.28rem;
}
.send-title:first-of-type {
	width: 100%;
	margin-top: 0.4rem;
	border-top: 1px solid #f3f3f3;
}
.send-title {
	font-size: 0.37rem;
	color: #666;
	line-height: 0.85rem;
	padding-left: 0.1rem;
	text-align: start;
}
.awaken_alert_mask{
  position fixed;
  left 0;
  top 0;
  z-index 30;
  width 100%;
  height 100%;
  background-color white;
}
.send-textarea {
	width: 100%;
	height: auto;
	min-height: 2.12rem;
	overflow: hidden;
	border-radius: 0.25rem;
	background: #f0f0f0;
	padding: 0.28rem;
}
.send-btn {
	width: 8.53rem;
	height: 1.73rem;
	margin: 0 auto;
	background: url('../assets/myPowder/sen-btn-bg.png') no-repeat center;
	background-size: 100%;
	text-align: center;
	line-height: 1.73rem;
	color: #fff6d2;
	font-size: 0.48rem;
	margin-top: 0.28rem;
}
.send-tips{
	text-align: center;
	color: #999;
	font-size: 0.32rem;
}
.howMany {
  height: 0.4rem;
  background: #f8614a;
  border-radius: 3px;
  font-size: 0.28rem;
  margin-left: 0.13rem;
  color: #fff;
  padding: 0 2px;
  display: flex;
  align-items: center;
}
.contentList{
  width 100%;
  box-sizing border-box;
  padding-left .386667rem;
  padding-right .386667rem;
  margin-bottom .3rem;
  .list_top{
    height .96rem;
    border-bottom 1px solid #d9d9d9;
    display flex;
    justify-content space-between;
    .top_left{
      display flex;
      align-items center;
      font-size .373333rem;
      color #666666;
      >img:nth-of-type(1){
        width .666667rem;
        height .666667rem;
        border-radius 50%;
        margin-right .133333rem;
      }
      >img:nth-of-type(2){
        width .16rem;
        height .28rem;
        margin-left .2rem;
      }
    }
    .top_right{
      color red;
      display flex;
      align-items center;
    }
  }
  .list_lipin{
    display flex;
    padding .4rem 0;
    border-bottom 1px solid #d9d9d9;
    justify-content space-between;
    .lipin_left{
      display flex;
      .left_img{
        height 1.613333rem;
        width 3.013333rem;
        margin-right .266667rem;
        img{
          width 100%;
          height 100%;
        }
      }
      p{
        width 4.8rem;
        font-size .373333rem;
        color #666666;
        span {
          display block;
        }
      }
    }
    .lipin_right{
      text-align right;
      font-size .293333rem;
      color #f8614a;
      margin-left .533333rem;
    }
  }
  >p{
    font-size .373333rem;
    color #666666;
    text-align right;
    height .853333rem;
    line-height .853333rem;
    margin-bottom .266667rem;
    border-bottom 1px solid #d9d9d9;
  }
  .list_operation{
    display flex;
    justify-content space-between;
    align-items center;
    .operation_left{
      font-size .346667rem;
      color #666666;
      display flex;
      align-items center;
      img {
        width .373333rem;
        height .373333rem;
        margin-right .266667rem;
      }
    }
    .operation_right{
      display flex;
      align-items center;
      span{
        display inline-block;
        width 2rem;
        height .72rem;
        text-align center;
        line-height .72rem;
        font-size .373333rem;
        margin-left .2rem;
        border-radius .346667rem;
      }
      .span_hui{
        border solid 1px #d9d9d9;
        color #666666;
      }
      .span_caozuo{
        border: solid 1px #f8614a;
        color #f8614a;
      }
    }
  }
}
.listTwo{
  width 100%;
  height .546667rem;
  overflow-x scroll;
  box-sizing initial;
  padding .4rem 0;
  position fixed;
  left 0;
  top 2.2rem;
  background white;
  ul{
    white-space nowrap;
    display flex;
    height 100%;
    li{
      padding: 0 .466667rem;
      position relative;
      line-height .546667rem;
      span {
        position absolute;
        right .05rem;
        top -10%;
        width .366667rem;
        height .366667rem;
        border-radius 50%;
        text-align center;
        line-height .366667rem;
        color white;
        background-color #f9614b;
      }
    }
    .active{
      color #f9614b !important;
    }
  }
}
.all_content {
  width: 9.47rem;
  height: 2.187rem;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #dddddd;
  margin-bottom: 0.1333rem;
  margin: 0.267rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.send-alert, .checkLogistics-alert {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.close {
  width: .4rem;
  height: .4rem;
  position: absolute;
  top: .267rem;
  right: .267rem;
  z-index 1000;
}
.checkLogistics-alert-content {
  width: 8.5rem;
  height: 13rem;
  overflow-y: scroll;
  background: #fff;
  border-radius: .2rem;
  margin: 0 auto;
  margin-top: 1rem;
  font-size: .35rem;
  color: #797979;
  position: relative;
}
.logistics-company {
  width: 8.5rem;
  height: auto;
  border-bottom: 1px solid #cbcecb;
  padding: .67rem;
  font-size: .37rem;
  color: #808080;
  line-height: .53rem;
  padding-bottom: .37rem;
  position: fixed;
  z-index: 999;
  background: #fff;
  border-radius: .2rem .2rem 0 0;
}
#myContent {
  position: absolute;
  top: 1.57rem;
}
.order-number {
  color: #000;
}
.data {
  width: 1.95rem;
  margin-right: .33rem;
}
.order-tel {
  color: #0090ff;
}
.logistics-info {
 padding: .43rem;
}
.logistics-status{
  color: #f97a00;
}
.logistics-info-item {
  display: flex;
  margin-bottom: .8rem;
  align-items: baseline;
  padding-left: 0.5rem;
}
.icon {
  width:0;
}
.status-addr {
  flex: 1;
}
.all_content .con_img {
  float: left;
  width: 2.93rem;
  height: 1.653rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.all_content .con_img .serImg {
  width: 2.667rem;
  height: 1.6533rem;
  display: block;
}
.all_content .con_word {
  float: left;
  width: 6.1rem;
  height: 1.653rem;
  display: flex;
  flex-wrap: wrap;
}
.all_content .con_word .word_le {
  font-size: 0.32rem;
  color: #333;
  width: 100%;
  margin-bottom: 0.8rem;
}
.all_content .con_word .word_ci {
  font-size: 0.29333rem;
  color: #999999;
  margin-right: 2rem;
}
.all_content .con_word .word_sp {
  font-size: 0.373rem;
  color: #ff2323;
  margin-top: -0.1rem;
}
.changeFubi {
  display: none;
}
.fubiShow {
  display: block;
}
.body {
  width 100%;
  height 100%;
  position absolute;
  left 0;
  top 0;
  background-color #f2f2f2;
}
.fubi_title {
  width 100%;
  height: 1.2rem;
  background: white;
  color: #858585;
  z-index 20;
  align-items: center;
  position fixed;
  top 0;
  left 0;
}
.toExchange {
  display flex;
  height: 1.2rem;
  background white;
}
.fubi_title .fubi_buy {
  height: 100%;
  text-align: center;
  width: 33.33333%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fubi_title .fubi_buy .buy_img {
  // background-image: url('../assets/my_order/buy1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.buy_img2 {
  // background-image: url('../assets/my_order/buy2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.fubi_title .fubi_send {
  height: 100%;
  text-align: center;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  position: relative;
}

.fubi_title .fubi_li {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -0.335rem;
  display: inline-block;
  background: #E5E5E5;
  width: 1px;
  height: 0.67rem;
}
.fubi_title .fubi_send .send_img {
  // background-image: url('../assets/my_order/send1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.send_img2 {
  // background-image: url('../assets/my_order/send2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.fubi_title .fubi_exchange {
  height: 100%;
  text-align: center;
  width: 33.9%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing border-box;
}
.fubi_title .fubi_exchange .exchange_img {
  // background-image: url('../assets/my_order/exchange1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.exchange_img2 {
  // background-image: url('../assets/my_order/exchange2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 0.507rem;
  height: 0.507rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.fubiCur {
  box-sizing border-box;
  box-shadow 0px 3px 0px #F73D00;
  color: #F73D00;
}
.switch{
  color: #f97b69;
  border-bottom: 3px solid #f97b69;
}
.btn{
  width: 9.2rem;
  height 1.2rem;
  position fixed;
  left 50%;
  top 1.2rem;
  transform translateX(-50%);
  display flex;
  justify-content space-between;
  align-items center;
  overflow: hidden;
}
.btn p{
  height: 0.66rem;
  width: 4.33rem;
  line-height: 0.66rem;
  text-align: center;
  font-size: 0.37rem;
  border: none;
  border-radius: 1rem;
  color: #404040;
  background-color: #cccccc;
}
.isDingdan {
  color #ffffff !important;
  background-color: #f8614a !important;
}
// .price{
//     margin-top: 0.7rem;
// }
.price p{
  text-align: center
}
.price p:nth-child(1){
  font-size: 0.72rem;
  color: #101010;
}
.price p:nth-child(1) span{
  font-size: 0.37rem;
}
.price p:nth-child(2){
  font-size: 0.32rem;
  color: #999;
  margin-top: 0.1rem;
}

.refund>div{
  width: 8.53rem;
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  padding-bottom: 0.335rem;
}
.share{
  width: 100%;
  height: 1.33rem;
  border-bottom: 1px solid #eaeaea;
}
.share p img{
  display: inline-block;
  width: 0.533rem;
  height: 0.533rem;
  border-radius 50%;
  margin-right .133333rem;
  background-color: #666;
}
.share p:nth-child(1){
  font-size: 0.346rem;
  color: #000000;
  float: left;
  line-height: 1.33rem;
  display: flex;
  align-items: center;
}
.share p:nth-child(2){
  color: #666;
  font-size: 0.346rem;
  float: right;
  line-height: 1.33rem;
}
.food{
  margin-top: 0.3rem;
  overflow: hidden;
}
.food .food_img{
  width: 1.06rem;
  height: 1.06rem;
  float: left;
}
.food .food_img img{
  width 100%;
  height 100%;
}
.food .food_txt{
  float: left;
  margin-left: 0.3rem;
}
.food .food_txt p:nth-child(1){
  font-size: 0.4rem;
  color: #000000;
  margin-top: 0.3rem;
}
.food .food_txt p:nth-child(1) img{
  width: 0.21rem;
  margin-left: 0.2rem;
}
.food .food_txt p:nth-child(2){
  font-size: 0.34rem;
  color: #000000;
}
.food .food_txt p:nth-child(2) span{
  font-size: 0.26rem;
}
.food .food_txt p:nth-child(3){
  font-size: 0.34rem;
  color: #999999;
}
.content{
  margin-top: 0.66rem;
}
.refund{
  width: 9.2rem;
  height: auto;
  border: 1px solid #eaeaea;
  margin: 0 auto;
  border-radius: 0.4rem;
  margin-top: 0.26rem;
  background-color: #fff;
  overflow: hidden;
}
.receive {
  width: 9.2rem;
  height: auto;
  border: 1px solid #eaeaea;
  margin: 0 auto;
  border-radius: 0.4rem;
  margin-top: 0.26rem;
  background-color: #fff;
  overflow: hidden;
}
.receive>div, .refund>div {
  width: 8.53rem;
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  padding-bottom: 0.335rem;
}
.btn_refund{
  width: 1.6rem;
  height: 0.7rem;
  border: 1px solid #f8614a;
  color: #f8614a;
  font-size: 0.346rem;
  text-align: center;
  border-radius: 0.15rem;
  float: right;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gift{
  width: 9.33rem;
  height: 0.933rem;
  background: url("../assets/my_order/gift.png") center center no-repeat;
  background-size: 100% 100%;
  font-size: 0.4rem;
  text-align: center;
  color: #fff;
  line-height: 0.933rem;
  position: fixed;
  bottom: 1.3rem;
  left: 50%;
  margin-left: -4.67rem;
}
</style>
