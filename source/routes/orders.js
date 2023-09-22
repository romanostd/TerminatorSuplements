const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders-controller");


router.get("/", ordersController.getOrders);

router.get("/:order_id", ordersController.getOrderById);

router.post("/", ordersController.saveOrder);

router.put("/", ordersController.updateOrder);

router.delete("/:order_id", ordersController.deleteOrder);

module.exports = router;
