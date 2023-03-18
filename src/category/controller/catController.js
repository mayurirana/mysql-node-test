const { generateAccessToken } = require('../../auth/auth');
const cat = require('../services/catService');

/**
 * create Category
 * @param {*} req
 * @param {*} res
 */

async function createCategory(req, res) {
  try {
    await cat.createCategory(req.user.id,req.body)
    res.json({
      message: "Category created successfully"
    })
  } catch (error) {
    throw error;
  }
}

/**
 * update Category
 * @param {*} req
 * @param {*} res
 */

async function updateCategory(req, res) {
  try {
    await cat.updateCategory(req.user.id,req.body)
    res.json({
      message: "Category updated successfully"
    })
  } catch (error) {
    throw error;
  }
}

/**
 * delete Category
 * @param {*} req
 * @param {*} res
 */

async function deleteCategory(req, res) {
  try {
    await cat.deleteCategory(req.user.id,req.body)
    res.json({
      message: "Category deleted successfully"
    })
  } catch (error) {
    throw error;
  }
}

/**
 * Category list
 * @param {*} req
 * @param {*} res
 */

async function categoryList(req, res) {
  try {
    const {offset =0 ,limit=10,searchValue=""} = req.query;
    const category = await cat.categoryList(req.user.id,offset,limit,searchValue)
    res.json({
      message: "Category Found",
      category
    })
  } catch (error) {
    throw error;
  }
}

/**
 * login user
 * @param {*} req
 * @param {*} res
 */

async function login(req, res, next) {
  try {
      const userData = await user.login(req.body)
      const token = await generateAccessToken(userData)
      res.json({
          message: "Login successfully",
          token
      })
  } catch (error) {
      return next(error)
  }
}



module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  categoryList,
  login
};