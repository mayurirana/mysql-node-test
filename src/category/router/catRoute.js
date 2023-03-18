const express = require("express");
const userController = require('../controller/catController')
const asyncWrap = require('express-async-wrapper')
const authorization = require('../../auth/authMiddleware')
const validator = require('express-joi-validation').createValidator({})
const validation = require('../dtos/catDto')
const router = express.Router();

router.post('/create-category', validator.body(validation.createCardValidator), authorization, asyncWrap(userController.createCategory))
router.put('/update-category', authorization, validator.body(validation.updateCategoryValidator), asyncWrap(userController.updateCategory))
router.delete('/delete-category', authorization, validator.body(validation.deleteCategoryValidator), asyncWrap(userController.deleteCategory))
router.get('/category', authorization, asyncWrap(userController.categoryList))


module.exports = router;