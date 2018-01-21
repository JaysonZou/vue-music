import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend/Recommend'
import Toplist from 'components/Toplist/Toplist'
import Rec from 'components/Rec/Rec'
import Singer from 'components/Singer/Singer'
import SingerDetail from 'components/Singer-detail/Singer-detail'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios,axios)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
        {
          path:':id',
          component: Rec
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path:':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/toplist',
      component: Toplist
    }
  ]
})
