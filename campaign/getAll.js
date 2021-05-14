const Campaign = require("../database/models/Campaign")

module.exports = getAllCampaign = async (req,res) => {

    // get audience from DB
    const campaign = await Campaign.find({c_owner: req.user._id})

    if(!campaign) return res.status(400).send("You do not have any audience")

    res.status(200).json(campaign)

}