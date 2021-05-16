const Audiences = require("../database/models/Audiences");
const Campaign = require("../database/models/Campaign");
const User = require("../database/models/User");
const nodemailer = require('nodemailer')

module.exports = startCampaign = async (req,res) => {

    if(!req.body._id) return res.status(400).send('Please provide all parameters')

    const ExistingCampaign = await Campaign.findOne({_id: req.body._id})
    if(!ExistingCampaign) return res.status(400).send('No campaign exists with this id')

    const ExistingUser = await User.findOne({_id: ExistingCampaign.c_owner})
    if(!ExistingUser) return res.status(400).send('No user exists with this id')

    const mailer = nodemailer.createTransport({
        host: ExistingUser.mail_server.hostname,
        port: ExistingUser.mail_server.port,
        secure: ExistingUser.mail_server.secure, // true for 465, false for other ports
        auth: {
          user: ExistingUser.mail_server.auth.username, // generated ethereal user
          pass: ExistingUser.mail_server.auth.password, // generated ethereal password
        },
    })

    const ExistingAudience = await Audiences.findOne({_id: ExistingCampaign.c_audience})
    if(!ExistingAudience) return res.status(400).send('No audience exists with this url')

    for (let i = 0; i < ExistingAudience.a_subscribers.length; i++) {
        
        await mailer.sendMail({
            from: `"${ExistingUser.u_name}" ${ExistingUser.mail_server.auth.username}`,
            to: ExistingAudience.a_subscribers[i].s_email,
            subject: ExistingCampaign.c_subject,
            text: ExistingCampaign.c_message
        }).then((res)=>{console.log(res);})

    }

    const c_complete = await Campaign.findOneAndUpdate({_id: req.body._id},{c_complete: true})

    res.status(200).send('Campaign Completed')

}