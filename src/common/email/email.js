const nodemailer = require('nodemailer');
const User = require("../../models/userModel");
const {AppError} = require('../../common/errors/AppError');
const resetTokenM = require('../../models/resetToken');
async function sendEmail(Email, resetToken) {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                type: 'OAUTH2',
                user: process.env.EMAIL_USERNAME,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                accessToken: process.env.ACCESS_TOKEN,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });
        const mailOptions = {
            from: `"Reset Password" <lequockhanhkt03@gmail.com>`,
            to: Email,
            subject: "Reset password",
            text: `Click here to reset your password ..../${resetToken}`,
        };
        await transporter.sendMail(mailOptions);
        console.log("a");
        let user = await User.findOne({email: Email});
        if(user == 0){
            throw new AppError(404, "User doesn't exist");
        }
        let Token = await new resetTokenM({userId:user._id,resetToken:resetToken});
        await Token.save();
        return {
            statusCode: 200,
            message: "Send successfully",
        }
    }catch(error){
        throw new AppError(error.message);
    }
}

module.exports = sendEmail;
