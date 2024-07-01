const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const { verifyJwt } = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.router');
const router = express.Router();

// Routes
router.use('/users', routerUser)             // User route
router.use('/categories', routerCategory)    // Category route
router.use('/products', routerProduct)       // Product route
router.use('/cart', verifyJwt, routerCart)   // Cart route private
router.use('/purchase', verifyJwt, routerPurchase)  // Purchase route private

module.exports = router;