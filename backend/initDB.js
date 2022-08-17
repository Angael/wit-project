import { CosmosClient } from '@azure/cosmos';
import cosmosDBConfig from './config/cosmosDB.js';
import { BlobServiceClient } from '@azure/storage-blob';

/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
    const partitionKey = cosmosDBConfig.partitionKey;

    // Create the database if it does not exist
    const { database } = await client.databases.createIfNotExists({
        id: databaseId,
    });
    console.log(`Created database:\n${database.id}\n`);

    // Create the container if it does not exist
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
            { id: containerId, partitionKey },
            { offerThroughput: 400 }
        );
}

// Create a container
const initBlobContainer = async () => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    const containerName = process.env.STORAGE_CONTAINER;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    try {
        await containerClient.createIfNotExists({
            access: 'blob',
        });
    } catch (err) {
        console.log('failed to create container');
        console.error(err);
    }
};

const initDb = async () => {
    const { endpoint, key, databaseId, containerId } = cosmosDBConfig;

    const client = new CosmosClient({ endpoint, key });

    // const database = client.database(databaseId);
    // const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);

    await initBlobContainer();
};

export default initDb;
