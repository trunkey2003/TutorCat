const User = require("../models/userModel");
const {AppError} = require("../common/errors/AppError");
exports.verifyAdmin = (req,res,next) =>{
    const valid = User.findOne({email: email});
    if(valid.role === 'admin'){
        return next();
    }
    throw new AppError(401, "Unauthorized");
}   