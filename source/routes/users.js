const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

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

module.exports = router;
