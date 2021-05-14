const Audiences = require("../database/models/Audiences")
const User = require("../database/models/User")

module.exports = deleteAudience = async (req,res) => {

    // Check parameters
    if(!req.body.uri) return res.status(400).send('Please provide all parameters')

    // Check if audience exist
    const ExistingAudience = await Audiences.findOne({a_uri:req.body.uri})
    if(!ExistingAudience) return res.status(400).send('No audience exists with this url')

    // Delete Audience
    const DeletedAudience = await Audiences.deleteOne({_id: ExistingAudience._id})
    if(!DeletedAudience) return res.status(500)

    // Update User with audience
    const UpdateUser = await User.findOneAndUpdate({u_audiences: ExistingAudience._id} , { $pull: {u_audiences: ExistingAudience._id}})
    if(!UpdateUser) return res.status(500)

    res.status(200).send('Audience Deleted')

}