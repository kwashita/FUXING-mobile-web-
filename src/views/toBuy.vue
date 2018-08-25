<template>
  <div>
    <div class="body"></div>
    <div class="rob_buy">
      <div class="robBuy_header">
        <div class="header_left">
          <div @click="leftTabFn" :class="headerLeft ? 'headerNavActive': ''">限时抢购</div>
        </div>
        <div class="header_right">
          <div @click="rightTabFn" :class="headerRight ? 'headerNavActive': ''">即将开始</div>
        </div>
      </div>
      <div style="height: 1.173333rem;"></div>
      <div v-if="headerRight"  class="buy_dataList">
        <div class="dataList_content" v-for="(item, idx) in soonArr.content" :key="idx" @click="toa(item.detail_two_dimension)">
          <div class="content_layout">
            <img :src="item.welfare_img" alt="">
          </div>
          <div class="content_right">
            <p>{{item.welfare_name}}</p>
            <div class="right_money">
              <span><span>￥</span>{{item.paymoney}}</span>
              <p>
                <span>赚{{item.earn_coin}}福币</span>
                <br>
                <span>￥{{item.price}}</span>
              </p>
              <span>抢</span>
            </div>
            <div style="clear:both;"></div>
            <p>{{formatDate(new Date(item.start_time))}}开枪<span>限量{{item.welfare_num}}件</span></p>
          </div>
        </div>
      </div>
      <div v-if="headerLeft" class="rob_qiang buy_dataList">
        <div class="dataList_content" v-for="(item, idx) in xianshiArr.content" @click="toa(item.detail_two_dimension)" :key="idx">
          <div class="content_layout">
            <img :src="item.welfare_img" alt="">
          </div>
          <div class="content_right">
            <p>{{item.welfare_name}}</p>
            <div class="right_money">
              <span><span>￥</span>{{item.paymoney}}</span>
              <p>
                <span>赚{{item.earn_coin}}福币</span>
                <br>
                <span>￥{{item.price}}</span>
              </p>
              <span>抢</span>
            </div>
            <div style="clear:both;"></div>
            <p>已售{{item.receive_num}}%</p>
            <div class="qiangStep">
              <div :style="{width: item.welfare_num? item.receive_num / item.welfare_num * 100 + '%' : 0 + '%'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headerLeft: false,
      headerRight: true,
      xianshiArr: [],
      soonArr: [],
      adminId: null,
      userId: null,
      domainName: null,
      domainNameImg: null
    }
  },
  methods: {
    leftTabFn () {
      this.headerLeft = true
      this.headerRight = false
    },
    rightTabFn () {
      this.headerLeft = false
      this.headerRight = true
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
    toa (url) {
      window.location.href = url
    },
    //限时抢购请求
    async buyFn () {
      var data = await fetch(`${this.domainName}mode=6&type=1&page=0&adminId=${this.adminId}`).then(data => data.json())
      this.xianshiArr = data.data
      console.log(data.data, '抢购')
    },
    //即将开始请求
    async soonFn () {
      var data = await fetch(`${this.domainName}mode=6&type=2&page=0&adminId=${this.adminId}&userId=${this.userId}`).then(data => data.json())
      this.soonArr = data.data
      console.log(data.data, '开始')
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.adminId = this.$store.state.adminId
        this.userId = this.$store.state.userId
        this.domainName = this.$store.state.domainName
        this.domainNameImg = this.$store.state.domainNameImg
        this.buyFn()
        this.soonFn()
      }, 1)
    })
  }
}
</script>
<style lang="stylus" scoped>
.robBuy_header {
  width: 100%;
  height: 1.173333rem;
  background-color: #ffffff;
  display flex;
  position fixed;
  top 0;
  left 0;
  .header_left,.header_right{
    width: 50%;
    height 1.44rem;
    text-align center;
    line-height 1.173333rem;
    display flex;
    justify-content center;
    font-size .426667rem;
    color #666666;
    div{
      width:2.933333rem;
      height 100%;
    }
  }
  .headerNavActive{
    color #ffffff;
    background-image: url('../assets/rob_buy/arrow.png');
    background-size 100%;
    background-position center;
    background-repeat no-repeat;
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
.buy_dataList {
  background: #f0f0f0;
  padding .266667rem;
  .dataList_content {
    width 100%;
    height 2.666667rem;
    background-color  #ffffff;
    border-radius .053333rem;
    padding .266667rem;
    margin-bottom .266667rem;
    display flex;
    .content_layout{
      width 3.2rem;
      height 2.1333333rem;
      margin-right .253333rem;
      img{
        width 3.2rem;
        height 2.133333rem;
        border-radius 4px;
      }
    }
    .content_right{
      width 5.493333rem;
      >p:nth-of-type(1){
        width 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right_money{
        >span:nth-of-type(1){
          color #fd1d3f;
          font-size .52rem;
          float left;
          width 1.133333rem;
          margin-top .153333rem;
          span{
            font-size .266667rem;
          }
        }
        p{
          width auto;
          font-size .32rem;
          margin-left .16rem;
          margin-top .266667rem;
          line-height .213333rem;
          float left;
          >span:nth-of-type(1){
            display block;
            height .346667rem;
            line-height .346667rem;
            padding-right .08rem;
            font-size .186667rem !important;
            background-image url('../assets/rob_buy/tips.png');
            background-size 100% 110%;
            background-position center;
            background-repeat no-repeat;
            padding-left .246667rem;
            white-space: nowrap;
            color #ffffff;
          }
          >span:nth-of-type(2){
            color #858585;
            text-decoration line-through;
          }
        }
        >span:nth-of-type(2){
          display inline-block;
          width .666667rem;
          height .666667rem;
          background-color #fc4f69;
          font-size .32rem;
          border-radius .133333rem;
          text-align center;
          line-height .666667rem;
          color white;
          margin-top .266667rem;
          float right;
        }
      }
      p:nth-of-type(2){
        color #f86f4d;
        margin-top .25rem;
        span:last-of-type{
          float right;
        }
      }
    }
  }
}
</style>
