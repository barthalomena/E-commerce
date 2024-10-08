const express = require('express');
const { getProducts } = require('../controllers/productController');
const { newProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)

module.exports=router;