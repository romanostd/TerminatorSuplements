const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");


const user = "queijoromano@hotmail.com";
const pass = "*&@Ro1906";
const transporter = nodeMailer.createTransport({
  service: "hotmail",
  auth: { user : user, pass: pass  },
});

router.get("/", (req, res, next) => {
  transporter
  .sendMail({
    from: user,
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
});

module.exports = router;