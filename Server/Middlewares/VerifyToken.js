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

const decodeToken =(authHeader)=>{
    try {
        if(!authHeader) return
        const decode = jwt.verify(authHeader ,process.env.SECRET_CODE)
        const userId = decode.userId || null
        return userId

        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {verifyToken, decodeToken};