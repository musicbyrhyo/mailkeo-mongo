const User = require("../database/models/User")

const configure = async (req,res) => {
    
    // Check if all parameters are provided
    if(!req.body.hostname || !req.body.port || !req.body.secure || !req.body.username || !req.body.password) return res.status(400).send('Please provide all parameters')

    const mail_server = {
        hostname: req.body.hostname,
        port: req.body.port,
        secure: req.body.secure,
        auth: {
            username: req.body.username,
            password: req.body.password
        }
    }

    // check if user with same email exists
    const user = await User.findOneAndUpdate({_id: req.user._id},{$set: {mail_server: mail_server}})

    console.log(user);

    res.status(200).send('Successfully configured')

}

module.exports = configure