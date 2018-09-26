import axios from 'axios'
import utils from './utils'
import services from '../helper/services'
import store from '../src/store'
const https = require('https')

const Agent = new https.Agent({
  rejectUnauthorized: false
})

const jrAxios = axios.create({
  timeout: 8000,
  httpsAgent: Agent,
  validateStatus (status) {
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
// request拦截器
jrAxios.interceptors.request.use(
  // 存在token 添加token
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    } else {

    }
    return config
  }
)

// respone拦截器
jrAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
       case 401:
        router.replace({ //跳转到登录页面
         path: '/login',
         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    return Promise.reject(error.response)
  }
)

const Http = {}

for (const i in services) {
  const service = services[i]
  const serviceHost = service.host
  Http[i] = {}
  for (const ind in service) {
    if (ind === 'host') {
      continue
    }
    const api = service[ind]
    Http[i][ind] = async function (params, isNeedStatus = false) {
      let apiUrl = api.url
      const newParams = {}
      if (params) {
        utils.each(params, (ind, param) => {
          if (apiUrl.indexOf(`{${ind}}`) > -1) {
            apiUrl = apiUrl.replace(`{${ind}}`, param)
          } else {
            newParams[ind] = param
          }
        })
      }
      const data = newParams
      const config = {}
      let response = {}

      console.info('serviceHost + apiUrl', serviceHost, apiUrl)
      if (
        api.method === 'put' ||
        api.method === 'post' ||
        api.method === 'patch'
      ) {
        response = await jrAxios[api.method](
          serviceHost + apiUrl,
          data,
          config
        )
        if (!isNeedStatus) {
          response = response.data
        }
      } else {
        config.params = newParams
        response = await jrAxios[api.method](serviceHost + apiUrl, config)
        if (!isNeedStatus) {
          response = response.data
        }
      }
      return response
    }
  }
}

export default Http
