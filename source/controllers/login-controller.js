const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const query = `SELECT * FROM users WHERE email = ?`;
      conn.query(query, [req.body.email], (error, results, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (results.length < 1) {
          return res.status(404).send({ message: "Authentication failed" });
        }
        bcrypt.compare(req.body.password, results[0].password, (err, result) => {
          if (err) {
            return res.status(401).send({ message: "Authentication failed" });
          }
          if (result) {
            const token = jwt.sign(
              {
                user_id: results[0].user_id,
                email: results[0].email,
              },
  
              secret = 'secret',
  
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).send({
              message: "Login success",
              token: token,
              user_id: results[0].user_id,
              name: results[0].name,
              admin: results[0].admin,
            });
          }
          res.status(401).send({ message: "Authentication failed" });
        });
      });
    });
  }