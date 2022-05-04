const cloudinary = require('cloudinary');
const { AppError } = require('../errors/AppError');
module.exports = async (paths) => {
    try {
        return await paths.map(async (item) => {
            return await cloudinary.v2.uploader.upload(item.path, {
                public_id: item.filename,
            }).secure_url;
        });
    } catch (error) {
        throw new AppError(500, error.message);
    }
};
