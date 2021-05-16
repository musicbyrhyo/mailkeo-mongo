const Audiences = require("../database/models/Audiences")
const Campaign = require("../database/models/Campaign")

module.exports = GetCounts = async (req,res) => {

    // get audience from DB
    const Audience = await Audiences.find({a_owner: req.user._id})
    const Campaign = await Campaign.find({c_owner: req.user._id})

    let Subs = 0
    for (let i = 0; i < Audience.length; i++) {
        
        

    }

    res.status(200).json({
        audiences: Audience.length,
        campaign: Campaign.length,
    })

}