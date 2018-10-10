/**
 * Created by wangyipeng on 2017/9/27.
 */
const router = require('koa-router')()
const User = require('../db')
const userTools = require('../tools/user')
const checkToken = require('../token/checkToken')
const multer = require('koa-multer')
const bodyParser = require('koa-bodyparser')
//上传头像
let storage = multer.diskStorage({
  //文件保存路径
  destination: (ctx, file, cd) => {
    cd(null, __dirname + '../../uploads/userAvatars')
  },
  //给上传文件重命名，获取添加后缀名
  filename: (ctx, file, cb) => {
    let username = ctx.username
    let fileFormat = (file.originalname).split(".");
    let fileName =  username + "." + fileFormat[fileFormat.length - 1]
    let fileUrl = __dirname + '../../uploads/userAvatars/' + fileName
    console.info('fileUrl', fileUrl);
    cb(null, fileName);
  }
})

// function fileFilter (req, file, cb) {
//   // 这个函数应该调用 `cb` 用boolean值来
//   // 指示是否应接受该文件

//   // 拒绝这个文件，使用`false`，像这样:
//   //cb(null, false)

//   // 接受这个文件，使用`true`，像这样:
//   //cb(null, true)
//   // 如果有问题，你可以总是这样发送一个错误:
//   cb(new Error('I don\'t have a clue!'))
// }

// let uploadAvatars = multer({ storage }).single('file')


//上传头像
router.post('/upload', userTools.uploadAvatars, async (ctx, next) => {
  console.info('files', ctx.req)
  ctx.status = 200;
  ctx.body = {
    success: true,
    code: -1,
    data: '666'
  }
})

let fileFilteCtx = {}

let fileFilter = async (ctx, file, cb) => {
  console.info('file!!!!!!!!!!!',file);
  fileFilteCtx =  await userTools.reg(ctx, file)
  if (fileFilteCtx.body.success) {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
}

// 注册
router.post('/register', multer({ storage, fileFilter}).single('file'), async function (ctx, next) {
  // console.info('ctx.status--->', typeof fileFilteCtx == 'object');
  console.info('fileFilteCtx!!!!', fileFilteCtx);

  try {
    if (JSON.stringify(fileFilteCtx) === "{}") {
      console.info('111111');
      let x = await userTools.reg(ctx)
      ctx.status = x.status
      ctx.body = x.body
    }
  } catch (err) {
    console.info('222222');
    ctx.status = fileFilteCtx.status
    ctx.body = fileFilteCtx.body
  }

  
})

// 登陆
router.post('/login', async function (ctx, next) {
  await userTools.login(ctx)
})

//获取用户
router.get('/users', async function (ctx, next) {
  let data = await userTools.findAllUsers()
  ctx.status = 200;
  ctx.body = {
    success: true,
    code: -1,
    data: data
  };
})
//删除用户
router.post('/delUser', async function (ctx, next) {
  let ctxData = await checkToken(ctx, next)
  if (ctxData.status !== 200) return ctx = ctxData
  let id = ctx.request.body.id
  let doc = await userTools.delUser(id)
  console.info(doc)
  ctx.status = 200;
  ctx.body = {
    success: true,
    code: -1,
    msg:'删除'+ doc.userName
  };
})
module.exports = router
