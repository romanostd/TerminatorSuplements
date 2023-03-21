const { error } = require("console");
const nodeMailer = require("nodemailer");
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const user = "";
  const pass = "";

  const sendEmail = (req, res) => {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: { user, pass },
    });

    transporter
      .sendMail({
        from: "",
        to: req.query.email,
        replyTo: "",
        subject: "Reset password",
        text: "Your confirmation code is " + req.query.code,
      })
      .then((info) => {
        res.send(info);
      })
      .catch((error) => {
        res.send(error);
      });
  };
  return { sendEmail };
};
