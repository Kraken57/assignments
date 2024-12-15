const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")

function adminMiddleware (req, res, next) {
    const token = req.headers.token
    const decodedId = jwt.verify(token, JWT_ADMIN_PASSWORD)

    if(decodedId){
        req.adminId = decodedId.id
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware
}