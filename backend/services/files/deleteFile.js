import cosmosDBConfig from '../../config/cosmosDB.js';
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from '@azure/storage-blob';

const deleteBlob = async fileId => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
        process.env.STORAGE_CONTAINER
    );

    try {
        await containerClient.deleteBlob(fileId);
    } catch (e) {}
};

const deleteFile = async (fileId, uid) => {
    try {
        const { endpoint, key, databaseId, containerId } = cosmosDBConfig;

        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        await deleteBlob(fileId);
        await container.item(fileId, uid).delete();
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export default deleteFile;
