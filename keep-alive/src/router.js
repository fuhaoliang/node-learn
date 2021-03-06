import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/about/:id',
      name: 'params',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Params.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/query',
      name: 'query',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Query.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/a',
      name: 'a',
      component: () => import(/* webpackChunkName: "about" */ './views/A.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/b',
      name: 'b',
      component: () => import(/* webpackChunkName: "about" */ './views/B.vue')
    },
    {
      path: '/c',
      name: 'c',
      component: () => import(/* webpackChunkName: "about" */ './views/C.vue')
    }
  ]
})
