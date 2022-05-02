const jwt = require('jsonwebtoken');
const {AppError} = require('../common/errors/AppError');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodeToken;
        next();
    } catch (error) {
        next(new AppError(403, error.message));
    }
};
