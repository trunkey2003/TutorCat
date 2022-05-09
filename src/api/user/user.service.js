const { AppError } = require('../../common/errors/AppError');
const User = require('../../models/userModel');
module.exports = {
    getInfo: async (user) => {
        try {
            return {
                statusCode: 200,
                message: 'Successfully get info',
                info: user,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};
