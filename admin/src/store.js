import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('token'),
    userInfo: {}
  },
  mutations: {
    LOGIN: (state, data) => {
      state.token = data.token
      state.userInfo = data
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('userInfo',JSON.stringify(data))
      let { redirect } = router.currentRoute.query
      router.push({ path: redirect })
      console.info('redirect', redirect)
    },
    LOGINOUT: (state) => {
      state.token = ''
      state.userInfo = {}
      window.localStorage.clear('token')
      window.localStorage.clear('userInfo')
    }
  },
  actions: {
    UserLogin ({ commit }, data) {
      commit('LOGIN', data)
    },
    UserLoginOut ({ commit }) {
      commit('LOGINOUT')
    }
  }
})
