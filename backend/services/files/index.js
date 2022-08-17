import { areAllProvided } from '../../utils/areAllProvided.js';
import multerUploadMiddleware from '../../middleware/multerMiddleware.js';
import authUser from '../../middleware/authUser.js';
import listUserFiles from './listUserFiles.js';
import uploadFile from './uploadFile.js';
import deleteFile from './deleteFile.js';

const logReq = req => {
    console.log('user is');
    console.log(req.user);

    console.log('file is');
    console.log(req.file);
};

const routes = [
    {
        path: '/api/list',
        method: 'get',
        middleware: [authUser],
        handler: async (req, res) => {
            if (!areAllProvided(req.user?.uid)) {
                res.status(400).send();
                return;
            }

            const files = await listUserFiles(req.user.uid);

            const trimmedFiles = files.map(f => ({
                filename: f.filename,
                id: f.id,
            }));

            res.json(trimmedFiles);
        },
    },
    {
        path: '/api/upload',
        method: 'post',
        middleware: [authUser, multerUploadMiddleware.single('file')],
        handler: async (req, res) => {
            if (!areAllProvided(req.user?.uid, req.file)) {
                res.status(400).send();
                return;
            }

            const newItem = await uploadFile(req.file, req.user.uid);
            console.log({ newItem });
            res.status(204).send();
        },
    },
    {
        path: '/api/item/:id',
        method: 'delete',
        middleware: [authUser],
        handler: async (req, res) => {
            if (!areAllProvided(req.user?.uid, req.params.id)) {
                res.status(400).send();
                return;
            }

            try {
                await deleteFile(req.params.id, req.user?.uid);
                res.status(204).send();
            } catch (e) {
                res.status(500).send();
            }
        },
    },
];

export default routes;
