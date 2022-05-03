const jwt = require('jsonwebtoken');
const {AppError} = require('../common/errors/AppError');
const User = require('../models/userModel')
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Unauthorized',
            });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(Date.now());
        console.log(decodeToken);
        let user = await User.findById(decodeToken.userId);
        if (user) {
            req.user = user;
        } else {
            next(new AppError(403, "User is not valid"));
        }
        next();
    } catch (error) {
        next(new AppError(403, error.message));
    }
};
