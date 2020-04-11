'use strict';
const redirectUrl = 'https://upframe.io/';

module.exports.shortener = async function(event, context, callback) {
  const longurl = (event.pathParameters) ? redirectUrl+event.pathParameters.pathname : redirectUrl;
  const response = {
    statusCode: 301,
    headers: {
      Location: longurl,
    },
  };
  callback(null, response);
}


