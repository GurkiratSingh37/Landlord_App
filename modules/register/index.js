'use strict';

const userAuthenticator = require('../../validators/authValidator');
const registerValidator = require('./validators/registerValidator');
const registerController = require('./controllers/registerController');
const userAuth = userAuthenticator.authenticateUser;

router.post('/register', registerValidator.register, registerController.register);