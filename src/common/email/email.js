const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//     // 1) Create a transporter
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//         // Activate in email "less secure app" option
//     });

//     // 2) Define the email options
//     const mailOptions = {
//         from: 'LongChau <longchau32@gmail.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         // html
//     };

//     // 3) Actually send the email
//     await transporter.sendMail(mailOptions);
// };

async function sendEmail(options) {
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
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
