const User = require("../models/userModel");
const {AppError} = require("../common/errors/AppError");
exports.verifyAdmin = (req,res,next) =>{
    try {
        if(req.user.role !== 'admin')
            next(new AppError(401, "Unauthorized"));
    } catch(error) {
        throw new AppError(500, error.message);
    }
}   