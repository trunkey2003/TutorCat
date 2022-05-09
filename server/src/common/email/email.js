const nodemailer = require('nodemailer');
const User = require("../../models/userModel");
const {AppError} = require('../../common/errors/AppError');
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
            from: `<lequockhanhkt03@gmail.com>`,
            to: Email,
            subject: "Reset password",
            text: `Click here to reset your password ..../${resetToken}`,
        };
        await transporter.sendMail(mailOptions);
        let Token = await User.findOne({email: Email});
        Token.passwordResetToken =  resetToken;
        return {
            statusCode: 200,
            message: "Send successfully",
        }
    }catch(error){
        throw new AppError(500, error.message);
    }
}

module.exports = sendEmail;
