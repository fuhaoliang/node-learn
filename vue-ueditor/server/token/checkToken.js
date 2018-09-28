const jwt = require('jsonwebtoken')

const checktoken = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.status = 401;
    ctx.message = 'no token detected in http headerAuthorization'
    return ctx
  }
  const token = authorization.split(' ')[1];
  let tokenContent;
  try {
    tokenContent = await jwt.verify(token, 'fuhaoliang')
  } catch (err) {
    ctx.status = 403;
    ctx.message = 'nvalid token'
    return ctx
  }
}

module.exports = checktoken