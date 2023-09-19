const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories-controller");

router.get("/", categoriesController.getCategories);

router.get("/:category_id", categoriesController.getCategoryById);

router.post("/", categoriesController.saveCategory);

router.put("/", categoriesController.updateCategory);

router.delete("/:category_id", categoriesController.deleteCategory);

module.exports = router;
