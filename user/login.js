const User = require("../database/models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "*");

    if(!req.body.email || !req.body.password) return res.status(400).send('Please provide all parameters')

    const user = await User.findOne({u_email: req.body.email})

    if(!user) return res.status(404).send('No account with this email found')

    const result = await bcrypt.compare(req.body.password, user.u_password)

    if(!result) return res.status(401).send('Invalid Password')

    const token = jwt.sign({
        _id: user._id,
        username: user.username
    },process.env.TOKEN)

    if(user.mail_server.hostname===undefined) return res.header('authorization', token).header('Username', user.username).json({href: '/configure',message:'Log In Successful'})

    res.header('authorization', token).header('Username', user.username).json({href: '/overview',message:'Log In Successful'})

}

module.exports = login