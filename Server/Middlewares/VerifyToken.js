const jwt = require('jsonwebtoken')

const verifyToken = (req, res ,next) =>{
    try {
        const headerToken = req.headers["authorization"];
        if(!headerToken){
            res.status(401).json({errormessage:'Unauthorized access!'})
        }
        const decode = jwt.verify(headerToken ,process.env.SECRET_CODE)
        req.userId = decode.userId
        next()
    } catch (error) {
        
        next(error)
    }
}

module.exports = verifyToken;