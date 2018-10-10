import axios from 'axios'
import utils from './utils'
import services from '../helper/services'
import store from '../src/store'
import router from '../src/router'
import { Message } from 'element-ui'
const https = require('https')

const Agent = new https.Agent({
  rejectUnauthorized: false
})

const jrAxios = axios.create({
  timeout: 8000,
  httpsAgent: Agent,
  // validateStatus (status) {
  //   switch (status) {
  //     case 500:
  //       break
  //     case 404:
  //       break
  //     default:
  //   }
  //   return status >= 200 && status < 404
  // }
})
// request拦截器
jrAxios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    } else {

    }
    return config
  }
)

let tipMsg = {
  '401': '请重新登录',
  '403': '未授权'
}
// respone拦截器
jrAxios.interceptors.response.use(
  response => {
    console.info('response', response)
    return response
  },
  error => {
    console.info('error-->respone拦截器', error.response)
    if (error.response) {
      switch (error.response.status) {
       case 401:;
       case 403:
        router.replace({ //跳转到登录页面
         path: '/sign',
         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    return Promise.resolve(error.response)
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
    Http[i][ind] = async function (params, headers, isNeedStatus = false) {
      let options = Object.assign({loading: false, show: false, error: true, mock: false, proxy: false}, options)
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
      const config = {
        headers: headers,
      }
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
        let errorObj = {
          data: {
            code: -10001,
            message: 'Error: Network Error'
          }
        }
        if (response) {
          errorObj.data.code = response.status
          errorObj.data.message = response.status + ' ' + (response.statusText ? response.statusText : tipMsg[response.status])
          if (errorObj.data.code === 401) {
            console.log('goto login')
          }
        } else {
          response = {}
        }
        if (response.status === 200 ) {
  
        } else {
          response = errorObj
          console.info('errorObj.data', errorObj.data)
          if (options.error) {
            Message.error(errorObj.data.message)
          }
        }

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
