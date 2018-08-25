<template>
  <div class='dt_searchbox'>
    <div class="dt_search">
      <div  class="nav" id="areaLabel"><span id="Addr">全国</span><img src="../assets/search/down.png" /></div>
      <!-- <p style="width: 33%;" class="nav">福利分类 <img src="../assets/search/down.png" /></p>
      <p style="width: 33%;" class="nav">智能排序 <img src="../assets/search/down.png" /></p> -->
      <!-- <form onsubmit='return false;'>
        <input type="search" placeholder="搜索福利社商品" id="myinput">
      </form> -->
      <form action="" id="myform" onsubmit="return false">
        <input type="search" id="input" value="" placeholder="搜索福利社商品" />
      </form>
      <div class="classfiy" @click='showSort()' >
        <i></i>
      </div>
      <div class='welfare_sort' v-if='welfare_sortLock'>
        <div @click='getWelfare_sort(items.sortType)' v-for='items in welfare_sortData' :key='items.id'>{{items.name}}</div>
      </div>
    </div>
    <div class="welfare_title">
      <div id="addressSelectWrapper">
        <div id="addressSelect">
          <div id="address">
            <ul class="selected-address" id="selected-address">
              <li class="lastarea" id="lastprovince">请选择</li>
              <li class="lastarea" id="lastcity">请选择</li>
              <li class="lastarea" id="lastarea">请选择</li>
              <li class="lastarea" id="lasttown">请选择</li>
            </ul>
            <div class="address-content">
              <ul id="province"></ul>
              <ul id="city"></ul>
              <ul id="area"></ul>
              <ul id="town"></ul>
            </div>
          </div>
        </div>
      </div>

        <!-- <div class="all_navbox">
        <ul id="listRegion">

        </ul>
        <ul id="listType">
            <li welfareType="0">全部</li>
          <c:forEach items="${listType}" var="type">
                <li welfareType="${type.id}">${type.name}</li>
          </c:forEach>
        </ul>
        <ul>
          <li content="0">离我最近</li>
          <li content="1">福币奖励最多</li>
          <li content="2">浏览量</li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=LEhGKDNBygX6Uw0g0TcxBaZuihImvcZc"></script>
