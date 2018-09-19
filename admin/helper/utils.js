/**
 * 辅助函数
 * @author wangyipeng
 */
export default {
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
  /**
   * 获取dpi值
   */
  calcDpi () {
    let dppx = window.devicePixelRatio || (window.matchMedia && window.matchMedia('(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)').matches ? 2 : 1) ||
    1
    // 获取屏幕尺寸
    let winW = window.innerWidth
    let winH = window.innerHeight
    let pyth = (winW * winW) + (winH * winH)
    let diag = Math.round(Math.sqrt(pyth) / 72 * 10) / 10

    let width = screen.width * dppx
    let height = screen.height * dppx
    let dpi = Math.sqrt(width * width + height * height) / diag
    return dpi > 0 ? Math.round(dpi) : 0
  }
}
