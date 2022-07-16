const cosmosDBConfig = {
    endpoint: process.env.DB_ENDPOINT,
    key: process.env.DB_KEY,
    databaseId: 'Files',
    containerId: 'Items',
    partitionKey: { kind: 'Hash', paths: ['/accountUid'] },
};

// no ES export because this file is manually
module.exports = cosmosDBConfig;
