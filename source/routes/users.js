const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: errror });
    }
    conn.query("SELECT * FROM users;", (error, result, field) => {
      conn.release();

      if (error) {
        res.status(500).send({
          error: error,
          response: null,
        });
      }
      return res.status(200).send({ response: result });
    });
  });
});

router.get("/:user_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: errror });
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
        return res.status(200).send({ response: result });
      }
    );
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO users (order_id, name, email, password, admin) VALUES (?,?,?,?,?)",
      [
        req.body.order_id, 
        req.body.name,
        req.body.email, 
        req.body.password,
        req.body.admin
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

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
       `UPDATE users SET order_id = ?, name = ?, email = ?, password = ?, admin = ? WHERE user_id = ?`,
        [
          req.body.order_id,
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.admin,
          req.body.user_id
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
          massage: "User updated successfully",
        });
      }
    );
  });
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM users WHERE user_id = ?`,
      [req.body.user_id],
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
conn.query(query,[req.body.email], (error, results, fields) => {
  conn.release();
  if(error) { return res.status(500).send({error: error})}
  if (results.lenth < 1) {
    return res.status(401).send({messege: 'Autentication failed'})
  }
  if (bcrypt.compareSync(req.body.password, results[0].password)) {
    const token = jwt.sign({
        user_Id: results[0].user_id,
        email: results[0].email
    },
    process.env.JWT_KEY,
    {
        expiresIn: "1h"
    });
    return res.status(200).send({
        message: 'Success',
        token: token
    });
}
return res.status(401).send({ message: 'Autentication failed' })
  
})
  });
})

module.exports = router;
