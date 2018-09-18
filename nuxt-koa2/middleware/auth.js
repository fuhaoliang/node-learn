export default function (context) {
  console.info('================>111')
  console.info(context.query)
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
  // context.redirect(`${context.route.path}?a=1`)
  context.query = { b: 2 }
  console.info(context.query)
}
