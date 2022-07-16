const cosmosDBConfig = require('../../config/cosmosDB');
// Tutaj jest problem bo nanoid używa ESM
const { nanoid } = require('nanoid');
const CosmosClient = require('@azure/cosmos').CosmosClient;
// TODO write to blob storage

const uploadFile = async (file, uid) => {
    try {
        const { endpoint, key, databaseId, containerId } = cosmosDBConfig;

        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        const newItem = {
            test: true,
            id: nanoid(),
            filename: file,
            accountUid: uid,
        };

        // const { resource: createdItem } = await container.items.create(
        //     newItem
        // );

        return newItem;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

module.exports = uploadFile;
