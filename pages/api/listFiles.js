import { dbConfig } from '../../api-utils/db';
const CosmosClient = require('@azure/cosmos').CosmosClient;

export default async function handler(req, res) {
    // const authToken = req.get('Authorization');
    // console.log('body', req.body);
    // console.log('query', req.query);
    // console.log('params', req.params);
    // console.log({ req });
    const accountUid = 'mBL7ilHS7sdt7RcNKSSTjxTRKgO2';
    try {
        const { endpoint, key, databaseId, containerId } = dbConfig;

        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        // query to return all items
        const querySpec = {
            query: `SELECT * from c WHERE c.accountUid = @uid AND c.test = @test`,
            parameters: [
                { name: '@uid', value: accountUid },
                { name: '@test', value: true },
            ],
        };

        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        res.status(200).json({ items });
    } catch (e) {
        console.log(e);
        res.status(500).send('error');
    }
}
