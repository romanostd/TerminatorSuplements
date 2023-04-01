const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        messege: 'using get order route'
    })
});

router.post('/', (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).send({
        messege: 'Order insert',
        order: order
    })
})

module.exports = router;