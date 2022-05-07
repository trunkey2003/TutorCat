const promisify = require('util').promisify;
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './upload/');
//     },
//     filename: (req, file, cb) => {
//         const filename =
//             Date.now() +
//             '-' +
//             Math.round(Math.random() + 1e9) +
//             '-' +
//             file.originalname.toLowerCase().split(' ').join('_');
//         cb(null, filename);
//     },
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'upload',
            format: 'jpg',
            public_id:
                Date.now() +
                '-' +
                Math.round(Math.random() + 1e9) +
                '-' +
                file.originalname
                    .toLowerCase()
                    .split(' ')
                    .join('_')
                    .replace(/\.jpeg|\.jpg|\.png/gi, ''),
        };
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .png, .jpg and .jpeg format allowed!');
        err.name = 'ExtensionError';
        return cb(err);
    }
};

var uploadFiles = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: fileFilter,
}).single('photo');
var uploadFilesMiddleware = promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
