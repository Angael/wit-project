import cosmosDBConfig from '../../config/cosmosDB.js';
import { CosmosClient } from '@azure/cosmos';

const listUserFiles = async uid => {
    try {
        const { endpoint, key, databaseId, containerId } = cosmosDBConfig;

        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        // query to return all items
        const querySpec = {
            query: `SELECT * from c WHERE c.accountUid = @uid AND c.test = @test`,
            parameters: [
                { name: '@uid', value: uid },
                { name: '@test', value: true },
            ],
        };

        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        return items;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export default listUserFiles;
