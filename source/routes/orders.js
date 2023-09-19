const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders-controller");


router.get("/", ordersController.getOrders);

router.get("/:order_id", ordersController.getOrderById);

router.post("/", ordersController.saveOrder);

router.patch("/", ordersController.updateOrder);

router.delete("/", ordersController.deleteOrder);

module.exports = router;
