const User = require('../db')

// 根据用户名查找用户
const findUser = (userName) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userName }, (err, doc) => {
      if(err) reject(err)
      resolve(doc)
    })
  })
}

// 找所用用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if(err) reject(err)
      resolve(doc)
    })
  })
}

// 注册
const reg = async (ctx) => {
  let user = new User({
    userName: ctx.request.body.userName,
    password: ctx.request.body.password,
    age: ctx.request.body.age,
    create_time: ctx.request.body.create_time,
    token: '1234567'
  })

  let isExist = await findUser(user.userName)
  if(!isExist){
    await new Promise((resolve, reject) => {
      user.save((err, doc) => {
        if(err) reject(err)
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
}

// 登陆
const login = async (ctx) => {
  let userName = ctx.request.body.userName
  let password = ctx.request.body.password
  let doc = await findUser(userName)
  if (doc) {
    if (doc.password === password) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        code: -1,
        msg: '登陆成功'
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
  login,
  reg,
  findUser,
  findAllUsers
}