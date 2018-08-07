import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'
import welfare from '../views/welfare.vue'
import friends from '../views/friends.vue'
import order from '../views/order.vue'
import mine from '../views/mine.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/welfare',
      name: 'welfare',
      component: welfare
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    }
  ]
})
