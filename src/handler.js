const { get } = require('./dynamodb')

const offline = process.env.STAGE === 'offline'

const routeCache = {}

module.exports.url = async (event) => {
  const path = event.path.replace(/^\//, '')

  let { to = path, expires = 7 * 24 * 60 ** 2 } =
    (path &&
      (routeCache[path] ||
        (routeCache[path] = await get(path.replace(/\/$/, ''))))) ||
    {}

  if (!/^https?\:\/\//.test(to))
    to = `${process.env.REDIRECT_TO}/${to.replace(/^\//, '')}`

  console.log(`redirect ${path} to ${to}`)

  return {
    statusCode: offline ? 302 : 301,
    headers: {
      'Cache-Control': `max-age=${expires}`,
      Location: to,
    },
  }
}
