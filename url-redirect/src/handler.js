'use strict';
const AWS = require('aws-sdk');
const redirectUrl = 'https://upframe.io/';
const tableName = process.env.PATH_TABLE;
const db = new AWS.DynamoDB.DocumentClient();

module.exports.shortener = async function(event, context, callback) {
  const longurl = (event.pathParameters) ? await getLongUrl(event.pathParameters) : redirectUrl;
  const response = {
      statusCode: 301,
      headers: {
        'Content-Type': 'application/json',
        'Location': longurl
      },
  };
  
  callback(null, response);
};

async function getLongUrl(path) {
  const params = {
    TableName: tableName,
    Key: {
      shortPath: path
    }
  };

  let url = '';
  await db.get(params).promise().then(data => url = 'https://' + data.Item.link).catch(err => url = redirectUrl + path);
  console.log(url);
  return url;

// let uri = await db.get(params).promise();
// if(uri) {
//   console.log(uri);
//   let longurl = uri.Item.link;
//   return "https://" + longurl;
// } else {
//   let longurl = redirectUrl + path;
//   return longurl;
// }
//  return new Promise((resolve, reject) =>
//    db.get(params).promise()
//      .then(data => resolve("https://" + String(data.Item.link).toString()))
//      .catch(err => resolve(redirectUrl + path)),
//  );
} 
