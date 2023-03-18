const options = require('../../../database.config');
const knex = require('knex')(options);
const bcrypt = require('bcrypt')


/**
 * create category
 */

async function createCategory(userId, category) {
    try {
        const findSubCategory = await knex('category')
            .where('category_name', category.categoryName)
            .where('sub_category_name', category.subCategoryName)
            .where('userId', userId)
        if (findSubCategory.length) {
            throw new Error('Please create different sub category')
        }
        await knex('category').insert({
            userId,
            category_name: category.categoryName,
            sub_category_name: category.subCategoryName
        })
    } catch (err) {
        throw err;
    }
}

/**
 * login user
 */

async function login(user) {
    try {
        const userData = await knex('user').where({
            email: user.email
        }).first()

        if (!userData) {
            throw new Error('email is not exits or wrong');
        }
        const pass = await bcrypt.compare(user.password, userData.password)

        if (!pass) {
            throw new Error('password is wrong')
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

/**
 * Update Category
 */

async function updateCategory(userId, catData) {
    try {
        const findUser = await knex('category')
            .where('userId', userId);

        if (!findUser.length) {
            throw new Error('user not found')
        }
        if (catData.categoryName && catData.subCategoryName) {
            const findSubCategory = await knex('category')
                .where('category_name', catData.categoryName)
                .where('sub_category_name', catData.oldSubCategoryName)
                .where('userId', userId);

            if (!findSubCategory.length) {
                throw new Error('sub category not found')
            }
            await knex('category')
                .where('userId', userId)
                .where('category_name', catData.categoryName)
                .where('sub_category_name', catData.oldSubCategoryName)
                .update({
                    sub_category_name: catData.subCategoryName,
                })
        } else if (catData.categoryName) {
            const findCategory = await knex('category')
                .where('category_name', catData.oldCategoryName)
                .where('userId', userId);

            if (!findCategory.length) {
                throw new Error('sub category not found')
            }
            await knex('category').where('userId', userId)
                .where('category_name', catData.oldCategoryName)
                .update({
                    category_name: catData.categoryName,
                })
        }
    } catch (err) {
        throw err;
    }
}

/**
 * delete Category
 */

async function deleteCategory(userId, catData) {
    try {
        const findCategory = await knex('category')
            .where('category_name', catData.categoryName)
            .where('userId', userId);

        if (!findCategory.length) {
            throw new Error('category not found')
        }
        await knex('category')
            .where('userId', userId)
            .where('category_name', catData.categoryName).del()

    } catch (err) {
        throw err;
    }
}

/**
 * get category list
 */

async function categoryList(userId,offset,limit,searchValue) {
    try {
        const findCategory = await knex('category')
            .where('userId', userId)
            .where((qb) => {
                qb.where('category_name', 'like', `%${searchValue}%`)
                qb.orWhere('sub_category_name', 'like', `%${searchValue}%`)
              })
            .offset(offset)
            .limit(limit)
        if (!findCategory.length) {
            throw new Error('category not found')
        }
        const grouped = findCategory.reduce((acc, obj) => {
            const key = obj.category_name;
            if (!acc[key]) {
              acc[key] = {
                userId: obj.userId,
                category_name: obj.category_name,
                sub_categories: [obj.sub_category_name]
              };
            } else {
              acc[key].sub_categories.push(obj.sub_category_name);
            }
            return acc;
          }, {});
          
          const result = Object.values(grouped);

        return result;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    categoryList,
    login
};