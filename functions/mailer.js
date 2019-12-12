const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "eclesiomelo.1@gmail.com",
      pass: "Seara23junior"
    }
  })
);
