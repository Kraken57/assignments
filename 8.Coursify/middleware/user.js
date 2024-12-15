const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config")



function userMiddleware (req, res, next) {
    const token = req.headers.token
    const decodedId = jwt.verify(token, JWT_USER_PASSWORD)

    if(decodedId){
        req.userId = decodedId.id
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware : userMiddleware
}