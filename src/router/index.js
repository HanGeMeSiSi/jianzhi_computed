import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ShowHistroy from '@/components/ShowHistroy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/show_history',
      name: 'ShowHistroy',
      component: ShowHistroy
    }
  ]
})
