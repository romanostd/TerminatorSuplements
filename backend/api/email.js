const { error } = require("console");
const nodeMailer = require("nodemailer");
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const user = "terminatorsuplementos@terminatorsuplementos.com";
  const pass = "Ro@19062000";

  const sendEmail = (req, res) => {

    const transporter = nodeMailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        auth: { user, pass },
      });

    transporter.sendMail({
        from : "romanostedile@gmail.com",
        to: "queijoromano@gmail.com",
        replyTo: "romanostedile@gmail.com",
        subject: 'reset password',
        text: "Your confirmation code is" 

    }).then(info => {res.send(info)}).catch(error => {
        res.send(error)
    } )

  };

  

  return { sendEmail };
};
