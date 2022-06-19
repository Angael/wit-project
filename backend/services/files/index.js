const { areAllProvided } = require('../../utils/areAllProvided');
const multerUploadMiddleware = require('../../middleware/multerMiddleware');
const authUser = require('../../middleware/authUser');

const routes = [
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
