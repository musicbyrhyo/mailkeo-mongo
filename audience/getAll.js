const Audiences = require("../database/models/Audiences")

module.exports = getAllAudience = async (req,res) => {

    // get audience from DB
    const Audience = await Audiences.find({a_owner: req.user._id})

    if(!Audience) return res.status(400).send("You do not have any audience")

    res.status(200).json(Audience)

}