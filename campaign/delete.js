const Campaign = require("../database/models/Campaign")
const User = require("../database/models/User")

module.exports = deleteCampaign = async (req,res) => {

    // Check parameters
    if(!req.body._id) return res.status(400).send('Please provide all parameters')

    const length = await checkLength(req.body._id)
    if(!length) return res.status(400).send('Invalid Id')

    // Check if audience exist
    const ExistingCampaign = await Campaign.findOne({_id: req.body._id})
    if(!ExistingCampaign) return res.status(400).send('No audience exists with this url')

    // Delete Audience
    const DeletedCampaign = await Campaign.deleteOne({_id: req.body._id})
    if(!DeletedCampaign) return res.status(500)

    // Update User with audience
    const UpdateUser = await User.findOneAndUpdate({_id: req.user._id} , { $pull: {u_campaigns: req.body._id}})
    if(!UpdateUser) return res.status(500)

    res.status(200).send('Campaign Deleted')

}