const User = require("../database/models/User")
const bcrypt = require('bcrypt')
const saltRounds = 10

const register = async (req,res) => {
    
    // Check if all parameters are provided
    if(!req.body.email || !req.body.name || !req.body.password || !req.body.username) return res.status(400).send('Please provide all parameters')

    // check if user with same email exists
    const email = await User.findOne({u_email: req.body.email})
    if(email) return res.status(400).send('User Already Exists')

    //hash password
    const hash = await bcrypt.hash(req.body.password, saltRounds)

    const user = await new User({
        username: req.body.username,
        u_name: req.body.name,
        u_email: req.body.email,
        u_password: hash
    })
    try {
        await user.save().then(()=>{
            res.status(201).send('Account Created Successfully')
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }

}

module.exports = register