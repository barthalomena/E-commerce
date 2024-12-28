const express = require('express');
const { getProducts, getSingleproduct, updateproduct, deleteproduct } = require('../controllers/productController');
const { newProduct } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middelewares/authenticate')

router.route('/products').get(isAuthenticatedUser,getProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleproduct);
router.route('/product/:id').put(updateproduct);
router.route('/products/:id').delete(deleteproduct)

module.exports=router;