const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res, next) => {
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
};

exports.getUserById = (req, res, next) => {
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
};

exports.saveUser = (req, res, next) => {
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
          } else {
            res.status(201).send({
              message: "User created successfully",
              user_id: result.insertId,
            });
          }
        }
      );
    });
  });
};

exports.updateUser = (req, res, next) => {
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
            result,
          });
        }
      );
    });
  });
};

exports.deleteUser = (req, res, next) => {
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
        if (result.affectedRows === 0) {
          return res.status(404).send({
            message: "User not found",
          });
        }
        res.status(202).send({
          message: "User removed successfully",
        });
      }
    );
  });
};
