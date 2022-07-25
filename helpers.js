const { ObjectId } = require("mongoose").Types;
const nodemailer = require("nodemailer");

module.exports = {
  validateStatusCode: (statusCode) =>
    statusCode.length ? parseInt(statusCode[0], 10) : undefined,
  validateObjectId: (id) =>
    ObjectId.isValid(id) && String(new ObjectId(id)) === id,
  sendEmail: ({ to, subject, text, html }) =>
    new Promise((resolve, reject) => {
      const mailer = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.UNICONN_EMAIL_ID,
          pass: process.env.UNICONN_EMAIL_PWD,
        },
      });

      const mailOptions = {
        from: process.env.UNICONN_EMAIL_ID,
        to,
        subject,
        text,
        html,
      };
      mailer.sendMail(mailOptions, (err, email) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`Email sent ${email.response}`);
          resolve({ email });
        }
      });
    }),
};
// let text;
/* 
        if approved = undefined: moderation case 
        else approved or unapproved for their respective cases 
      */
// if (approved === undefined) text = `Your review is under moderation`;
// else if (approved)
//   text = message
//     ? `Your review is approved due to ${message}`
//     : `Your review has been approved`;
// else
//   text = message
//     ? `Your review is unapproved due to ${message}`
//     : `Your review has been unapproved`;
