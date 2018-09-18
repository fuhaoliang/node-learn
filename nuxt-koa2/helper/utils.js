/**
 * 辅助函数
 * @author wangyipeng
 */
module.exports = {
  isFunction (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]'
  },
  /**
   *@param {Object}|{Array} object 需要遍历处理的对象或数组
   *@param {Function} callback 遍历处理回调函数
   *@param {Array} args callback回调函数的附加参数
   */
  each (object, callback, args) {
    let name
    let i = 0
    let length = object.length
    let isObj = length === undefined || this.isFunction(object)
    if (args) {
      if (isObj) {
        for (name in object) {
          if (callback.apply(object[name], args) === false) {
            break
          }
        }
      } else {
        for (; i < length;) {
          if (callback.apply(object[i++], args) === false) {
            break
          }
        }
      }
    } else {
      if (isObj) {
        for (name in object) {
          if (callback.call(object[name], name, object[name]) === false) {
            break
          }
        }
      } else {
        for (let value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
        }
      }
    }
    return object
  },
  date2String (date) {
    let year = date.getFullYear()
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let day = (date.getDate() + 1) < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)
    return year + '-' + month + '-' + day
  },
  setCookie (name, value, days) {
    // console.log('name:' + name + ' value:' + value)
    let Days = days || 1
    let exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + ' = ' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=/;domain=.homestyler.com'
    if (location.host.indexOf('shejijia.com') > -1) {
      document.cookie = name + ' = ' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=/;domain=.shejijia.com'
    }
    if (location.host.indexOf('homestyler.com') > -1) {
      document.cookie = name + ' = ' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=/;domain=.homestyler.com'
    }
  },
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  },
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + ' = ' + encodeURIComponent(cval) + ';expires=' + exp.toGMTString() + ';path=/;domain=.homestyler.com'
      if (location.host.indexOf('shejijia.com') > -1) {
        document.cookie = name + ' = ' + encodeURIComponent(cval) + ';expires=' + exp.toGMTString() + ';path=/;domain=.shejijia.com'
      }
      if (location.host.indexOf('homestyler.com') > -1) {
        document.cookie = name + ' = ' + encodeURIComponent(cval) + ';expires=' + exp.toGMTString() + ';path=/;domain=.homestyler.com'
      }
    }
  },
  isLogin () {
    let SJJTOKEN = 'has_login'
    let val = this.getCookie(SJJTOKEN)
    console.log('has_login:' + val)
    if (val) {
      return true
    } else {
      return false
    }
  },
  // 验证手机号
  validatePhone (phone) {
    let reg = /^1[3|4|5|8|7][0-9]\d{8}$/
    return reg.test(phone)
  },
  // 短信码
  validateSNSCode (code) {
    let reg = /[0-9]{4,6}/
    return reg.test(code)
  },
  // 邮箱验证
  validateEmail (email) {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return reg.test(email)
  }
}
