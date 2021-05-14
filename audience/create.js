const Audiences = require("../database/models/Audiences")
const User = require("../database/models/User")

module.exports = createAudience = async (req,res) => {

    if(!req.body.name || !req.body.uri) return res.status(400).send('Please provide all parameters')

    const ExistingAudience = await Audiences.findOne({a_uri:req.body.uri})

    if(ExistingAudience) return res.status(400).send('An audience already exists with the same url')

    const user = req.user

    const Audience = await new Audiences({
        a_owner: user._id,
        a_name: req.body.name,
        a_uri: req.body.uri,
        a_created: Date()
    })

    const SavedAudience = await Audience.save()
    
    await User.findOneAndUpdate({_id: user._id},{ $push : {u_audiences: SavedAudience._id}})

    res.status(200).send(`Audience created with the name ${req.body.name}. You can add invite people to join your email list using this link. http://localhost:3000/join/${user.username}/${req.body.uri}`)

}