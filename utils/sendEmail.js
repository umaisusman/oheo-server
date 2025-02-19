const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aneeqgulzaronline@gmail.com",  // Your Gmail
      pass: "jnvoftcjldsylaiy",  // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: "aneeqgulzarofficial@gmail.com",
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
