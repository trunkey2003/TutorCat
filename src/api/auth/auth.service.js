const User = require('../../models/userModel');
const createError = require('../../common/errors/AppError')
const bcrypt = require('bcrypt');
const  db  = require('../../models/userModel');
const sendEmail = require('../../common/email/email');
const resetToken = require('../../models/resetToken');

const updateRefreshToken = async (userId, refreshToken) => {
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { refreshToken: refreshToken } },
            {
                new: true,
            }
        );
    } catch (error) {
        throw new createError(error);
    }
};

module.exports = {
    signUp: async (body) => {
        const {name, email , password} = body;
        try{
            const identical = await User.findOne({email});
            if(identical){
                throw new createError(400, 'User already existed');
            }
            const salt = await bcrypt.genSalt(10);  
            const hashPassword = await bcrypt.hash(password, salt);
            const DB = await User.create({
                name,
                email,
                role,
                password: hashPassword
            });
            const accessToken = jwt.sign(
                {
                    userId: db._id,
                    email: db.email,
                    role: db.role

                },process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '2h'
                }
            );
            const refreshToken = jwt.sign({
                userId: db._id,
                email: db.email,
                role: db.role
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
                    refreshToken
                }
            }
        } catch (error){
            throw new createError (500, error.message);
        }
    },
    signIn: async ({email, password:Password})=>{
        try{
            const filter = await filter.find({email: email});
            if(filter.length){
                if(await bcrypt.compare(Password, filter[0].password)){
                    const accessToken = jwt.sign(
                        {
                            userId: filter[0]._id,
                            email: filter[0].email,
                            role: filter[0].role,
                        },process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn: '2h'
                        }
                    );
                    const refreshToken = jwt.sign({
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
                    throw new createError(404, 'Wrong password');
                }
            }else{
                throw new createError(401, "User doesn't exist");
            }
        }catch(error){
            throw new createError (500, error.message);
        }
    },
    forgetPassword: async (email) => {
        try{
            await sendEmail(email,uuidv4());
        }catch (error){
            throw new createError(error.message);
        }
    },
    resetPassword: async ({userID,resetToken,newPassword}) => {
        const validToken = await resetToken.findOne({userID,resetToken});
        if(!validToken){
            throw new createError(400, 'Invalid token');
        }
        const salt = await bcrypt.genSalt(10);  
        const hashPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate({_id: userID},{password: hashPassword}, {new: true });
    }
}