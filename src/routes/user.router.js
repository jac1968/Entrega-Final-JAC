   // Router of table users
const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)     // Private route
    .post(create);              // Public route

routerUser.route('/login')
    .post(login)                // Public route

routerUser.route('/:id')
    .delete(verifyJwt, remove)  // Private route
    .put(verifyJwt, update);    // Private route

module.exports = routerUser;