const Campaign = require("../database/models/Campaign")

module.exports = createCampaign = async (req,res) => {
    
    if(!req.body.name || !req.body.message || !req.body.audience) return res.status(400).send('Please provide all parameters')

    const CheckCampaign = await Campaign.findOne({c_owner: req.user._id,c_name: req.body.name})
    if(CheckCampaign) return res.status(400).send('A campaign with this name already exists')

    const CreatedCampaign = await new Campaign({
        c_owner: req.user._id,
        c_name: req.body.name,
        c_message: req.body.message,
        c_date: Date(),
        c_audience: req.body.audience,
    })

    const SaveCampaign = await CreatedCampaign.save()
    if(SaveCampaign) return res.status(200).send('Campaign successfully created')

}