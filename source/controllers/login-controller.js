const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  mysql.getConnection((error, conn) => {
    if (error) {
      console.error("Connection error:", error);
      return res
        .status(500)
        .send({ error: "Error connecting to the database" });
    }
    const query = `SELECT * FROM users WHERE email = ?`;
    conn.query(query, [req.body.email], (error, results) => {
      conn.release();
      if (error) {
        console.error("Query error:", error);
        return res.status(500).send({ error: "Query error" });
      }
      if (results.length < 1) {
        return res
          .status(401)
          .send({ message: "Authentication failed: User not found" });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res
            .status(401)
            .send({ message: "Authentication failed: Incorrect password" });
        }
        if (result) {
          console.log(req.body.password, results[0].password);
          const token = jwt.sign(
            {
              user_id: results[0].user_id,
              email: results[0].email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            },
          );
          return res.status(200).send({
            message: "Login success",
            token: token,
            user_id: results[0].user_id,
            name: results[0].name,
            admin: results[0].admin,
          });
        }
        res
          .status(401)
          .send({ message: "Authentication failed: Incorrect password" });
      });
    });
  });
};
