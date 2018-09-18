import services from '../helper/services'
import axios from 'axios'
import utils from './utils'

const https = require('https')

/**
 * 构造接口请求方法
 * @author wangyipeng
 */
const Agent = new https.Agent({
  rejectUnauthorized: false
})

let jrAxios = axios.create({
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
    Http[i][ind] = async function (params, isNeedStatus = false, headers = {platform: 'admin'}, withCredentials = true) {
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
        headers: headers,
        withCredentials: withCredentials
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
