const nodeMailer = require('nodemailer')

const sendEmail =async options=>{

const transport = {
    host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
}


const transporter = nodeMailer.createTransport(transport)
const message={
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Use `SMTP_FROM_EMAIL`
    to:options.email,
    subject: options.subject,
    text:options.message
}
try {
    await transporter.sendMail(message);
    console.log("Email sent successfully");
} catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email could not be sent");
}
await transporter.sendMail(message)

}
module.exports=sendEmail