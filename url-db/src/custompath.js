const db = require('./dynamo');

const TableName = 'CustomPath';

function getCustomPaths() {
    const params = {
        TableName,
        AttributesToGet: [
            'shortPath',
            'link'
        ],
    };
    return db.scan(params);
};

function getCustomPath(shortPath) {
    const params = {
        TableName,
        Key: {
            shortPath,
        },
    };
    return db.get(params);
}

function createCustomPath(args) {
    const params = {
        TableName,
        Item: {
            shortPath: args.shortPath,
            link: args.link,
        },
    };
    return db.createItem(params);
}

function updateCustomPath(args) {
    const params = {
        TableName: TableName,
        Key: {
            shortPath: args.shortPath
        },
        UpdateExpression: 'set link = :link',
        ExpressionAttributeValues:  {
            ':link': args.link,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    return db.updateItem(params, args)
}

function deleteCustomPath(args) {
    const params = {
        TableName,
        Key: {
            shortPath: args.shortPath,
        },
    };
    return db.deleteItem(params, args);
}

exports.getCustomPaths = getCustomPaths;
exports.getCustomPath = getCustomPath;
exports.createCustomPath = createCustomPath;
exports.updateCustomPath = updateCustomPath;
exports.deleteCustomPath = deleteCustomPath;