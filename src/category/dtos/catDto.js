const Joi = require('joi')


const createCardValidator = Joi.object({
    categoryName: Joi.string().required(),
    subCategoryName: Joi.string().required(),
})

const updateCategoryValidator = Joi.object({
    categoryName: Joi.string(),
    subCategoryName: Joi.string(),
    oldCategoryName: Joi.string(),
    oldSubCategoryName: Joi.string(),
})

const deleteCategoryValidator = Joi.object({
    categoryName: Joi.string(),
    subCategoryName: Joi.string(),

})


module.exports = { createCardValidator, updateCategoryValidator, deleteCategoryValidator }