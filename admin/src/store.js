import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('token'),
    userInfo:{}
  },
  mutations: {
    LOGIN: (state, data) => {
      state.token = data
      window.localStorage.setItem('token', data)
      let { redirect } = router.currentRoute.query
      router.push({path: redirect})
      console.info('redirect', redirect)
    },
    LOGINOUT: (state) => {
      state.token = ''
      window.localStorage.clear('token')
    }
  },
  actions: {
    UserLogin ({commit}, data) {
      commit('LOGIN', data)
    },
    UserLoginOut ({commit}) {
      commit('LOGINOUT')
    }
  },
});
