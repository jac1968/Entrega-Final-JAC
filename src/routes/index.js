const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)            // User route
router.use('/category', routerCategory)     // Category route

module.exports = router;