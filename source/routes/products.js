const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products-controller");

router.get("/", productsController.getProducts);

router.get("/:product_id", productsController.getProductById);

router.post("/", productsController.saveProduct);

router.put("/", productsController.updateProduct);

router.delete("/:product_id", productsController.deleteProduct);

module.exports = router;
