import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'
import store from '@/store'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage
  },
  {
    path: '/city/:id',
    name: 'Details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DetailedPage'),
    beforeEnter (to, from, next) {
      const cityId = parseInt(to.params.id) // convert the cityId to number
      const citiesList = store.getters.citiesList
      const isCityInList = citiesList.some(city => city.id === cityId)
      if (isCityInList) {
        store.dispatch('showDetails', cityId)
        next()
      } else {
        next('/not-found')
      }
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
