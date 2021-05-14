const Campaign = require("../database/models/Campaign")

module.exports = getCampaign = async (req,res) => {

    if(!req.body._id) return res.status(400).send('Please provide all parameters')

    const campaign = await Campaign.findOne({c_owner: req.user._id,_id: req.body._id})
    if(!campaign) return res.status(400).send('No campaign with this id exist')

    if(req.user._id!==campaign.c_owner) return res.status(401).send('Unauthorized Access')

    res.status(200).json(campaign)

}