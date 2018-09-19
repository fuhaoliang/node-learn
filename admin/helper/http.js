import services from '../helper/services'
import axios from 'axios'
import utils from './utils'
import store from '../src/store'
import router from '../src/router'

const https = require('https')

const Agent = new https.Agent({
  rejectUnauthorized: false
})

let jrAxios = axios.create({
  timeout: 8000,
  httpsAgent: Agent,
  validateStatus: function (status) {
    switch (status) {
      case 500:
        break
      case 404:
        break
      default:
    }
    return status >= 200 && status < 404
  }
})
// // request拦截器
// jrAxios.interceptors.request.use(
//   // 存在token 添加token
//   config => {
//     if (store.state.token) {
//       config.headers.Authorization = `token ${store.state.token}`;
//     } else {

//     }
//     return config
//   }
// )

// // respone拦截器
// jrAxios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//        case 401:
//         router.replace({ //跳转到登录页面
//          path: '/home',
//          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         });
//       }
//     }
//     return Promise.reject(error.response)
//   }
// )


const Http = {}

for (let i in services) {
  let service = services[i]
  let serviceHost = service['host']
  Http[i] = {}
  for (let ind in service) {
    if (ind === 'host') {
      continue
    }
    let api = service[ind]
    Http[i][ind] = async function (params, isNeedStatus = false) {
      let apiUrl = api.url
      let newParams = {}
      if (params) {
        utils.each(params, function (ind, param) {
          if (apiUrl.indexOf('{' + ind + '}') > -1) {
            apiUrl = apiUrl.replace('{' + ind + '}', param)
          } else {
            newParams[ind] = param
          }
        })
      }
      let data = newParams
      let config = {
        
      }
      let response = {}
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        response = await jrAxios[api.method](serviceHost + apiUrl, data, config)
        if (!isNeedStatus) {
          response = response.data
        }
      } else {
        config.params = newParams
        response = (await jrAxios[api.method](serviceHost + apiUrl, config))
        if (!isNeedStatus) {
          response = response.data
        }
      }
      return response
    }
  }
}

export default Http
