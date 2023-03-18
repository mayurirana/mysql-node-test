const Joi = require('joi')


const createUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = { createUserValidator, loginUserValidator }