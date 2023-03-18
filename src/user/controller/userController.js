const { generateAccessToken } = require('../../auth/auth');
const user = require('../services/userService');

/**
 * create user
 * @param {*} req
 * @param {*} res
 */

async function createUser(req, res) {
  try {
    await user.createUser(req.body)
    res.json({
      message: "user created successfully"
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
  createUser,
  login
};