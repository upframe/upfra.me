const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient(
  process.env.STAGE === 'offline'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      }
    : undefined
)

module.exports.get = async (path) =>
  await ddb
    .get({ TableName: 'redirects', Key: { path } })
    .promise()
    .then(({ Item }) => Item)
