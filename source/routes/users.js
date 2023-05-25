const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM users;", (error, result, field) => {
      conn.release();

      if (error) {
        res.status(500).send({
          error: error,
          response: null,
        });
      }
      return res.status(200).send(result);
    });
  });
});

router.get("/:user_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM users WHERE user_id = ?;",
      [req.params.user_id],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        return res.status(200).send(result);
      }
    );
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    bcrypt.hash(req.body.password, 10, (errBcryptt, hash) => {
      if (errBcryptt) {
        return res.status(500).send({ error: errBcryptt });
      }
      conn.query(
        "INSERT INTO users (order_id, name, email, password, admin) VALUES (?,?,?,?,?)",
        [
          req.body.order_id,
          req.body.name,
          req.body.email,
          hash,
          req.body.admin,
        ],
        (error, result, field) => {
          conn.release();

          if (error) {
            res.status(500).send({
              error: error,
              response: null,
            });
          }
          res.status(201).send({
            massage: "User created successfully",
            user_id: result.insertId,
          });
        }
      );
    });
  });
});

router.put("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    bcrypt.hash(req.body.password, 10, (errBcryptt, hash) => {
      if (errBcryptt) {
        return res.status(500).send({ error: errBcryptt });
      }
   const result = conn.query(
      `UPDATE users SET order_id = ?, name = ?, email = ?, password = ?, admin = ? WHERE user_id = ?`,
      [
        req.body.order_id,
        req.body.name,
        req.body.email,
        hash,
        req.body.admin,
        req.body.user_id,
      ],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          result
        });
      }
    );
  });
})
});

router.delete("/:user_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM users WHERE user_id = ?`,
      [req.params.user_id],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          massage: "User removed successfully",
        });
      }
    );
  });
});

router.post("/login", (req, res, next) => {
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
});

module.exports = router;
