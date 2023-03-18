const { UNAUTHORIZED, BAD_REQUEST } = require('http-status')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(BAD_REQUEST).json({
        message:"Token is required"
    })
    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err)

        if (err) return res.status(UNAUTHORIZED).json({
            message:"Token is invalid or expired"
        })

        req.user = user

        next()
    })
}
