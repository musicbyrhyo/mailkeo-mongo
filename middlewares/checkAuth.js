const jwt = require('jsonwebtoken')

const checkAuth = async (req,res,next) => {

    const token = req.header('Authorization')

    if(!token) return res.status(401).send('Access Denied')

    try {
        
        const user = jwt.verify(token, process.env.TOKEN)
        req.user = user

    } catch (error) {
        res.status(400).send('Invalid Token')
    }

    next()

}

module.exports = checkAuth