const db = require('./custompath');

module.exports = {
    Query: {
        customPath: () => db.getCustomPaths(),
        customPath: (_, args) => db.getCustomPath(args.shortPath),
    },
    Mutation: {
        createCustomPath: (_, args) => db.createCustomPath(args),
        updateCustomPath: (_, args) => db.updateCustomPath(args),
        deleteCustomPath: (_, args) => db.deleteCustomPath(args),
    },
};