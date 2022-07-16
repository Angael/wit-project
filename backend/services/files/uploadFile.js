import cosmosDBConfig from '../../config/cosmosDB';
import { nanoid } from 'nanoid';
import { CosmosClient } from '@azure/cosmos';
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

export default uploadFile;
