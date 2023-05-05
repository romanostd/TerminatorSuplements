const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `SELECT orders.order_id,
              orders.quantity,
              products.product_id,
              products.name,
              products.price
          FROM orders
    INNER JOIN products
 ON products.product_id = orders.product_id;`,
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

router.get("/:order_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM orders WHERE order_id = ?;",
      [req.params.order_id],
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
      "INSERT INTO orders (product_id, quantity) VALUES (?,?)",
      [req.body.product_id, req.body.quantity],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(201).send({
          massage: "Order created successfully",
          order_id: result.insertId,
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
      `UPDATE orders SET product_id = ?, quantity = ? WHERE order_id = ?`,
      [req.body.product_id, req.body.quantity, req.body.order_id],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          massage: "Order updated successfully",
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
      `DELETE FROM orders WHERE order_id = ?`,
      [req.body.order_id],
      (error, result, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          massage: "Order removed successfully",
        });
      }
    );
  });
});

module.exports = router;
