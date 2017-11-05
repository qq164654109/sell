import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/Goods.vue'
import ratings from '../components/ratings/Ratings.vue'
import seller from '../components/seller/Seller.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
})
