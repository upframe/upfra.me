const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function scan(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

function get(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}

function createItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

function updateItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

function deleteItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

exports.scan = scan;
exports.get = get;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.dynamoDb = dynamoDb;