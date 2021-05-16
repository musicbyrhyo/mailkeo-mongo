const Audiences = require("../database/models/Audiences")

module.exports = getAudiences = async (req,res) => {

    let Audience_list = []
    // get audience from DB
    const Audience = await Audiences.find({a_owner: req.user._id})

    if(!Audience) return res.status(400).send("You do not have any audience")

    for (let i = 0; i < Audience.length; i++) {
        
        Audience_list.push({
            name: Audience[i].a_name,
            _id: Audience[i]._id
        })
        
    }

    res.status(200).json(Audience_list)

}