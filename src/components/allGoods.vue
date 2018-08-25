<template>
  <div>
    <search-city></search-city>
    <div style="height:1.066667rem;"></div>
    <to-top></to-top>
    <!--顶部导航栏-->
    <!-- <div class="detail" id='topGoods'>
      <span class='aside_sh'></span>
    </div> -->
    <div class='aside'>
      <div class='le' :class='items.id === classifyId ? "a_cur" : null' v-for='(items, index) in $store.state.allGoodsClassify' :key='items.id' @click='getGoodsDetails(index)'>{{items.name}}
        <!-- <span class='aside_sh' v-show='index === classifyCount'></span> -->
      </div>
    </div>
    <!--内容区-->
         <div class='234324'>
        <!-- {{$store.state.allGoodsData}} -->
      </div>
    <div class='contentOuter'>
      <div class="content" v-for='items in allGoods' :key='items.id'>
      <div class='con_div'>
        <div class="all_content">
          <div class="con_img">
            <img src="" alt="" class='serImg'>
          </div>
          <div class="con_word">
            <p class='word_le'>{{items.welfare_name}}</p>
            <p>
              <img src="../assets/allCustomer/position.png" alt="">
              {{items.region | filterRegion}}
            </p>
            <div class='word_ci'>
              <div class='word_div'>
                ￥
                <span class='word_sp'>{{items.paymoney}}</span>
                <span>{{items.receive_num}}人买</span>
              </div>
              <span class='word_me'>赚{{items.card_coins + items.welfare_reward_coin}}福币</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="blankOuter" v-if='blankLock'>
      <div class='blank' ></div>
      <p>暂无，等待商家发售哦～</p>
    </div>
    <bottom-gray></bottom-gray>
  </div>
</template>

<script>
export default {
  filters: {
    filterRegion: function (value) {
      // console.log(value)
      if (!value) {
        return ''
      }
      var regionBak = value
      var strs = [] // 定义一数组
      strs = regionBak.split('-') // 字符分割
      for (var x = strs.length - 1; x >= 0; x--) {
        if (strs[x] === '' || strs[x] === 'undefined') {
          continue
        } else {
          regionBak = strs[x]; break
        }
      }
      if (regionBak === '' || regionBak === '全国') {
        // html += '<span class="gdt_map">全国</span>'
        return '全国'
      } else {
        // html += '<span class="gdt_map">' + data[i].distance + ' - ' + regionBak + '</span>'
        return regionBak.distance + '-' + regionBak
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.classifyId = this.$route.query.id
      this.getGoodsClassify()
      setTimeout(() => {
        this.getGoodsDetails()
        console.log(this)
        // this.allGoodsClassify = this.$store.state.allGoodsClassify
      }, 500)
    })
  },
  computed: {
    allGoodsClassify () {
      return this.$store.state.allGoodsClassify
    },
    allGoods () {
      if (this.$store.state.allGoodsData == '') {
        this.blankLock = true
      } else {
        this.blankLock = false
        return this.$store.state.allGoodsData
      }
    }
  },
  methods: {
    // 获得全部商品侧栏
    async getGoodsClassify () {
      // var data = await fetch(`${this.$store.state.domainName}mode=7&type=1&adminId=${this.$store.state.adminId}`).then(data => data.json())
      // this.goodsClassify = data.data.classList
      this.$store.dispatch('getAllGoodsClassify')
    },
    // // 首次加载获得全部商品
    // getAllGoods () {
    //   this.$store.dispatch('getAllGoods')
    // },
    // 获得具体某一类商品
    async getGoodsDetails (n) {
      // console.log('进allGoods了')
      // console.log(this.$route.query.id)
      // console.log(this.$router.params.id)
      // var  = this.$route.query.id
      // var ids = null
      console.log(n, this.allGoodsClassify)
      if (!n && n !== 0) {
        this.$store.dispatch('getAllGoodsDetails', this.$route.query.id)
      } else {
        // console.log('进else')
        console.log(this.allGoodsClassify[n].id)
        this.classifyId = this.allGoodsClassify[n].id
        this.$store.dispatch('getAllGoodsDetails', this.allGoodsClassify[n].id)
      }
      // console.log(this.allGoodsClassify[n].id)
      // console.log(window.location.href.includes('/allGoods'))

      // if (window.location.href.includes('/allGoods')) {
      //   this.$store.dispatch('getAllGoodsDetails', n)
      // }
    }
  },
  data () {
    return {
      // goodsClassify: null,
      // allGoods: this.$store.state.allGoodsData,
      classifyCount: 0,
      blankLock: false,
      classifyId: ''
      // allGoodsClassify: null
    }
  }
}
</script>

