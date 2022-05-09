const userService = require('./user.service');
module.exports = {
    getInfo: async (req, res, next) => {
        try {
            const DTO = await userService.getInfo(req.user);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
