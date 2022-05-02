const User = require('../../models/userModel');
const {AppError} = require('../../common/errors/AppError')
const bcrypt = require('bcrypt');
const  db  = require('../../models/userModel');
const sendEmail = require('../../common/email/email');
const resetToken = require('../../models/resetToken');
const { create } = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuidv4');

let updateRefreshToken = async (userId, refreshToken) => {
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { refreshToken: refreshToken } },
            {
                new: true,
            }
        );
    } catch (error) {
        throw new AppError(error);
    }
};

module.exports = {
    signUp: async ({name, email , password}) => {
        try{
            let identical = await User.findOne({email});
            console.log(identical);
            if(identical){
                throw new AppError(400, "User already existed"); 
            }
            let salt = await bcrypt.genSalt(10);  
            let hashPassword = await bcrypt.hash(password, salt);
            let DB = await User.create({
                name: name,
                email: email,
                password: hashPassword
            });    
            let accessToken = jwt.sign(
                {
                    userId: DB._id,
                    email: email, 
                },process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '2h'
                }
            );
            let refreshToken = jwt.sign({
                userId: DB._id,
                email: email,
                },process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: '4h'
                }
            );
            await updateRefreshToken(db._id,refreshToken);
            return {
                statusCode: 200,
                message: 'Account created successfully',
                token: {
                    accessToken,
                    refreshToken,
                }
            }
        } catch (error){
            throw new AppError (500, error.message);
        }
    },
    signIn: async ({email, password})=>{
        try{
            let filter = await User.find({email: email}).select('password');
                if(filter.length === 1){
                    if(await bcrypt.compare(password, filter[0].password)){
                    let accessToken = jwt.sign(
                        {
                            userId: filter[0]._id,
                            email: filter[0].email,
                            role: filter[0].role,
                        },process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn: '2h'
                        }
                    );
                    let refreshToken = jwt.sign({
                        userId: filter[0]._id,
                        email: filter[0].email,
                        role: filter[0].role,
                        },process.env.REFRESH_TOKEN_SECRET,{
                            expiresIn: '4h'
                        }
                    );
                await updateRefreshToken(filter[0]._id,refreshToken);
                return {
                    statusCode: 200,
                    message: "Succesfully logged in",
                    token: {
                        accessToken,
                        refreshToken    
                    }
                }
                }else{
                    throw new AppError(404, 'Wrong password');
                }
            }else{
                throw new AppError(401, "User doesn't exist");
            }
        }catch(error){
            throw new AppError (500, error.message);
        }
    },
    forgetPassword: async (email) => {
        try{
            await sendEmail(email,uuidv4);
            return{
                statusCode:200,
                message: "Mail sent successfully"
            }
            
        }catch (error){
            throw new AppError(error.message);
        }
    },
    resetPassword: async ({userID,resetToken,newPassword}) => {
        let validToken = await resetToken.findOne({userID,resetToken});
        if(!validToken){
            throw new AppError(400, 'Invalid token');
        }
        let salt = await bcrypt.genSalt(10);  
        let hashPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate({_id: userID},{password: hashPassword}, {new: true });
    }
}