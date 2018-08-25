import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // domainName: '/fuliShare/terminal/fuliShareMall?',
    domainName: 'http://test1.kexinapp.com/fuliShare/terminal/fuliShareMall?',
    // domainNameImg: '/fuliShare/',
    domainNameImg: 'http://test1.kexinapp.com/fuliShare/',
    userInfo: null,
    userId: null,
    adminId: null,
    allGoodsData: null,
    allGoodsClassify: null,
    welfareData: null,
    welfareClassify: null,
    allCustomer: null,
    allGoodsClassifyIds: null
  },
  mutations: {
    USERINFO (state, payload) {
      // console.log(payload.data)
      this.state.adminId = payload.payload.adminId
      this.state.userId = payload.payload.userId
      this.state.userInfo = payload.data.data.user
      // console.log(this.state.userInfo)
      // console.log(this.state.adminId)
      // console.log(this.state.userId)
    },
    // URLDATA (state, payload) {
    //   this.state.adminId = payload.adminId
    //   this.state.userId = payload.userId
    // },
    GETALLGOODSDATA (state, payload) {
      this.state.allGoodsData = payload
      // console.log(this.state.allGoodsData)
    },
    GETALLGOODSBYSORT (state, payload) {
      this.state.allGoodsData = payload
      // console.log(this.state.allGoodsData)
    },
    GETALLGOODSDETAILS (state, payload) {
      this.state.allGoodsData = payload
      // console.log(this.state.allGoodsData)
    },
    GETALLGOODSCLASSIFY (state, payload) {
      this.state.allGoodsClassify = payload
      console.log(this.state.allGoodsClassify)
      // this.state.allGoodsClassifyIds = payload.forEach(e => {
      //   return e
      // })
      // console.log(this.state.allGoodsClassifyIds)
    },
    GETWELFAREGOOODS (state, payload) {
      this.state.welfareData = payload
      // console.log(this.state.welfareData)
    },
    GETWELFAREGOODSDETAILS (state, payload) {
      this.state.welfareData = payload
      // console.log(this.state.welfareData)
    },
    GETWELFARECLASSIFY (state, payload) {
      this.state.welfareClassify = payload
    },
    GETWELFAREGOODSBYSORT (state, payload) {
      this.state.welfareData = payload
    },
    GETALLGOODSBYREGION (state, payload) {
      this.state.allGoodsData = payload
    },
    GETWELFAREBYREGION (state, payload) {
      this.state.welfareData = payload
    },
    GETALLGOODSSEARCH (state, payload) {
      this.state.allGoodsData = payload
    },
    GETWELFARESEARCH (state, payload) {
      this.state.welfareData = payload
    },
    GETALLCUSTOMERSEARCH (state, payload) {
      this.state.allCustomer = payload
    }
  },
  actions: {
    async getUserInfo ({ commit }, payload) {
      // var data = { 'model': 0, 'user': { 'id': '402881966532005a0165320641580000', 'openID': 'opEEHxFZRg_olubb5TrwcPVuDXPc', 'xcxOpenID': null, 'userIconUrl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8rpf5mOz2sIAAwZBesGYyR0Cr5JKzEZE6ZmcNSGMLsXCUTRL1fxt1NH3atZxYkpnibZeTXcblcDQ/132', 'nickName': 'Aefgyg', 'updateTime': 1534142655000, 'userSex': 1, 'cityName': '保定', 'userType': 0, 'userMobbile': null, 'userAge': null, 'realName': null, 'occupation': null, 'education': null, 'birthday': null, 'customIconUrl': null, 'createTime': 1534142595000, 'level': 1, 'subscribeState': 0, 'wxCenterId': '4028819664ff47ce0164ff4ad8f60000', 'unionid': 'o2GDP0xwW9eU0_1EZZOuF8guVd9o', 'coins': null, 'memberCard': null, 'status': 0, 'adminId': '1' } }
      console.log(`${this.state.domainName}mode=14&userId=${payload.userId}`)
      var data = await fetch(`${this.state.domainName}mode=14&userId=${payload.userId}`).then(data => data.json())
      commit('USERINFO', {payload, data})
      // console.log(payload, data.data.user)
      sessionStorage.setItem('loginuser', JSON.stringify(data.data.user))
    },
    // getUrlData ({commit}, payload) {
    //   commit('URLDATA', payload)
    // },
    // 所有商品获得所有商品
    async getAllGoods ({commit}) {
      // console.log(`${this.state.domainName}mode=7&type=4&adminId=${this.state.adminId}`)
      var data = await fetch(`${this.state.domainName}mode=7&type=4&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETALLGOODSDATA', data.data.allWelfare.content)
    },
    // 所有商品点击排序
    async getAllGoodsBySort ({ commit }, payload) {
      // console.log(payload)
      var data = await fetch(`${this.state.domainName}mode=7&type=3&page=0&adminId=${this.state.adminId}&longitude=${payload.longitude}&Latitude=${payload.latitude}&sortType=${payload.type}`).then(data => data.json())
      commit('GETALLGOODSBYSORT', data.data.sortList.content)
    },
    // 所有商品点击分类获得商品
    async getAllGoodsDetails ({ commit }, payload) {
      // console.log(payload)
      // console.log(`${this.state.domainName}mode=7&type=2&welfareId=${this.state.allGoodsClassify[payload].id}&adminId=${this.state.adminId}`)
      var data = await fetch(`${this.state.domainName}mode=7&type=2&welfareId=${payload}&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETALLGOODSDETAILS', data.data.welfareList.content)
    },
    // 所有商品获得分类
    async getAllGoodsClassify ({ commit }) {
      // console.log(payload)
      var data = await fetch(`${this.state.domainName}mode=7&type=1&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETALLGOODSCLASSIFY', data.data.classList)
      // console.log(`${this.state.domainName}mode=7&type=1&adminId=${this.state.adminId}`)
    },
    // 福利大厅全部商品
    async getWelfareGoods ({ commit }, payload) {
      var data = await fetch(`${this.state.domainName}mode=7&type=2&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETWELFAREGOOODS', data.data.welfareList.content)
      // console.log(data)
    },
    // 福利大厅点击分类获得商品
    async getWelfareGoodsDetails ({ commit }, payload) {
      // console.log(payload)
      var data = await fetch(`${this.state.domainName}mode=7&type=2&welfareId=${this.state.welfareClassify[payload].id}&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETWELFAREGOODSDETAILS', data.data.welfareList.content)
    },
    // 福利大厅获得分类
    async getWelfareClassify ({ commit }, payload) {
      // console.log(`${this.state.domainName}mode=7&type=1&adminId=${this.state.adminId}`)
      var data = await fetch(`${this.state.domainName}mode=7&type=1&adminId=${this.state.adminId}`).then(data => data.json())
      commit('GETWELFARECLASSIFY', data.data.classList)
    },
    async getWelfareGoodsBySort ({ commit }, payload) {
      // console.log(payload)
      var data = await fetch(`${this.state.domainName}mode=7&type=3&page=0&adminId=${this.state.adminId}&longitude=${payload.longitude}&Latitude=${payload.latitude}&sortType=${payload.type}`).then(data => data.json())
      commit('GETWELFAREGOODSBYSORT', data.data.sortList.content)
    },
    // 全部商品全国搜索
    async getAllGoodsByRegion ({ commit }, payload) {
      console.log(payload)
      commit('GETALLGOODSBYREGION', payload)
    },
    // 福利大厅全国搜索
    async getWelfareGoodsByRegion ({ commit }, payload) {
      console.log(payload)
      commit('GETWELFAREBYREGION', payload)
    },
    async getAllGoodsSearch ({ commit }, payload) {
      var data = await fetch(`${this.state.domainName}mode=7&type=6&page=0&adminId=${this.state.adminId}&welfareName=${payload}`).then(data => data.json())
      commit('GETALLGOODSSEARCH', data.data.welfareList.content)
      // console.log(data.data.welfareList.content)
    },
    async getWelfareSearch ({ commit }, payload) {
      var data = await fetch(`${this.state.domainName}mode=7&type=6&page=0&adminId=${this.state.adminId}&welfareName=${payload}`).then(data => data.json())
      commit('GETWELFARESEARCH', data.data.welfareList.content)
      console.log(data.data.welfareList.content)
    },
    // 全部商户input输入搜索
    async getallCustomerSearch ({ commit }, payload) {
      var data = await fetch(`${this.state.domainName}mode=10&queryType=companyName&page=0&adminId=${this.state.adminId}&queryTypeName=${payload}`).then(data => data.json())
      commit('GETALLCUSTOMERSEARCH', data.data.list.content)
      console.log(data.data.list.content)
    },
    // 所有的企业
    async getallcustomer ({ commit }, payload) {
      var data = await fetch(`${this.domainName}page=0&mode=10&adminId=1&queryType=list`).then(data => data.json())
      commit('GETALLCUSTOMERSEARCH', data.data.list.content)
      console.log(data.data.list.content)
    }
  }
})
export default store
