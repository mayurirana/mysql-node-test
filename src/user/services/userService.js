const options = require('../../../database.config');
const knex = require('knex')(options);
const bcrypt = require('bcrypt')


/**
 * create user
 */

async function createUser(user) {
	try {
		const findEmail = await knex('user').where('email', user.email);
		if (findEmail.length) {
			throw new Error('User already exits')
		}
		await knex('user').insert({
			email: user.email,
			password: await bcrypt.hash(user.password, 10)
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

module.exports = {
	createUser,
	login
};