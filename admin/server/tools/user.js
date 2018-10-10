const User = require('../db')
const createToken = require('../token/createToken')
const multer = require('koa-multer')
const sha1 = require('sha1')
//上传头像
let storage = multer.diskStorage({
  //文件保存路径
  destination: (req, file, cd) => {
    cd(null, __dirname + '../../uploads/userAvatars')
  },
  //给上传文件重命名，获取添加后缀名
  filename: (req, file, cb) => {
    let fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

let uploadAvatars = multer({ storage }).single('file')
// let cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 8 }, { name:'ajaxPhoto', maxCount: 8}])

// const uploadAvatars = async (ctx, next) => {
//   ctx = await multer({ storage }).single('file')()
//   console.info('ctx=====>', ctx)
//   await new Promise((resolve, reject) => {
//     User.update({userName:'111111'},{$set:{age:222}},(err, doc) => {
//       if(err) reject(err)
//       resolve(doc)
//     })
//   })
//   await next()
// }

// 根据用户名查找用户
const findUser = (userName) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userName }, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}

// 找所用用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
// 删除
const delUser = function (id) {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: id }, (err, doc) => {
      if (err) reject(err);
      console.log('删除用户成功');
      resolve(doc);
    });
  });
}
// 注册
const reg = async (ctx, file) => {
  let userAvatarsUrl = ''
  if (file){
    let fileFormat = (file.originalname).split(".");
    let fileName =  ctx.body.userName + "." + fileFormat[fileFormat.length - 1]
    userAvatarsUrl = __dirname + '../../uploads/userAvatars/' + fileName
  } else {
    ctx = ctx.req
  }
  console.info('userAv atarsUrl', userAvatarsUrl, ctx.body);
  let user = new User({
    userName: ctx.body.userName,
    password: sha1(ctx.body.password),
    age: ctx.body.age,
    create_time: ctx.body.create_time,
    token: createToken(ctx.body.userName),
    userAvatar: userAvatarsUrl
  })

  ctx.username = user.userName
  if (user.userName.length < 6 || user.userName.length > 12) {
    ctx.status = 200;
    ctx.body = {
      success: false,
      code: -1,
      msg: '用户名为6～12位'
    };
    return ctx
  }

  let isExist = await findUser(user.userName)
  if (!isExist) {
    await new Promise((resolve, reject) => {
      user.save((err, doc) => {
        if (err) reject(err)
        resolve(doc)
      })
    })
    ctx.status = 200;
    ctx.body = {
      success: true,
      code: -1,
      msg: '注册成功'
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      success: false,
      code: -1,
      msg: '用户名字已存在'
    };
  }
  return ctx
}

// 登陆
const login = async (ctx) => {
  let userName = ctx.request.body.userName
  let password = sha1(ctx.request.body.password)
  let doc = await findUser(userName)
  if (doc) {
    if (doc.password === password) {
      let token = createToken(password)
      await new Promise((resolve, reject) => {
        doc.save(err => {
          if (err) reject(err)
          resolve()
        })
      })
      ctx.status = 200;
      ctx.body = {
        success: true,
        code: -1,
        msg: '登陆成功',
        token: token
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        success: false,
        code: -1,
        msg: '密码错误'
      }
    }
  } else {
    ctx.status = 200;
    ctx.body = {
      success: false,
      code: -1,
      msg: '用户不存在'
    }
  }
}


module.exports = {
  uploadAvatars,
  delUser,
  login,
  reg,
  findUser,
  findAllUsers
}