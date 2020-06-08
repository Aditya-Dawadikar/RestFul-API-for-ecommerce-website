const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth.js");
const productsController = require("../controllers/products.js");

router.get('/', productsController.getAllProducts);

router.get('/:productId', productsController.getProductById);

router.post('/', checkAuth, productsController.addNewProduct);

router.delete('/:productId', checkAuth, productsController.deleteById);

router.patch('/:productId', checkAuth, productsController.patchProduct);

module.exports = router;