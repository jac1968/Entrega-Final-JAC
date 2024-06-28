const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const { verifyJwt } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)             // User route
router.use('/categories', routerCategory)    // Category route
router.use('/products', routerProduct)       // Product route
router.use('/carts', verifyJwt, routerCart)  // Cart route

module.exports = router;