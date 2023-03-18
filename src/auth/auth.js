const jwt = require('jsonwebtoken')
const {
    RANDOM
} = require('mysql/lib/PoolSelector')

async function generateAccessToken(user) {

    const jti = RANDOM(32).toString('hex')
    const jwtToken = jwt.sign({
            jti,
            email: user.email,
            id: user.id
        },
        process.env.SECRET, {
            expiresIn: '365 days',
        }
    )


    return jwtToken
}

module.exports = {
    generateAccessToken
}