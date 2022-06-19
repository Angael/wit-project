import nextConnect from 'next-connect';
const CosmosClient = require('@azure/cosmos').CosmosClient;
import { nanoid } from 'nanoid';
import multer from 'multer';
import fs from 'fs';

import { dbConfig } from '../../api-utils/db';
import { authMiddleware } from '../../api-utils/authMiddleware';

// const storage = multer.diskStorage({
//     destination: './',
//     filename: (req, file, cb) => {
//         console.log('filename callback', file);
//         cb(null, file.originalname);
//     },
// });

const storage = multer.memoryStorage();

const upload = multer({
    storage,
});
// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single('filee');

const postHandler = async (req, res) => {
    uploadMiddleware(req, res, () => {
        console.log('middleware finished', req.filee);
    });
    // // const filenames = fs.readdirSync('./');
    // // console.log({ filenames });
    // // const user = await authMiddleware(req, res);
    // const user = { uid: 'lol' };
    //
    // const accountUid = user.uid;
    // console.log('333');
    // console.log('test for any files:');
    // console.log(req.file);
    // console.log(req.files);
    // console.log(req.filee);
    // console.log(req.body);
    //
    // const file = req.file;
    // const filename = req.file?.filename ?? 'not present';
    // console.log({ file });
    //
    // try {
    //     // const { endpoint, key, databaseId, containerId } = dbConfig;
    //     //
    //     // const client = new CosmosClient({ endpoint, key });
    //     //
    //     // const database = client.database(databaseId);
    //     // const container = database.container(containerId);
    //
    //     const newItem = {
    //         test: true,
    //         id: nanoid(),
    //         filename,
    //         accountUid,
    //     };
    //
    //     // const { resource: createdItem } = await container.items.create(
    //     //     newItem
    //     // );
    //     // console.log(
    //     //     `\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`
    //     // );
    //     // res.status(200).json({ createdItem });
    //
    //     res.status(200).json({});
    // } catch (e) {
    //     console.log(e);
    //     res.status(500).send('error');
    // }
};

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log({ error });
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
})
    .use(uploadMiddleware)
    .post(postHandler);

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '5mb', // Set desired value here
//         },
//     },
// };

export default postHandler;
