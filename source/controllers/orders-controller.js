const mysql = require("../mysql").pool;

exports.getOrders = (req, res) => {
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
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }

        return res.status(200).send({ result });
      },
    );
  });
};

exports.getOrderById = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM orders WHERE order_id = ?;",
      [req.params.order_id],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        return res.status(200).send({ result });
      },
    );
  });
};

exports.saveOrder = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO orders (product_id, quantity) VALUES (?,?)",
      [req.body.product_id, req.body.quantity],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        } else {
          res.status(201).send({
            message: "Order created successfully",
            order_id: result.insertId,
          });
        }
      },
    );
  });
};

exports.updateOrder = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE orders SET product_id = ?, quantity = ? WHERE order_id = ?`,
      [req.body.product_id, req.body.quantity, req.body.order_id],
      error => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        } else {
          res.status(202).send({
            message: "Order updated successfully",
          });
        }
      },
    );
  });
};

exports.deleteOrder = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM orders WHERE order_id = ?`,
      [req.params.order_id],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).send({
            message: "Order not found",
          });
        }
        res.status(202).send({
          message: "Order removed successfully",
        });
      },
    );
  });
};
