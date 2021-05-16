const User = require("../database/models/User")

module.exports = GetUser = async (req,res) => {

    const user = await User.findOne({_id: req.user._id})

    res.status(200).json(user)

}