import cosmosDBConfig from '../../config/cosmosDB.js';
import { nanoid } from 'nanoid';
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from '@azure/storage-blob';

const uploadBlob = async (file, filename) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
        process.env.STORAGE_CONTAINER
    );

    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const response = await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
            blobContentType: file.mimetype,
        },
    });
    if (response._response.status !== 201) {
        throw new Error(
            `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
        );
    }
};

const uploadFile = async (file, uid) => {
    try {
        const { endpoint, key, databaseId, containerId } = cosmosDBConfig;

        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        const newItem = {
            test: true,
            id: nanoid(),
            filename: file.originalname,
            accountUid: uid,
            size: file.size,
            mimetype: file.mimetype,
        };
        await uploadBlob(file, newItem.id);

        const { resource: createdItem } = await container.items.create(newItem);

        return createdItem;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export default uploadFile;
