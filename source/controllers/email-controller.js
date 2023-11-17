const nodeMailer = require("nodemailer");
const user = process.env.TERMINATOR_EMAIL;
const pass = process.env.TERMINATOR_KEY;
const transporter = nodeMailer.createTransport({
  service: "hotmail",
  auth: { user: user, pass: pass },
});

exports.forgotPassword = (req, res) => {
  transporter
    .sendMail({
      from: user,
      to: req.query.email,
      replyTo: "",
      subject: "Reset password",
      text: "Your confirmation code is " + req.query.code,
    })
    .then(info => {
      res.send(info);
    })
    .catch(error => {
      res.send(error);
    });
};
