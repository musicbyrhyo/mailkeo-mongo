const Audiences = require("../database/models/Audiences")
const User = require("../database/models/User")

module.exports = deleteAudience = async (req,res) => {

    // Check parameters
    if(!req.body._id) return res.status(400).send('Please provide all parameters')

    const length = await checkLength(req.body._id)
    if(!length) return res.status(400).send('Invalid Id')

    // Check if audience exist
    const ExistingAudience = await Audiences.findOne({_id: req.body._id})
    if(!ExistingAudience) return res.status(400).send('No audience exists with this url')

    // Delete Audience
    const DeletedAudience = await Audiences.deleteOne({_id: req.body._id})
    if(!DeletedAudience) return res.status(500)

    // Update User with audience
    const UpdateUser = await User.findOneAndUpdate({_id: req.user._id} , { $pull: {u_audiences: req.body._id}})
    if(!UpdateUser) return res.status(500)

    res.status(200).send('Audience Deleted')

}