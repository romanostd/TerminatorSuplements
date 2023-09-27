const mysql = require("../mysql").pool;

exports.getCategories = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM categories;", (error, result) => {
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

exports.getCategoryById = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM categories WHERE category_id = ?;",
      [req.params.category_id],
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

exports.saveCategory = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO categories (name) VALUES (?)",
      [req.body.name],
      (error, result) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        } else {
          res.status(201).send({
            message: "Category created successfully",
            category_id: result.insertId,
          });
        }
      },
    );
  });
};

exports.updateCategory = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE categories SET name = ? WHERE category_id = ?;`,
      [req.body.name, req.body.category_id],
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
            message: "Category not found",
          });
        }

        res.status(202).send({
          message: "Category updated successfully",
        });
      },
    );
  });
};

exports.deleteCategory = (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM products WHERE category_id = ?`,
      [req.params.category_id],
      error => {
        if (error) {
          conn.release();
          return res.status(500).send({
            error: error,
            response: null,
          });
        }
        conn.query(
          `DELETE FROM categories WHERE category_id = ?`,
          [req.params.category_id],
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
                message: "Category not found",
              });
            }

            res.status(202).send({
              message: "Category removed successfully",
            });
          },
        );
      },
    );
  });
};