<style scoped lang="stylus">
body {
  background: #f2f2f2;
  position: relative;
}
.allgoods_top {
  /* background: url('./icons/top.png') no-repeat; */
  background-size: 100% 100%;
  width: 0.8rem;
  height: 0.8rem;
  position: fixed;
  bottom: 0.533rem;
  right: 0.2667rem;
  display: none;
  z-index: 99;
}
.box {
  width: 100%;
  height: 1.0667rem;
  margin-bottom: 0.2667rem;
  background: white;
  position: fixed;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: Center;
}
.box .searchImg {
  /* background: url('./icons/search.png') no-repeat; */
  background-size: 100% 100%;
  width: 0.347rem;
  height: 0.347rem;
  position: absolute;
  left: 3.6rem;
  top: 0.4rem;
  vertical-align: middle;

}
.box .search {
  width: 9.4667rem;
  height: 0.8rem;
  background-color: #f2f2f2;
  border-radius: 6px;
  outline: none;
  border: 0;
  /* padding-left: 42%; */
  text-align: start;
}
.box .search::-ms-input-placeholder {
  text-align: center;
}
.box .search::-webkit-input-placeholder {
  text-align: center;
}
.details {
  position: relative;
  position: fixed;
  top: 1.333rem;
  left: 0;
  margin-top: 0, .26667rem;
}
.aside {
  width: 2.133333rem;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 1.333rem;
  left: 0;
}
.aside div {
  width: 2.213rem;
  height: 1.333rem;
  background: white;
  margin-bottom: 1px;
  text-align: center;
  line-height: 1.333rem;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.contentOuter {
  position: absolute;
  top: 1.333rem;
  left: 2.48rem;
}
.all_content {
  width: 7.353rem;
  height: 2.566667rem;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #dddddd;
  margin-bottom: 0.1333rem;
  padding-top: .346667rem;
  padding-bottom: .266667rem;
  // padding-right 0.2667rem;
}
.all_content .con_img {
  float: left;
  width: 2.93rem;
  height: 1.706667rem;
  display: flex;
  justify-content: center;
  margin-left .066667rem;
  align-items: center;

}
.all_content .con_img .serImg {
  width: 2.667rem;
  height: 1.6533rem;
  background: skyblue;
  display: block;
}
.all_content .con_word {
  float: left;
  width: 4.25rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
}
.all_content .con_word .word_le {
  font-size: .213333rem;
  color: #4e4e4e;
  width: 100%
}
.all_content .con_word .word_ci {
  font-size: 0.24rem;
  color: #ff2323;
  width: 100%
  display flex;
  justify-content space-between;
  align-items flex-end;
  .word_div{
    display flex;
    justify-content space-between;
    align-items flex-end;
  }
  .word_me{
    margin-right 0.2rem;
  }
}
.all_content .con_word .word_ci span:nth-of-type(2) {
  color #838383;
}
.all_content .con_word .word_ci span:nth-of-type(3) {
  padding .04rem .066667rem;
  margin-left .266667rem;
  border 1px solid #fdb4bf;
  border-radius 4px;
}
.all_content .con_word .word_sp {
  font-size: 0.46rem;
  color: #ff2323;
  margin-right 0.2rem;
}
.all_content p:nth-of-type(2){
  font-size: .213333rem;
  color: #828282;
}
.all_content p:nth-of-type(2) img{
  width: .32rem;
  height: .32rem;
  margin-right: .186667rem;
}
.aside div.a_cur {
  background: #f2f2f2;
  color: #fa6d19;
  position: relative;
  border-left .06rem solid #FF533D;
}
#allgoods {
  width: 2.213rem;
  height: 1.333rem;
  background: white;
  margin-bottom: 1px;
  text-align: center;
  line-height: 1.333rem;
}
.blankOuter{
  margin 0 auto;
  text-align center;
  margin-top 1.2rem;
  position fixed;
  top 20%;
  left 40%;
  .blank{
    background url('../assets/search/blank.png') no-repeat;
    width 2.773333rem;
    height 2.773333rem;
    background-size 100% 100%;
    margin 0 auto;
  }
  p{
    font-size .373333rem;
    color #666;
  }
}
</style>
