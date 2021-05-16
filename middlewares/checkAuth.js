const jwt = require('jsonwebtoken')
const User = require('../database/models/User')

const checkAuth = async (req,res,next) => {

    const token = await req.header('authorization')

    if(!token) return res.status(401).send('Access Denied')

    try {
        
        const user = jwt.verify(token, process.env.TOKEN)
        req.user = user
        const checkUser = await User.findOne({_id: user._id})
        if (!checkUser) return res.status(400).send('Invalid Token')

        next()

    } catch (error) {
        res.status(400).send('Invalid Token')
        console.log(error);
    }

}

module.exports = checkAuth