const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function get(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => resolve(null)),
  );
}

exports.get = get;
