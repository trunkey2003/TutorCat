const promisify = require('util').promisify;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        const filename =
            Date.now() +
            '-' +
            Math.round(Math.random() + 1e9) +
            '-' +
            file.originalname.toLowerCase().split(' ').join('_');
        cb(null, filename);
    },
});

var uploadFiles = multer({ storage: storage }).array('photos', 10);
var uploadFilesMiddleware = promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
