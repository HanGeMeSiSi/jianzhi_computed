import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ShowHistroy from '@/components/ShowHistroy'
import HistroyList from '@/components/HistroyList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/show_histroy',
      name: 'ShowHistroy',
      component: ShowHistroy
    },
    {
      path: '/histroy_list',
      name: 'HistroyList',
      component: HistroyList
    }
  ]
})
