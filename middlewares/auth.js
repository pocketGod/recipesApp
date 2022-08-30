const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    let token = req.header('Authorization')
    if(!token) return res.status(401).send('Access Denied, no TOKEN provided')

    try {
        let payload = jwt.verify(token, process.env.SECRETKEY)
        req.payload = payload


        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}