# upfra.me

🕳️ Our awesome url shortener

## How it works

When visiting [upfra.me](https://upfra.me) the Lambda function responds with an
`HTTP 301` permanent redirect to [upframe.io](https://upframe.io), appending any
path that the user requested.

By default the response includes a `Cache-Control: max-age=604800` header to make
the browser check again for a new redirect location after one week.

Custom redirects are loaded from a DynamoDB database. These exceptions can include
a location to redirect to and override the default expiration time. If the
redirection url starts with `https://` or `http://` it is treated as a complete
url, otherwise it is appended as a path to `https://upframe.io`. The DynamoDB lookup
for any given path is cached for the lifetime of the Lambda function.
