import { areAllProvided } from '../../utils/areAllProvided';
import multerUploadMiddleware from '../../middleware/multerMiddleware';
import authUser from '../../middleware/authUser';
import listUserFiles from './listUserFiles';
import uploadFile from './uploadFile.cjs';

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

            console.log('user is');
            console.log(req.user);

            console.log('file is');
            console.log(req.file);

            const newItem = await uploadFile(req.file, req.user.uid);

            console.log({ newItem });

            res.json(newItem);
            // const filename = req.file.filename;
            // mainUploadImageFn({
            //     buffer: req.file.buffer,
            //     isPrivate,
            //     userId: req.user.uid,
            //     filename,
            // })
            //     .then(result => {
            //         res.json('worked');
            //         // insert rows into DB
            //     })
            //     .catch(err => {
            //         res.status(500).json('didnt work');
            //     });
        },
    },
];

module.exports = routes;
