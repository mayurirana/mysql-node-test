const express = require("express");
const userController = require('../controller/userController')
const asyncWrap = require('express-async-wrapper')
const authorization = require('../../auth/authMiddleware')
const validator = require('express-joi-validation').createValidator({})
const validation = require('../dtos/userDto')
const router = express.Router();

router.post('/create-user' , validator.body(validation.createUserValidator), asyncWrap(userController.createUser));
router.post('/login-user', validator.body(validation.loginUserValidator), asyncWrap(userController.login))


module.exports = router;