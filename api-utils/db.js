const dbConfig = {
    endpoint: process.env.DB_ENDPOINT,
    key: process.env.DB_KEY,
    databaseId: 'Tasks',
    containerId: 'Items',
    partitionKey: { kind: 'Hash', paths: ['/category'] },
};

// no ES export because this file is manually
module.exports = {
    dbConfig,
};
