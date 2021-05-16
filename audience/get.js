const Audiences = require("../database/models/Audiences")

module.exports = getAudience = async (req,res) => {

    // Check parameters
    if(!req.body._id) return res.status(400).send('Please provide all parameters')

    const length = await checkLength(req.body._id)
    if(!length) return res.status(400).send('Invalid Id')

    // get audience from DB
    const Audience = await Audiences.findOne({_id: req.body._id})
    if(!Audience) return res.status(400).send('Invalid list id')

    // check if user and audience owner match
    if(req.user._id!==Audience.a_owner) return res.status(401).send('Unauthorized Access')

    res.status(200).json(Audience)

}