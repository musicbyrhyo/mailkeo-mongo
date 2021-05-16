const Audiences = require("../database/models/Audiences")
const User = require("../database/models/User")

module.exports = getList = async (req,res) => {

    const Audience = await Audiences.findOne({a_uri: req.body.uri})
    if(Audience) {
        const user = await User.findOne({username: req.body.username})
        if(user) return res.status(200).send(true)
        return res.status(400).send(false)
    } else {
        return res.status(400).send(false)
    }

}