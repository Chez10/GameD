const nodemailer = require('nodemailer');

const emailSend = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    });

    const message ={
        from:`${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_Email}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }


    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    await transporter.sendMail(message);

}
module.exports = emailSend;