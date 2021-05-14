const Audiences = require("../database/models/Audiences")
const User = require("../database/models/User")

module.exports = subscribe = async (req,res) => {

    // check if all parameters exist
    if(!req.body.username || !req.body.uri || !req.body.email || !req.body.name) return res.status(400).send('Please provide all parameters')

    // Check if user exist
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(400).send('The list you are trying to subscribe does not exist.')

    // check if list exist
    const audience = await Audiences.findOne({a_uri: req.body.uri,a_owner: user._id})
    if(!audience) return res.status(400).send('The list you are trying to subscribe does not exist.')

    // Check if subbed
    const checkSub = await Audiences.findOne({_id: audience._id, "a_subscribers.s_email": req.body.email})
    if(checkSub) return res.status(400).send('You have already subscribed to this list.')

    // subscribe
    const subscribe = await Audiences.findOneAndUpdate({a_uri: req.body.uri,a_owner: user._id},{$push: {a_subscribers: {
        s_name: req.body.name,
        s_email: req.body.email
    }}})

    // Success
    if (subscribe) return res.status(200).send('You have successfully subscribed to this list')

    res.status(500)

}