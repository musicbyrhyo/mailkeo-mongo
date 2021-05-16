const mongoose = require('mongoose')

const CampaignSchema = mongoose.Schema({

    c_owner: {
        type: String,
        required: true
    },
    c_name: {
        type: String,
        required: true
    },
    c_message: {
        type: String,
        required: true
    },
    c_subject: {
        type: String,
        required: true
    },
    c_complete: Boolean,
    c_date: Date,
    c_audience: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Campaigns',CampaignSchema)