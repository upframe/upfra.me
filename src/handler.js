const offline = process.env.STAGE === 'offline'

module.exports.url = async (event) => {
  const path = event.path.replace(/^\//, '')
  return {
    statusCode: offline ? 302 : 301,
    headers: {
      ...(offline && {
        'Cache-Control': `max-age=${7 * 24 * 60 ** 2}`,
      }),
      Location: `${process.env.REDIRECT_TO.replace(/\/$/, '')}/${path}`,
    },
  }
}