<script>
import city from '../../static/city/js/city'
import {MP} from '../map'
export default {
  data () {
    return {
      page: 0,
      hasNext: 'yes',
      adminId: 934290424,
      scrollFlag: true,
      ctx: 23904234,
      welfare_sortDetails: null,
      welfare_sortLock: false,
      welfare_sortData: [
        {name: '离我最近', sortType: 0},
        {name: '福利奖励最多', sortType: 1},
        {name: '浏览量', sortType: 2}
      ],
      longitude: 0,
      latitude: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initAddress()
      this.init()
      this.animation()
      var _this = this;
      MP(_this.ak).then(BMap => {
        this.toGetStorage()
      })
      $('#myform').bind('search', function (e) {
        var url = window.location.href
        if (url.includes('allGood')) {
          this.$store.dispatch('getAllGoodsSearch', e.target.value)
        }else if ( url.includes('welfare')) {
          this.$store.dispatch('getWelfareSearch', e.target.value)
        }else if (url.includes('allCustomer')){
          this.$store.dispatch('getallCustomerSearch', e.target.value)
          console.log(e.target.value)
        }
      }.bind(this));
    })
  },
  methods: {
    // 获取经纬度
    toGetStorage() {
      // console.log(1)
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          sessionStorage.setItem("longitude", r.point.lng)// 经度
          sessionStorage.setItem("latitude", r.point.lat)// 纬度
          this.longitude = r.point.lng
          this.latitude = r.point.lat
          // sessionStorage.setItem("province", r.address.province);
          // sessionStorage.setItem("city", r.address.city);
          // localStorage.setItem("city", r.address.city);
        } else {
          console.log('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
    },
    async getWelfare_sort (type) {
      var url = window.location.href
      if (url.includes('allGood')) {
        this.$store.dispatch('getAllGoodsBySort', {type:type,longitude:this.longitude,latitude:this.latitude})
      }else if ( url.includes('welfare')) {
        this.$store.dispatch('getWelfareGoodsBySort', {type:type,longitude:this.longitude,latitude:this.latitude})
      }else if (url.includes('allCustomer')) {
        // this.$store.dispatch('getallCustomer', {type:type,longitude:this.longitude,latitude:this.latitude})
      }
      this.welfare_sortLock = false
    },
    showSort () {
      this.welfare_sortLock = !this.welfare_sortLock
    },
    animation () {
      city.aaa(this.query)
    },
    init () {
      var flag = 0
      // 地址选择器遮罩层打开与关闭
      $('#areaLabel').click(function (e) {
        if (flag === 0) {
          $('#addressSelectWrapper').show()
          $(this).find('img').attr('../assets/search/up.png')
          $(this).siblings().find('img').attr('../assets/search/down.png')
          flag = 1
        } else {
          $('#addressSelectWrapper').hide()
          $(this).find('img').attr('../assets/search/down.png')
          // $(this).siblings().find("img").attr("src", ctx+"/images/web/images/up.png");
          flag = 0
        }

        e.stopPropagation()
      })
      $(document).click(function () {
        $('#addressSelectWrapper').hide()
        $('#areaLabel').find('img').attr('../assets/search/down.png')
        flag = 0
      })
      $('#addressSelect').click(function (e) {
        e.stopPropagation()
      })
    },
    initAddress () {
      // var iRegion;
      $('#Addr').cityLinkage({
        containerId: 'addressSelectWrapper',
        getSelectedCode: function () { return $('#Addr').data('code') },
        callback: function (data) {
          // $("#Addr").text(data.addr).data("code",data.town.code);
          // iRegion=$("#lasttown").text()+"-"+$("#lastprovince").text()+"-"+$("#lastarea")+"-"+$("#lasttown");
          // queryListByProperty("region",iRegion);
          //    $("#Addr").val(data.addr).data("code",data.town.code);
        }
      })
    },
    query: function () {
      var iRegion
      if ($('#lastprovince').text() === '全国') {
        $('#Addr').text('全国')
        $('.gdt_list').empty()
        this.page = 0
        this.hasNext = 'yes'
        this.queryListByProperty('region', $('#lastprovince').text())
        $('.dt_search').children('p').eq(0).find('img').attr('../assets/search/down.png')
      } else if ($('#lastcity').text() === '全省') {
        $('#Addr').text('全省')
        iRegion = $('#lastprovince').text()

        $('.gdt_list').empty()
        this.page = 0
        this.hasNext = 'yes'
        this.queryListByProperty('region', iRegion)
        $('.dt_search').children('p').eq(0).find('img').attr('../assets/search/down.png')
      } else if ($('#lastarea').text() === '全市') {
        iRegion = $('#lastprovince').text() + '-' + $('#lastcity').text()

        $('.gdt_list').empty()
        this.page = 0
        this.hasNext = 'yes'
        this.queryListByProperty('region', iRegion)
        $('.dt_search').children('p').eq(0).find('img').attr('../assets/search/down.png')
      } else if ($('#lasttown').text() === '全县区') {
        iRegion = $('#lastprovince').text() + '-' + $('#lastcity').text() + '-' + $('#lastarea').text()

        $('.gdt_list').empty()
        this.page = 0
        this.hasNext = 'yes'
        this.queryListByProperty('region', iRegion)

        $('.dt_search').children('p').eq(0).find('img').attr('../assets/search/down.png')
      } else {
        iRegion = $('#lastprovince').text() + '-' + $('#lastcity').text() + '-' + $('#lastarea').text() + '-' + $('#lasttown').text()
        $('.gdt_list').empty()
        this.page = 0
        this.hasNext = 'yes'
        this.queryListByProperty('region', iRegion)
        $('.dt_search').children('p').eq(0).find('img').attr('../assets/search/down.png')
      }
      $('.zc_box').css('top', '0').hide()
    },
    queryListByProperty (type, value) {
      if (this.hasNext === 'no') {
        return
      }
      var url = ''
      var json = ''
      if (type === 'list') {
        url = 'manage/web/queryList'
        json = {'longitude': sessionStorage.getItem('longitude'), 'latitude': sessionStorage.getItem('latitude'), 'page': this.page, 'adminId': this.adminId}
      } else if (type === 'welfareName') {
        $('.all_navbox li').css('color', '#666')
        var welfareName = $('#welfareName').val()
        url = 'manage/web/queryByName'
        json = {'longitude': sessionStorage.getItem('longitude'), 'latitude': sessionStorage.getItem('latitude'), 'welfareName': welfareName, 'page': this.page, 'adminId': this.adminId}
      } else if (type === 'welfareType') {
        url = 'manage/web/queryByWelfareType'
        json = {'longitude': sessionStorage.getItem('longitude'), 'latitude': sessionStorage.getItem('latitude'), 'welfareType': value, 'page': this.page, 'adminId': this.adminId}
      } else if (type === 'region') {
        url = 'manage/web/queryByRegion'
        json = {'longitude': sessionStorage.getItem('longitude'), 'latitude': sessionStorage.getItem('latitude'), 'region': value, 'page': this.page, 'adminId': this.adminId}
      } else if (type === 'zhiNeng') {
        url = 'manage/web/queryByZhiNeng'
        json = {'longitude': sessionStorage.getItem('longitude'), 'latitude': sessionStorage.getItem('latitude'), 'type': value, 'page': this.page, 'adminId': this.adminId}
      }
      $.ajax({
        url: `${this.$store.state.domainName}mode=7&type=5&page=0&adminId=${this.$store.state.adminId}&longitude=${this.longitude}&Latitude=${this.latitude}&region=${value}`,
        async: true,
        data: json,
        success: function (data) {
          this.hasNext = data.hasNext
          data = data.data.regionList.content
          console.log(data)
          console.log(`${this.$store.state.domainName}mode=7&type=5&page=0&adminId=${this.$store.state.adminId}&longitude=${this.longitude}&Latitude=${this.latitude}&region=${value}`)
          var url = window.location.href
          // console.log(data === )
          if (url.includes('allGood')) {
            this.$store.dispatch('getAllGoodsByRegion',data)
          }else if ( url.includes('welfare')) {
            this.$store.dispatch('getWelfareGoodsByRegion', data)
          }
          var num, billtype, viewCount, people, strs
          if (data.length === 0 && $('.gdt_list').children().length <= 0) {
            $('#no_data').show()
          } else {
            $('#no_data').hide()
          }

          // for (var i = 0; i < data.length; i++) {
          //   if (data[i].id === 'ff808081638ac20601639037d3740163' || data[i].id === 'ff80808163a4bcbe0163a4d1dc14000b') {
          //     continue
          //   }

          //   billtype = data[i].billing_type
          //   num = Number(data[i].welfare_virtual_num) + Number(data[i].receive_num)
          //   people = num + '份已领取'

          //   viewCount = Number(data[i].view_count) + Number(data[i].welfare_virtual_num * 9)
          //   var coins = Number(data[i].welfare_reward_coin) + Number(data[i].card_coins)
          //   var html = ''
          //   html += '<li>'
          //   if (data[i].welfare_img === '') {
          //     html +=	"<div class='gdt_top'    onclick='checkState(\"" + data[i].php_id + '","' + data[i].detail_two_dimension + '","' + data[i].share_level + "\")' >"
          //   } else {
          //     html +=	`<div class='gdt_top' style='background: url(${ctx} + data[i].welfare_img + ) no-repeat; background-size: 100% 100%; '  onclick='checkState(\"" + data[i].php_id + '","' + data[i].detail_two_dimension + '","' + data[i].share_level + "\")' >`
          //   }

          //   if (Number(data[i].welfare_num) <= Number(data[i].receive_num)) {
          //     html += `<div style='width: 100%; height: 100%;  background: rgba(0,0,0,0.5); background-image: url("../assets/search/shouqin.png"); background-size: 40%; background-position: center;  background-repeat: no-repeat;'></div>`
          //   }

          //   var regionBak = data[i].region
          //   if (data[i].id === 'ff80808162e301c70162f0fc5710032b' || data[i].id === 'ff80808162b7a88a0162b7d9207604c0') {
          //     regionBak = '全国'
          //   } else if (data[i].id === 'ff80808162f1ed400162f56bc5320156') {
          //     regionBak = '韩城'
          //   } else if (data[i].id === 'ff80808163005cb4016300b0af440013') {
          //     regionBak = '砀山'
          //   } else {
          //     regionBak = data[i].region
          //     strs = new Array() // 定义一数组

          //     strs = regionBak.split('-') // 字符分割
          //     // 修改了i
          //     for (var x = strs.length - 1; x >= 0; x--) {
          //       if (strs[x] === '' || strs[x] === 'undefined') {
          //         continue
          //       } else {
          //         regionBak = strs[x]; break
          //       }
          //     }
          //   }

          //   if (regionBak === '' || regionBak === '全国') {
          //     html += '<span class="gdt_map">全国</span>'
          //   } else {
          //     html += '<span class="gdt_map">' + data[i].distance + ' - ' + regionBak + '</span>'
          //   }

          //   html += '<span class="gdt_people">' + people + '</span>'
          //   html += '<span class="chakan">' + viewCount + '</span>'
          //   html += '<p class="gdt_time">开始时间:' + data[i].start_time_bak + ' -- 结束时间:' + data[i].end_time_bak + '</p>'
          //   html += '</div>'
          //   html += '<div class="gdt_bt">'
          //   html += '<div class="tet">'
          //   html += '<p>' + data[i].welfare_name + '</p>'
          //   html += '<p>' + data[i].address + '</p>'
          //   html += '</div>'
          //   html += '<p class="btm">'
          //   if (data[i].share_level === '1') {
          //     html += '<span class="xing">一星福星以上</span>'
          //   } else if (data[i].share_level === '2') {
          //     html += '<span class="xing">二星福星以上</span>'
          //   } else if (data[i].share_level === '3') {
          //     html += '<span class="xing">三星福星以上</span>'
          //   } else if (data[i].share_level === '4') {
          //     html += '<span class="xing">四星福星以上</span>'
          //   } else if (data[i].share_level === '5') {
          //     html += '<span class="xing">五星福星以上</span>'
          //   }
          //   html += '<span class="fbi">赚' + coins + '福币</span>'
          //   html += '<span class="diqu">' + data[i].prov_name + '</span>'
          //   html += "<a  onclick=' onclick='checkState(\"" + data[i].php_id + '","' + data[i].detail_two_dimension + '","' + data[i].share_level + "\")' >分享赢福币</a>"
          //   html += '</p>'
          //   html += '</div>'
          //   html += '</li>'
          //   $('.gdt_list').append(html)
          // }
          this.scrollFlag = true
          this.page++
        }.bind(this),
        error: function () {
          console.log('ajax报错')
        }
      })
    }
  }
}
</script>
<style scoped lang='stylus'>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
.dt_searchbox{
  position fixed;
  top 0;
  left 0;
  z-index 10;
  background #ffffff;
}
.dt_search{
  display flex;
  height 1.066667rem;
  align-items: center;
  padding 0 0.2rem; 0 0.2rem;
  #areaLabel {
    width 2rem;
    height: .533333rem;
    font-size: .266667rem;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding-right: 1em;
    // padding-left: 1em;
    position: relative;
    #Addr {
      text-align center;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    img{
      width .266667rem;
      height .2rem;
      background-size 100% 100%;
    }
  }
  input {
    width 6.666667rem;
    height .8rem;
    border-radius .053333rem;
    outline none;
    border 0;
    background #F3F3F3;
    padding 0.2rem;
  }
  .classfiy{
    width 1.333333rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position relative;
    i {
      width .533333rem;
      height .44rem;
      background url('../assets/search/sort.png') no-repeat;
      background-size 100% 100%;
      display inline-block;
    }
  }
  .welfare_sort{
    position absolute;
    bottom: -2.5667rem;
    right 0;
    width 100%;
    background #fff;
    div{
      border-bottom 1px solid #B6B6B6;
      font-size .32rem;
      height 0.8rem;
      color #666;
      padding-left 0.267rem;
      line-height .8rem;
    }
  }
}
/* #areaLabel::after {
  content: "";
  position: absolute;
  top: 50%;
  right: calc(1em + .24rem / 2);
  width: .24rem;
  height: .24rem;
  border-width: 1px;
  border-style: solid solid none none;
  border-color: #000;
  transform: rotate(45deg) translateY(-50%);
  transform-origin: center;
} */
#areaLabel span {
  width: 1.066667rem;
}
#areaLabel input {
  flex: 1;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#addressSelectWrapper {
    display: none;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
