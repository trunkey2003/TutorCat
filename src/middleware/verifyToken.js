const jwt = require('jsonwebtoken');
const { AppError } = require('../common/errors/AppError');
const User = require('../models/userModel');
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            next(new AppError(401, 'Token is not valid'));
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodeToken);
        let user = await User.findById(decodeToken.userId);
        if (!user) {
            next(new AppError(403, "This token doesn't belong to this user"));
        }
        if (user.changedPasswordAfter(decodeToken.iat)) {
            next(new AppError(403, 'Password changed'));
        }
        req.user = user;
        next();
    } catch (error) {
        next(new AppError(500, error.message));
    }
};
