<template>
  <div class="managerWrapper">
    <div data-v-7cbbe74f="" v-for="(item, idx) in managerArr" :key="idx" @click="toa(item.detail_two_dimension)" class="swiper-slide recommend_img swiper-slide-prev">
      <img data-v-7cbbe74f="" :src="item.welfare_img" alt="" class="recommendImg1">
      <div data-v-7cbbe74f="" class="recommend_outer">
        <p data-v-7cbbe74f="" class="recommend_p">
          {{item.welfare_name}}
        </p>
        <span data-v-7cbbe74f="" class="recommend_span">赚{{item.welfare_reward_coin+item.card_coins}}福币</span>
        <p data-v-7cbbe74f="" class="recommend_p2">
          <span data-v-7cbbe74f="" class="recommend_sale">¥
            <i class='saleNum'>{{item.paymoney == '' ? '0' : item.paymoney}}</i>
          </span>
          <span data-v-7cbbe74f="" class="recommend_price">
            <i class='personNum'>{{item.receive_num}}</i>人购买
          </span>
        </p>
      </div>
      <div data-v-7cbbe74f="" class="recommend_foot">
        <img :src="domainNameImg + item.companyLogo" alt="" class='recommendImg2'>
        <span class='foot_name'>{{item.companyName}}</span>
      </div>
    </div>
    <div style="height: 8rem;"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      adminId: '',
      userId: '',
      domainName: '',
      domainNameImg: '',
      managerArr: [],
      _this: this
    }
  },
  methods: {
    async amanagerFn () {
      var data = await fetch(`${this.domainName}mode=1&queryType=recommend&adminId=${this.$store.state.adminId}`).then(data => data.json())
      this.managerArr = data.data.recommendList
      console.log(this.managerArr, '这是怎么回事呢？')
    },
    _thisFn () {
      return this
    },
    toa (url) {
      window.location.href = url
    }
  },
  updated () {
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.adminId = this.$store.state.adminId
        this.userId = this.$store.state.userId
        this.domainName = this.$store.state.domainName
        this.domainNameImg = this.$store.state.domainNameImg
        this.amanagerFn()
      }, 1)
    })
  }
}
</script>
<style lang="stylus" scoped>
.managerWrapper{
  padding .266667rem;
  width 100%;
  display flex;
  flex-wrap: wrap;
  justify-content space-between;
}
.recommend_img{
      // width: 48% !important;
      border-radius 0.0533rem !important;
      height: 6.1rem;
      background-color: #ffffff;
      border-radius: .053333rem;
      box-shadow 1px 2px 4px 0px rgba(196, 195, 195, 0.2);
      border: solid 1px #eee;
      color #333333;
      flex-basis 48.7%;
      margin-bottom 0.267rem;
      .recommend_outer{
        padding 0.1rem 0.1rem 0rem 0.1rem;
      }
      .recommendImg1{
        width: 100%;
        height 2.906667rem;
        display: block;

      }
      .recommend_p {
          font-size: 0.38rem;
          margin-bottom: 0.1rem;
          margin-left 0.05rem;
          margin-top 0.1rem;
        }
      .recommend_span{
        height: 0.4rem;
        padding-left 0.1rem;
        padding-right 0.1rem;
        background-color: #fff;
        border-radius: 2px;
        border: solid 0.5px #fc4f69;
        display: inline-block;
        text-align: center;
        line-height: 0.4rem;
        margin 0.1rem 0;
        color: #fc4f69;
        margin-left 0.05rem;
      }
      .recommend_p2{
        margin-top 0.1rem;
        margin-left 0.05rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        margin-bottom: 0.1rem;
      }
      .recommend_sale{
        color #ff1616;
        font-size .32rem;
        line-height .6rem;
        .saleNum{
          font-style normal;
          font-size .48rem;
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
          width .55rem;
          height .55rem;
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
// .recommend_img{
//   width: 4.6rem !important;
//   height: 6.133333rem;
//   background-color: #fff;
//   border-radius: 0.053333rem;
//   -webkit-box-shadow: 1px 2px 4px 0px rgba(196,195,195,0.35);
//   box-shadow: 1px 2px 4px 0px rgba(196,195,195,0.35);
//   border: solid 1px #ddd;
//   margin-bottom .266667rem;
//   color: #333;
//   margin-right .11rem;
//   .recommendImg1 {
//     width: 100%;
//     height 2.906667rem;
//     display: block;
//     .recommend_p {
//       font-size: 0.32rem;
//       margin-bottom: 0.146667rem;
//     }
//   }
//   .recommend_span {
//     width: 1.7rem;
//     height: 0.4rem;
//     background-color: #fff;
//     border-radius: 2px;
//     border: solid 1px #fc4f69;
//     display: block;
//     text-align: center;
//     line-height: 0.4rem;
//     margin .2rem 0;
//     color: #fc4f69;
//   }
// }
// .recommend_sale {
//   color: #ff1616;
//   font-size: 0.32rem;
// }
// .recommend_p2 {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   -webkit-box-align: end;
//   -ms-flex-align: end;
//   align-items: flex-end;
// }
// .saleNum {
//   font-style: normal;
//   font-size: 0.453333rem;
// }
// .recommend_price {
//   color: #666;
//   font-size: 0.266667rem;
//   text-align: end;
// }
// .personNum {
//   font-style: normal;
// }
// .recommend_outer[data-v-7cbbe74f] {
//   padding: 0.1rem 0.1rem 0rem 0.1rem;
// }
// .recommend_foot {
//   height: 0.786667rem;
//   border-top: 1px solid #f1f1f1;
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-align: center;
//   -ms-flex-align: center;
//   align-items: center;
//   padding: .266667rem 0.1rem 0 0.1rem;
// }
// .recommend_foot img {
//   width: 0.506667rem;
//   height: 0.506667rem;
//   display: inline-block;
// }
// .recommend_foot .foot_name {
//   font-size: 0.266667rem;
//   margin-left: 0.133333rem;
// }
</style>
