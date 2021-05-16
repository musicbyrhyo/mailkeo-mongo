const User = require("../database/models/User")
const bcrypt = require('bcrypt')
const emailer = require("../mail/config")
const saltRounds = 10

const register = async (req,res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "_id");

    // Check if all parameters are provided
    if(!req.body.email || !req.body.name || !req.body.password || !req.body.username) return res.status(400).send('Please provide all parameters')

    // check if user with same email exists
    const email = await User.findOne({u_email: req.body.email})
    if(email) return res.status(400).send('User Already Exists')

    const username = await User.findOne({username: req.body.username})
    if(username) return res.status(400).send('Username is already taken')

    //hash password
    const hash = await bcrypt.hash(req.body.password, saltRounds)

    const user = await new User({
        username: req.body.username,
        u_name: req.body.name,
        u_email: req.body.email,
        u_password: hash
    })
    try {
        await user.save().then(async(response)=>{
            res.header('_id',response._id).status(201).send('Account Created Successfully')
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }

    // await emailer.sendMail({
    //     from: `"Mailkeo" <no-reply@ukeo.link>`,
    //     to: req.body.email,
    //     subject: 'Thank you registering with Mailkeo',
    //     html: 'Your account is successfully created. <br><br> You can now configure your STMP settings and get started. <br><br><br><br>Keep Connecting, <br>Ukeo'
    // }).then(res=>console.log(res))

}

module.exports = register