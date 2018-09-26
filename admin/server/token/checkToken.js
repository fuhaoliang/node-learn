const jwt = require('jsonwebtoken')

const checktoken = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }
  const token = authorization.split(' ')[1];
  let tokenContent;
  try {
    tokenContent = await jwt.verify(token, 'fuhaoliang')
  } catch (err) {
    ctx.throw(401, 'invalid token');
  }
  await next()
}

module.exports = checktoken