'use strict';

const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {

     // Generate test SMTP service account from ethereal.email
     // Only needed if you don't have a real mail account for testing
     let account = await nodemailer.createTestAccount();

     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
               user: 'jvectronic@gmail.com',
               pass: '49166752'
          }
     });

     // setup email data with unicode symbols
     let mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "blackencio33@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `Descargame --> <a href="www.google.com">Hello world?</a>` // html body
     };

     // send mail with defined transport object
     let info = await transporter.sendMail(mailOptions)

     console.log("Message sent: %s", info.messageId);
     // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

