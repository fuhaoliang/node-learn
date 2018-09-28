import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
Vue.use(Router)

const router = new Router({
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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import(/* webpackChunkName: "sign" */ './views/Sign.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 统一追加参数
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) { // 判断用户token有效日期
      next()
    } else {
      next({
        path: '/sign',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
