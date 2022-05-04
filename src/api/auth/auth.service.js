const User = require('../../models/userModel');
const {AppError} = require('../../common/errors/AppError')
const bcrypt = require('bcrypt');
const  db  = require('../../models/userModel');
const sendEmail = require('../../common/email/email');
// const resetToken = require('../../models/resetToken');
const { create } = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuidv4');


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
            await User.create({
                name: name,
                email: email,
                password: hashPassword
            }); 
            return {
                statusCode: 200,
                message: 'Account created successfully',
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
                    let token = jwt.sign(
                        {
                            userId: filter[0]._id,
                        },process.env.JWT_SECRET_KEY,{
                            expiresIn: '30d'
                        }
                    );
                    return {
                        statusCode: 200,
                        message: "Succesfully logged in",
                        token: token,
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
    forgetPassword: async ({email}) => {
        try{
            let valid = await User.findOne({email: email});
            if(!valid){
                throw new AppError(404,"User not found");
            }
            await sendEmail(email,uuidv4);
            return{
                statusCode:200,
                message: "Mail sent successfully"
            }
            
        }catch (error){
            throw new AppError(500,error.message);
        }
    },
    resetPassword: async ({userID,resetToken,newPassword}) => {
        let validToken = await User.findOne({passwordResetToken: resetToken});
        if(!validToken){
            throw new AppError(400,'Invalid token');
        }
        let salt = await bcrypt.genSalt(10);  
        let hashPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate({_id: userID},{password: hashPassword,passwordChangedAt: Date.now()}, {new: true });
    },signOut: async () => {
        
    },
    updatePassword: async (userID, {oldPassword, newPassword}) => { 
        try{
            let user = User.findById(userID);
            if (!(await bcrypt.compare(oldPassword,user.password))){
                throw new AppError(401, "Wrong old password");
            }
            let salt = await bcrypt.genSalt(10);  
            let hashPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashPassword;
            user.passwordChangedAt = Date.now();
            await user.save();
            let token = jwt.sign(
                {
                    userId: userID,
                },process.env.JWT_SECRET_KEY,{
                    expiresIn: '30d'
                }
            );
            return {
                statusCode: 200,
                message: "Successfully changed password",
                token: token
            }
        }catch(error){
            throw new AppError(500, error.message);
        }
    },
    signOut: async (userID) => {
        try {
            let token = jwt.sign({userId: userID,},process.env.JWT_SECRET_KEY,{expiresIn: '0h'});
            return {
                statusCode: 200,
                message: "Successfully signed-out",
                token: token
            }
        } catch (error) {
            throw new AppError(500, error.message);
        }
    }
}