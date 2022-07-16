import multer from 'multer';

const storage = multer.memoryStorage();

const multerUploadMiddleware = multer({
    storage,
    limits: 1024 * 1024 * 2, // 2 MB
});

export default multerUploadMiddleware;
