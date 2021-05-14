const User = require("../database/models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {

    if(!req.body.email || !req.body.password) return res.status(400).send('Please provide all parameters')

    const user = await User.findOne({u_email: req.body.email})

    if(!user) return res.status(404).send('No account with this email found')

    const result = bcrypt.compare(req.body.password, user.u_password)

    if(!result) return res.status(401).send('Invalid Password')

    const token = jwt.sign({
        _id: user._id,
        username: user.username
    },process.env.TOKEN)
    res.header('Authorization', token).send('Login Successful')

}

module.exports = login