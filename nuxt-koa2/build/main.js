require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by wangyipeng on 2017/9/27.
 */
var router = __webpack_require__(0)();
router.get('/reporter', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var logger;
    return __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger = ctx.Log4js.getLogger('reporter');

            logger.error(ctx.query.err);
            ctx.body = { result: 'ok' };

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = router;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

/**
 * Created by wangyipeng on 2017/9/27.
 */

var User = __webpack_require__(9);
var router = __webpack_require__(0)();
router.post('/login', function (ctx, next) {
  ctx.body = 'ok';
  var msg = ctx.request.body;
  var user = new User(Object.assign({}, msg));
  user.save(function (err, doc) {
    if (err) return console.info('err', err);
    console.info('数据插入成功');
  });
  console.info('ctx', msg);
});

module.exports = router;

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  /*
  **
  */
  router: {
    middleware: 'auth'
  },
  build: {
    /*
     ** Run ESLINT on save
     */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },

    vendor: ['axios']
  },
  env: {
    PATH_TYPE: process.env.PATH_TYPE
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * Created by wangyipeng on 2017/9/26.
 */
var router = __webpack_require__(0)();
var path = __webpack_require__(13);
var fs = __webpack_require__(11);

/* harmony default export */ exports["a"] = {
  auto: function auto(app) {
    console.info('autoRoutes--------->');
    var files = fs.readdirSync(path.join(__dirname, 'controllers'));

    var jsFiles = files.filter(function (f) {
      return f.endsWith('.js');
    }, files);

    // 控制器文件
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = jsFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var f = _step.value;

        console.log('import controller from file ' + f + '...');
        var name = f.substring(0, f.length - 3);
        exports[name] = __webpack_require__(10)("./" + f);
        console.info('name', name);
        router.use('/' + name, exports[name].routes(), exports[name].allowedMethods());
        app.use(exports[name].routes(), exports[name].allowedMethods());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 连接数据库
var mongoose = __webpack_require__(12);
mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('Connection Error:' + err);
  } else {
    console.log('Connection success!');
  }
});
var db = mongoose.connection;

// 失败配置
// db.on('error', (err) => {
//   console.info('err--->连接', err)
// })

// db.on('open', () => {
//   console.info('success BD!!!')
// })

// 建表
var Schema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  time: {
    type: Date,
    default: new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
  }
});
// 索引
// Schame.index({time: 1})

// 连接库
var User = mongoose.model('userInfo', Schema);
module.exports = User;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./error": 2,
	"./error.js": 2,
	"./user": 3,
	"./user.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;


/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autoRoutes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_bodyparser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_bodyparser__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var _this = this;

    var app, host, port, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();

            app.use(__WEBPACK_IMPORTED_MODULE_4_koa_bodyparser___default()());
            console.info('process.env', "development");
            host = process.env.HOST || '127.0.0.1';
            port = process.env.PORT || 3000;

            // Import and Set Nuxt.js options

            config = __webpack_require__(4);

            config.dev = !(app.env === 'production');
            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);
            // Build in development

            if (!config.dev) {
              _context2.next = 12;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context2.next = 12;
            return builder.build();

          case 12:

            __WEBPACK_IMPORTED_MODULE_3__autoRoutes__["a" /* default */].auto(app);

            app.use(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0_D_fuhaoliang_node_nuxt_koa2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map