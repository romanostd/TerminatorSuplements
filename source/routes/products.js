const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: errror });
    }
    conn.query("SELECT * FROM products;", (error, result, field) => {
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

router.get("/:product_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: errror });
    }
    conn.query(
      "SELECT * FROM products WHERE product_id = ?;",
      [req.params.product_id],
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
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO products (name, price, description, imageUrl, quantity) VALUES (?,?,?,?,?)",
      [
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        req.body.quantity,
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
          massage: "Product created successfully",
          product_id: result.insertId,
        });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
  
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `UPDATE products SET name = ?, price = ?, description = ?, imageUrl = ?, quantity = ? WHERE product_id = ?`,
        [
          req.body.name,
          req.body.price,
          req.body.description,
          req.body.imageUrl,
          req.body.quantity,
          req.body.product_id
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
            massage: "Product updated successfully",
          });
        }
      );
    });
  });


  router.delete("/", (req, res, next) => {
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
  
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `DELETE FROM products WHERE product_id = ?`,
        [
          req.body.product_id
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
            massage: "Product removed successfully",
          });
        }
      );
    });
  });

module.exports = router;
