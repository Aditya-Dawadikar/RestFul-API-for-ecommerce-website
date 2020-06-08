const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const product = require('../models/product');
const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');
const OrdersController = require("../controllers/orders");

router.get('/', OrdersController.getAllOrders);

router.get('/:orderId', checkAuth, OrdersController.getById);

router.post('/', checkAuth, OrdersController.newOrder);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

module.exports = router;