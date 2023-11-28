const mysql = require("../mysql").pool;

exports.getProducts = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    let query = "SELECT * FROM products";
    const params = [];

    const conditions = [];

    if (req.query.name) {
      conditions.push("LOWER(name) LIKE LOWER(?)");
      params.push(`%${req.query.name}%`);
    }

    if (req.query.category_id) {
      conditions.push("category_id = ?");
      params.push(req.query.category_id);
    }

    if (conditions.length) {
      query += " WHERE " + conditions.join(" AND ");
    }

    conn.query(query, params, (error, result) => {
      conn.release();

      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send(result);
    });
  });
};

exports.getProductById = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM products WHERE product_id = ?;",
      [req.params.product_id],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        return res.status(200).send(result);
      },
    );
  });
};

exports.saveProduct = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO products (name, category_id, price, description, imageUrl, quantity) VALUES (?,?,?,?,?,?)",
      [
        req.body.name,
        req.body.category_id,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        req.body.quantity,
      ],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        } else {
          res.status(201).send({
            message: "Product created successfully",
            product_id: result.insertId,
          });
        }
      },
    );
  });
};

exports.updateProduct = (req, res) => {
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
        req.body.product_id,
      ],
      error => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        } else {
          res.status(202).send({
            message: "Product updated successfully",
          });
        }
      },
    );
  });
};

exports.deleteProduct = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      `DELETE FROM orders WHERE product_id = ?`,
      [req.params.product_id],
      error => {
        if (error) {
          conn.release();
          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        conn.query(
          `DELETE FROM products WHERE product_id = ?`,
          [req.params.product_id],
          (error, result) => {
            conn.release();

            if (error) {
              return res.status(500).send({
                error: error,
                response: null,
              });
            }

            if (result.affectedRows === 0) {
              return res.status(404).send({
                message: "Product not found",
              });
            }

            res.status(202).send({
              message: "Product removed successfully",
            });
          },
        );
      },
    );
  });
};
