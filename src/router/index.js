import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import welfare from '../components/welfare.vue'
import friends from '../views/welfareManage.vue'
import allCustomer from '../components/allCustomer.vue'
import order from '../views/fuli.vue'
import mine from '../components/mine.vue'
import allGoods from '../components/allGoods.vue'
import recommend from '../views/manager'
import myFriends from '../views/myPowder'
import flashSale from '../views/toBuy'
import myLike from '../views/fuli'

Vue.use(Router)
var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta: {
        title: '修改昵称'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/welfare',
      name: 'welfare',
      component: welfare,
      meta: {
        title: '福利'
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends,
      meta: {
        title: '福友'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        title: '订单'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/allCustomer',
      name: 'allCustomer',
      component: allCustomer,
      meta: {
        title: '全部商户'
      }
    },
    {
      path: '/allGoods',
      name: 'allGoods',
      component: allGoods,
      meta: {
        title: '全部商品'
      }
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      meta: {
        title: '福利商户'
      }
    },
    {
      path: '/myFriends',
      name: 'myFriends',
      component: myFriends,
      meta: {
        title: '我的福粉'
      }
    },
    {
      path: '/flashSale',
      name: 'flashSale',
      component: flashSale,
      meta: {
        title: '限时抢购'
      }
    },
    {
      path: '/myLike',
      name: 'myLike',
      component: myLike,
      meta: {
        title: '喜欢'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    // console.log('切换路由')
  }
  next()
})
export default router
