"use strict";

const authenticateUser  = require('../../validators/authValidator');
const loginValidator    = require('./validators/loginValidator');
const loginController   = require('./controllers/loginController');
const userAuth          = authenticateUser.authenticateUser;

router.get('/loginWithPassword', loginValidator.loginWithPassword, loginController.loginWithPassword);