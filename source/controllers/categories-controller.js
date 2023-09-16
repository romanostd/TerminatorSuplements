const mysql = require("../mysql").pool;

exports.getCategories =(req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query("SELECT * FROM categories;", (error, result, field) => {
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
  }

exports.getCategoryById = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "SELECT * FROM categories WHERE category_id = ?;",
        [req.params.category_id],
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
  }

  exports.saveCategory = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "INSERT INTO categories (name) VALUES (?)",
        [req.body.name],
        (error, result, field) => {
          conn.release();
  
          if (error) {
            res.status(500).send({
              error: error,
              response: null,
            });
          }
          res.status(201).send({
            massage: "Category created successfully",
            user_id: result.insertId,
          });
        }
      );
    });
  }

  exports.updateCategory = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `UPDATE categories SET name = ? WHERE category_id = ?;`,
        [
          req.body.category_id,
          req.body.name,
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
            massage: "Category updated successfully",
          });
        }
      );
    });
  }

  exports.deleteCategory = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `DELETE FROM products WHERE category_id = ?`,
        [req.params.category_id],
        (error, result, field) => {
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
            (error, result, field) => {
              conn.release();
  
              if (error) {
                return res.status(500).send({
                  error: error,
                  response: null,
                });
              }
  
              res.status(202).send({
                message: "Category removed successfully",
              });
            }
          );
        }
      );
    });
  }