#addressSelect {
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 70%;
    overflow: hidden;
    background-color: #fff;
}
#addressSelect .tip {
    position: relative;
    height: .533333rem;
    line-height: .533333rem;
    width: 100%;
    border-bottom: 1px solid #dedede;
}
#addressSelect .tip h3 {
    width: 100%;
    height: .533333rem;
    line-height: .533333rem;
    text-align: center;
    font-size: .213333rem;
    font-weight: normal;
    color: #666;
}
#addressSelect .tip #cancel {
    position: absolute;
    top: 0;
    right: 0;
    width: .52rem;
    height: .52rem;
    color: #666;
    border: none;
    background: transparent url("../../static/city/css/images/cancel.png") no-repeat center;
    cursor: pointer;
}
#addressSelect #address {
    width: 100%;
    height: 100%;
}
/*被选中的地址*/
.selected-address {
    width: 100%;
    height: .533333rem;
    line-height: .533333rem;
    border-bottom: 1px solid #ededed;
}
.selected-address:before {
    content: "";
    display: table;
}
.selected-address:after {
    content: "";
    display: table;
    clear: both;
}
.selected-address li {
    float: left;
    height: .533333rem;
    line-height: .52rem;
    text-align: center;
    width: 25%;
    padding-right: .3em;
    padding-left: .3em;
    color: #333;
    border-bottom: 1px solid transparent;
    font-size: .173333rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.selected-address li.active {
    border-bottom-color: #3da5fe;
    color: #3da5fe;
}
/*各级地址列表*/
.address-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*加载中*/
}
.address-content ul {
    display: block;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: .106667rem;
    padding-bottom: 1.173333rem;
}
.address-content ul li {
  height: .48rem;
  line-height: .48rem;
  padding-left: 1em;
  font-size: .173333rem;
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  cursor: pointer;
}
.address-content ul li.active {
  background-color: #3da5ef;
  color: #fff;
}
.address-content .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .186667rem .186667rem .186667rem .693333rem;
  background: rgba(0, 0, 0, 0.5) url("../../static/city/css/images/loading.gif") no-repeat left .186667rem center / .32rem .32rem;
  color: #fff;
  border-radius: .08rem;
  font-size: .213333rem;
}
</style>
