const Campaign = require("../database/models/Campaign")
const User = require("../database/models/User")

module.exports = createCampaign = async (req,res) => {
    
    if(!req.body.name || !req.body.message || !req.body.audience || !req.body.subject) return res.status(400).send('Please provide all parameters')

    const CheckCampaign = await Campaign.findOne({c_owner: req.user._id,c_name: req.body.name})
    if(CheckCampaign) return res.status(400).send('A campaign with this name already exists')

    const CreatedCampaign = await new Campaign({
        c_owner: req.user._id,
        c_name: req.body.name,
        c_subject: req.body.subject,
        c_message: req.body.message,
        c_date: Date(),
        c_audience: req.body.audience,
    })

    const SaveCampaign = await CreatedCampaign.save()

    await User.findOneAndUpdate({_id: req.user._id},{ $push : {u_campaigns: SaveCampaign._id}})
    
    if(SaveCampaign) return res.status(200).json('Campaign successfully created')

}